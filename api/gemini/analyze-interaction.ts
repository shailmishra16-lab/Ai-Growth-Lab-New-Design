import { analyzeInteractionTranscript } from '../../server/lib/analyzeInteraction';
import { checkRateLimit, getClientIp } from '../../server/lib/rateLimit';

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
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

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

  const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<string, unknown>;
  const result = await analyzeInteractionTranscript(body.transcript);
  res.status(result.status).json(result.body);
}
