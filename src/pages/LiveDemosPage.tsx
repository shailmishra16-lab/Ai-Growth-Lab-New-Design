import React from 'react';
import { PORTFOLIO_PROJECTS } from '../data/siteContent';
import { InteriorDesignShowcase } from '../components/InteriorDesignShowcase';
import { InteractionAnalyticsWorkspace } from '../components/InteractionAnalyticsWorkspace';

export const LiveDemosPage: React.FC = () => {
  const interiorProject = PORTFOLIO_PROJECTS[0];

  return (
    <div>
      {/* Header */}
      <section className="bg-[#0B1020] text-white py-16 sm:py-20 border-b border-white/10 studio-grid-dark">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4F8CFF]">
              Live Demonstrations
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Explore Two Working Capabilities Firsthand
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Review our live Interior Design Studio website demonstration and test real customer conversation analysis in the Interaction Analytics Playground.
            </p>
          </div>
        </div>
      </section>

      {/* DEMO 1 — INTERIOR DESIGN WEBSITE */}
      <section className="bg-[#151D32] text-white py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-semibold text-[#4F8CFF] mb-1">
              Demo 01 · Website Development
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Interior Design Website
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              An existing, responsive studio website built to present residential interior services, curated portfolio work, and consultation requests.
            </p>
          </div>

          <InteriorDesignShowcase project={interiorProject} variant="dark" />
        </div>
      </section>

      {/* DEMO 2 — INTERACTION ANALYTICS PLAYGROUND */}
      <section className="bg-[#F5F7FB] text-[#172033] py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-semibold text-[#8B5CF6] mb-1">
              Demo 02 · Gemini Text &amp; Interaction Analytics
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172033]">
              Interaction Analytics Playground
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Paste a customer-agent conversation or load the sample transcript to run structured analysis powered by Gemini via a secure server-side endpoint.
            </p>
          </div>

          <InteractionAnalyticsWorkspace />
        </div>
      </section>
    </div>
  );
};
