import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Activity,
  Globe2,
  Sliders,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { GRAY_ZONE_ALERTS, REGIONAL_RISK_SCORES } from '../data/mockData';
import { GrayZoneAlert } from '../types/biowatch';

interface ThreatDashboardProps {
  onNavigateToScenario: (scenarioText?: string) => void;
  onNavigateToMap: () => void;
  onNavigateToHub: () => void;
}

export const ThreatDashboard: React.FC<ThreatDashboardProps> = ({
  onNavigateToScenario,
  onNavigateToMap,
  onNavigateToHub,
}) => {
  // Policy Intervention What-If Simulation State (PRD F3-02)
  const [mandatoryScreening, setMandatoryScreening] = useState(false);
  const [hardwareLocks, setHardwareLocks] = useState(false);
  const [subsidizedKYC, setSubsidizedKYC] = useState(false);
  const [multilateralAudit, setMultilateralAudit] = useState(false);

  // Dynamic calculation of Proliferation Index based on interventions
  let simulatedIndexReduction = 0;
  if (mandatoryScreening) simulatedIndexReduction += 14.2;
  if (hardwareLocks) simulatedIndexReduction += 9.5;
  if (subsidizedKYC) simulatedIndexReduction += 8.1;
  if (multilateralAudit) simulatedIndexReduction += 11.4;

  const baseProliferationIndex = 68.4;
  const currentProliferationIndex = Math.max(
    18.0,
    Number((baseProliferationIndex - simulatedIndexReduction).toFixed(1))
  );

  const baseCompliance = 88.7;
  const currentCompliance = Math.min(
    99.8,
    Number((baseCompliance + (mandatoryScreening ? 6.5 : 0) + (subsidizedKYC ? 4.2 : 0)).toFixed(1))
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-semibold">
              EXECUTIVE SITUATION REPORT
            </span>
            <span className="text-xs font-mono text-zinc-400">OCTOBER 2026 // CYCLE 42</span>
          </div>
          <h2 className="text-lg font-bold text-zinc-100 mt-1 font-mono">
            Global Dual-Use Biotechnology Common Operating Picture
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-3xl leading-relaxed">
            Erosion of state-scale capital barriers: Automated benchtop oligosynthesis & cell-free mRNA platforms enable rapid template switching in days rather than months. Defense relies on digital verification, KYC screening, and non-stigmatizing equity hub support.
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => onNavigateToScenario('A non-state actor acquires a tabletop DNA synthesizer in East Africa')}
            className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-mono text-xs font-semibold flex items-center space-x-1.5 transition shadow-lg shadow-emerald-900/30"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Generate Scenario AI</span>
          </button>
        </div>
      </div>

      {/* Real-Time Mock Core Metrics Row (from PRD & Prompt) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Proliferation Index */}
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Global mRNA Node Proliferation Index
            </span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-zinc-100">{currentProliferationIndex}</span>
            <span className="text-xs font-mono text-zinc-500">/ 100</span>
            {simulatedIndexReduction > 0 ? (
              <span className="text-xs font-mono text-emerald-400 font-medium">
                ▼ -{simulatedIndexReduction.toFixed(1)} (Simulated)
              </span>
            ) : (
              <span className="text-xs font-mono text-amber-400 font-medium">▲ +4.2% YoY</span>
            )}
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">
            Weighted across regional instability, cell-free formulation density, and verification latency.
          </p>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                currentProliferationIndex > 60
                  ? 'bg-amber-500'
                  : currentProliferationIndex > 40
                  ? 'bg-cyan-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${currentProliferationIndex}%` }}
            ></div>
          </div>
        </div>

        {/* Metric 2: Compliance Rate */}
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Synthesis Screening Compliance Rate
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-zinc-100">{currentCompliance}%</span>
            <span className="text-xs font-mono text-zinc-500">Target &gt;=95%</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">
            Commercial providers screening digital orders against international Select Agent reference sets.
          </p>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${currentCompliance}%` }}
            ></div>
          </div>
        </div>

        {/* Metric 3: Gray-Zone Activity Alerts */}
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Gray-Zone Activity Alerts
            </span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-red-400">{GRAY_ZONE_ALERTS.length}</span>
            <span className="text-xs font-mono text-red-400/80 bg-red-950/70 px-1.5 py-0.5 rounded border border-red-800/60 font-semibold">
              ELEVATED FLASH
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">
            Firmware locks bypassed, split-order oligo batches, and unverified microfluidics divergence.
          </p>
          <div className="flex items-center space-x-1 mt-3 text-[10px] font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>Latest: East Africa Tabletop probe (14m ago)</span>
          </div>
        </div>

        {/* Metric 4: Switching Time Turnaround */}
        <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Platform Switching Time Risk
            </span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-cyan-400">4.2</span>
            <span className="text-sm font-mono text-zinc-300">Days</span>
            <span className="text-xs font-mono text-zinc-500 line-through">180d legacy</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">
            Cell-free in vitro transcription re-pointing via digital template changes alone.
          </p>
          <div className="flex items-center justify-between mt-3 text-[10px] font-mono text-zinc-400">
            <span>Signature: Cleanroom Modular</span>
            <span className="text-cyan-400">DSI Vulnerability</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Regional Dual-Use Risk Index (PRD F3-01) & WHO Hub Case Study Feature */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Regional Risk Index Breakdown Table */}
        <div className="lg:col-span-2 bg-zinc-900/70 border border-zinc-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <div>
              <h3 className="text-sm font-bold font-mono text-zinc-100 flex items-center space-x-2">
                <Globe2 className="w-4 h-4 text-emerald-400" />
                <span>Regional Dual-Use Risk Index Decomposition (PRD F3-01)</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Transparent multi-factor model inspecting conflict instability, technology access, governance maturity, and verification gaps.
              </p>
            </div>
            <button
              onClick={onNavigateToMap}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 self-start sm:self-auto"
            >
              <span>View Map</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                  <th className="py-2.5 px-3">Region</th>
                  <th className="py-2.5 px-2 text-right">Composite</th>
                  <th className="py-2.5 px-2 text-right">Instability</th>
                  <th className="py-2.5 px-2 text-right">Tech Access</th>
                  <th className="py-2.5 px-2 text-right">Gov Maturity</th>
                  <th className="py-2.5 px-2 text-right">Verif. Gap</th>
                  <th className="py-2.5 px-3 text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {REGIONAL_RISK_SCORES.map((item) => (
                  <tr key={item.region} className="hover:bg-zinc-800/40 transition">
                    <td className="py-2.5 px-3 font-semibold text-zinc-200">
                      <div>{item.region}</div>
                      <div className="text-[10px] text-zinc-500 font-normal">{item.activeHubs} Tracked Nodes</div>
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <span
                        className={`px-1.5 py-0.5 rounded font-bold ${
                          item.compositeIndex >= 65
                            ? 'bg-red-950/80 text-red-400 border border-red-800/50'
                            : item.compositeIndex >= 45
                            ? 'bg-amber-950/80 text-amber-400 border border-amber-800/50'
                            : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
                        }`}
                      >
                        {item.compositeIndex}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-right text-zinc-400">{item.instabilityScore}</td>
                    <td className="py-2.5 px-2 text-right text-zinc-400">{item.techAccessScore}</td>
                    <td className="py-2.5 px-2 text-right text-emerald-400">{item.governanceMaturityScore}</td>
                    <td className="py-2.5 px-2 text-right text-amber-400">{item.verificationGapScore}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          item.trend === 'increasing'
                            ? 'text-red-400 bg-red-950/40'
                            : item.trend === 'decreasing'
                            ? 'text-emerald-400 bg-emerald-950/40'
                            : 'text-zinc-400 bg-zinc-800'
                        }`}
                      >
                        {item.trend === 'increasing' ? '▲ INC' : item.trend === 'decreasing' ? '▼ DEC' : '― STB'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interactive Policy What-If Scenario Builder (PRD F3-02) */}
          <div className="mt-4 p-4 rounded-xl bg-zinc-950 border border-cyan-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold font-mono text-zinc-200">
                  Policy What-If Simulator (PRD F3-02: Interventions vs Risk Index)
                </span>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                Interactive Model
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Toggle policy interventions to stress-test regulatory mitigation before committing international funding:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label className="flex items-start space-x-2.5 p-2.5 rounded bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={mandatoryScreening}
                  onChange={(e) => setMandatoryScreening(e.target.checked)}
                  className="mt-0.5 rounded bg-zinc-800 border-zinc-700 text-emerald-500 focus:ring-0"
                />
                <div>
                  <div className="text-xs font-mono font-semibold text-zinc-200">Mandatory Cloud Sequence Screening</div>
                  <div className="text-[11px] text-zinc-400">Estimated risk reduction: -14.2 pts</div>
                </div>
              </label>

              <label className="flex items-start space-x-2.5 p-2.5 rounded bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hardwareLocks}
                  onChange={(e) => setHardwareLocks(e.target.checked)}
                  className="mt-0.5 rounded bg-zinc-800 border-zinc-700 text-emerald-500 focus:ring-0"
                />
                <div>
                  <div className="text-xs font-mono font-semibold text-zinc-200">Benchtop Hardware Cryptographic Locks</div>
                  <div className="text-[11px] text-zinc-400">Estimated risk reduction: -9.5 pts</div>
                </div>
              </label>

              <label className="flex items-start space-x-2.5 p-2.5 rounded bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={subsidizedKYC}
                  onChange={(e) => setSubsidizedKYC(e.target.checked)}
                  className="mt-0.5 rounded bg-zinc-800 border-zinc-700 text-emerald-500 focus:ring-0"
                />
                <div>
                  <div className="text-xs font-mono font-semibold text-zinc-200">Subsidized KYC & Screening for Hubs</div>
                  <div className="text-[11px] text-zinc-400">Estimated risk reduction: -8.1 pts (Equity-safe)</div>
                </div>
              </label>

              <label className="flex items-start space-x-2.5 p-2.5 rounded bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={multilateralAudit}
                  onChange={(e) => setMultilateralAudit(e.target.checked)}
                  className="mt-0.5 rounded bg-zinc-800 border-zinc-700 text-emerald-500 focus:ring-0"
                />
                <div>
                  <div className="text-xs font-mono font-semibold text-zinc-200">BWC Voluntary Digital CBM Audits</div>
                  <div className="text-[11px] text-zinc-400">Estimated risk reduction: -11.4 pts</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right 1 Col: WHO mRNA Hub Case Study & Real-Time Alerts */}
        <div className="space-y-6">
          {/* WHO Hub Spotlight Box */}
          <div className="bg-gradient-to-b from-emerald-950/30 to-zinc-900 border border-emerald-900/50 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700 font-semibold">
                CASE STUDY SPOTLIGHT
              </span>
              <button
                onClick={onNavigateToHub}
                className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
              >
                <span>Deep Dive</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <h4 className="text-sm font-bold font-mono text-zinc-100">
              WHO mRNA Technology Transfer Hub (South Africa)
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Established in Cape Town (Afrigen Biologics & Biovac) to democratize vaccine manufacture across 15+ recipient nations.
            </p>

            <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Hub Architecture:</span>
                <span className="text-zinc-200">South-South Network</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Recipient Partners:</span>
                <span className="text-emerald-400 font-bold">15 Nations</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Switching Agility:</span>
                <span className="text-amber-400">4-14 Days</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Principle:</span>
                <span className="text-cyan-300 font-semibold">Equity & Non-Stigmatizing</span>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={onNavigateToHub}
                className="w-full py-2 rounded-lg bg-zinc-850 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs font-semibold flex items-center justify-center space-x-2 transition border border-zinc-700"
              >
                <span>Inspect Hub Governance & Readiness</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Real-time Gray-Zone Alert Stream */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <h4 className="text-xs font-bold font-mono text-zinc-100 flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Gray-Zone Threat Activity Feed</span>
              </h4>
              <span className="text-[10px] font-mono text-zinc-400">Real-Time</span>
            </div>

            <div className="space-y-2.5">
              {GRAY_ZONE_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span
                      className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
                        alert.severity === 'CRITICAL'
                          ? 'bg-red-950 text-red-300 border border-red-800'
                          : alert.severity === 'ELEVATED'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      }`}
                    >
                      {alert.severity}
                    </span>
                    <span className="text-zinc-500">{alert.timestamp}</span>
                  </div>
                  <div className="text-xs font-semibold text-zinc-200">{alert.title}</div>
                  <div className="text-[11px] text-zinc-400 leading-snug">{alert.summary}</div>
                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono">
                    <span className="text-zinc-500">{alert.region}</span>
                    <button
                      onClick={() => onNavigateToScenario(alert.summary)}
                      className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-1"
                    >
                      <span>Analyze Threat</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
