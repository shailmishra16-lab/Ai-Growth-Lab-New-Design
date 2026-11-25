import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import type { ContactApiResponse, PageRoute, ServiceOption } from '../types';

interface ContactPageProps {
  initialService?: ServiceOption;
  onNavigate: (route: PageRoute) => void;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  'Website Development',
  'Business Automation',
  'Interaction & Text Analytics',
  'AI Assistant',
  'Other / Not Sure',
];

export const ContactPage: React.FC<ContactPageProps> = ({
  initialService,
  onNavigate,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [serviceRequired, setServiceRequired] = useState<ServiceOption>(
    initialService || 'Website Development'
  );
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Hidden spam honeypot

  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<ContactApiResponse | null>(null);
  const [errorData, setErrorData] = useState<ContactApiResponse | null>(null);

  useEffect(() => {
    if (initialService) {
      setServiceRequired(initialService);
    }
  }, [initialService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorData(null);
    setSuccessData(null);

    if (fullName.trim().length < 2) {
      setErrorData({ error: 'Please enter your full name.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorData({ error: 'Please enter a valid email address.' });
      return;
    }
    if (message.trim().length < 10) {
      setErrorData({
        error: 'Please enter at least 10 characters describing your requirements.',
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          businessName: businessName.trim(),
          serviceRequired,
          message: message.trim(),
          website,
        }),
      });

      const rawText = await response.text();
      let data: ContactApiResponse | null = null;
      try {
        data = rawText ? (JSON.parse(rawText) as ContactApiResponse) : null;
      } catch {
        data = null;
      }

      if (!data) {
        setErrorData({
          error: `Unexpected server response (HTTP ${response.status}). The /api/contact endpoint did not return JSON. Please try again or email team.aigrowthlab@gmail.com directly.`,
          code: 'DELIVERY_FAILED',
        });
        return;
      }

      if (!response.ok || data.success !== true || !data.messageId) {
        setErrorData({
          error: data.error || 'Unable to deliver your enquiry right now.',
          code: data.code,
          missingEnvVars: data.missingEnvVars,
          setupInstructions: data.setupInstructions,
        });
        return;
      }

      setSuccessData(data);
      setFullName('');
      setEmail('');
      setBusinessName('');
      setMessage('');
    } catch {
      setErrorData({
        error: 'Network error while submitting your enquiry. Please check your connection or email team.aigrowthlab@gmail.com directly.',
        code: 'DELIVERY_FAILED',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-[#0B1020] text-white py-16 sm:py-20 border-b border-white/10 studio-grid-dark">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4F8CFF]">
              Contact &amp; Enquiry
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Tell Us What You Would Like to Build or Automate
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Send your project details through the enquiry form below or write directly to{' '}
              <a
                href="mailto:team.aigrowthlab@gmail.com"
                className="text-[#4F8CFF] underline underline-offset-4 hover:text-white"
              >
                team.aigrowthlab@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-[#F5F7FB] text-[#172033] py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Guidance Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#151D32] text-white rounded-2xl p-7 border border-white/10 space-y-5">
                <h2 className="text-xl font-bold">AI Growth Lab Team</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Whether you need a business website, workflow automation, or customer interaction analytics, share your context and we will follow up via email.
                </p>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Contact Email
                  </p>
                  <a
                    href="mailto:team.aigrowthlab@gmail.com"
                    className="inline-flex items-center gap-2.5 text-sm font-semibold text-white hover:text-[#4F8CFF] transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 text-[#4F8CFF] shrink-0" aria-hidden="true" />
                    <span>team.aigrowthlab@gmail.com</span>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
                <h3 className="text-sm font-bold text-[#172033]">
                  Want to test our capabilities first?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Visit Live Demos to view our Interior Design website showcase or run a transcript through the Gemini Interaction Analytics Playground.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('/live-demos')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2F6BFF] hover:underline"
                >
                  <span>Explore Live Demos</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              {successData ? (
                <div role="status" className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#172033]">
                    Enquiry Delivered
                  </h2>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    {successData.message} A notification has been sent to{' '}
                    <strong className="text-[#172033]">
                      {successData.recipient || 'team.aigrowthlab@gmail.com'}
                    </strong>
                    .
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSuccessData(null)}
                      className="px-5 py-2.5 rounded-lg bg-[#4F8CFF] hover:bg-[#3A78F0] text-white text-sm font-semibold transition-colors"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <h2 className="text-xl font-bold text-[#172033]">
                      Send an Enquiry
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Fields marked with * are required.
                    </p>
                  </div>

                  {errorData && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1.5"
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertCircle
                          className="w-5 h-5 text-rose-600 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="text-sm font-semibold">{errorData.error}</p>
                          {errorData.setupInstructions && (
                            <p className="text-xs font-mono text-rose-700 mt-2 bg-white/80 p-2.5 rounded-lg border border-rose-200">
                              Setup: {errorData.setupInstructions}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Honeypot field hidden from human visitors */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="enquiry-website">Website</label>
                    <input
                      id="enquiry-website"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="enquiry-full-name"
                        className="block text-sm font-semibold text-[#172033] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="enquiry-full-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full rounded-lg border border-slate-300 bg-[#F5F7FB] focus:bg-white px-3.5 py-2.5 text-sm text-[#172033] focus:border-[#4F8CFF] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-email"
                        className="block text-sm font-semibold text-[#172033] mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="enquiry-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full rounded-lg border border-slate-300 bg-[#F5F7FB] focus:bg-white px-3.5 py-2.5 text-sm text-[#172033] focus:border-[#4F8CFF] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="enquiry-business"
                        className="block text-sm font-semibold text-[#172033] mb-1.5"
                      >
                        Business Name <span className="font-normal text-slate-500">(Optional)</span>
                      </label>
                      <input
                        id="enquiry-business"
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Your business or organization"
                        className="w-full rounded-lg border border-slate-300 bg-[#F5F7FB] focus:bg-white px-3.5 py-2.5 text-sm text-[#172033] focus:border-[#4F8CFF] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-service"
                        className="block text-sm font-semibold text-[#172033] mb-1.5"
                      >
                        Service Required *
                      </label>
                      <select
                        id="enquiry-service"
                        required
                        value={serviceRequired}
                        onChange={(e) =>
                          setServiceRequired(e.target.value as ServiceOption)
                        }
                        className="w-full rounded-lg border border-slate-300 bg-[#F5F7FB] focus:bg-white px-3.5 py-2.5 text-sm text-[#172033] focus:border-[#4F8CFF] focus:outline-hidden"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-message"
                      className="block text-sm font-semibold text-[#172033] mb-1.5"
                    >
                      Requirements / Message *
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe your goals, timeline, or the business workflow you want to improve..."
                      className="w-full rounded-lg border border-slate-300 bg-[#F5F7FB] focus:bg-white px-3.5 py-2.5 text-sm text-[#172033] leading-relaxed focus:border-[#4F8CFF] focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#4F8CFF] hover:bg-[#3A78F0] disabled:opacity-50 text-white text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F8CFF]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        <span>Sending Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
