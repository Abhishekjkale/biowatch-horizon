import React, { useState } from 'react';
import {
  Dna,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  FileText,
  Search,
  CheckCircle2,
  Lock,
  ArrowRight,
  RefreshCw,
  FileCheck,
  Share2,
} from 'lucide-react';
import { PRESET_SEQUENCE_SAMPLES } from '../data/mockData';
import { SequenceEvaluationResult } from '../types/biowatch';

interface SequenceRiskEvaluatorProps {
  apiKey: string;
}

export const SequenceRiskEvaluator: React.FC<SequenceRiskEvaluatorProps> = ({ apiKey }) => {
  const [inputText, setInputText] = useState<string>(PRESET_SEQUENCE_SAMPLES[0].text);
  const [orderIdInput, setOrderIdInput] = useState<string>('ORD-2026-9041');
  const [evaluating, setEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<SequenceEvaluationResult | null>(null);
  const [quarantined, setQuarantined] = useState<boolean>(false);

  const handleRunEvaluation = async () => {
    if (!inputText.trim()) return;

    setEvaluating(true);
    setQuarantined(false);
    try {
      const response = await fetch('/api/screen-sequence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queryText: inputText,
          orderId: orderIdInput,
          apiKey: apiKey || undefined,
        }),
      });

      const data = await response.json();
      setEvaluationResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setEvaluating(false);
    }
  };

  const handleQuarantine = () => {
    setQuarantined(true);
  };

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-5 rounded-xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold">
              PRD FEATURE 2: SEQUENCE RISK EVALUATOR & TRIAGE
            </span>
            <span className="text-xs font-mono text-zinc-400">Deterministic Engine + AI Rationale</span>
          </div>
          <h2 className="text-lg font-bold font-mono text-zinc-100 mt-1">
            Dual-Use Order Screening & Tamper-Evident Escalation
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-3xl leading-relaxed">
            Screens digital sequence orders, customer disclosures, and procurement logs against 2,400+ curated Select Agent references. Classifies into Clear / Review / Escalate tiers with verifiable audit trails.
          </p>
        </div>
      </div>

      {/* Preset Samples Selector */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-zinc-400 flex items-center justify-between">
          <span>Test Reference Samples (Benchmark Suite):</span>
          <span className="text-[10px] text-zinc-500">Select to load verification payload</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRESET_SEQUENCE_SAMPLES.map((sample, i) => (
            <button
              key={i}
              onClick={() => {
                setInputText(sample.text);
                setEvaluationResult(null);
                setQuarantined(false);
              }}
              className="p-3 rounded-lg bg-zinc-900/80 hover:bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 text-left transition space-y-1 group"
            >
              <div className="text-xs font-mono font-bold text-zinc-200 group-hover:text-cyan-400 transition">
                {sample.name}
              </div>
              <div className="text-[10px] font-mono text-zinc-500 truncate">
                {sample.text.substring(0, 50)}...
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form & Action */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div className="flex items-center space-x-2">
            <Dna className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold font-mono text-zinc-100">
              Genetic Order & Customer Verification Manifest
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono text-zinc-400">Order Ref:</span>
            <input
              type="text"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded px-2 py-0.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-cyan-500 w-32"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
            Sequence FASTA / Order Text / Procurement Metadata
          </label>
          <textarea
            rows={5}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste sequence, customer declaration, or procurement logs for screening..."
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded-lg p-3 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none"
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="text-[11px] font-mono text-zinc-500">
            Design constraint: Classifier & Router only. Never optimizes or generates hazardous sequences.
          </div>
          <button
            onClick={handleRunEvaluation}
            disabled={evaluating || !inputText.trim()}
            className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-mono text-xs font-bold flex items-center justify-center space-x-2 transition shadow-lg shadow-cyan-950 cursor-pointer"
          >
            {evaluating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-zinc-950" />
                <span>Running Deterministic Homology Screen...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Screen Sequence Order</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Evaluation Results Dossier */}
      {evaluationResult && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl space-y-0">
          <div className="bg-zinc-900 border-b border-zinc-800 px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-1 rounded text-xs font-mono font-bold border ${
                  evaluationResult.riskTier === 'ESCALATE'
                    ? 'bg-red-950 text-red-300 border-red-700'
                    : evaluationResult.riskTier === 'REVIEW'
                    ? 'bg-amber-950 text-amber-300 border-amber-700'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                }`}
              >
                TIER: {evaluationResult.riskTier}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Confidence: {(evaluationResult.confidence * 100).toFixed(1)}%
              </span>
            </div>

            <div className="text-[11px] font-mono text-zinc-500">
              Order ID: <span className="text-zinc-300">{evaluationResult.orderId}</span>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-1">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Category of Concern</div>
                <div className="text-xs font-mono font-bold text-zinc-200">
                  {evaluationResult.category}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-1">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Cryptographic Audit Hash</div>
                <div className="text-[11px] font-mono text-cyan-400 truncate">
                  {evaluationResult.auditHash}
                </div>
              </div>
            </div>

            {/* AI Rationale & Explanation (PRD F2-02) */}
            <div className="p-4 rounded-lg bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center space-x-1.5">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>Screening Engine & AI Triage Rationale</span>
              </div>
              <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                {evaluationResult.aiRationale}
              </p>
            </div>

            {/* Flagged Homology Locations */}
            {evaluationResult.flaggedLocations.length > 0 && (
              <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/40 space-y-1.5">
                <div className="text-[11px] font-mono font-bold text-red-400 uppercase">
                  Flagged Sequence Loci:
                </div>
                {evaluationResult.flaggedLocations.map((loc, idx) => (
                  <div key={idx} className="text-xs font-mono text-zinc-300 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    <span>{loc}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Recommended Escalation Action */}
            <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Protocol Action</div>
                <div className="text-xs font-mono text-zinc-200 mt-0.5">
                  {evaluationResult.recommendations}
                </div>
              </div>

              {evaluationResult.riskTier === 'ESCALATE' && (
                <div className="shrink-0">
                  {quarantined ? (
                    <span className="px-3 py-1.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Quarantined & Officer Notified</span>
                    </span>
                  ) : (
                    <button
                      onClick={handleQuarantine}
                      className="px-3 py-1.5 rounded bg-red-700 hover:bg-red-600 text-white text-xs font-mono font-bold flex items-center space-x-1.5 transition shadow"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Trigger Quarantine Workflow</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
