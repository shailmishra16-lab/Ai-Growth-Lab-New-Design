import { GoogleGenAI, Type } from '@google/genai';
import type {
  FcrIndication,
  FollowUpRequired,
  InteractionAnalysisResult,
  RepeatContactAnalysis,
  RepeatContactStatus,
  ResolutionFcrAnalysis,
  ResolutionStatus,
  SentimentLabel,
} from '../../src/types';

const MIN_TRANSCRIPT_LENGTH = 20;
const MAX_TRANSCRIPT_LENGTH = 8000;

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const VALID_SENTIMENTS: SentimentLabel[] = [
  'Positive',
  'Neutral',
  'Mixed',
  'Negative',
  'Cannot Be Determined',
];

const VALID_REPEAT_STATUSES: RepeatContactStatus[] = [
  'Yes',
  'No',
  'Not Determined',
];

const VALID_RESOLUTION_STATUSES: ResolutionStatus[] = [
  'Fully Resolved',
  'Partially Resolved',
  'Unresolved',
  'Not Determined',
];

const VALID_YES_NO_UNDETERMINED: Array<'Yes' | 'No' | 'Not Determined'> = [
  'Yes',
  'No',
  'Not Determined',
];

function normalizeStringArray(val: unknown, fallbackItem: string, maxItems = 8): string[] {
  if (!Array.isArray(val)) return [fallbackItem];
  const cleaned = val
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((item) => item.length > 0)
    .slice(0, maxItems);
  return cleaned.length > 0 ? cleaned : [fallbackItem];
}

function normalizeRepeatContactAnalysis(raw: unknown): RepeatContactAnalysis {
  const input = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;

  const rawStatus = typeof input.status === 'string' ? input.status.trim() : '';
  const status: RepeatContactStatus = VALID_REPEAT_STATUSES.includes(
    rawStatus as RepeatContactStatus
  )
    ? (rawStatus as RepeatContactStatus)
    : 'Not Determined';

  let reasons: string[];
  if (status === 'Yes') {
    reasons = normalizeStringArray(
      input.reasons,
      'Customer indicated a prior unresolved contact in the transcript.',
      2
    );
  } else if (status === 'No') {
    reasons = ['Not Applicable'];
  } else {
    reasons = ['Not Determined'];
  }

  const rawEvidence =
    typeof input.supportingStatement === 'string' ? input.supportingStatement.trim() : '';
  const fallbackEvidence =
    status === 'Yes'
      ? 'Customer referenced a previous contact in the transcript.'
      : status === 'No'
      ? 'Customer explicitly indicated this is their first contact.'
      : 'No statement in the transcript confirms prior or first-time contact.';
  const supportingStatement = rawEvidence || fallbackEvidence;

  const rawCount =
    typeof input.reportedContactCount === 'string'
      ? input.reportedContactCount.trim()
      : typeof input.reportedContactCount === 'number' &&
        Number.isFinite(input.reportedContactCount)
      ? String(input.reportedContactCount)
      : '';
  const isUnstated =
    !rawCount ||
    /^(none|n\/a|na|not mentioned|not stated|not determined|unknown|null|unspecified)$/i.test(
      rawCount
    );
  const reportedContactCount = isUnstated ? null : rawCount;

  return {
    status,
    reasons,
    supportingStatement,
    reportedContactCount,
  };
}

