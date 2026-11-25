import React from 'react';
import { ArrowRight, CheckCircle2, ExternalLink, Info } from 'lucide-react';
import { SOLUTIONS_DATA } from '../data/siteContent';
import { SmartImage } from '../components/SmartImage';
import type { PageRoute, ServiceOption } from '../types';

interface SolutionsPageProps {
  onNavigate: (route: PageRoute, preselectedService?: ServiceOption) => void;
}

const SERVICE_MAP: Record<string, ServiceOption> = {
  'website-development': 'Website Development',
  'business-automation': 'Business Automation',
  'interaction-text-analytics': 'Interaction & Text Analytics',
  'ai-assistants-business-insights': 'AI Assistant',
};

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-[#0B1020] text-white py-16 sm:py-20 border-b border-white/10 studio-grid-dark">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4F8CFF]">
              Solutions
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Practical Technology Across Four Core Capabilities
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              From responsive websites to workflow automation, interaction analytics, and structured assistants—every solution is designed around clear business outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Four Solution Categories */}
      <div>
        {SOLUTIONS_DATA.map((solution, index) => {
          const isDark = index % 2 === 1;
          const mappedService = SERVICE_MAP[solution.id] || 'Other / Not Sure';

          return (
            <section
              key={solution.id}
              id={solution.id}
              className={`py-16 sm:py-20 border-b ${
                isDark
                  ? 'bg-[#151D32] text-white border-white/10'
                  : 'bg-[#F5F7FB] text-[#172033] border-slate-200'
              }`}
            >
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-5 ${
                      index % 2 === 1 ? 'lg:order-2' : ''
                    }`}
                  >
                    <div
                      className={`rounded-2xl overflow-hidden border shadow-sm ${
                        isDark
                          ? 'border-white/10 bg-[#0B1020]'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="aspect-4/3 w-full overflow-hidden">
                        <SmartImage
                          src={solution.imagePath}
                          alt={solution.imageAlt}
                          className="w-full h-full object-cover"
                          fallbackTitle={solution.title}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-7 space-y-6 ${
                      index % 2 === 1 ? 'lg:order-1' : ''
                    }`}
                  >
                    <div>
                      <p className="text-xs font-mono font-semibold text-[#4F8CFF] mb-1">
                        {solution.number}. Solution Category
                      </p>
                      <h2
                        className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                          isDark ? 'text-white' : 'text-[#172033]'
                        }`}
                      >
                        {solution.title}
                      </h2>
                      <p
                        className={`text-base leading-relaxed mt-3 ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {solution.summary}
                      </p>
                    </div>

                    {/* Business Benefit */}
                    <div
                      className={`p-4 rounded-xl border ${
                        isDark
                          ? 'bg-[#0B1020]/70 border-white/10'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <h3
                        className={`text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                          isDark ? 'text-[#4F8CFF]' : 'text-[#2F6BFF]'
                        }`}
                      >
                        Business Benefit
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          isDark ? 'text-slate-200' : 'text-[#172033]'
                        }`}
                      >
                        {solution.businessBenefit}
                      </p>
                    </div>

                    {/* Services & Use Cases */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h3
                          className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          Included Capabilities
                        </h3>
                        <ul className="space-y-2">
                          {solution.services.map((srv) => (
                            <li
                              key={srv}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle2
                                className="w-4 h-4 text-[#4F8CFF] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span
                                className={
                                  isDark ? 'text-slate-200' : 'text-[#172033]'
                                }
                              >
                                {srv}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3
                          className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          Relevant Use Cases
                        </h3>
                        <ul className="space-y-2.5 text-sm leading-relaxed">
                          {solution.useCases.map((uc) => (
                            <li
                              key={uc}
                              className={`flex items-start gap-2 ${
                                isDark ? 'text-slate-300' : 'text-slate-600'
                              }`}
                            >
                              <span
                                className="text-[#8B5CF6] font-bold"
                                aria-hidden="true"
                              >
                                ·
                              </span>
                              <span>{uc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Implementation / Scope Clarification where required */}
                    {solution.disclaimer && (
                      <div
                        className={`flex items-start gap-2.5 p-3.5 rounded-xl border text-xs leading-relaxed ${
                          isDark
                            ? 'bg-white/5 border-white/10 text-slate-300'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <Info
                          className="w-4 h-4 text-[#4F8CFF] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{solution.disclaimer}</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => onNavigate('/contact', mappedService)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4F8CFF] hover:bg-[#3A78F0] text-white text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#4F8CFF]"
                      >
                        <span>{solution.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>

                      {solution.relatedLink &&
                        (solution.relatedLink.external ? (
                          <a
                            href={solution.relatedLink.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors whitespace-nowrap ${
                              isDark
                                ? 'border-white/20 text-white hover:bg-white/10'
                                : 'border-slate-300 bg-white text-[#172033] hover:bg-slate-50'
                            }`}
                          >
                            <span>{solution.relatedLink.label}</span>
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onNavigate('/live-demos')}
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors whitespace-nowrap ${
                              isDark
                                ? 'border-white/20 text-white hover:bg-white/10'
                                : 'border-slate-300 bg-white text-[#172033] hover:bg-slate-50'
                            }`}
                          >
                            <span>{solution.relatedLink.label}</span>
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
