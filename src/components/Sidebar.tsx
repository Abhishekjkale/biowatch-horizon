import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  Sparkles,
  Dna,
  GitPullRequestDraft,
  Activity,
  FileText,
  AlertOctagon,
  ShieldAlert,
} from 'lucide-react';

export type ActiveTab = 'dashboard' | 'map' | 'scenario' | 'evaluator' | 'hub-case-study';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  grayZoneCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, grayZoneCount }) => {
  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Threat Dashboard',
      description: 'Strategic indices & early warning telemetry',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'map' as ActiveTab,
      label: 'Dual-Use Infrastructure Map',
      description: 'Global mRNA hubs & benchtop units',
      icon: MapPin,
      badge: '14 Nodes',
    },
    {
      id: 'scenario' as ActiveTab,
      label: 'AI Threat Scenario Generator',
      description: 'Google AI Studio Gemini intelligence',
      icon: Sparkles,
      badge: 'Gemini 3.8',
      highlight: true,
    },
    {
      id: 'evaluator' as ActiveTab,
      label: 'AI Sequence Risk Evaluator',
      description: 'PRD F2 deterministic homology & triage',
      icon: Dna,
      badge: 'BWC Tier',
    },
    {
      id: 'hub-case-study' as ActiveTab,
      label: 'WHO mRNA Hub Case Study',
      description: 'Afrigen/Biovac tracking & policy models',
      icon: Activity,
      badge: '15+ Nations',
    },
  ];

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-zinc-950 border-r border-zinc-800/80 flex flex-col justify-between shrink-0">
      <div className="p-4 space-y-6">
        <div>
          <div className="px-2 py-1 mb-2 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold flex items-center justify-between">
            <span>Operational Console</span>
            <span className="flex items-center space-x-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>LIVE</span>
            </span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-medium text-xs transition flex items-start space-x-3 group relative ${
                    isActive
                      ? 'bg-zinc-850 bg-zinc-900 text-zinc-100 border border-zinc-700/80 shadow-md shadow-black/40'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent'
                  }`}
                >
                  <div
                    className={`mt-0.5 p-1.5 rounded ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : item.highlight
                        ? 'text-cyan-400 group-hover:text-cyan-300'
                        : 'text-zinc-400 group-hover:text-zinc-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-mono tracking-tight font-semibold text-zinc-200 group-hover:text-zinc-100">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 truncate mt-0.5">{item.description}</p>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded border self-center ${
                        item.highlight
                          ? 'bg-cyan-950/70 border-cyan-800 text-cyan-300'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Live Gray-Zone Status Card */}
        <div className="p-3 bg-zinc-900/60 rounded-lg border border-amber-900/40 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-amber-400 font-semibold flex items-center space-x-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-amber-500" />
              <span>Gray-Zone Alerts</span>
            </span>
            <span className="bg-amber-950 border border-amber-700/60 text-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded">
              {grayZoneCount} ACTIVE
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Non-state tabletop synthesis probes & multi-vendor split orders under automated review.
          </p>
        </div>
      </div>

      {/* Footer / System Meta */}
      <div className="p-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-500 space-y-2">
        <div className="flex items-center justify-between text-zinc-400">
          <span>CLASSIFICATION:</span>
          <span className="text-amber-400 font-semibold">SECRET</span>
        </div>
        <div className="flex items-center justify-between">
          <span>PROGRAM CODE:</span>
          <span className="text-zinc-300">BWH-HORIZON</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-zinc-600 pt-1 border-t border-zinc-900">
          <span>ETHICS HARNESS:</span>
          <span className="text-emerald-500 font-mono">DEFENSE-ONLY</span>
        </div>
      </div>
    </aside>
  );
};
