import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ILLUSTRATIVE_CASE_STUDIES, PORTFOLIO_PROJECTS } from '../data/siteContent';
import { InteriorDesignShowcase } from '../components/InteriorDesignShowcase';
import type { PageRoute } from '../types';

interface OurWorkPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const OurWorkPage: React.FC<OurWorkPageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Header */}
      <section className="bg-[#0B1020] text-white py-16 sm:py-20 border-b border-white/10 studio-grid-dark">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4F8CFF]">
              Our Work
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Website Portfolio &amp; Illustrative Analytics Case Studies
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Review our live website build alongside three clearly labelled illustrative case studies showing how customer interaction analytics surfaces operational improvements.
            </p>
          </div>
        </div>
      </section>

      {/* Section A: Website Development Portfolio */}
      <section className="bg-[#F5F7FB] text-[#172033] py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2F6BFF] mb-2">
              Section A · Website Development Portfolio
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033]">
              Live Website Showcase
            </h2>
          </div>

          <div className="space-y-8">
            {PORTFOLIO_PROJECTS.map((project) => (
              <InteriorDesignShowcase
                key={project.id}
                project={project}
                variant="light"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section B: Interaction Analytics Case Studies (3 Illustrative Case Studies) */}
      <section className="bg-[#151D32] text-white py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B5CF6] mb-2">
                Section B · Interaction Analytics Case Studies
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                How Conversation Insights Guide Smarter Decisions
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
                Each example below uses fictional sample interactions to illustrate how conversation analytics works in practice.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/live-demos')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#4F8CFF] hover:bg-[#3A78F0] text-white text-sm font-semibold transition-colors whitespace-nowrap self-start md:self-auto"
            >
              <span>Try Live Playground</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-8">
            {ILLUSTRATIVE_CASE_STUDIES.map((cs) => (
              <article
                key={cs.id}
                className="rounded-2xl bg-[#0B1020] border border-white/10 p-6 sm:p-8 space-y-6"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-[#4F8CFF]">
                      {cs.sector} · {cs.badge}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {cs.title}
                    </h3>
                  </div>
                </div>

                {/* Challenge + Sample Interaction + Visual Dashboard Snapshot */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Challenge & Sample Interaction */}
                  <div className="lg:col-span-6 space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Business Challenge
                      </h4>
                      <p className="text-sm text-slate-200 leading-relaxed">
                        {cs.businessChallenge}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#151D32] border border-white/10 space-y-2.5">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4F8CFF]">
                        Fictional Sample Interaction
                      </h4>
                      {cs.sampleInteraction.map((turn, idx) => (
                        <p key={idx} className="text-sm leading-relaxed text-slate-200">
                          <strong className="text-white">{turn.speaker}:</strong>{' '}
                          <span className="text-slate-300">&ldquo;{turn.text}&rdquo;</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Right: Illustrative Visual Dashboard + Findings */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="p-4 rounded-xl bg-[#151D32] border border-white/10">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                        Illustrative Analytics Dashboard (Sample Data)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="p-3 rounded-lg bg-[#0B1020] border border-white/10">
                          <span className="text-xs text-slate-400 block">
                            Sample Sentiment
                          </span>
                          <span className="font-semibold text-white mt-0.5 block">
                            {cs.dashboardSnapshot.sentiment}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#0B1020] border border-white/10">
                          <span className="text-xs text-slate-400 block">
                            Primary Driver
                          </span>
                          <span className="font-semibold text-white mt-0.5 block">
                            {cs.dashboardSnapshot.primaryDriver}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#0B1020] border border-white/10">
                          <span className="text-xs text-slate-400 block">
                            Key Signal
                          </span>
                          <span className="font-semibold text-slate-200 mt-0.5 block">
                            {cs.dashboardSnapshot.keyIndicator}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#0B1020] border border-white/10">
                          <span className="text-xs text-slate-400 block">
                            Emotion Cues
                          </span>
                          <span className="font-semibold text-slate-200 mt-0.5 block">
                            {cs.dashboardSnapshot.emotions.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#151D32]/60 border border-white/10">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                          Illustrative Findings
                        </h4>
                        <ul className="space-y-1.5 text-sm text-slate-300">
                          {cs.illustrativeAnalytics.map((finding) => (
                            <li key={finding} className="flex items-start gap-2">
                              <span className="text-[#8B5CF6] font-bold" aria-hidden="true">·</span>
                              <span>{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-[#151D32]/60 border border-[#4F8CFF]/25">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4F8CFF] mb-2.5">
                          Recommended Actions
                        </h4>
                        <ul className="space-y-1.5 text-sm text-slate-200">
                          {cs.recommendedActions.map((act) => (
                            <li key={act} className="flex items-start gap-2">
                              <CheckCircle2
                                className="w-4 h-4 text-[#4F8CFF] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
