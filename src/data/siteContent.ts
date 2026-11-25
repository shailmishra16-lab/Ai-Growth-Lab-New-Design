import interiorDesignImg from '../assets/images/interior_design_showcase_1795410883616.jpg';
import solutionWebDevImg from '../assets/images/solution_web_dev_1795410883961.jpg';
import solutionAutomationImg from '../assets/images/solution_automation_1795410883368.jpg';
import solutionAnalyticsImg from '../assets/images/solution_analytics_1795410884057.jpg';
import solutionAssistantsImg from '../assets/images/solution_assistants_1795410883958.jpg';
import type { CaseStudyItem, PortfolioProject } from '../types';

export const INTERIOR_DESIGN_URL = 'https://aranya-interiors.vercel.app/';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'aranya-interiors',
    title: 'Aranya Interiors — Interior Design Studio',
    category: 'Website Development · Residential Architecture & Interiors',
    url: INTERIOR_DESIGN_URL,
    shortDescription:
      'A responsive business showcase website built for a residential interior design studio, pairing refined editorial presentation with structured portfolio browsing and consultation enquiries.',
    verifiedFeatures: [
      'Responsive editorial layout optimized for desktop, tablet, and mobile viewports',
      'Categorized residential portfolio showcase (Living & Dining, Kitchen, Master Suite, Custom Millwork)',
      'Structured consultation & site-visit request flow with clear service scope',
      'Clean service breakdown covering turnkey execution and modular planning',
    ],
    highlights: ['Responsive UI', 'Portfolio Showcase', 'Consultation Form'],
    imagePath: interiorDesignImg,
    imageAlt:
      'Desktop mockup screenshot of the Aranya Interiors residential design studio website showing warm editorial typography and living room photography',
  },
];

export interface SolutionCategoryData {
  id: string;
  number: string;
  title: string;
  summary: string;
  businessBenefit: string;
  services: string[];
  useCases: string[];
  imagePath: string;
  imageAlt: string;
  ctaLabel: string;
  relatedLink?: {
    label: string;
    href: string;
    external?: boolean;
  };
  disclaimer?: string;
}

