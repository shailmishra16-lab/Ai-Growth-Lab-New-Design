export type PageRoute =
  | '/'
  | '/solutions'
  | '/live-demos'
  | '/our-work'
  | '/about'
  | '/contact'
  | '/privacy-policy';

export type SentimentLabel =
  | 'Positive'
  | 'Neutral'
  | 'Mixed'
  | 'Negative'
  | 'Cannot Be Determined';

export type RepeatContactStatus = 'Yes' | 'No' | 'Not Determined';

export interface RepeatContactAnalysis {
  status: RepeatContactStatus;
  reasons: string[];
  supportingStatement: string;
  reportedContactCount: string | null;
}

export type ResolutionStatus =
  | 'Fully Resolved'
  | 'Partially Resolved'
  | 'Unresolved'
  | 'Not Determined';

export type FcrIndication = 'Yes' | 'No' | 'Not Determined';

export type FollowUpRequired = 'Yes' | 'No' | 'Not Determined';

export interface ResolutionFcrAnalysis {
  resolutionStatus: ResolutionStatus;
  fcrIndication: FcrIndication;
  followUpRequired: FollowUpRequired;
  resolutionGaps: string[];
  supportingEvidence: string;
}

export interface InteractionAnalysisResult {
  interactionSummary: string;
  overallCustomerSentiment: SentimentLabel;
  sentimentExplanation: string;
  customerEmotions: string[];
  primaryCallDriver: string;
  secondaryCallDrivers: string[];
  customerPainPoints: string[];
  complaintIndicators: string[];
  escalationIndicators: string[];
  agentBehaviorObservations: string[];
  recommendedCorrectiveActions: string[];
  repeatContactAnalysis: RepeatContactAnalysis;
  resolutionFcrAnalysis: ResolutionFcrAnalysis;
  evidenceLimitations: string;
}

export interface InteractionApiError {
  error: string;
  code: 'MISSING_CONFIG' | 'VALIDATION_ERROR' | 'RATE_LIMITED' | 'API_ERROR';
  setupHint?: string;
}

export type ServiceOption =
  | 'Website Development'
  | 'Business Automation'
  | 'Interaction & Text Analytics'
  | 'AI Assistant'
  | 'Other / Not Sure';

export interface ContactEnquiryPayload {
  fullName: string;
  email: string;
  businessName?: string;
  serviceRequired: ServiceOption;
  message: string;
  website?: string; // Honeypot field for spam protection
}

export interface ContactApiResponse {
  success?: boolean;
  message?: string;
  recipient?: string;
  messageId?: string;
  error?: string;
  code?:
    | 'MISSING_CONFIG'
    | 'INVALID_CONFIG'
    | 'VALIDATION_ERROR'
    | 'RATE_LIMITED'
    | 'DELIVERY_FAILED';
  missingEnvVars?: string[];
  setupInstructions?: string;
}

export interface AssistantAction {
  label: string;
  route: PageRoute;
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  action?: AssistantAction;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  url: string;
  shortDescription: string;
  verifiedFeatures: string[];
  imagePath: string;
  imageAlt: string;
  highlights: string[];
}

export interface CaseStudyItem {
  id: string;
  sector: 'Banking' | 'Healthcare' | 'E-commerce';
  badge: string;
  title: string;
  businessChallenge: string;
  sampleInteraction: Array<{
    speaker: 'Customer' | 'Patient' | 'Agent';
    text: string;
  }>;
  illustrativeAnalytics: string[];
  dashboardSnapshot: {
    sentiment: SentimentLabel;
    primaryDriver: string;
    keyIndicator: string;
    emotions: string[];
  };
  recommendedActions: string[];
}
