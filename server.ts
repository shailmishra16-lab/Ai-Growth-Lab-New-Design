import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { analyzeInteractionTranscript } from './server/lib/analyzeInteraction';
import { dispatchContactEnquiry, getResendEmailConfigStatus } from './server/lib/sendContactEmail';
import { checkRateLimit, getClientIp } from './server/lib/rateLimit';

const app = express();
const PORT = 3000;

app.set('trust proxy', 1);
app.use(express.json({ limit: '64kb' }));

// Health & readiness endpoints
app.get(['/api/health', '/healthz'], (_req: Request, res: Response) => {
  const emailStatus = getResendEmailConfigStatus();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY?.trim()),
    emailConfigured: emailStatus.configured,
    missingEmailEnvVars: emailStatus.missingEnvVars,
  });
});

// 1. Interaction Analytics Playground (Gemini API, Server-Side Only)
app.post('/api/gemini/analyze-interaction', async (req: Request, res: Response) => {
  const ip = getClientIp(req.headers, req.socket?.remoteAddress);
  const rate = checkRateLimit(`analytics:${ip}`, 12, 10 * 60 * 1000);

  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfterSeconds));
    res.status(429).json({
      error: `Too many analysis requests. Please wait ${rate.retryAfterSeconds} seconds before trying again.`,
      code: 'RATE_LIMITED',
    });
    return;
  }

  const result = await analyzeInteractionTranscript(req.body?.transcript);
  res.status(result.status).json(result.body);
});

// 2. Contact & Enquiry Email Notification Endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
  const ip = getClientIp(req.headers, req.socket?.remoteAddress);
  const rate = checkRateLimit(`contact:${ip}`, 5, 15 * 60 * 1000);

  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfterSeconds));
    res.status(429).json({
      error: `Too many enquiry submissions. Please wait ${rate.retryAfterSeconds} seconds before trying again.`,
      code: 'RATE_LIMITED',
    });
    return;
  }

  const result = await dispatchContactEnquiry(req.body);
  res.status(result.status).json(result.body);
});

// Ensure malformed JSON or unexpected errors on /api routes return JSON instead of HTML
app.use('/api', (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const status =
    typeof err === 'object' && err !== null && 'status' in err && typeof (err as { status: unknown }).status === 'number'
      ? (err as { status: number }).status
      : 500;
  const message =
    status === 400
      ? 'Invalid JSON request payload.'
      : 'Unexpected server error while processing your request.';
  console.error('[API] Middleware error:', err instanceof Error ? err.message : err);
  res.status(status).json({
    error: message,
    code: status === 400 ? 'VALIDATION_ERROR' : 'DELIVERY_FAILED',
  });
});

// 3. Server Boot & SPA Delivery
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const candidatePaths = [
      path.join(process.cwd(), 'dist'),
      path.resolve(__dirname),
      path.resolve(__dirname, '..', 'dist'),
      path.resolve(process.cwd()),
    ];

    let distPath = candidatePaths[0];
    for (const p of candidatePaths) {
      if (fs.existsSync(path.join(p, 'index.html'))) {
        distPath = p;
        break;
      }
    }

    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res
          .status(200)
          .send(
            '<!doctype html><html><head><title>AI Growth Lab</title></head><body><div id="root"></div><script>location.reload();</script></body></html>'
          );
      }
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });

  server.on('error', (err: unknown) => {
    console.error('Server network error:', err);
  });
}

startServer();
