import React, { useState } from 'react';
import {
  Activity,
  Globe,
  ShieldCheck,
  AlertTriangle,
  Clock,
  HeartHandshake,
  CheckCircle2,
  FileText,
  Users,
  Building,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface WhoHubCaseStudyProps {
  onAnalyzeHubScenario: (prompt: string) => void;
}

export const WhoHubCaseStudy: React.FC<WhoHubCaseStudyProps> = ({ onAnalyzeHubScenario }) => {
  const [selectedRecipient, setSelectedRecipient] = useState<string>('Senegal');

  const RECIPIENT_NODES = [
    {
      country: 'South Africa (Central Hub)',
      institution: 'Afrigen Biologics & Biovac Institute',
      status: 'Operational Core (Afrigen 612 Formulation)',
      readiness: 'Advanced',
      screeningTier: 'Automated Pilot',
      switchingTime: '7 Days',
      supportNeed: 'Cloud-firmware screening telemetry integration',
    },
    {
      country: 'Brazil',
      institution: 'Bio-Manguinhos / Fiocruz',
      status: 'Industrial Scale-Up',
      readiness: 'High',
      screeningTier: 'IGSC Certified',
      switchingTime: '14 Days',
      supportNeed: 'Multilateral digital audit verification',
    },
    {
      country: 'Senegal',
      institution: 'Institut Pasteur de Dakar',
      status: 'Modular Cleanroom Installation',
      readiness: 'High',
      screeningTier: 'IGSC Harmonized',
      switchingTime: '9 Days',
      supportNeed: 'Continuous microfluidic cartridge validation',
    },
    {
      country: 'Serbia',
      institution: 'Torlak Institute',
      status: 'Recipient Pilot Production',
      readiness: 'Needs Support',
      screeningTier: 'Manual/Partial Gap',
      switchingTime: '6 Days',
      supportNeed: 'Subsidized automated sequence screening API',
    },
    {
      country: 'Argentina',
      institution: 'Sinergium Biotech',
      status: 'Validation Batches Complete',
      readiness: 'High',
      screeningTier: 'Commercial Screen',
      switchingTime: '10 Days',
      supportNeed: 'Harmonized customer KYC verification standard',
    },
    {
      country: 'Vietnam',
      institution: 'VABIOTECH',
      status: 'Technology Transfer Phase 2',
      readiness: 'In Training',
      screeningTier: 'Transitioning',
      switchingTime: '11 Days',
      supportNeed: 'Technical training on BWC confidence-building measures',
    },
    {
      country: 'Rwanda',
      institution: 'Kigali BioNTainer Site',
      status: 'Containerized Modular mRNA Unit',
      readiness: 'Advanced',
      screeningTier: 'Hardware Locked',
      switchingTime: '5 Days',
      supportNeed: 'Regional regulatory harmonization',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-950 p-5 rounded-xl border border-emerald-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-700 font-semibold">
              CASE STUDY: WHO mRNA TECHNOLOGY TRANSFER HUB
            </span>
            <span className="text-xs font-mono text-zinc-400">CAPE TOWN, SOUTH AFRICA</span>
          </div>
          <h2 className="text-lg font-bold font-mono text-zinc-100 mt-1">
            The Dual-Use Dilemma: Democratization vs. Agility
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-3xl leading-relaxed">
            Examining the deliberate post-COVID decentralization of mRNA and lipid nanoparticle (LNP) production to 15+ recipient nations for health equity, and the associated challenge of pathogen-agnostic template switching.
          </p>
        </div>

        <button
          onClick={() =>
            onAnalyzeHubScenario(
              'Analyze the WHO mRNA Technology Transfer Hub network (Afrigen/Biovac and 15 partner nations): Assess dual-use supply chain vulnerabilities, rapid digital template switching agility (4-14 days), and recommend non-stigmatizing defensive governance support policies.'
            )
          }
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-mono text-xs font-bold flex items-center space-x-2 transition shadow-lg shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Model Hub Risk Interventions</span>
        </button>
      </div>

      {/* Key Case Study Telemetry Feed (Prompt Requirement #3) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <div className="text-xs font-mono text-zinc-400 uppercase flex items-center justify-between">
            <span>Global mRNA Node Proliferation Index</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-mono font-bold text-zinc-100">68.4</div>
          <div className="text-[11px] text-zinc-500">
            Rapid growth across 15+ sovereign recipient nodes.
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <div className="text-xs font-mono text-zinc-400 uppercase flex items-center justify-between">
            <span>Synthesis Screening Compliance Rate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-mono font-bold text-emerald-400">88.7%</div>
          <div className="text-[11px] text-zinc-500">
            Ongoing deployment of subsidized screening APIs.
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <div className="text-xs font-mono text-zinc-400 uppercase flex items-center justify-between">
            <span>Gray-Zone Activity Alerts</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-3xl font-mono font-bold text-red-400">3 Flashes</div>
          <div className="text-[11px] text-zinc-500">
            Unregistered benchtop equipment sales & cartridge diversion.
          </div>
        </div>
      </div>

      {/* Contrast Box: Legacy Biomanufacturing vs Modern mRNA Platforms */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-bold font-mono text-zinc-100 uppercase tracking-wide">
          The Threat Architecture: Legacy Biodefense Assumptions vs Modern Reality
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="text-xs font-bold text-zinc-400 uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-zinc-500"></span>
              <span>Legacy Oversight Assumption (1972 BWC Era)</span>
            </div>
            <ul className="space-y-1.5 text-zinc-400 text-[11px]">
              <li>• <span className="text-zinc-200">Unit of Control:</span> Physical strains & physical agents in transit.</li>
              <li>• <span className="text-zinc-200">Facility Visibility:</span> Multi-acre industrial plants, large visible fermenters.</li>
              <li>• <span className="text-zinc-200">Switching Time:</span> Months to years (complex cell-line validation).</li>
              <li>• <span className="text-zinc-200">Verification:</span> Physical on-site inspection.</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-zinc-950 border border-cyan-900/50 space-y-2">
            <div className="text-xs font-bold text-cyan-400 uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>Reality BioWatch Horizon Addresses</span>
            </div>
            <ul className="space-y-1.5 text-zinc-300 text-[11px]">
              <li>• <span className="text-cyan-300">Unit of Control:</span> Digital genetic sequences (DSI) moving across borders.</li>
              <li>• <span className="text-cyan-300">Facility Visibility:</span> Compact cleanroom modular units (cell-free in vitro).</li>
              <li>• <span className="text-cyan-300">Switching Time:</span> Days to weeks by changing digital sequence template (4-14 days).</li>
              <li>• <span className="text-cyan-300">Verification:</span> Digital telemetry, cloud screening APIs, hardware tokens.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recipient Network Matrix & Equity Principles */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-sm font-bold font-mono text-zinc-100 flex items-center space-x-2">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <span>Equity-Aware Hub Readiness & Recipient Network</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Product Principle: Treat hub partners as legitimate health infrastructure. Surface governance and screening gaps to target support, never treating hubs as adversaries.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
            Non-Stigmatizing Framework
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Node / Country</th>
                <th className="py-2.5 px-3">Institution</th>
                <th className="py-2.5 px-2">Readiness</th>
                <th className="py-2.5 px-2">Screening Tier</th>
                <th className="py-2.5 px-2">Switching Time</th>
                <th className="py-2.5 px-3">Priority Support Need</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {RECIPIENT_NODES.map((node) => (
                <tr key={node.country} className="hover:bg-zinc-800/40 transition">
                  <td className="py-3 px-3 font-semibold text-zinc-200">{node.country}</td>
                  <td className="py-3 px-3 text-zinc-400 text-[11px]">{node.institution}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded border font-bold ${
                        node.readiness === 'Advanced' || node.readiness === 'High'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border-amber-800'
                      }`}
                    >
                      {node.readiness}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-zinc-300">{node.screeningTier}</td>
                  <td className="py-3 px-2 text-amber-400 font-bold">{node.switchingTime}</td>
                  <td className="py-3 px-3 text-zinc-400 text-[11px]">{node.supportNeed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
