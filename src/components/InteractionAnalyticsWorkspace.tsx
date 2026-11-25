import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  FileText,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  Minus,
  HelpCircle,
  Loader2,
  ClipboardList,
} from 'lucide-react';
import { SAMPLE_CONVERSATION_TRANSCRIPT } from '../data/siteContent';
import type {
  FcrIndication,
  FollowUpRequired,
  InteractionAnalysisResult,
  InteractionApiError,
  RepeatContactStatus,
  ResolutionStatus,
  SentimentLabel,
} from '../types';

const MAX_LENGTH = 8000;
const MIN_LENGTH = 20;

function ResolutionStatusBadge({ status }: { status: ResolutionStatus }) {
  const styles: Record<
    ResolutionStatus,
    { bg: string; border: string; text: string; Icon: React.ElementType }
  > = {
    'Fully Resolved': {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-700',
      Icon: CheckCircle2,
    },
    'Partially Resolved': {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-800',
      Icon: AlertCircle,
    },
    Unresolved: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      text: 'text-rose-700',
      Icon: AlertCircle,
    },
    'Not Determined': {
      bg: 'bg-slate-500/10',
      border: 'border-slate-500/30',
      text: 'text-slate-700',
      Icon: HelpCircle,
    },
  };

  const config = styles[status] || styles['Not Determined'];
  const Icon = config.Icon;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold ${config.bg} ${config.border} ${config.text}`}
    >
      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>{status}</span>
    </div>
  );
}

function IndicatorBadge({
  value,
  positiveWhenYes,
}: {
  value: FcrIndication | FollowUpRequired;
  positiveWhenYes: boolean;
}) {
  const yesStyle = positiveWhenYes
    ? {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        text: 'text-emerald-700',
        Icon: CheckCircle2,
      }
    : {
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        text: 'text-amber-800',
        Icon: AlertCircle,
      };

  const noStyle = positiveWhenYes
    ? {
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/30',
        text: 'text-rose-700',
        Icon: AlertCircle,
      }
    : {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        text: 'text-emerald-700',
        Icon: CheckCircle2,
      };

  const neutralStyle = {
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    text: 'text-slate-700',
    Icon: HelpCircle,
  };

  const config =
    value === 'Yes' ? yesStyle : value === 'No' ? noStyle : neutralStyle;
  const Icon = config.Icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${config.bg} ${config.border} ${config.text}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{value}</span>
    </div>
  );
}

function RepeatContactBadge({ status }: { status: RepeatContactStatus }) {
  const styles: Record<
    RepeatContactStatus,
    { bg: string; border: string; text: string; Icon: React.ElementType }
  > = {
    Yes: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-800',
      Icon: AlertCircle,
    },
    No: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-700',
      Icon: CheckCircle2,
    },
    'Not Determined': {
      bg: 'bg-slate-500/10',
      border: 'border-slate-500/30',
      text: 'text-slate-700',
      Icon: HelpCircle,
    },
  };

  const config = styles[status] || styles['Not Determined'];
  const Icon = config.Icon;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold ${config.bg} ${config.border} ${config.text}`}
    >
      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>{status}</span>
    </div>
  );
}

