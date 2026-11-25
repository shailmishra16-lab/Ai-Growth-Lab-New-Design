import React from 'react';
import { Layers, Mail, ArrowUp } from 'lucide-react';
import type { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent, route: PageRoute) => {
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <footer className="bg-[#0B1020] text-white border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="inline-flex items-center gap-2.5 text-white font-bold text-lg tracking-tight"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] flex items-center justify-center text-white shrink-0">
                <Layers className="w-4 h-4" aria-hidden="true" />
              </span>
              <span>AI Growth Lab</span>
            </a>
            <p className="text-sm font-semibold tracking-wide text-[#4F8CFF]">
              Build. Automate. Analyze.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Practical websites, workflow automation, and customer interaction analytics designed to simplify operations and support smarter business decisions.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Explore
            </h2>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm text-slate-300">
              <li>
                <a
                  href="/solutions"
                  onClick={(e) => handleLink(e, '/solutions')}
                  className="hover:text-white transition-colors"
                >
                  Solutions
                </a>
              </li>
              <li>
                <a
                  href="/live-demos"
                  onClick={(e) => handleLink(e, '/live-demos')}
                  className="hover:text-white transition-colors"
                >
                  Live Demos
                </a>
              </li>
              <li>
                <a
                  href="/our-work"
                  onClick={(e) => handleLink(e, '/our-work')}
                  className="hover:text-white transition-colors"
                >
                  Our Work
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLink(e, '/about')}
                  className="hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  onClick={(e) => handleLink(e, '/privacy-policy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-3 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Contact
            </h2>
            <a
              href="mailto:team.aigrowthlab@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-[#4F8CFF] transition-colors break-all"
            >
              <Mail className="w-4 h-4 text-[#4F8CFF] shrink-0" aria-hidden="true" />
              <span>team.aigrowthlab@gmail.com</span>
            </a>
            <div>
              <a
                href="/contact"
                onClick={(e) => handleLink(e, '/contact')}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#151D32] hover:bg-white/10 border border-white/15 text-sm font-medium text-white transition-colors"
              >
                Send an Enquiry
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AI Growth Lab. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151D32] hover:bg-white/10 border border-white/10 text-slate-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F8CFF]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
