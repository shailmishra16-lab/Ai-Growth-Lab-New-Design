import type { ContactApiResponse, ServiceOption } from '../../src/types';

const ALLOWED_SERVICES: ServiceOption[] = [
  'Website Development',
  'Business Automation',
  'Interaction & Text Analytics',
  'AI Assistant',
  'Other / Not Sure',
];

const AUTHORIZED_TESTING_FROM = 'onboarding@resend.dev';
const REQUIRED_RECIPIENT_EMAIL = 'team.aigrowthlab@gmail.com';
const EMAIL_REGEX = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export interface ContactDispatchOutcome {
  status: number;
  body: ContactApiResponse;
}

export interface EmailConfigStatus {
  configured: boolean;
  missingEnvVars: string[];
  recipient: string;
  resendApiKey: string | null;
  resendFrom: string;
  configError?: string;
}

function sanitizeLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function normalizeEnvValue(value: string | undefined): string {
  const trimmed = (value || '').trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length >= 2)
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

export function getResendEmailConfigStatus(): EmailConfigStatus {
  const resendApiKey = normalizeEnvValue(process.env.RESEND_API_KEY);

  const missingEnvVars: string[] = [];
  if (!resendApiKey) {
    missingEnvVars.push('RESEND_API_KEY');
  }

  return {
    configured: missingEnvVars.length === 0,
    missingEnvVars,
    recipient: REQUIRED_RECIPIENT_EMAIL,
    resendApiKey: resendApiKey || null,
    resendFrom: AUTHORIZED_TESTING_FROM,
  };
}

export async function dispatchContactEnquiry(payload: unknown): Promise<ContactDispatchOutcome> {
  if (!payload || typeof payload !== 'object') {
    return {
      status: 400,
      body: {
        error: 'Invalid enquiry payload.',
        code: 'VALIDATION_ERROR',
      },
    };
  }

  const input = payload as Record<string, unknown>;

  // Honeypot spam trap: legitimate users never fill this hidden field
  if (typeof input.website === 'string' && input.website.trim().length > 0) {
    return {
      status: 400,
      body: {
        error: 'Unable to verify enquiry submission.',
        code: 'VALIDATION_ERROR',
      },
    };
  }

  const fullName = typeof input.fullName === 'string' ? sanitizeLine(input.fullName) : '';
  const email = typeof input.email === 'string' ? sanitizeLine(input.email) : '';
  const businessName = typeof input.businessName === 'string' ? sanitizeLine(input.businessName) : '';
  const serviceRequired = typeof input.serviceRequired === 'string' ? input.serviceRequired.trim() : '';
  const message = typeof input.message === 'string' ? input.message.trim() : '';

  if (fullName.length < 2 || fullName.length > 120) {
    return {
      status: 400,
      body: {
        error: 'Please enter your full name (between 2 and 120 characters).',
        code: 'VALIDATION_ERROR',
      },
    };
  }

  if (!EMAIL_REGEX.test(email) || email.length > 160) {
    return {
      status: 400,
      body: {
        error: 'Please enter a valid email address.',
        code: 'VALIDATION_ERROR',
      },
    };
  }

  if (businessName.length > 150) {
    return {
      status: 400,
      body: {
        error: 'Business name must be 150 characters or fewer.',
        code: 'VALIDATION_ERROR',
      },
    };
  }

  if (!ALLOWED_SERVICES.includes(serviceRequired as ServiceOption)) {
    return {
      status: 400,
      body: {
        error: 'Please select a valid service from the dropdown.',
        code: 'VALIDATION_ERROR',
      },
    };
  }

  if (message.length < 10 || message.length > 3000) {
    return {
      status: 400,
      body: {
        error: 'Please describe your requirements (between 10 and 3,000 characters).',
        code: 'VALIDATION_ERROR',
      },
    };
  }

  // Basic spam link-flood guard
  const urlMatches = message.match(/https?:\/\//gi) || [];
  if (urlMatches.length > 3) {
    return {
      status: 400,
      body: {
        error: 'Please remove excessive external URLs from your message and try again.',
        code: 'VALIDATION_ERROR',
      },
    };
  }

  // Verify RESEND_API_KEY before attempting delivery.
  // Use HTTP 500 (not 502/503) so reverse proxies pass JSON errors through cleanly.
  const config = getResendEmailConfigStatus();
  if (!config.configured || !config.resendApiKey) {
    console.warn('[ContactEmail] Missing RESEND_API_KEY environment variable.');
    return {
      status: 500,
      body: {
        error: 'Email delivery is not configured on the server. Missing environment variable: RESEND_API_KEY.',
        code: 'MISSING_CONFIG',
        missingEnvVars: config.missingEnvVars,
      },
    };
  }

  const from = AUTHORIZED_TESTING_FROM;
  const recipient = REQUIRED_RECIPIENT_EMAIL;
  const subject = 'New Business Enquiry | AI Growth Lab';
  const submittedAt = new Date().toISOString();

  const textBody = [
    'New Business Enquiry — AI Growth Lab',
    '======================================',
    `Full Name: ${fullName}`,
    `Email Address: ${email}`,
    `Business Name: ${businessName || 'Not provided'}`,
    `Service Required: ${serviceRequired}`,
    `Submitted At (UTC): ${submittedAt}`,
    '',
    'Requirements / Message:',
    message,
  ].join('\n');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject,
        text: textBody,
      }),
      signal: controller.signal,
    });

    const rawText = await response.text();
    let parsed: { id?: string; message?: string; name?: string } | null = null;
    try {
      parsed = rawText ? (JSON.parse(rawText) as { id?: string; message?: string; name?: string }) : null;
    } catch {
      parsed = null;
    }

    if (!response.ok) {
      const providerDetail =
        (typeof parsed?.message === 'string' && parsed.message.trim()) ||
        (typeof parsed?.name === 'string' && `${parsed.name} (HTTP ${response.status})`) ||
        `HTTP ${response.status}`;

      console.error(
        `[ContactEmail] Resend API rejected request (status ${response.status}):`,
        providerDetail
      );

      // Map upstream 4xx to 422 and 5xx to 500 so reverse proxies pass JSON through cleanly
      const clientStatus = response.status >= 400 && response.status < 500 ? 422 : 500;

      return {
        status: clientStatus,
        body: {
          error: `Resend rejected the email request: ${providerDetail}`,
          code: 'DELIVERY_FAILED',
        },
      };
    }

    const messageId = typeof parsed?.id === 'string' ? parsed.id.trim() : '';
    if (!messageId) {
      console.error('[ContactEmail] Resend API returned 2xx without a confirmation message id.');
      return {
        status: 500,
        body: {
          error: `Email delivery could not be confirmed by Resend. Please email ${REQUIRED_RECIPIENT_EMAIL} directly.`,
          code: 'DELIVERY_FAILED',
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,
        message: 'Your enquiry has been sent to the AI Growth Lab team.',
        recipient,
        messageId,
      },
    };
  } catch (err: unknown) {
    const isAbort = err instanceof Error && err.name === 'AbortError';
    const msg = isAbort ? 'Resend API request timed out' : err instanceof Error ? err.message : 'Resend error';
    console.error('[ContactEmail] Resend delivery failed:', msg);
    return {
      status: 500,
      body: {
        error: `Unable to reach the Resend email service (${msg}). Please try again or email ${REQUIRED_RECIPIENT_EMAIL} directly.`,
        code: 'DELIVERY_FAILED',
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}
