import React, { useState, useEffect } from 'react';
import { Menu, X, Layers } from 'lucide-react';
import type { PageRoute } from '../types';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

const NAV_ITEMS: Array<{ label: string; route: PageRoute }> = [
  { label: 'Home', route: '/' },
  { label: 'Solutions', route: '/solutions' },
  { label: 'Live Demos', route: '/live-demos' },
  { label: 'Our Work', route: '/our-work' },
  { label: 'About', route: '/about' },
  { label: 'Contact', route: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, route: PageRoute) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1020]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Clean Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="inline-flex items-center gap-2.5 text-white font-bold text-lg tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F8CFF] rounded-md"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] flex items-center justify-center text-white shrink-0">
            <Layers className="w-4 h-4" aria-hidden="true" />
          </span>
          <span>AI Growth Lab</span>
        </a>

        {/* Zone 2: Clean Single-Line Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={item.route}
                onClick={(e) => handleLinkClick(e, item.route)}
                aria-current={isActive ? 'page' : undefined}
                className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F8CFF] ${
                  isActive
                    ? 'text-white border-[#4F8CFF]'
                    : 'text-slate-300 border-transparent hover:text-white hover:border-white/30'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Prominent Contact CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#4F8CFF] hover:bg-[#3A78F0] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F8CFF]"
          >
            Send an Enquiry
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/15 bg-[#151D32] text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F8CFF]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#0B1020] border-t border-white/10 px-4 py-4 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={item.route}
                onClick={(e) => handleLinkClick(e, item.route)}
                aria-current={isActive ? 'page' : undefined}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#151D32] text-white border border-[#4F8CFF]/40'
                    : 'text-slate-300 hover:bg-[#151D32] hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-2">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="block w-full text-center px-4 py-2.5 rounded-lg bg-[#4F8CFF] hover:bg-[#3A78F0] text-white text-sm font-semibold transition-colors"
            >
              Send an Enquiry
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
