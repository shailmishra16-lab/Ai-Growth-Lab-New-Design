import React from 'react';
import { ArrowRight, Compass, Cpu, LineChart } from 'lucide-react';
import type { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Dark Header */}
      <section className="bg-[#0B1020] text-white py-16 sm:py-20 border-b border-white/10 studio-grid-dark">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4F8CFF]">
              AI Growth Lab Team
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              About AI Growth Lab
            </h1>
            <p className="text-lg font-medium text-[#8B5CF6]">
              Explore. Build. Automate. Improve.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content (Light Section) */}
      <section className="bg-[#F5F7FB] text-[#172033] py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6 shadow-2xs">
              <p className="text-lg sm:text-xl font-semibold text-[#172033] leading-relaxed">
                We&apos;re passionate about making modern technology practical and accessible for businesses.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                At AI Growth Lab, we continuously explore emerging AI tools, automation technologies and data-driven solutions to simplify everyday work, improve customer experiences and support smarter business decisions.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                We believe meaningful growth comes from combining curiosity, technology and actionable insights.
              </p>

              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-bold text-[#172033]">
                    Explore. Build. Automate. Improve.
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5">
                    AI Growth Lab Team
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4F8CFF] hover:bg-[#3A78F0] text-white text-sm font-semibold transition-colors whitespace-nowrap self-start sm:self-auto"
                >
                  <span>Send an Enquiry</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-[#151D32] text-white border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Compass className="w-5 h-5 text-[#4F8CFF]" aria-hidden="true" />
                  <h2 className="text-base font-bold">Explore &amp; Build</h2>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Creating modern, functional websites and digital experiences tailored to how customers actually interact with your business.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#151D32] text-white border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Cpu className="w-5 h-5 text-[#8B5CF6]" aria-hidden="true" />
                  <h2 className="text-base font-bold">Automate Workflows</h2>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Simplifying routine follow-ups, reminders, and notifications so teams can focus on customer service and delivery.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#151D32] text-white border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <LineChart className="w-5 h-5 text-[#4F8CFF]" aria-hidden="true" />
                  <h2 className="text-base font-bold">Analyze &amp; Improve</h2>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Turning customer conversations and feedback into structured, actionable insights for continuous improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
