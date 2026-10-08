import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { ThreatDashboard } from './components/ThreatDashboard';
import { InfrastructureMap } from './components/InfrastructureMap';
import { ThreatScenarioGenerator } from './components/ThreatScenarioGenerator';
import { SequenceRiskEvaluator } from './components/SequenceRiskEvaluator';
import { WhoHubCaseStudy } from './components/WhoHubCaseStudy';
import { ApiKeyModal } from './components/ApiKeyModal';
import { GRAY_ZONE_ALERTS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [apiKey, setApiKeyState] = useState<string>(() => {
    return localStorage.getItem('biowatch_gemini_api_key') || '';
  });
  const [isKeyModalOpen, setIsKeyModalOpen] = useState<boolean>(false);
  const [scenarioInitialPrompt, setScenarioInitialPrompt] = useState<string>('');

  const handleSetApiKey = (key: string) => {
    setApiKeyState(key);
    if (key) {
      localStorage.setItem('biowatch_gemini_api_key', key);
    } else {
      localStorage.removeItem('biowatch_gemini_api_key');
    }
  };

  const handleNavigateToScenario = (scenarioText?: string) => {
    if (scenarioText) {
      setScenarioInitialPrompt(scenarioText);
    }
    setActiveTab('scenario');
  };

  const handleNavigateToMap = () => {
    setActiveTab('map');
  };

  const handleNavigateToHub = () => {
    setActiveTab('hub-case-study');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-zinc-950">
      {/* Top Header with Classification Banner */}
      <Header
        apiKey={apiKey}
        setApiKey={handleSetApiKey}
        openKeyModal={() => setIsKeyModalOpen(true)}
      />

      {/* Main Workspace with Sidebar and Viewport */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          grayZoneCount={GRAY_ZONE_ALERTS.length}
        />

        {/* Viewport Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <ThreatDashboard
              onNavigateToScenario={handleNavigateToScenario}
              onNavigateToMap={handleNavigateToMap}
              onNavigateToHub={handleNavigateToHub}
            />
          )}

          {activeTab === 'map' && (
            <InfrastructureMap onAnalyzeEntityScenario={handleNavigateToScenario} />
          )}

          {activeTab === 'scenario' && (
            <ThreatScenarioGenerator
              apiKey={apiKey}
              setApiKey={handleSetApiKey}
              initialPrompt={scenarioInitialPrompt}
            />
          )}

          {activeTab === 'evaluator' && <SequenceRiskEvaluator apiKey={apiKey} />}

          {activeTab === 'hub-case-study' && (
            <WhoHubCaseStudy onAnalyzeHubScenario={handleNavigateToScenario} />
          )}
        </main>
      </div>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKey={apiKey}
        setApiKey={handleSetApiKey}
      />
    </div>
  );
}
