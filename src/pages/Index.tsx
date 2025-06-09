
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSidebar from '../components/AppSidebar';
import Dashboard from '../components/Dashboard';
import SmartSearchTab from '../components/SmartSearchTab';
import InsightsTab from '../components/InsightsTab';
import MyTendersTab from '../components/MyTendersTab';
import CompanyProfileTab from '../components/CompanyProfileTab';
import CompareTendersTab from '../components/CompareTendersTab';
import FeedbackTab from '../components/FeedbackTab';
import LanguageNotificationsTab from '../components/LanguageNotificationsTab';
import ChatWidget from '../components/ChatWidget';
import { Tender } from '../types/tender';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [savedTenders, setSavedTenders] = useState<Tender[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/verify", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Not authenticated");
        }
        const data = await res.json();
        if (!data.authenticated) {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };
  
    checkAuth();
  }, [navigate]);
  

  const handleLogout = async () => {
    await fetch("http://localhost:8000/api/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    navigate("/");
  };

  const handleAnalyze = () => {
    navigate('/analysis');
  };

  const handleSaveTender = (tender: Tender) => {
    setSavedTenders(prev => {
      const exists = prev.find(t => t.id === tender.id);
      if (!exists) {
        return [...prev, tender];
      }
      return prev;
    });
  };

  const handleRemoveTender = (tenderId: string) => {
    setSavedTenders(prev => prev.filter(t => t.id !== tenderId));
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'smart-search':
        return <SmartSearchTab onAnalyze={handleAnalyze} onSaveTender={handleSaveTender} />;
      case 'insights':
        return <InsightsTab />;
      case 'my-tenders':
        return <MyTendersTab savedTenders={savedTenders} onAnalyze={handleAnalyze} onRemoveTender={handleRemoveTender} />;
      case 'company-profile':
        return <CompanyProfileTab />;
      case 'compare-tenders':
        return <CompareTendersTab />;
      case 'feedback':
        return <FeedbackTab />;
      case 'language':
      case 'notifications':
      case 'settings':
        return <LanguageNotificationsTab />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      {/* Fixed Sidebar - spans entire page height */}
      <div className="fixed left-0 top-0 bottom-0 h-screen z-10">
        <AppSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={handleLogout} 
        />
      </div>
      
      {/* Main Content with left margin to account for fixed sidebar */}
      <div className="flex-1 ml-64">
        <div className="h-screen overflow-y-auto">
          {renderActiveTab()}
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;
