import { dispatchContactEnquiry } from '../server/lib/sendContactEmail';
import { checkRateLimit, getClientIp } from '../server/lib/rateLimit';

interface MinimalReq {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  socket?: { remoteAddress?: string };
}

interface MinimalRes {
  status: (code: number) => MinimalRes;
  setHeader: (name: string, value: string) => void;
  json: (body: unknown) => void;
}

export default async function handler(req: MinimalReq, res: MinimalRes) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed', code: 'VALIDATION_ERROR' });
      return;
    }

    const ip = getClientIp(req.headers || {}, req.socket?.remoteAddress);
    const rate = checkRateLimit(`contact:${ip}`, 5, 15 * 60 * 1000);
    if (!rate.allowed) {
      res.setHeader('Retry-After', String(rate.retryAfterSeconds));
      res.status(429).json({
        error: `Too many enquiry submissions. Please wait ${rate.retryAfterSeconds} seconds before trying again.`,
        code: 'RATE_LIMITED',
      });
      return;
    }

    let parsedBody: unknown = req.body;
    if (typeof req.body === 'string') {
      try {
        parsedBody = JSON.parse(req.body);
      } catch {
        res.status(400).json({
          error: 'Invalid JSON request body.',
          code: 'VALIDATION_ERROR',
        });
        return;
      }
    }

    const result = await dispatchContactEnquiry(parsedBody);
    res.status(result.status).json(result.body);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unexpected server error';
    console.error('[api/contact] Unhandled error:', msg);
    res.status(500).json({
      error: 'Unexpected server error while processing your enquiry. Please try again or email team.aigrowthlab@gmail.com directly.',
      code: 'DELIVERY_FAILED',
    });
  }
}
