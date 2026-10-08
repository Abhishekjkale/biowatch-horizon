import React from 'react';
import { ShieldAlert, Radio, Terminal, KeyRound, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  openKeyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ apiKey, openKeyModal }) => {
  const [time, setTime] = React.useState<string>('');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur sticky top-0 z-40">
      {/* Top Classification Banner */}
      <div className="bg-amber-950/80 border-b border-amber-600/40 text-amber-200 px-4 py-1 text-xs font-mono tracking-widest uppercase flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="font-semibold text-amber-400">SECRET // PROPRIETARY INTELLIGENCE ASSET</span>
          <span className="hidden md:inline text-zinc-400">|</span>
          <span className="hidden md:inline text-zinc-300">DEFENSIVE USE ONLY // BWH PROGRAM</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="text-amber-400/90 hidden sm:inline">BWC Physical Verification: ZERO PROTOCOL</span>
          <span className="bg-amber-900/60 px-2 py-0.5 rounded border border-amber-700/50 text-amber-300 font-bold">
            TIER-1 MONITORING
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner shadow-emerald-900/50">
            <ShieldAlert className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-zinc-100 tracking-tight font-mono">BIOWATCH HORIZON</h1>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-cyan-400 border border-cyan-800/40">
                v1.0.0 DEF
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Predictive Dual-Use Biotechnology Threat Monitoring & Defensive Mitigation
            </p>
          </div>
        </div>

        {/* Status Indicators & Key Configuration */}
        <div className="flex items-center space-x-4">
          {/* UTC Clock */}
          <div className="hidden lg:flex items-center space-x-1.5 text-xs font-mono text-zinc-400 bg-zinc-900/80 px-2.5 py-1.5 rounded border border-zinc-800">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{time}</span>
          </div>

          {/* AI Studio Engine Status */}
          <div className="flex items-center space-x-2 text-xs font-mono bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="hidden sm:inline text-zinc-300">Gemini Engine:</span>
            <span className="text-emerald-400 font-medium">Ready (Flash 3.8)</span>
          </div>

          {/* API Key Config Button */}
          <button
            onClick={openKeyModal}
            className={`flex items-center space-x-1.5 text-xs font-mono px-3 py-1.5 rounded transition border ${
              apiKey
                ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/50'
                : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-300'
            }`}
            title="Configure Google AI Studio API Key"
          >
            <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">AI Studio Key</span>
            {apiKey ? (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            ) : (
              <span className="text-[10px] bg-zinc-800 px-1 rounded text-zinc-400">Default</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
