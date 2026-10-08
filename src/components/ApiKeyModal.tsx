import React, { useState } from 'react';
import { KeyRound, X, Check, ShieldCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  setApiKey,
}) => {
  const [tempKey, setTempKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiKey(tempKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setTempKey('');
    setApiKey('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center space-x-2">
            <KeyRound className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold font-mono text-zinc-100">
              Google AI Studio API Key
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed font-sans">
          Paste your Google AI Studio Gemini API key to enable live threat scenario generation directly. The key is passed securely to the backend proxy routes and never logged or exposed.
        </p>

        <div className="space-y-2">
          <label className="text-[10px] font-mono uppercase text-zinc-400 block">
            API Key Input
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              placeholder="AIzaSy..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-750 border-zinc-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-[11px] font-mono text-zinc-400 space-y-1">
          <div className="flex items-center space-x-1.5 text-cyan-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Server Proxy Integration</span>
          </div>
          <p>
            If left blank, the application uses the environment-injected secret key or runs the defensive baseline simulation.
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          {tempKey ? (
            <button
              onClick={handleClear}
              className="text-xs font-mono text-zinc-500 hover:text-zinc-300 underline"
            >
              Clear Key
            </button>
          ) : (
            <div></div>
          )}

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono border border-zinc-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-mono text-xs font-bold flex items-center space-x-1.5 transition shadow"
            >
              {saved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Key</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
