import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { PortfolioProject } from '../types';
import { SmartImage } from './SmartImage';

interface InteriorDesignShowcaseProps {
  project: PortfolioProject;
  variant?: 'dark' | 'light';
}

export const InteriorDesignShowcase: React.FC<InteriorDesignShowcaseProps> = ({
  project,
  variant = 'light',
}) => {
  const isDark = variant === 'dark';

  return (
    <div
      className={`rounded-2xl overflow-hidden border transition-colors ${
        isDark
          ? 'bg-[#151D32] border-white/10 text-white'
          : 'bg-white border-slate-200 text-[#172033] shadow-sm'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left: Device Mockup with Actual Website Screenshot */}
        <div
          className={`lg:col-span-7 p-6 sm:p-8 flex items-center justify-center ${
            isDark ? 'bg-[#0B1020]/70' : 'bg-[#EEF2FA]'
          }`}
        >
          <div className="w-full max-w-2xl rounded-xl overflow-hidden border border-slate-700/40 bg-[#151D32] shadow-xl">
            {/* Browser Mockup Chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B1020] border-b border-white/10">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
              </div>
              <div className="px-3 py-1 rounded bg-[#151D32] border border-white/10 text-[11px] font-mono text-slate-300 truncate max-w-[240px] sm:max-w-xs">
                interior-designv11.vercel.app
              </div>
              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                Live Demo
              </span>
            </div>

            {/* Website Viewport Screenshot */}
            <div className="aspect-video w-full overflow-hidden bg-[#F8F5EF]">
              <SmartImage
                src={project.imagePath}
                alt={project.imageAlt}
                className="w-full h-full object-cover object-top"
                fallbackTitle={project.title}
              />
            </div>
          </div>
        </div>

        {/* Right: Project Details & Verified Features */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <p
              className={`text-xs font-medium tracking-wide mb-2 ${
                isDark ? 'text-[#4F8CFF]' : 'text-[#2F6BFF]'
              }`}
            >
              {project.category}
            </p>
            <h3
              className={`text-2xl font-bold tracking-tight mb-3 ${
                isDark ? 'text-white' : 'text-[#172033]'
              }`}
            >
              {project.title}
            </h3>
            <p
              className={`text-[15px] leading-relaxed mb-6 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {project.shortDescription}
            </p>

            <div className="mb-6">
              <h4
                className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Verified Website Features
              </h4>
              <ul className="space-y-2.5">
                {project.verifiedFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm leading-snug">
                    <CheckCircle2
                      className="w-4 h-4 text-[#4F8CFF] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className={isDark ? 'text-slate-200' : 'text-[#172033]'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`pt-5 border-t flex flex-wrap items-center justify-between gap-4 ${
              isDark ? 'border-white/10' : 'border-slate-200'
            }`}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#4F8CFF] hover:bg-[#3A78F0] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F8CFF]"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
            <span
              className={`text-xs font-mono ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Opens in new tab
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
