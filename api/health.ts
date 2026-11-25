import { getResendEmailConfigStatus } from '../server/lib/sendContactEmail';

interface MinimalReq {
  method?: string;
}

interface MinimalRes {
  status: (code: number) => MinimalRes;
  json: (body: unknown) => void;
}

export default function handler(req: MinimalReq, res: MinimalRes) {
  if (req.method && req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const emailStatus = getResendEmailConfigStatus();

  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY?.trim()),
    emailConfigured: emailStatus.configured,
    missingEmailEnvVars: emailStatus.missingEnvVars,
  });
}