function SentimentBadge({ sentiment }: { sentiment: SentimentLabel }) {
  const styles: Record<
    SentimentLabel,
    { bg: string; border: string; text: string; Icon: React.ElementType }
  > = {
    Positive: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-700',
      Icon: TrendingUp,
    },
    Neutral: {
      bg: 'bg-slate-500/10',
      border: 'border-slate-500/30',
      text: 'text-slate-700',
      Icon: Minus,
    },
    Mixed: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-800',
      Icon: AlertCircle,
    },
    Negative: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      text: 'text-rose-700',
      Icon: TrendingDown,
    },
    'Cannot Be Determined': {
      bg: 'bg-slate-500/10',
      border: 'border-slate-500/30',
      text: 'text-slate-700',
      Icon: HelpCircle,
    },
  };

  const config = styles[sentiment] || styles['Cannot Be Determined'];
  const Icon = config.Icon;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold ${config.bg} ${config.border} ${config.text}`}
    >
      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>{sentiment}</span>
    </div>
  );
}

export const InteractionAnalyticsWorkspace: React.FC = () => {
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<InteractionAnalysisResult | null>(null);
  const [apiError, setApiError] = useState<InteractionApiError | null>(null);

  const handleLoadSample = () => {
    setTranscript(SAMPLE_CONVERSATION_TRANSCRIPT);
    setApiError(null);
  };

  const handleReset = () => {
    setTranscript('');
    setAnalysis(null);
    setApiError(null);
  };

  const handleAnalyze = async () => {
    const trimmed = transcript.trim();
    if (trimmed.length < MIN_LENGTH) {
      setApiError({
        error: `Please enter at least ${MIN_LENGTH} characters of conversation text before running analysis.`,
        code: 'VALIDATION_ERROR',
      });
      return;
    }

    if (trimmed.length > MAX_LENGTH) {
      setApiError({
        error: `Transcript exceeds ${MAX_LENGTH.toLocaleString()} characters. Please shorten the text and try again.`,
        code: 'VALIDATION_ERROR',
      });
      return;
    }

    setIsLoading(true);
    setApiError(null);
    setAnalysis(null);

    try {
      const response = await fetch('/api/gemini/analyze-interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: trimmed }),
      });

      const data = await response.json();
      if (!response.ok) {
        setApiError({
          error: data.error || 'Unable to analyze transcript right now.',
          code: data.code || 'API_ERROR',
          setupHint: data.setupHint,
        });
        return;
      }

      setAnalysis(data as InteractionAnalysisResult);
    } catch {
      setApiError({
        error: 'Network error while reaching the analytics endpoint. Please check your connection and try again.',
        code: 'API_ERROR',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="analytics-playground"
      className="rounded-2xl border border-slate-200 bg-white text-[#172033] shadow-sm overflow-hidden"
    >
      {/* Workspace Header */}
      <div className="px-6 py-5 bg-[#0B1020] text-white border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-[#4F8CFF] mb-1">
            Live Gemini Text Analysis · Structured JSON Output
          </p>
          <h3 className="text-xl font-bold tracking-tight">
            Interaction Analytics Playground
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-300">
          Text-based transcript analysis
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Privacy Notice */}
        <div
          role="note"
          className="flex items-start gap-3 p-4 rounded-xl bg-[#F5F7FB] border border-slate-200 text-sm text-slate-700"
        >
          <ShieldAlert className="w-5 h-5 text-[#4F8CFF] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold text-[#172033]">
              Privacy Notice — Please Do Not Enter Confidential or Personal Data
            </p>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Do not paste personally identifiable information (names, phone numbers, emails, account IDs, or payment details). Submitted transcripts are processed strictly for live analysis and are not permanently stored by default.
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <label
              htmlFor="interaction-transcript-input"
              className="text-sm font-semibold text-[#172033]"
            >
              Customer-Agent Conversation or Transcript
            </label>
            <span className="text-xs font-mono text-slate-500 tabular-nums">
              {transcript.length.toLocaleString()} / {MAX_LENGTH.toLocaleString()} characters
            </span>
          </div>

          <textarea
            id="interaction-transcript-input"
            rows={7}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            maxLength={MAX_LENGTH}
            placeholder="Paste a customer-agent conversation or transcript here, or click 'Load Sample Conversation' to test with an example..."
            className="w-full rounded-xl border border-slate-300 bg-[#F5F7FB] focus:bg-white p-4 text-sm text-[#172033] placeholder:text-slate-500 leading-relaxed focus:border-[#4F8CFF] focus:outline-hidden transition-colors"
          />

          {/* Action Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleLoadSample}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-[#F5F7FB] text-sm font-semibold text-[#172033] transition-colors disabled:opacity-50 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#4F8CFF]"
              >
                <FileText className="w-4 h-4 text-[#4F8CFF]" aria-hidden="true" />
                <span>Load Sample Conversation</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={isLoading || (!transcript && !analysis && !apiError)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium text-slate-600 transition-colors disabled:opacity-40 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#4F8CFF]"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Clear / Reset</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isLoading || !transcript.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4F8CFF] hover:bg-[#3A78F0] text-white text-sm font-semibold transition-colors disabled:opacity-50 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F8CFF]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Analyzing Transcript...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" aria-hidden="true" />
                  <span>Analyze Interaction</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="p-8 rounded-xl bg-[#F5F7FB] border border-slate-200 flex flex-col items-center justify-center text-center"
          >
            <Loader2 className="w-8 h-8 text-[#4F8CFF] animate-spin mb-3" aria-hidden="true" />
            <p className="text-sm font-semibold text-[#172033]">
              Analyzing submitted conversation text via Gemini API...
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Extracting summary, sentiment, call drivers, pain points, and recommended actions.
            </p>
          </div>
        )}

        {/* Unavailable / Error State */}
        {!isLoading && apiError && (
          <div
            role="alert"
            className="p-5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="text-sm font-bold">
                  {apiError.code === 'MISSING_CONFIG'
                    ? 'Gemini Live Analysis Unavailable'
                    : 'Analysis Could Not Be Completed'}
                </h4>
                <p className="text-sm text-rose-800 mt-1">{apiError.error}</p>
                {apiError.setupHint && (
                  <p className="text-xs font-mono text-rose-700 mt-2 bg-white/80 p-2.5 rounded-lg border border-rose-200">
                    Configuration: {apiError.setupHint}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty State before first analysis */}
        {!isLoading && !apiError && !analysis && (
          <div className="p-8 rounded-xl border border-dashed border-slate-300 bg-[#F5F7FB]/60 text-center">
            <ClipboardList className="w-7 h-7 text-slate-400 mx-auto mb-2.5" aria-hidden="true" />
            <p className="text-sm font-semibold text-[#172033]">
              Ready for Live Transcript Analysis
            </p>
            <p className="text-xs text-slate-600 mt-1 max-w-lg mx-auto leading-relaxed">
              Paste any customer conversation above or load the sample conversation, then click <strong className="text-[#172033]">Analyze Interaction</strong> to view structured Gemini insights.
            </p>
          </div>
        )}

        {/* Structured Results Dashboard */}
        {!isLoading && analysis && (
          <div className="space-y-6 pt-2 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-base font-bold text-[#172033]">
                Live AI Analysis Results
              </h4>
              <span className="text-xs font-mono text-slate-500">
                Generated from submitted text transcript
              </span>
            </div>

            {/* 1. Interaction Summary & 2. Sentiment & 3. Emotions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-7 p-5 rounded-xl bg-[#F5F7FB] border border-slate-200">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  1. Interaction Summary
                </h5>
                <p className="text-sm text-[#172033] leading-relaxed">
                  {analysis.interactionSummary}
                </p>
              </div>

              <div className="lg:col-span-5 p-5 rounded-xl bg-[#F5F7FB] border border-slate-200 space-y-4">
                <div>
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    2. Overall Customer Sentiment
                  </h5>
                  <SentimentBadge sentiment={analysis.overallCustomerSentiment} />
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {analysis.sentimentExplanation}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    3. Customer Emotions
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.customerEmotions.map((emotion, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-[#172033]"
                      >
                        {emotion}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Primary Call Driver & 5. Secondary Call Drivers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-xl bg-white border border-slate-200">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-[#2F6BFF] mb-2">
                  4. Primary Call Driver
                </h5>
                <p className="text-base font-semibold text-[#172033]">
                  {analysis.primaryCallDriver}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  5. Secondary Call Drivers
                </h5>
                <ul className="space-y-1.5 text-sm text-[#172033]">
                  {analysis.secondaryCallDrivers.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#8B5CF6] font-bold" aria-hidden="true">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 6. Pain Points, 7. Complaint Indicators, 8. Escalation Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-xl bg-white border border-slate-200">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  6. Customer Pain Points
                </h5>
                <ul className="space-y-2 text-sm text-[#172033]">
                  {analysis.customerPainPoints.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#4F8CFF] font-bold" aria-hidden="true">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  7. Complaint Indicators
                </h5>
                <ul className="space-y-2 text-sm text-[#172033]">
                  {analysis.complaintIndicators.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold" aria-hidden="true">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  8. Escalation Indicators
                </h5>
                <ul className="space-y-2 text-sm text-[#172033]">
                  {analysis.escalationIndicators.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold" aria-hidden="true">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Dedicated Repeat Contact Analysis Card */}
            {(() => {
              const repeat = analysis.repeatContactAnalysis || {
                status: 'Not Determined' as RepeatContactStatus,
                reasons: ['Not Determined'],
                supportingStatement:
                  'Insufficient information in the submitted transcript.',
                reportedContactCount: null,
              };
              const repeatReasons =
                repeat.status === 'No'
                  ? ['Not Applicable']
                  : repeat.status === 'Not Determined'
                  ? ['Not Determined']
                  : Array.isArray(repeat.reasons) && repeat.reasons.length > 0
                  ? repeat.reasons.slice(0, 2)
                  : ['Repeat contact indicated in the submitted transcript.'];

              return (
                <div className="p-5 rounded-xl bg-[#F5F7FB] border border-slate-200 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Repeat Contact Analysis
                    </h5>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <RepeatContactBadge status={repeat.status} />
                      {repeat.reportedContactCount && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-[#172033]">
                          <span className="text-slate-500 font-medium">
                            Reported Contact Count:
                          </span>
                          <span>{repeat.reportedContactCount}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-white border border-slate-200">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        Repeat Reasons
                      </p>
                      <ul className="space-y-1.5 text-sm text-[#172033]">
                        {repeatReasons.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span
                              className={`font-bold ${
                                repeat.status === 'Yes'
                                  ? 'text-amber-600'
                                  : repeat.status === 'No'
                                  ? 'text-emerald-600'
                                  : 'text-slate-400'
                              }`}
                              aria-hidden="true"
                            >
                              ·
                            </span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-white border border-slate-200">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        Supporting Transcript Evidence
                      </p>
                      <p className="text-sm text-[#172033] leading-relaxed italic">
                        &ldquo;
                        {repeat.supportingStatement ||
                          'No supporting statement available.'}
                        &rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Dedicated Resolution & FCR Analysis Card */}
            {(() => {
              const resolution = analysis.resolutionFcrAnalysis || {
                resolutionStatus: 'Not Determined' as ResolutionStatus,
                fcrIndication: 'Not Determined' as FcrIndication,
                followUpRequired: 'Not Determined' as FollowUpRequired,
                resolutionGaps: [
                  'Insufficient evidence in the submitted transcript.',
                ],
                supportingEvidence:
                  'Insufficient information in the submitted transcript.',
              };
              const gaps =
                Array.isArray(resolution.resolutionGaps) &&
                resolution.resolutionGaps.length > 0
                  ? resolution.resolutionGaps.slice(0, 2)
                  : ['Insufficient evidence to determine resolution gaps.'];

              return (
                <div className="p-5 rounded-xl bg-[#F5F7FB] border border-slate-200 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Resolution &amp; FCR Analysis
                      </h5>
                      <p className="text-xs text-slate-500 mt-1">
                        Transcript-based indication only — not a verified operational FCR metric.
                      </p>
                    </div>
                    <ResolutionStatusBadge status={resolution.resolutionStatus} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-[#172033]">
                          FCR Indication
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Transcript-based assessment
                        </p>
                      </div>
                      <IndicatorBadge
                        value={resolution.fcrIndication}
                        positiveWhenYes={true}
                      />
                    </div>

                    <div className="p-3.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-[#172033]">
                          Follow-up Required
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Pending actions or outreach
                        </p>
                      </div>
                      <IndicatorBadge
                        value={resolution.followUpRequired}
                        positiveWhenYes={false}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-white border border-slate-200">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        Resolution Gap
                      </p>
                      <ul className="space-y-1.5 text-sm text-[#172033]">
                        {gaps.map((gap, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span
                              className={`font-bold ${
                                resolution.resolutionStatus === 'Fully Resolved'
                                  ? 'text-emerald-600'
                                  : resolution.resolutionStatus === 'Unresolved'
                                  ? 'text-rose-600'
                                  : resolution.resolutionStatus ===
                                    'Partially Resolved'
                                  ? 'text-amber-600'
                                  : 'text-slate-400'
                              }`}
                              aria-hidden="true"
                            >
                              ·
                            </span>
                            <span>{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-white border border-slate-200">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        Supporting Evidence
                      </p>
                      <p className="text-sm text-[#172033] leading-relaxed italic">
                        &ldquo;
                        {resolution.supportingEvidence ||
                          'No supporting statement available.'}
                        &rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* 9. Agent Behavior Observations & 10. Recommended Corrective Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="p-5 rounded-xl bg-[#F5F7FB] border border-slate-200">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  9. Agent Behavior Observations
                </h5>
                <ul className="space-y-2 text-sm text-[#172033]">
                  {analysis.agentBehaviorObservations.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#4F8CFF] font-bold" aria-hidden="true">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-[#0B1020] text-white border border-[#4F8CFF]/30">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-[#4F8CFF] mb-3">
                  10. Recommended Corrective Actions
                </h5>
                <ul className="space-y-2.5 text-sm text-slate-200">
                  {analysis.recommendedCorrectiveActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 text-[#4F8CFF] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Evidence / Scope Note */}
            <p className="text-xs text-slate-500 border-t border-slate-200 pt-4">
              <strong className="text-slate-700">Scope &amp; Evidence Note:</strong>{' '}
              {analysis.evidenceLimitations}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
