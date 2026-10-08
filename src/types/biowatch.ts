export type RiskTier = 'CLEAR' | 'REVIEW' | 'ESCALATE';

export type PlatformType =
  | 'mRNA / LNP Formulation'
  | 'Commercial DNA Synthesis'
  | 'Cloud Automated Lab'
  | 'Modular Bioreactor'
  | 'Benchtop Enzymatic Synthesizer OEM';

export type GovernanceStatus =
  | 'Verified Compliant'
  | 'Under Active Review'
  | 'Screening Gap Flagged'
  | 'Unknown / Unaudited';

export interface InfrastructureEntity {
  id: string;
  name: string;
  country: string;
  region: 'Sub-Saharan Africa' | 'Latin America' | 'North America' | 'Europe' | 'Asia-Pacific' | 'Middle East & North Africa';
  coordinates: [number, number]; // [lat, lng]
  platformType: PlatformType;
  capacityClass: 'Small Modular' | 'Medium Modular' | 'Large Fixed' | 'Distributed Benchtop' | 'Cloud Array';
  governanceStatus: GovernanceStatus;
  primaryOperator: string;
  partners: string[];
  switchingTimeDays: number; // days required to re-point mRNA template
  screeningProvider: string;
  kycCompliance: boolean;
  biosafetyLevel: 'BSL-1' | 'BSL-2' | 'BSL-3' | 'BSL-4';
  evidenceSource: string;
  evidenceConfidence: number; // 0 - 100%
  description: string;
  governanceChecklist: {
    sequenceScreening: boolean;
    customerKYC: boolean;
    biosafetyAccreditation: boolean;
    incidentReportingProtocol: boolean;
    tamperEvidentLogging: boolean;
  };
}

export interface HubMetricData {
  proliferationIndex: number;
  screeningComplianceRate: number;
  grayZoneAlertsCount: number;
  activeRecipientNodes: number;
  averageSwitchingTimeDays: number;
  monitoredFacilities: number;
  lastAuditTimestamp: string;
}

export interface GrayZoneAlert {
  id: string;
  timestamp: string;
  title: string;
  severity: 'CRITICAL' | 'ELEVATED' | 'MODERATE';
  region: string;
  vector: string;
  summary: string;
  status: 'INVESTIGATING' | 'ESCALATED' | 'MONITORED';
}

export interface RegionalRiskScore {
  region: string;
  compositeIndex: number; // 0-100
  instabilityScore: number;
  techAccessScore: number;
  governanceMaturityScore: number; // higher = better governance
  verificationGapScore: number; // higher = bigger gap
  trend: 'increasing' | 'stable' | 'decreasing';
  activeHubs: number;
}

export interface SequenceEvaluationResult {
  orderId: string;
  riskTier: RiskTier;
  confidence: number;
  category: string;
  aiRationale: string;
  recommendations: string;
  flaggedLocations: string[];
  timestamp: string;
  auditHash: string;
}
