
import React, { useState } from 'react';
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';
import AnalysisPage from '../components/AnalysisPage';

type Page = 'login' | 'dashboard' | 'analysis';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('login');

  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

  const handleAnalyze = () => {
    setCurrentPage('analysis');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'dashboard':
        return <Dashboard onAnalyze={handleAnalyze} />;
      case 'analysis':
        return <AnalysisPage onBack={handleBackToDashboard} />;
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return <div className="w-full">{renderCurrentPage()}</div>;
};

export default Index;