function normalizeResolutionFcrAnalysis(
  raw: unknown,
  repeatContact: RepeatContactAnalysis
): ResolutionFcrAnalysis {
  const input = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;

  const rawResolution =
    typeof input.resolutionStatus === 'string' ? input.resolutionStatus.trim() : '';
  const resolutionStatus: ResolutionStatus = VALID_RESOLUTION_STATUSES.includes(
    rawResolution as ResolutionStatus
  )
    ? (rawResolution as ResolutionStatus)
    : 'Not Determined';

  const rawFcr =
    typeof input.fcrIndication === 'string' ? input.fcrIndication.trim() : '';
  let fcrIndication: FcrIndication = VALID_YES_NO_UNDETERMINED.includes(
    rawFcr as FcrIndication
  )
    ? (rawFcr as FcrIndication)
    : 'Not Determined';

  // Enforce FCR grounding rules strictly using repeatContact & resolutionStatus
  if (repeatContact.status === 'Yes') {
    fcrIndication = 'No';
  } else if (
    repeatContact.status === 'Not Determined' ||
    resolutionStatus === 'Not Determined'
  ) {
    fcrIndication = 'Not Determined';
  } else if (
    repeatContact.status === 'No' &&
    resolutionStatus === 'Fully Resolved'
  ) {
    fcrIndication = 'Yes';
  } else {
    fcrIndication = 'No';
  }

  const rawFollowUp =
    typeof input.followUpRequired === 'string' ? input.followUpRequired.trim() : '';
  const followUpRequired: FollowUpRequired = VALID_YES_NO_UNDETERMINED.includes(
    rawFollowUp as FollowUpRequired
  )
    ? (rawFollowUp as FollowUpRequired)
    : resolutionStatus === 'Unresolved' || resolutionStatus === 'Partially Resolved'
    ? 'Yes'
    : 'Not Determined';

  const gapFallback =
    resolutionStatus === 'Fully Resolved'
      ? 'No unresolved issues or pending actions identified in the transcript.'
      : resolutionStatus === 'Not Determined'
      ? 'Insufficient evidence in the transcript to confirm resolution gaps.'
      : 'Resolution remains pending or incomplete based on the submitted transcript.';

  const resolutionGaps = normalizeStringArray(
    input.resolutionGaps,
    gapFallback,
    2
  );

  const rawEvidence =
    typeof input.supportingEvidence === 'string'
      ? input.supportingEvidence.trim()
      : '';
  const fallbackEvidence =
    resolutionStatus === 'Fully Resolved'
      ? 'Transcript indicates the customer issue was completed during this interaction.'
      : resolutionStatus === 'Not Determined'
      ? 'The provided transcript does not confirm whether the issue was resolved.'
      : 'Transcript indicates pending actions or an unresolved customer issue.';

  return {
    resolutionStatus,
    fcrIndication,
    followUpRequired,
    resolutionGaps,
    supportingEvidence: rawEvidence || fallbackEvidence,
  };
}

function validateAndNormalizeAnalysis(raw: unknown): InteractionAnalysisResult {
  const data = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;

  const rawSentiment = typeof data.overallCustomerSentiment === 'string' ? data.overallCustomerSentiment.trim() : '';
  const overallCustomerSentiment: SentimentLabel = VALID_SENTIMENTS.includes(rawSentiment as SentimentLabel)
    ? (rawSentiment as SentimentLabel)
    : 'Cannot Be Determined';

  const repeatContactAnalysis = normalizeRepeatContactAnalysis(data.repeatContactAnalysis);
  const resolutionFcrAnalysis = normalizeResolutionFcrAnalysis(
    data.resolutionFcrAnalysis,
    repeatContactAnalysis
  );

  return {
    interactionSummary:
      typeof data.interactionSummary === 'string' && data.interactionSummary.trim()
        ? data.interactionSummary.trim()
        : 'Cannot be determined from the provided transcript.',
    overallCustomerSentiment,
    sentimentExplanation:
      typeof data.sentimentExplanation === 'string' && data.sentimentExplanation.trim()
        ? data.sentimentExplanation.trim()
        : 'Insufficient sentiment evidence in the provided text.',
    customerEmotions: normalizeStringArray(
      data.customerEmotions,
      'Cannot be determined from the provided text'
    ),
    primaryCallDriver:
      typeof data.primaryCallDriver === 'string' && data.primaryCallDriver.trim()
        ? data.primaryCallDriver.trim()
        : 'Cannot be determined from the provided transcript',
    secondaryCallDrivers: normalizeStringArray(
      data.secondaryCallDrivers,
      'None identified in the provided transcript'
    ),
    customerPainPoints: normalizeStringArray(
      data.customerPainPoints,
      'None explicitly identified in the provided transcript'
    ),
    complaintIndicators: normalizeStringArray(
      data.complaintIndicators,
      'None explicitly observed in the provided transcript'
    ),
    escalationIndicators: normalizeStringArray(
      data.escalationIndicators,
      'None explicitly observed in the provided transcript'
    ),
    agentBehaviorObservations: normalizeStringArray(
      data.agentBehaviorObservations,
      'Cannot be determined — no clear agent response present in the transcript'
    ),
    recommendedCorrectiveActions: normalizeStringArray(
      data.recommendedCorrectiveActions,
      'Review full interaction context before assigning corrective action'
    ),
    repeatContactAnalysis,
    resolutionFcrAnalysis,
    evidenceLimitations:
      typeof data.evidenceLimitations === 'string' && data.evidenceLimitations.trim()
        ? data.evidenceLimitations.trim()
        : 'Analysis is based strictly on the submitted text transcript.',
  };
}

