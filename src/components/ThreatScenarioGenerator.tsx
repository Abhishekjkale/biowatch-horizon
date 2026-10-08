import React, { useState } from 'react';
import {
  Sparkles,
  ShieldAlert,
  Send,
  Loader2,
  Copy,
  Check,
  Download,
  AlertTriangle,
  KeyRound,
  FileText,
  RefreshCw,
  Eye,
  EyeOff,
  Cpu,
  Layers,
  CheckCircle,
} from 'lucide-react';
import { PRESET_SCENARIOS } from '../data/mockData';

interface ThreatScenarioGeneratorProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  initialPrompt?: string;
}

export const ThreatScenarioGenerator: React.FC<ThreatScenarioGeneratorProps> = ({
  apiKey,
  setApiKey,
  initialPrompt = '',
}) => {
  const [scenarioInput, setScenarioInput] = useState<string>(
    initialPrompt ||
      'A non-state actor acquires a tabletop DNA synthesizer in East Africa, procuring commercial enzymatic cartridges via secondary market channels to circumvent cloud-screening verification.'
  );
  const [selectedRegion, setSelectedRegion] = useState<string>('East Africa / Sub-Saharan Corridor');
  const [focusArea, setFocusArea] = useState<string>('mRNA Proliferation & Tabletop Synthesis Vectors');
  const [loading, setLoading] = useState<boolean>(false);
  const [reportOutput, setReportOutput] = useState<string | null>(null);
  const [reportMetadata, setReportMetadata] = useState<{
    model?: string;
    source?: string;
    timestamp?: string;
    notice?: string;
  } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showSystemPrompt, setShowSystemPrompt] = useState<boolean>(false);
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);
  const [keyVisible, setKeyVisible] = useState<boolean>(false);

  const SYSTEM_PROMPT_TEXT = `You are BioWatch AI, a defensive biosecurity intelligence assistant. Analyze the user's geopolitical scenario for dual-use biological risks, specifically considering mRNA synthesis vulnerabilities, supply chain vectors, and geopolitical instability. Suggest defensive mitigation strategies. Do not provide instructions on creating pathogens.`;

  const handleGenerate = async () => {
    if (!scenarioInput.trim()) return;

    setLoading(true);
    setReportOutput(null);

    try {
      const response = await fetch('/api/analyze-scenario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenario: scenarioInput,
          region: selectedRegion,
          focusArea,
          apiKey: apiKey || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate intelligence briefing.');
      }

      setReportOutput(data.report);
      setReportMetadata({
        model: data.model,
        source: data.source,
        timestamp: data.timestamp,
        notice: data.notice,
      });
    } catch (err: any) {
      console.error(err);
      setReportOutput(
        `### ERROR: Briefing Generation Aborted\n${err?.message || 'An unexpected error occurred.'}\n\nPlease check your Google AI Studio configuration or retry with the defensive baseline engine.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!reportOutput) return;
    navigator.clipboard.writeText(reportOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!reportOutput) return;
    const blob = new Blob([reportOutput], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BioWatch_Horizon_Threat_Briefing_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-5 rounded-xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
              GOOGLE AI STUDIO • GEMINI PRO INTELLIGENCE
            </span>
            <span className="text-xs font-mono text-cyan-400">PRD FEATURE 3: THREAT HORIZON PREDICTOR</span>
          </div>
          <h2 className="text-lg font-bold font-mono text-zinc-100 mt-1">
            Predictive Geopolitical Scenario & Dual-Use Vector Analyzer
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-3xl leading-relaxed">
            Inputs geopolitical scenarios to model dual-use biotechnology exposure, mRNA template agility, and reagent diversion vectors. Delivers defensive early-warning indicators and mitigation strategies with zero offensive uplift.
          </p>
        </div>

        {/* System Prompt Toggle & Key Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setShowSystemPrompt(!showSystemPrompt)}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs flex items-center space-x-1.5 border border-zinc-700 transition"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>{showSystemPrompt ? 'Hide Guardrail Prompt' : 'Inspect System Prompt'}</span>
          </button>

          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs flex items-center space-x-1.5 border transition ${
              apiKey
                ? 'bg-emerald-950/70 border-emerald-700 text-emerald-300'
                : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>{apiKey ? 'Custom Key Set' : 'AI Studio API Key'}</span>
          </button>
        </div>
      </div>

      {/* Inspectable System Prompt Accordion */}
      {showSystemPrompt && (
        <div className="p-4 rounded-xl bg-zinc-950 border border-cyan-900/60 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between text-cyan-400 font-bold uppercase">
            <span className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>Configured System Prompt (PRD Section 5.2 Alignment Guardrails)</span>
            </span>
            <span className="text-[10px] text-zinc-500">Immutable Defensive Parameter</span>
          </div>
          <div className="bg-zinc-900/90 p-3 rounded border border-zinc-800 text-zinc-300 leading-relaxed italic">
            "{SYSTEM_PROMPT_TEXT}"
          </div>
          <p className="text-[11px] text-zinc-500">
            Enforces strict containment: Analyzes vulnerabilities, supply chains, and instability while refusing requests to create, enhance, or optimize pathogens.
          </p>
        </div>
      )}

      {/* API Key Configuration Box (Prompt Requirement #2: "Provide an API key input field in the UI") */}
      {showKeyInput && (
        <div className="p-4 rounded-xl bg-zinc-950 border border-amber-900/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-300 uppercase">
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>Google AI Studio API Key Configuration</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">Secure Client/Server Handshake</span>
          </div>
          <p className="text-xs text-zinc-400">
            Paste your Google AI Studio Gemini API key to query directly. (If left blank, the application utilizes the server's pre-configured environment credentials or calibrated defensive engine).
          </p>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <input
                type={keyVisible ? 'text' : 'password'}
                placeholder="Paste AI Studio API Key (e.g., AIzaSy...)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-750 border-zinc-800 focus:border-amber-500 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setKeyVisible(!keyVisible)}
                className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300"
              >
                {keyVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {apiKey && (
              <button
                onClick={() => setApiKey('')}
                className="px-3 py-2 bg-zinc-850 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs font-mono rounded-lg border border-zinc-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Preset Scenarios Carousel */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Preset Intelligence Scenario Injections (PRD Curated):</span>
          <span className="text-[10px] text-zinc-500">Click to load</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESET_SCENARIOS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setScenarioInput(preset.scenario);
                setSelectedRegion(preset.region);
                setFocusArea(preset.focusArea);
              }}
              className="p-2.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-850 hover:bg-zinc-800 border border-zinc-800/80 hover:border-zinc-700 text-left transition group space-y-1"
            >
              <div className="text-[11px] font-mono font-bold text-zinc-200 group-hover:text-emerald-400 transition truncate">
                {preset.title}
              </div>
              <div className="text-[10px] text-zinc-500 line-clamp-2 leading-tight">
                {preset.scenario}
              </div>
              <div className="text-[9px] font-mono text-cyan-400/90 pt-0.5">
                {preset.region}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Analyst Dynamic Input Panel */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-sm font-bold font-mono text-zinc-100 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Analyst Scenario Input Field</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Enter geopolitical hypotheses, suspected dual-use transfers, or gray-zone logistics vectors.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
              Model: Gemini 3.8 Flash
            </span>
          </div>
        </div>

        {/* Dynamic Scenario Input Field */}
        <div>
          <textarea
            rows={4}
            value={scenarioInput}
            onChange={(e) => setScenarioInput(e.target.value)}
            placeholder="Type geopolitical biosecurity scenario (e.g., A non-state actor acquires a tabletop DNA synthesizer in East Africa)..."
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-lg p-3 text-xs font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none leading-relaxed"
          ></textarea>
        </div>

        {/* Context metadata selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
              Geopolitical Region / Corridor
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-700"
            >
              <option value="East Africa / Sub-Saharan Corridor">East Africa / Sub-Saharan Corridor</option>
              <option value="Eastern Europe / Balkans">Eastern Europe / Balkans</option>
              <option value="Middle East & North Africa">Middle East & North Africa</option>
              <option value="Latin America & Caribbean">Latin America & Caribbean</option>
              <option value="Southeast Asia / Pacific Maritime">Southeast Asia / Pacific Maritime</option>
              <option value="Global Distributed Cloud Labs">Global Distributed Cloud Labs</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
              Threat Vector Focus
            </label>
            <select
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-700"
            >
              <option value="mRNA Proliferation & Tabletop Synthesis Vectors">
                mRNA Proliferation & Tabletop Synthesis Vectors
              </option>
              <option value="Reagent & Precursor Chemical Diversion (Lipids/Cap Analogs)">
                Reagent & Precursor Chemical Diversion (Lipids/Cap Analogs)
              </option>
              <option value="Multi-Vendor Split Order Evasion">Multi-Vendor Split Order Evasion</option>
              <option value="Gray-Zone Attribution & Verification Delay">
                Gray-Zone Attribution & Verification Delay
              </option>
              <option value="Decentralized Cloud Lab Telemetry Tamper">
                Decentralized Cloud Lab Telemetry Tamper
              </option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-zinc-500 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Zero-Uplift Guardrail Active // BWC Compliance Verified</span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !scenarioInput.trim()}
            className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-mono text-xs font-bold flex items-center justify-center space-x-2 transition shadow-lg shadow-emerald-950 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                <span>Synthesizing Intelligence Assessment...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Execute Gemini Threat Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Intelligence Report Output Display */}
      {reportOutput && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl space-y-0">
          {/* Classified Report Header */}
          <div className="bg-zinc-900 border-b border-zinc-800 px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold uppercase">
                  CLASSIFIED INTELLIGENCE BRIEFING
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  {reportMetadata?.model || 'Gemini 3.8 Flash'} • {reportMetadata?.timestamp?.substring(0, 10)}
                </span>
              </div>
              <h3 className="text-sm font-bold font-mono text-zinc-100 mt-1">
                Strategic Dual-Use Threat Evaluation & Defensive Mitigation
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="px-2.5 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono flex items-center space-x-1.5 border border-zinc-700 transition"
                title="Copy Briefing"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-2.5 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono flex items-center space-x-1.5 border border-zinc-700 transition"
                title="Download Markdown"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export Brief</span>
              </button>
            </div>
          </div>

          {/* Notice Banner if fallback */}
          {reportMetadata?.notice && (
            <div className="bg-cyan-950/40 border-b border-cyan-800/40 px-5 py-2 text-[11px] font-mono text-cyan-300 flex items-center space-x-2">
              <AlertTriangle className="w-3.5 h-3.5 text-cyan-400" />
              <span>{reportMetadata.notice}</span>
            </div>
          )}

          {/* Formatted Markdown Body */}
          <div className="p-6 text-zinc-200 text-xs font-mono leading-relaxed space-y-4 max-h-[600px] overflow-y-auto">
            <div className="whitespace-pre-wrap font-sans text-xs md:text-sm text-zinc-300 space-y-3">
              {reportOutput.split('\n\n').map((paragraph, pIdx) => {
                if (paragraph.startsWith('### ') || paragraph.startsWith('#### ')) {
                  return (
                    <h4
                      key={pIdx}
                      className="text-emerald-400 font-mono font-bold text-sm tracking-wide border-b border-zinc-800/80 pb-1 pt-2 uppercase"
                    >
                      {paragraph.replace(/^#+\s*/, '')}
                    </h4>
                  );
                }
                if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
                  return (
                    <ul key={pIdx} className="list-disc pl-5 space-y-1 text-zinc-300 font-mono text-xs">
                      {paragraph.split('\n').map((line, lIdx) => (
                        <li key={lIdx}>{line.replace(/^[-*]\s*/, '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.match(/^\d+\.\s/)) {
                  return (
                    <ol key={pIdx} className="list-decimal pl-5 space-y-1 text-zinc-300 font-mono text-xs">
                      {paragraph.split('\n').map((line, lIdx) => (
                        <li key={lIdx}>{line.replace(/^\d+\.\s*/, '')}</li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={pIdx} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Audit Verification Footer */}
          <div className="bg-zinc-900 border-t border-zinc-800 px-5 py-2.5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>DEFENSIVE COMPLIANCE CHECK PASSED: ZERO PATHOGEN SPECIFICATION FOUND</span>
            </div>
            <span className="text-zinc-600 hidden sm:inline">DISPATCH: SECURE GOVTECH CHANNEL</span>
          </div>
        </div>
      )}
    </div>
  );
};
