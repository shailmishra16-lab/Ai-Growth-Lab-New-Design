import React from 'react';
import {
  ArrowRight,
  Globe,
  Workflow,
  BarChart3,
  Clock,
  MessageCircle,
  Lightbulb,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import heroStudioImg from '../assets/images/hero_ai_studio_1795410883683.jpg';
import { PORTFOLIO_PROJECTS } from '../data/siteContent';
import { SmartImage } from '../components/SmartImage';
import { InteriorDesignShowcase } from '../components/InteriorDesignShowcase';
import type { PageRoute } from '../types';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const featuredProject = PORTFOLIO_PROJECTS[0];

  const capabilities = [
    {
      title: 'BUILD',
      subtitle: 'Professional digital experiences that help businesses connect with customers.',
      icon: Globe,
      accent: 'text-[#4F8CFF]',
      examples: [
        'Business websites',
        'Portfolio websites',
        'Appointment booking',
        'Lead capture',
        'Customer enquiry forms',
      ],
    },
    {
      title: 'AUTOMATE',
      subtitle: 'Reduce repetitive tasks and simplify everyday business operations.',
      icon: Workflow,
      accent: 'text-[#8B5CF6]',
      examples: [
        'WhatsApp automation',
        'Appointment reminders',
        'Lead follow-ups',
        'Status notifications',
        'Workflow automation',
      ],
    },
    {
      title: 'ANALYZE',
      subtitle: 'Turn customer conversations and feedback into actionable insights.',
      icon: BarChart3,
      accent: 'text-[#4F8CFF]',
      examples: [
        'Sentiment analysis',
        'Emotion identification',
        'Customer pain points',
        'Call driver analysis',
        'Business improvement recommendations',
      ],
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Less Manual Work',
      description:
        'Streamline repetitive enquiry handling, reminders, and follow-up workflows so your team spends less time on routine admin.',
    },
    {
      icon: MessageCircle,
      title: 'Better Customer Engagement',
      description:
        'Provide clear service information, responsive booking flows, and timely updates across your website and messaging channels.',
    },
    {
      icon: Lightbulb,
      title: 'Actionable Business Insights',
      description:
        'Surface recurring call drivers, customer pain points, and feedback themes from conversations to guide operational improvements.',
    },
    {
      icon: Sparkles,
      title: 'Smarter Digital Experiences',
      description:
        'Combine clean web design with practical automation and analytics so every digital touchpoint supports real business goals.',
    },
  ];

  return (
    <div>
      {/* SECTION A — HERO (Deep Navy #0B1020) */}
      <section className="bg-[#0B1020] text-white studio-grid-dark border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4F8CFF]">
                Build · Automate · Analyze
              </p>

              <h1 className="text-[36px] sm:text-[46px] lg:text-[52px] font-extrabold tracking-tight leading-[1.1] text-white">
                Smarter Business. Less Manual Work. Better Decisions.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                AI-powered websites, intelligent automation and customer interaction insights designed to simplify operations and support business growth.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/solutions')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4F8CFF] hover:bg-[#3A78F0] text-white text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F8CFF]"
                >
                  <span>Explore Our Solutions</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/live-demos')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 bg-[#151D32] hover:bg-white/10 text-white text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F8CFF]"
                >
                  <span>Try Live Demos</span>
                </button>
              </div>
            </div>

            {/* Visual Composition: Websites · Automation · Analytics */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#151D32] shadow-2xl">
                <div className="aspect-video w-full overflow-hidden">
                  <SmartImage
                    src={heroStudioImg}
                    alt="AI Growth Lab technology studio composition showing website interfaces, automated workflow connections, and customer analytics charts"
                    lazy={false}
                    className="w-full h-full object-cover"
                    fallbackTitle="AI Growth Lab Studio Architecture"
                  />
                </div>
                <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-[#0B1020]/90 text-center">
                  <div className="p-3.5">
                    <p className="text-xs font-semibold text-white">Websites</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Responsive &amp; Booking</p>
                  </div>
                  <div className="p-3.5">
                    <p className="text-xs font-semibold text-white">Automation</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Workflows &amp; Follow-ups</p>
                  </div>
                  <div className="p-3.5">
                    <p className="text-xs font-semibold text-white">Analytics</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Insights &amp; Actions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B — THREE CORE CAPABILITIES (Light #F5F7FB) */}
      <section className="bg-[#F5F7FB] text-[#172033] py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2F6BFF] mb-2">
              Core Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#172033]">
              Practical Digital Solutions Across Three Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <article
                  key={cap.title}
                  className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between shadow-2xs hover:border-[#4F8CFF]/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-xl font-bold tracking-tight text-[#172033]">
                        {cap.title}
                      </h3>
                      <div className="w-10 h-10 rounded-xl bg-[#F5F7FB] border border-slate-200 flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${cap.accent}`} aria-hidden="true" />
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {cap.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-5 border-t border-slate-100 text-sm text-[#172033]">
                    {cap.examples.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2
                          className="w-4 h-4 text-[#4F8CFF] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION C — WHY AI GROWTH LAB? (Crisp White) */}
      <section className="bg-white text-[#172033] py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B5CF6] mb-2">
              Why AI Growth Lab?
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#172033]">
              Focused on Practical Value, Not Complexity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2F6BFF] mb-4">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-[#172033] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION D — FEATURED WEBSITE (Dark Slate #151D32) */}
      <section className="bg-[#151D32] text-white py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4F8CFF] mb-2">
                Featured Website Demonstration
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Built to Showcase Real Business Presence
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/our-work')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-200 hover:text-white transition-colors self-start md:self-auto"
            >
              <span>View Our Work</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <InteriorDesignShowcase project={featuredProject} variant="dark" />
        </div>
      </section>

      {/* SECTION E — FEATURED AI ANALYTICS DEMO PREVIEW (Light #F5F7FB) */}
      <section className="bg-[#F5F7FB] text-[#172033] py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B5CF6] mb-2">
                Featured AI Capability · Illustrative Preview
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#172033]">
                Turn Support Transcripts Into Clear Decisions
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                Below is an illustrative preview of how our Interaction Analytics Playground organizes conversation insights. Open the live playground to test your own transcripts with Gemini.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/live-demos')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B1020] hover:bg-[#151D32] text-white text-sm font-semibold transition-colors whitespace-nowrap self-start lg:self-auto focus-visible:outline-2 focus-visible:outline-[#4F8CFF]"
            >
              <span>Try Interaction Analytics</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-3 bg-[#151D32] text-white flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-[#4F8CFF]">
                Illustrative Preview — Sample Conversation &amp; Indicators
              </span>
              <span className="font-mono text-slate-300">
                Live AI inference runs in the Playground
              </span>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Example Customer Conversation */}
              <div className="lg:col-span-6 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Example Customer Conversation
                </h3>
                <div className="space-y-3 p-4 rounded-xl bg-[#F5F7FB] border border-slate-200 text-sm leading-relaxed">
                  <p>
                    <strong className="text-[#172033]">Customer:</strong>{' '}
                    <span className="text-slate-700">
                      &ldquo;I have called three times about my refund. Every agent tells me it will be processed, but nothing has happened.&rdquo;
                    </span>
                  </p>
                  <p>
                    <strong className="text-[#2F6BFF]">Agent:</strong>{' '}
                    <span className="text-slate-700">
                      &ldquo;I apologize for the inconvenience. Let me check your refund status.&rdquo;
                    </span>
                  </p>
                  <p>
                    <strong className="text-[#172033]">Customer:</strong>{' '}
                    <span className="text-slate-700">
                      &ldquo;I am frustrated because nobody is giving me a clear resolution.&rdquo;
                    </span>
                  </p>
                </div>
              </div>

              {/* Illustrative Indicators Preview */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F5F7FB] border border-slate-200">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Sample Sentiment
                  </p>
                  <p className="text-base font-bold text-rose-700">Negative</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Emotions: Frustration, Impatience
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F5F7FB] border border-slate-200">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Sample Call Driver
                  </p>
                  <p className="text-base font-bold text-[#172033]">
                    Delayed Refund Status
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Secondary: Repeat Contact
                  </p>
                </div>

                <div className="sm:col-span-2 p-4 rounded-xl bg-[#0B1020] text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#4F8CFF] mb-1.5">
                    Recommended Action Preview
                  </p>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Provide a clear refund timeline with a confirmed reference number, and flag repeated refund follow-up tickets for proactive status updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F — FINAL CTA (Deep Navy #0B1020) */}
      <section className="bg-[#0B1020] text-white py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Have a business challenge? Let&apos;s explore a smarter solution.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Share your requirements for a business website, workflow automation, or customer interaction analytics, and our team will respond with practical next steps.
            </p>
            <div>
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#4F8CFF] hover:bg-[#3A78F0] text-white text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F8CFF]"
              >
                <span>Send an Enquiry</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