export const SOLUTIONS_DATA: SolutionCategoryData[] = [
  {
    id: 'website-development',
    number: '01',
    title: 'Website Development',
    summary:
      'Modern, responsive websites designed to present your services clearly, capture qualified enquiries, and support day-to-day customer interactions.',
    businessBenefit:
      'A well-structured website builds immediate credibility with prospective customers and turns casual visitors into organized enquiries without manual back-and-forth.',
    services: [
      'Professional business websites',
      'Portfolio websites',
      'Appointment booking',
      'Lead generation forms',
      'Customer enquiry management',
      'Service showcases',
      'Google Analytics integration',
      'AI assistant integration',
    ],
    useCases: [
      'Service businesses needing a credible online presence with structured enquiry intake',
      'Studios and practices showcasing completed work alongside booking requests',
    ],
    imagePath: solutionWebDevImg,
    imageAlt: 'Laptop displaying a modern responsive business website and booking interface on a minimalist studio desk',
    ctaLabel: 'Enquire About Website Development',
    relatedLink: {
      label: 'View Live Interior Design Website',
      href: INTERIOR_DESIGN_URL,
      external: true,
    },
  },
  {
    id: 'business-automation',
    number: '02',
    title: 'Business Automation',
    summary:
      'Streamlined digital workflows that handle routine notifications, follow-ups, and record updates so your team can focus on higher-value work.',
    businessBenefit:
      'Reducing manual copy-pasting and delayed follow-ups helps businesses respond faster to enquiries, minimize missed appointments, and keep records consistent.',
    services: [
      'WhatsApp Business automation',
      'Automated lead follow-ups',
      'Appointment reminders',
      'Status updates',
      'Google Sheets workflow automation',
      'Email notifications',
      'Repetitive task automation',
      'Customer enquiry workflows',
    ],
    useCases: [
      'Routing new website enquiries to team inboxes and structured trackers automatically',
      'Sending scheduled appointment confirmations and status updates to customers',
    ],
    imagePath: solutionAutomationImg,
    imageAlt: 'Isometric visualization of connected automated workflow modules for notifications, reminders, and data routing',
    ctaLabel: 'Enquire About Business Automation',
    disclaimer:
      'Note: Integrations such as WhatsApp Business Platform or third-party workspace tools are configured per project and require appropriate account setup and platform approvals.',
  },
  {
    id: 'interaction-text-analytics',
    number: '03',
    title: 'Interaction & Text Analytics',
    summary:
      'Structured analysis of customer conversation transcripts, reviews, and feedback to surface sentiment, recurring drivers, and practical operational fixes.',
    businessBenefit:
      'Instead of reading hundreds of transcripts or reviews manually, teams gain clear visibility into why customers reach out, where friction occurs, and which actions matter most.',
    services: [
      'Customer sentiment analysis',
      'Emotion identification from text',
      'Call driver identification',
      'Customer pain point analysis',
      'Complaint classification',
      'Agent behavior observations',
      'Customer review analysis',
      'Feedback analysis',
      'Recommended corrective actions',
    ],
    useCases: [
      'Auditing support chat or call transcripts for repeat contact drivers and escalation cues',
      'Grouping customer reviews and survey feedback into clear operational priorities',
    ],
    imagePath: solutionAnalyticsImg,
    imageAlt: 'Desktop monitor displaying a customer interaction analytics dashboard with sentiment breakdown and call driver bars',
    ctaLabel: 'Enquire About Interaction Analytics',
    relatedLink: {
      label: 'Try the Live Interaction Analytics Playground',
      href: '/live-demos',
      external: false,
    },
  },
  {
    id: 'ai-assistants-business-insights',
    number: '04',
    title: 'AI Assistants & Business Insights',
    summary:
      'Helpful website assistants and practical reporting views that guide visitors to answers, organize incoming enquiries, and clarify website performance.',
    businessBenefit:
      'Visitors get immediate answers to common questions any time of day, while business teams see clear trends across customer enquiries and site engagement.',
    services: [
      'Website AI assistants',
      'Customer FAQ automation',
      'Lead qualification',
      'Business intelligence dashboards',
      'Google Analytics reporting',
      'Data-driven recommendations',
    ],
    useCases: [
      'Predefined FAQ assistants for predictable, policy-safe answers to common visitor questions',
      'Advanced AI-powered assistants (when required) for dynamic, context-aware customer support',
    ],
    imagePath: solutionAssistantsImg,
    imageAlt: 'Workstation displaying a structured FAQ assistant panel alongside a business intelligence summary view',
    ctaLabel: 'Enquire About Assistants & Insights',
    disclaimer:
      'Predefined FAQ assistants rely on curated rules and verified answers for predictable control, whereas advanced LLM-powered assistants use generative models where open-ended reasoning is appropriate. (Our website’s Phase 1 FAQ assistant uses predefined FAQ rules.)',
  },
];

