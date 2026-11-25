import type { AssistantAction } from '../types';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  action?: AssistantAction;
}

export interface AssistantReply {
  text: string;
  action?: AssistantAction;
  matchedTopicId?: string;
}

/**
 * Modular responder interface so Phase 1 rule-based FAQ logic can be swapped
 * cleanly for a secure Gemini backend endpoint in a future phase.
 */
export interface AssistantResponseEngine {
  readonly mode: 'faq-rule-based' | 'gemini-backend';
  getWelcomeMessage(): string;
  getSuggestedQuestions(): FaqItem[];
  respond(userInput: string): Promise<AssistantReply>;
}

export const WELCOME_MESSAGE =
  'Hi! Welcome to AI Growth Lab. I can help you explore website development, business automation and customer analytics solutions. What would you like to know?';

export const UNKNOWN_TOPIC_FALLBACK =
  "I'm currently able to answer common questions about AI Growth Lab services. Please select one of the suggested topics or contact our team for more specific requirements.";

export const FAQ_KNOWLEDGE_BASE: FaqItem[] = [
  {
    id: 'faq-website',
    question: 'Can you build a website for my business?',
    answer:
      'Yes! AI Growth Lab helps create professional, responsive websites with features such as enquiry forms, service showcases, appointment booking and lead capture. You can explore our Aranya Interiors — Interior Design Studio website demonstration to see an example.',
    keywords: ['website', 'web', 'site', 'portfolio', 'landing page', 'design', 'build'],
    action: {
      label: 'View Website Demo',
      route: '/live-demos',
    },
  },
  {
    id: 'faq-automation',
    question: 'What business activities can be automated?',
    answer:
      'Many repetitive activities can be automated, including customer enquiries, appointment reminders, lead follow-ups, email notifications, data entry and status updates. The best approach depends on your existing business process.',
    keywords: ['automate', 'automation', 'workflow', 'repetitive', 'tasks', 'sheets', 'reminder', 'email'],
  },
  {
    id: 'faq-whatsapp',
    question: 'How does WhatsApp automation work?',
    answer:
      'WhatsApp automation can help businesses respond to enquiries, share information, send approved notifications and manage follow-ups. Implementation depends on WhatsApp Business platform requirements and the tools used.',
    keywords: ['whatsapp', 'messaging', 'chat notification', 'wa'],
  },
  {
    id: 'faq-appointments',
    question: 'Can you help manage appointments?',
    answer:
      'Yes. We can develop appointment request and booking workflows, including available time slots, customer details, confirmation messages and reminders, depending on your requirements.',
    keywords: ['appointment', 'appointments', 'booking', 'schedule', 'calendar', 'slot', 'slots'],
  },
  {
    id: 'faq-conversations',
    question: 'Can you analyze customer conversations?',
    answer:
      'Yes! Our interaction analytics solutions can help identify customer sentiment, pain points, call drivers, complaints and improvement opportunities from conversation transcripts. Try our Interaction Analytics Playground to see an example.',
    keywords: [
      'customer calls',
      'conversation',
      'conversations',
      'transcript',
      'sentiment',
      'call driver',
      'analytics',
      'analyze',
      'pain point',
    ],
    action: {
      label: 'Try Analytics Demo',
      route: '/live-demos',
    },
  },
  {
    id: 'faq-reviews',
    question: 'Can you analyze Google reviews?',
    answer:
      'Yes. Customer review analytics can help identify recurring positive and negative themes, service concerns, customer expectations and opportunities for improvement. Analysis can be performed on legitimately accessible review data.',
    keywords: ['review', 'reviews', 'google review', 'feedback', 'rating', 'ratings'],
  },
  {
    id: 'faq-leads',
    question: 'Can you help manage leads and enquiries?',
    answer:
      'Yes. We can create lead capture forms, enquiry notifications and workflows that help businesses organize and follow up on customer enquiries.',
    keywords: ['lead', 'leads', 'enquiry', 'enquiries', 'inquiry', 'inquiries', 'follow up', 'follow-up'],
  },
  {
    id: 'faq-contact',
    question: 'How can I contact your team?',
    answer:
      'You can send your requirements through our enquiry form or email us at team.aigrowthlab@gmail.com.',
    keywords: ['contact', 'email', 'reach', 'team', 'talk', 'enquiry form', 'help'],
    action: {
      label: 'Contact Us',
      route: '/contact',
    },
  },
];

class RuleBasedFaqEngine implements AssistantResponseEngine {
  readonly mode = 'faq-rule-based' as const;

  getWelcomeMessage(): string {
    return WELCOME_MESSAGE;
  }

  getSuggestedQuestions(): FaqItem[] {
    return FAQ_KNOWLEDGE_BASE;
  }

  async respond(userInput: string): Promise<AssistantReply> {
    const normalized = userInput.trim().toLowerCase();
    if (!normalized) {
      return { text: UNKNOWN_TOPIC_FALLBACK };
    }

    // 1. Exact question match first
    const exactMatch = FAQ_KNOWLEDGE_BASE.find(
      (item) => item.question.toLowerCase() === normalized
    );
    if (exactMatch) {
      return {
        text: exactMatch.answer,
        action: exactMatch.action,
        matchedTopicId: exactMatch.id,
      };
    }

    // 2. Simple keyword matching against predefined FAQ topics
    let bestMatch: FaqItem | null = null;
    let bestScore = 0;

    for (const item of FAQ_KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        if (normalized.includes(kw)) {
          score += kw.includes(' ') ? 3 : 2;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && bestScore > 0) {
      return {
        text: bestMatch.answer,
        action: bestMatch.action,
        matchedTopicId: bestMatch.id,
      };
    }

    // 3. Do not invent answers — return exact fallback
    return {
      text: UNKNOWN_TOPIC_FALLBACK,
    };
  }
}

export const faqAssistantEngine: AssistantResponseEngine = new RuleBasedFaqEngine();
