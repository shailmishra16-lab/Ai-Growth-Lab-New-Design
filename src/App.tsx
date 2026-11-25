import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWidgets } from './components/FloatingWidgets';
import { HomePage } from './pages/HomePage';
import { SolutionsPage } from './pages/SolutionsPage';
import { LiveDemosPage } from './pages/LiveDemosPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import type { PageRoute, ServiceOption } from './types';

const VALID_ROUTES: PageRoute[] = [
  '/',
  '/solutions',
  '/live-demos',
  '/our-work',
  '/about',
  '/contact',
  '/privacy-policy',
];

const ROUTE_META: Record<PageRoute, { title: string; description: string }> = {
  '/': {
    title: 'AI Growth Lab | Smarter Business. Less Manual Work. Better Decisions.',
    description:
      'We build intelligent websites, automate everyday business workflows, and transform customer conversations into actionable insights.',
  },
  '/solutions': {
    title: 'Solutions | AI Growth Lab — Websites, Automation & Analytics',
    description:
      'Explore AI Growth Lab solutions across Website Development, Business Automation, Interaction & Text Analytics, and AI Assistants.',
  },
  '/live-demos': {
    title: 'Live Demos | AI Growth Lab — Interior Design Site & Gemini Analytics',
    description:
      'Explore our live Aranya Interiors — Interior Design Studio website showcase and test the Gemini-powered Interaction Analytics Playground.',
  },
  '/our-work': {
    title: 'Our Work | AI Growth Lab — Website Portfolio & Analytics Case Studies',
    description:
      'View our Aranya Interiors — Interior Design Studio website build alongside illustrative interaction analytics case studies for Banking, Healthcare, and E-commerce.',
  },
  '/about': {
    title: 'About | AI Growth Lab',
    description:
      'AI Growth Lab makes modern technology practical and accessible for businesses. Explore. Build. Automate. Improve.',
  },
  '/contact': {
    title: 'Contact | AI Growth Lab — Send an Enquiry',
    description:
      'Send your project enquiry to the AI Growth Lab team for websites, business automation, interaction analytics, or website assistants.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | AI Growth Lab',
    description:
      'Learn how AI Growth Lab handles contact enquiries, Interaction Analytics Playground transcripts, and Phase 1 FAQ assistant interactions.',
  },
};

function normalizePath(pathname: string): PageRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return VALID_ROUTES.includes(clean as PageRoute) ? (clean as PageRoute) : '/';
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() =>
    normalizePath(window.location.pathname)
  );
  const [preselectedService, setPreselectedService] = useState<ServiceOption | undefined>(
    undefined
  );

  // Sync SEO document title & meta tags per route
  useEffect(() => {
    const meta = ROUTE_META[currentRoute] || ROUTE_META['/'];
    document.title = meta.title;

    const updateMetaTag = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    updateMetaTag('meta[name="description"]', meta.description);
    updateMetaTag('meta[property="og:title"]', meta.title);
    updateMetaTag('meta[property="og:description"]', meta.description);
    updateMetaTag('meta[name="twitter:title"]', meta.title);
    updateMetaTag('meta[name="twitter:description"]', meta.description);
  }, [currentRoute]);

  // Listen to browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback(
    (route: PageRoute, service?: ServiceOption) => {
      if (service) {
        setPreselectedService(service);
      }
      if (window.location.pathname !== route) {
        window.history.pushState(null, '', route);
      }
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1020] text-white">
      <Navbar currentRoute={currentRoute} onNavigate={navigate} />

      <main className="flex-1 pt-16">
        {currentRoute === '/' && <HomePage onNavigate={navigate} />}
        {currentRoute === '/solutions' && <SolutionsPage onNavigate={navigate} />}
        {currentRoute === '/live-demos' && <LiveDemosPage />}
        {currentRoute === '/our-work' && <OurWorkPage onNavigate={navigate} />}
        {currentRoute === '/about' && <AboutPage onNavigate={navigate} />}
        {currentRoute === '/contact' && (
          <ContactPage
            initialService={preselectedService}
            onNavigate={navigate}
          />
        )}
        {currentRoute === '/privacy-policy' && <PrivacyPolicyPage />}
      </main>

      <Footer onNavigate={navigate} />

      <FloatingWidgets onNavigate={navigate} />
    </div>
  );
}