export const ILLUSTRATIVE_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'banking-refund-drivers',
    sector: 'Banking',
    badge: 'Illustrative Case Study — Sample Data',
    title: 'Understanding Refund, Dispute and Repeat Contact Drivers',
    businessChallenge:
      'Customers repeatedly contact support regarding unresolved refunds and disputes.',
    sampleInteraction: [
      {
        speaker: 'Customer',
        text: 'I was charged twice on my card five days ago and raised a dispute ticket, but I still have no update on my refund timeline.',
      },
      {
        speaker: 'Agent',
        text: 'I understand how frustrating the wait is. Let me look up your dispute reference and explain the current processing stage.',
      },
    ],
    illustrativeAnalytics: [
      'Repeat contact drivers centered on unclear refund timelines',
      'Customer frustration around lack of status visibility',
      'Complaint patterns linked to duplicate charge inquiries',
      'Resolution gaps between initial ticket logging and follow-up updates',
    ],
    dashboardSnapshot: {
      sentiment: 'Negative',
      primaryDriver: 'Unresolved Refund / Dispute Status',
      keyIndicator: 'Repeat contact & timeline uncertainty',
      emotions: ['Frustration', 'Concern'],
    },
    recommendedActions: [
      'Improve refund communication with clear expected timelines',
      'Identify recurring process failures across dispute handoffs',
      'Strengthen proactive customer updates at key ticket milestones',
    ],
  },
  {
    id: 'healthcare-appointment-experience',
    sector: 'Healthcare',
    badge: 'Illustrative Case Study — Sample Data',
    title: 'Improving Appointment Enquiries and Patient Experience',
    businessChallenge:
      'Patients experience appointment delays, unanswered enquiries and follow-up issues.',
    sampleInteraction: [
      {
        speaker: 'Patient',
        text: 'I requested an appointment reschedule yesterday morning and never got a confirmation message, so I am unsure if my slot is still reserved.',
      },
      {
        speaker: 'Agent',
        text: 'I apologize for the gap in confirmation. Let me verify the schedule now and send your updated appointment details.',
      },
    ],
    illustrativeAnalytics: [
      'Appointment-related complaints tied to unconfirmed reschedules',
      'Patient dissatisfaction caused by wait-time and slot uncertainty',
      'Communication gaps between enquiry intake and front-desk confirmation',
      'Follow-up opportunities before and after scheduled visits',
    ],
    dashboardSnapshot: {
      sentiment: 'Mixed',
      primaryDriver: 'Appointment Confirmation & Scheduling',
      keyIndicator: 'Unanswered reschedule enquiry',
      emotions: ['Uncertainty', 'Mild Frustration'],
    },
    recommendedActions: [
      'Improve appointment communication with clear confirmation messages',
      'Automate reminders prior to scheduled consultations',
      'Identify recurring service issues from patient feedback themes',
    ],
  },
  {
    id: 'ecommerce-delivery-returns',
    sector: 'E-commerce',
    badge: 'Illustrative Case Study — Sample Data',
    title: 'Identifying Delivery, Return and Customer Service Pain Points',
    businessChallenge:
      'Customers complain about delayed deliveries, returns and refund processes.',
    sampleInteraction: [
      {
        speaker: 'Customer',
        text: 'My order has been stuck at the regional hub for four days, and the return portal link gave an error when I tried to cancel.',
      },
      {
        speaker: 'Agent',
        text: 'Thank you for sharing the order details. Let me check the courier scan history and walk you through the return option.',
      },
    ],
    illustrativeAnalytics: [
      'Delivery complaints concentrated around stalled tracking updates',
      'Return-related enquiries triggered by unclear self-service steps',
      'Negative sentiment themes linked to delayed post-return refunds',
      'Recurring customer concerns regarding shipping expectations',
    ],
    dashboardSnapshot: {
      sentiment: 'Negative',
      primaryDriver: 'Delayed Delivery & Return Friction',
      keyIndicator: 'Tracking delay + return link error',
      emotions: ['Impatience', 'Dissatisfaction'],
    },
    recommendedActions: [
      'Improve proactive delivery communication when shipments stall',
      'Simplify return instructions across order confirmation and help pages',
      'Prioritize recurring complaint drivers for operations review',
    ],
  },
];

export const SAMPLE_CONVERSATION_TRANSCRIPT = `Customer: "I have called three times about my refund. Every agent tells me it will be processed, but nothing has happened."
Agent: "I apologize for the inconvenience. Let me check your refund status."
Customer: "I am frustrated because nobody is giving me a clear resolution."
Agent: "I understand your concern. Let me review the case and provide the next steps."`;