export interface AnalyzeOutcome {
  status: number;
  body: InteractionAnalysisResult | { error: string; code: string; setupHint?: string };
}

export async function analyzeInteractionTranscript(transcriptInput: unknown): Promise<AnalyzeOutcome> {
  if (typeof transcriptInput !== 'string') {
    return {
      status: 400,
      body: {
        error: 'A text transcript string is required for analysis.',
        code: 'VALIDATION_ERROR',
      },
    };
  }

  const transcript = transcriptInput.trim();

  if (transcript.length < MIN_TRANSCRIPT_LENGTH) {
    return {
      status: 400,
      body: {
        error: `Please enter at least ${MIN_TRANSCRIPT_LENGTH} characters of conversation text so meaningful interaction patterns can be analyzed.`,
        code: 'VALIDATION_ERROR',
      },
    };
  }

  if (transcript.length > MAX_TRANSCRIPT_LENGTH) {
    return {
      status: 400,
      body: {
        error: `Transcript exceeds the ${MAX_TRANSCRIPT_LENGTH.toLocaleString()}-character limit. Please shorten the excerpt and try again.`,
        code: 'VALIDATION_ERROR',
      },
    };
  }

  const ai = getGeminiClient();
  if (!ai) {
    return {
      status: 503,
      body: {
        error: 'Live Gemini interaction analysis is currently unavailable because GEMINI_API_KEY is not configured on the server.',
        code: 'MISSING_CONFIG',
        setupHint:
          'Add GEMINI_API_KEY to your server environment variables (Settings > Secrets in AI Studio or Environment Variables in Vercel) to enable live analysis.',
      },
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: [
        'Analyze the following customer interaction text transcript. Base every field strictly on evidence present in the text.',
        '--- BEGIN TRANSCRIPT ---',
        transcript,
        '--- END TRANSCRIPT ---',
      ].join('\n'),
      config: {
        systemInstruction: `You are a customer interaction and text analytics specialist.
Analyze the provided text transcript objectively and return structured JSON matching the schema.

STRICT GROUNDING RULES:
1. Base every conclusion strictly on what is actually written in the provided text.
2. NEVER fabricate confidence percentages, numerical sentiment scores, or metrics that are not in the transcript.
3. NEVER claim voice-tone, vocal pitch, speaking speed, or audio analysis—you only have a written text transcript.
4. When evidence in the text is insufficient for a field (for example, no agent dialogue appears, or the text is not a customer conversation, or no escalation risk exists), explicitly state that it cannot be determined or that none was observed in the provided transcript.
5. Keep observations concise, practical, and business-focused.
6. REPEAT CONTACT ANALYSIS RULES:
   - Keep Repeat Contact Analysis separate from complaintIndicators and escalationIndicators (retain relevant complaint and escalation details in their respective fields).
   - Set repeatContactAnalysis.status to "Yes" only if the transcript explicitly indicates the customer has contacted the business before about this issue or an ongoing matter (e.g., following up on a previous call/chat/email/ticket, reaching out again).
   - Set repeatContactAnalysis.status to "No" ONLY if the transcript explicitly states or confirms this is the customer's first contact.
   - Set repeatContactAnalysis.status to "Not Determined" if there is insufficient information about prior contacts. Do NOT assume that the absence of previous contact references means this is the first contact.
   - For repeatContactAnalysis.reasons: provide at most 2 concise bullet points explaining why the customer had to contact again if status is "Yes"; return ["Not Applicable"] if status is "No"; return ["Not Determined"] if status is "Not Determined".
   - For repeatContactAnalysis.supportingStatement: include one short supporting statement or direct quote from the original transcript as evidence (or note no prior/first-contact reference appears when status is "Not Determined").
   - For repeatContactAnalysis.reportedContactCount: ONLY if the customer explicitly mentions the number of contacts (e.g. "3 times", "second time", "4 calls"), output that stated count; otherwise output "Not Mentioned". NEVER estimate or fabricate a count.
7. RESOLUTION & FCR ANALYSIS RULES:
   - Differentiate strictly between actual resolution (confirmed completed outcome in the transcript) and promised resolution (e.g., "we will escalate", "someone will follow up", "I have submitted a request").
   - NEVER classify resolutionStatus as "Fully Resolved" merely because the agent makes a promise/commitment or the customer says "thank you". If resolution depends on pending processing, escalation, or callback, classify as "Partially Resolved" or "Unresolved".
   - Use repeatContactAnalysis findings when evaluating resolutionFcrAnalysis.fcrIndication (which is a transcript-based indication, not an operational metric):
     * If repeatContactAnalysis.status is "Yes" (customer contacted previously for the same issue), fcrIndication MUST be "No".
     * If first contact (repeatContactAnalysis.status === "Not Determined") OR actual resolution (resolutionStatus === "Not Determined") cannot be established from the transcript, fcrIndication MUST be "Not Determined".
     * Classify fcrIndication as "Yes" ONLY when the transcript confirms BOTH that this is the first contact (repeatContactAnalysis.status === "No") AND that the issue was actually resolved ("Fully Resolved").
     * If confirmed first contact ("No") but "Unresolved" or "Partially Resolved", classify fcrIndication as "No".
   - For resolutionFcrAnalysis.followUpRequired: "Yes" if pending actions, callback, escalation, or unresolved steps remain; "No" only if confirmed fully resolved with no remaining action; otherwise "Not Determined".
   - For resolutionFcrAnalysis.resolutionGaps: maximum 2 concise bullet points explaining unresolved issues or pending actions (or state none observed if "Fully Resolved").
   - For resolutionFcrAnalysis.supportingEvidence: one short relevant statement or quote from the original transcript.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            interactionSummary: {
              type: Type.STRING,
              description: 'Concise 2-3 sentence factual summary of the submitted text interaction.',
            },
            overallCustomerSentiment: {
              type: Type.STRING,
              enum: ['Positive', 'Neutral', 'Mixed', 'Negative', 'Cannot Be Determined'],
              description: 'Overall customer sentiment strictly supported by the text.',
            },
            sentimentExplanation: {
              type: Type.STRING,
              description: 'Brief evidence-based explanation of why this sentiment label applies, without invented percentages.',
            },
            customerEmotions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Emotions evidenced in the customer text (e.g. Frustration, Confusion, Relief, Satisfaction), or state that emotions cannot be determined.',
            },
            primaryCallDriver: {
              type: Type.STRING,
              description: 'The main reason the customer contacted support/business, or state that it cannot be determined.',
            },
            secondaryCallDrivers: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Additional topics or secondary drivers if present, otherwise ["None identified in the provided transcript"].',
            },
            customerPainPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Specific customer friction points or issues stated in the text.',
            },
            complaintIndicators: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Explicit dissatisfaction or complaint cues observed in the text, or state none observed.',
            },
            escalationIndicators: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Signals of escalation risk (e.g. request for supervisor, threat to cancel/dispute), or state none observed.',
            },
            agentBehaviorObservations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Objective observations on how the agent responded in text (e.g. empathy, clarity, next steps), or note if no agent messages exist.',
            },
            recommendedCorrectiveActions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Practical operational or communication next steps grounded in the interaction.',
            },
            repeatContactAnalysis: {
              type: Type.OBJECT,
              properties: {
                status: {
                  type: Type.STRING,
                  enum: ['Yes', 'No', 'Not Determined'],
                  description: 'Whether this is a repeat contact ("Yes"), explicitly first contact ("No"), or cannot be determined ("Not Determined"). Never assume absence of prior contact mentions means "No".',
                },
                reasons: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Maximum 2 concise bullet points explaining why the customer had to contact again if status is "Yes"; ["Not Applicable"] if "No"; ["Not Determined"] if "Not Determined".',
                },
                supportingStatement: {
                  type: Type.STRING,
                  description: 'One short supporting statement or quote from the original transcript as evidence.',
                },
                reportedContactCount: {
                  type: Type.STRING,
                  description: 'Exact contact count explicitly mentioned by the customer (e.g. "3 times", "2nd call"), or "Not Mentioned" if not stated. Never estimate or fabricate.',
                },
              },
              required: [
                'status',
                'reasons',
                'supportingStatement',
                'reportedContactCount',
              ],
            },
            resolutionFcrAnalysis: {
              type: Type.OBJECT,
              properties: {
                resolutionStatus: {
                  type: Type.STRING,
                  enum: ['Fully Resolved', 'Partially Resolved', 'Unresolved', 'Not Determined'],
                  description: 'Actual resolution status evidenced in the transcript. Never mark Fully Resolved based solely on an agent promise or polite thank-you.',
                },
                fcrIndication: {
                  type: Type.STRING,
                  enum: ['Yes', 'No', 'Not Determined'],
                  description: 'Transcript-based FCR indication grounded in repeatContactAnalysis and resolutionStatus. Must be "No" for repeat contacts, and "Not Determined" if first contact or actual resolution cannot be established.',
                },
                followUpRequired: {
                  type: Type.STRING,
                  enum: ['Yes', 'No', 'Not Determined'],
                  description: 'Whether follow-up action is still required based on pending steps or unresolved issues.',
                },
                resolutionGaps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Maximum 2 concise bullet points explaining unresolved issues or pending actions.',
                },
                supportingEvidence: {
                  type: Type.STRING,
                  description: 'One short relevant statement from the original transcript supporting the resolution assessment.',
                },
              },
              required: [
                'resolutionStatus',
                'fcrIndication',
                'followUpRequired',
                'resolutionGaps',
                'supportingEvidence',
              ],
            },
            evidenceLimitations: {
              type: Type.STRING,
              description: 'Note any missing context (e.g. short excerpt, single-party message, no agent turn, or non-transcript text) and confirm analysis is text-only.',
            },
          },
          required: [
            'interactionSummary',
            'overallCustomerSentiment',
            'sentimentExplanation',
            'customerEmotions',
            'primaryCallDriver',
            'secondaryCallDrivers',
            'customerPainPoints',
            'complaintIndicators',
            'escalationIndicators',
            'agentBehaviorObservations',
            'recommendedCorrectiveActions',
            'repeatContactAnalysis',
            'resolutionFcrAnalysis',
            'evidenceLimitations',
          ],
        },
      },
    });

    const rawText = (response.text || '').trim();
    if (!rawText) {
      return {
        status: 502,
        body: {
          error: 'The AI model returned an empty response. Please try again.',
          code: 'API_ERROR',
        },
      };
    }

    const parsed = JSON.parse(rawText);
    const normalized = validateAndNormalizeAnalysis(parsed);

    return {
      status: 200,
      body: normalized,
    };
  } catch (err: unknown) {
    // Log only non-sensitive error metadata (never transcript contents)
    const errMsg = err instanceof Error ? err.message : 'Unknown Gemini API error';
    console.error('[InteractionAnalytics] Gemini request failed:', errMsg);

    if (errMsg.includes('429') || errMsg.toLowerCase().includes('quota') || errMsg.toLowerCase().includes('resource_exhausted')) {
      return {
        status: 429,
        body: {
          error: 'The AI analysis service is temporarily busy due to rate or quota limits. Please wait a moment and try again.',
          code: 'RATE_LIMITED',
        },
      };
    }

    if (errMsg.includes('API_KEY_INVALID') || errMsg.includes('PERMISSION_DENIED') || errMsg.includes('403')) {
      return {
        status: 503,
        body: {
          error: 'Gemini API authentication failed. Please verify the configured GEMINI_API_KEY in Settings > Secrets.',
          code: 'MISSING_CONFIG',
        },
      };
    }

    if (
      errMsg.includes('404') ||
      errMsg.toUpperCase().includes('NOT_FOUND') ||
      errMsg.includes('is not found')
    ) {
      return {
        status: 404,
        body: {
          error: `Configured Gemini model is unavailable or unsupported: ${errMsg}`,
          code: 'API_ERROR',
        },
      };
    }

    if (errMsg.includes('400') || errMsg.toUpperCase().includes('INVALID_ARGUMENT')) {
      return {
        status: 422,
        body: {
          error: `Configured Gemini model rejected the request parameters or schema: ${errMsg}`,
          code: 'API_ERROR',
        },
      };
    }

    return {
      status: 500,
      body: {
        error: `Unable to complete AI analysis right now (${errMsg}).`,
        code: 'API_ERROR',
      },
    };
  }
}
