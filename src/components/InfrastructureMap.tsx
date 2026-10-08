import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Filter,
  Search,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Clock,
  Dna,
  Building,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Layers,
  ChevronRight,
  X,
  Share2,
} from 'lucide-react';
import { GLOBAL_INFRASTRUCTURE_ENTITIES } from '../data/mockData';
import { InfrastructureEntity, PlatformType, GovernanceStatus } from '../types/biowatch';

interface InfrastructureMapProps {
  onAnalyzeEntityScenario: (scenarioPrompt: string) => void;
}

export const InfrastructureMap: React.FC<InfrastructureMapProps> = ({ onAnalyzeEntityScenario }) => {
  const [selectedEntity, setSelectedEntity] = useState<InfrastructureEntity | null>(
    GLOBAL_INFRASTRUCTURE_ENTITIES[0]
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [governanceFilter, setGovernanceFilter] = useState<string>('All');

  // Filtered entities
  const filteredEntities = useMemo(() => {
    return GLOBAL_INFRASTRUCTURE_ENTITIES.filter((item) => {
      if (regionFilter !== 'All' && item.region !== regionFilter) return false;
      if (platformFilter !== 'All' && item.platformType !== platformFilter) return false;
      if (governanceFilter !== 'All' && item.governanceStatus !== governanceFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.name.toLowerCase().includes(q) ||
          item.country.toLowerCase().includes(q) ||
          item.primaryOperator.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [searchQuery, regionFilter, platformFilter, governanceFilter]);

  // Convert lat/lng to SVG percentage coordinates (Equirectangular projection)
  const getCoordinates = (lat: number, lng: number) => {
    // lng: -180 to 180 -> 0% to 100%
    const x = ((lng + 180) / 360) * 100;
    // lat: 85 to -85 -> 0% to 100%
    const y = ((85 - lat) / 170) * 100;
    return { x: Math.max(2, Math.min(98, x)), y: Math.max(5, Math.min(95, y)) };
  };

  const getStatusColor = (status: GovernanceStatus) => {
    switch (status) {
      case 'Verified Compliant':
        return {
          bg: 'bg-emerald-500',
          border: 'border-emerald-400',
          text: 'text-emerald-400',
          badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
        };
      case 'Under Active Review':
        return {
          bg: 'bg-amber-500',
          border: 'border-amber-400',
          text: 'text-amber-400',
          badge: 'bg-amber-950/80 text-amber-300 border-amber-800',
        };
      case 'Screening Gap Flagged':
        return {
          bg: 'bg-red-500',
          border: 'border-red-400',
          text: 'text-red-400',
          badge: 'bg-red-950/80 text-red-300 border-red-800',
        };
      default:
        return {
          bg: 'bg-zinc-400',
          border: 'border-zinc-300',
          text: 'text-zinc-400',
          badge: 'bg-zinc-900 text-zinc-300 border-zinc-700',
        };
    }
  };

  return (
    <div className="space-y-5">
      {/* Header and Filter Controls */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold">
                PRD FEATURE 1: GLOBAL DUAL-USE INFRASTRUCTURE TRACKER
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {filteredEntities.length} of {GLOBAL_INFRASTRUCTURE_ENTITIES.length} Tracked Nodes
              </span>
            </div>
            <h2 className="text-base font-bold font-mono text-zinc-100 mt-1">
              Geospatial Biomanufacturing & Synthesis Surveillance Map
            </h2>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search facility, country, operator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-750 border-zinc-800 focus:border-cyan-500 rounded-lg pl-9 pr-3 py-1.5 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-zinc-800/80">
          <div>
            <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Region</label>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2.5 py-1.5 text-xs font-mono text-zinc-300 focus:outline-none focus:border-zinc-600"
            >
              <option value="All">All Regions</option>
              <option value="Sub-Saharan Africa">Sub-Saharan Africa</option>
              <option value="Latin America">Latin America</option>
              <option value="Europe">Europe</option>
              <option value="Asia-Pacific">Asia-Pacific</option>
              <option value="North America">North America</option>
              <option value="Middle East & North Africa">Middle East & North Africa</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Platform Type</label>
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2.5 py-1.5 text-xs font-mono text-zinc-300 focus:outline-none focus:border-zinc-600"
            >
              <option value="All">All Platform Types</option>
              <option value="mRNA / LNP Formulation">mRNA / LNP Formulation</option>
              <option value="Commercial DNA Synthesis">Commercial DNA Synthesis</option>
              <option value="Cloud Automated Lab">Cloud Automated Lab</option>
              <option value="Modular Bioreactor">Modular Bioreactor</option>
              <option value="Benchtop Enzymatic Synthesizer OEM">Benchtop Synthesizer OEM</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Governance Status</label>
            <select
              value={governanceFilter}
              onChange={(e) => setGovernanceFilter(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2.5 py-1.5 text-xs font-mono text-zinc-300 focus:outline-none focus:border-zinc-600"
            >
              <option value="All">All Governance Statuses</option>
              <option value="Verified Compliant">Verified Compliant (Green)</option>
              <option value="Under Active Review">Under Active Review (Amber)</option>
              <option value="Screening Gap Flagged">Screening Gap Flagged (Red)</option>
              <option value="Unknown / Unaudited">Unknown / Unaudited (Gray)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Map Canvas and Split Dossier Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Tactical Map Canvas */}
        <div className="lg:col-span-8 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden relative shadow-2xl flex flex-col">
          {/* Map Status Bar */}
          <div className="p-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>VECTOR DISPLAY: DSI & BIOMANUFACTURING NODES</span>
            </div>
            <div className="flex items-center space-x-3 text-[11px]">
              <span className="flex items-center space-x-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Compliant</span>
              </span>
              <span className="flex items-center space-x-1 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>In Review</span>
              </span>
              <span className="flex items-center space-x-1 text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>Gap Flagged</span>
              </span>
            </div>
          </div>

          {/* Interactive World Grid SVG */}
          <div className="relative w-full aspect-[2/1] min-h-[380px] bg-zinc-950 flex items-center justify-center overflow-hidden p-2">
            {/* Tactical Grid Background */}
            <svg
              className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Lat/Long guide lines */}
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.4" />
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.4" />
            </svg>

            {/* Stylized World Continents Outlines (Tactical Biosecurity Map projection) */}
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full absolute inset-0 pointer-events-none opacity-20"
              fill="none"
              stroke="#64748b"
              strokeWidth="1.2"
            >
              {/* North America */}
              <path d="M 150 90 Q 220 70 260 120 T 220 220 T 170 250 T 130 180 Z" />
              {/* South America */}
              <path d="M 280 270 Q 330 300 320 390 T 260 450 T 240 330 Z" />
              {/* Europe */}
              <path d="M 470 90 Q 540 80 560 140 T 490 190 T 440 140 Z" />
              {/* Africa */}
              <path d="M 470 200 Q 560 210 570 320 T 520 440 T 450 340 T 440 240 Z" />
              {/* Asia */}
              <path d="M 580 80 Q 750 60 850 140 T 820 280 T 670 260 T 590 180 Z" />
              {/* Australia */}
              <path d="M 780 340 Q 860 330 870 410 T 780 430 Z" />
            </svg>

            {/* Geospatial Interactive Nodes */}
            <div className="absolute inset-0">
              {filteredEntities.map((entity) => {
                const { x, y } = getCoordinates(entity.coordinates[0], entity.coordinates[1]);
                const isSelected = selectedEntity?.id === entity.id;
                const colors = getStatusColor(entity.governanceStatus);

                return (
                  <button
                    key={entity.id}
                    onClick={() => setSelectedEntity(entity)}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 p-2 group focus:outline-none z-10 cursor-pointer"
                    title={`${entity.name} (${entity.country})`}
                  >
                    {/* Pulsing beacon ring */}
                    <span
                      className={`absolute inset-0 rounded-full ${colors.bg} opacity-30 ${
                        isSelected ? 'animate-ping scale-150' : 'group-hover:animate-ping'
                      }`}
                    ></span>

                    {/* Outer marker */}
                    <span
                      className={`relative flex items-center justify-center w-4 h-4 rounded-full border-2 ${
                        isSelected
                          ? `w-5 h-5 ${colors.border} ring-4 ring-cyan-500/40 bg-zinc-950`
                          : `${colors.border} bg-zinc-950/90 group-hover:scale-125`
                      } transition-transform shadow-lg`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.bg}`}></span>
                    </span>

                    {/* Tooltip on hover */}
                    <span className="absolute left-6 top-0 hidden group-hover:block whitespace-nowrap bg-zinc-900 border border-zinc-700 text-zinc-100 text-[10px] font-mono px-2 py-1 rounded shadow-xl z-30 pointer-events-none">
                      <div className="font-bold">{entity.name}</div>
                      <div className="text-zinc-400">
                        {entity.country} • {entity.platformType}
                      </div>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Coordinates Overlay */}
            {selectedEntity && (
              <div className="absolute bottom-3 left-3 bg-zinc-900/90 border border-zinc-800 p-2 rounded text-[10px] font-mono text-zinc-400 backdrop-blur">
                <span className="text-cyan-400">TARGET:</span> {selectedEntity.name} (
                {selectedEntity.coordinates[0].toFixed(2)}°, {selectedEntity.coordinates[1].toFixed(2)}°)
              </div>
            )}
          </div>

          {/* Quick Entities List Bar at Bottom */}
          <div className="p-3 bg-zinc-900 border-t border-zinc-800 overflow-x-auto flex items-center space-x-2">
            <span className="text-[10px] font-mono uppercase text-zinc-500 shrink-0">Quick Target:</span>
            {filteredEntities.map((e) => {
              const colors = getStatusColor(e.governanceStatus);
              const isSelected = selectedEntity?.id === e.id;
              return (
                <button
                  key={e.id}
                  onClick={() => setSelectedEntity(e)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono shrink-0 transition flex items-center space-x-1.5 border ${
                    isSelected
                      ? 'bg-zinc-800 border-cyan-500 text-zinc-100'
                      : 'bg-zinc-950 hover:bg-zinc-850 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${colors.bg}`}></span>
                  <span className="truncate max-w-[130px]">{e.country}: {e.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Slide-Over / Side Dossier Panel (PRD F1-02, F1-03) */}
        <div className="lg:col-span-4 bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
          {selectedEntity ? (
            <div className="space-y-4">
              {/* Dossier Header */}
              <div className="border-b border-zinc-800 pb-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">ID: {selectedEntity.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      getStatusColor(selectedEntity.governanceStatus).badge
                    }`}
                  >
                    {selectedEntity.governanceStatus}
                  </span>
                </div>
                <h3 className="text-base font-bold font-mono text-zinc-100 mt-1 leading-snug">
                  {selectedEntity.name}
                </h3>
                <div className="text-xs text-zinc-400 flex items-center space-x-2 mt-1">
                  <span>{selectedEntity.country}</span>
                  <span>•</span>
                  <span>{selectedEntity.region}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-mono font-medium">{selectedEntity.biosafetyLevel}</span>
                </div>
              </div>

              {/* Core Attributes Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">Platform Type</div>
                  <div className="font-semibold text-zinc-200 mt-0.5 text-[11px] truncate">
                    {selectedEntity.platformType}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">Capacity Class</div>
                  <div className="font-semibold text-zinc-200 mt-0.5 text-[11px]">
                    {selectedEntity.capacityClass}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">Switching Time</div>
                  <div className="font-bold text-amber-400 mt-0.5 text-xs">
                    {selectedEntity.switchingTimeDays} Days
                  </div>
                  <div className="text-[9px] text-zinc-500">Digital template agile</div>
                </div>

                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">Evidence Confidence</div>
                  <div className="font-bold text-emerald-400 mt-0.5 text-xs">
                    {selectedEntity.evidenceConfidence}% Grade A
                  </div>
                  <div className="text-[9px] text-zinc-500">Source verified</div>
                </div>
              </div>

              {/* Description & Operators */}
              <div className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/80">
                <p>{selectedEntity.description}</p>
                <div className="mt-2 pt-2 border-t border-zinc-800/60 text-[11px] font-mono space-y-1">
                  <div className="text-zinc-400">
                    <span className="text-zinc-500">Primary Operator:</span> {selectedEntity.primaryOperator}
                  </div>
                  <div className="text-zinc-400">
                    <span className="text-zinc-500">Partners:</span> {selectedEntity.partners.join(', ')}
                  </div>
                </div>
              </div>

              {/* Governance-Readiness Checklist (PRD F1-03) */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-zinc-200 uppercase flex items-center justify-between">
                  <span>Governance-Readiness Checklist</span>
                  <span className="text-[10px] text-zinc-500 font-normal">Equity Non-Stigmatizing</span>
                </div>
                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Automated Sequence Screening:</span>
                    {selectedEntity.governanceChecklist.sequenceScreening ? (
                      <span className="text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Enabled</span>
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center space-x-1">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Gap Flagged</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Customer KYC Verification:</span>
                    {selectedEntity.governanceChecklist.customerKYC ? (
                      <span className="text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center space-x-1">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Pending / Unknown</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Biosafety Facility Accreditation:</span>
                    {selectedEntity.governanceChecklist.biosafetyAccreditation ? (
                      <span className="text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accredited</span>
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center space-x-1">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Missing</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Tamper-Evident Audit Logging:</span>
                    {selectedEntity.governanceChecklist.tamperEvidentLogging ? (
                      <span className="text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="text-zinc-500">Not Deployed</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Source Provenance */}
              <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-400">
                <span className="text-zinc-500 uppercase block text-[9px]">Sourced Provenance Trail:</span>
                <span className="text-zinc-300">{selectedEntity.evidenceSource}</span>
              </div>

              {/* Action Button: Run Scenario Generator for this Entity */}
              <div className="pt-2">
                <button
                  onClick={() =>
                    onAnalyzeEntityScenario(
                      `Geopolitical risk evaluation of ${selectedEntity.name} in ${selectedEntity.country} (${selectedEntity.region}): Platform operates ${selectedEntity.platformType} with ${selectedEntity.switchingTimeDays}-day turnaround. Governance readiness status: ${selectedEntity.governanceStatus}. Assess dual-use supply chain exposure and defensive mitigation options.`
                    )
                  }
                  className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-mono text-xs font-bold flex items-center justify-center space-x-2 transition shadow-lg shadow-emerald-950"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Model AI Scenario for this Node</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-500 font-mono text-xs">
              Select a facility node on the map to inspect intelligence profile.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
