import React, { useState } from 'react';
import AppSidebar from './AppSidebar';
import SmartSearchTab from './SmartSearchTab';
import MyTendersTab from './MyTendersTab';
import InsightsTab from './InsightsTab';
import FeedbackTab from './FeedbackTab';
import LanguageNotificationsTab from './LanguageNotificationsTab';
import CompanyProfileTab from './CompanyProfileTab';
import CompareTendersTab from './CompareTendersTab';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, BarChart3, Clock, TrendingUp, Award, Target, CheckCircle } from 'lucide-react';
import { Tender } from '../types/tender';

interface DashboardProps {
  onAnalyze: () => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onAnalyze, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [savedTenders, setSavedTenders] = useState<Tender[]>([]);

  const handleSaveTender = (tender: Tender) => {
    setSavedTenders(prev => {
      // Check if tender already exists
      const exists = prev.some(t => t.id === tender.id);
      if (exists) return prev;
      return [...prev, tender];
    });
  };

  const handleRemoveTender = (tenderId: string) => {
    setSavedTenders(prev => prev.filter(t => t.id !== tenderId));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'smart-search':
        return <SmartSearchTab onAnalyze={onAnalyze} onSaveTender={handleSaveTender} />;
      case 'my-tenders':
        return <MyTendersTab savedTenders={savedTenders} onAnalyze={onAnalyze} onRemoveTender={handleRemoveTender} />;
      case 'insights':
        return <InsightsTab />;
      case 'feedback':
        return <FeedbackTab />;
      case 'language':
      case 'notifications':
        return <LanguageNotificationsTab />;
      case 'company-profile':
        return <CompanyProfileTab />;
      case 'compare-tenders':
        return <CompareTendersTab savedTenders={savedTenders} />;
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
      default:
        return (
          <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome to tenderBharat</h1>
                <p className="text-gray-600 mt-2">Your intelligent tender analysis platform</p>
              </div>
              <Button 
                onClick={onAnalyze}
                className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload & Analyze Document
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-0 shadow-lg rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Documents Analyzed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">247</div>
                  <p className="text-xs text-gray-500 mt-1">+12 this week</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Avg. Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">87.5%</div>
                  <p className="text-xs text-gray-500 mt-1">+2.3% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-0 shadow-lg rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    High Matches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">156</div>
                  <p className="text-xs text-gray-500 mt-1">Score > 80%</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-0 shadow-lg rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Success Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">92%</div>
                  <p className="text-xs text-gray-500 mt-1">Based on analysis</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Highway Construction Tender</p>
                      <p className="text-xs text-gray-500">Analyzed 2 hours ago • 89% match</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Metro Rail Project</p>
                      <p className="text-xs text-gray-500">Analyzed 5 hours ago • 92% match</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Bridge Construction</p>
                      <p className="text-xs text-gray-500">Analyzed yesterday • 85% match</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <Clock className="w-5 h-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setActiveTab('smart-search')}
                    variant="outline" 
                    className="w-full justify-start rounded-lg border-2 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Browse Smart Search
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('my-tenders')}
                    variant="outline" 
                    className="w-full justify-start rounded-lg border-2 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View My Tenders
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('insights')}
                    variant="outline" 
                    className="w-full justify-start rounded-lg border-2 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Insights
                  </Button>
                  <Button 
                    onClick={onAnalyze}
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New Document
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <AppSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={onLogout}
      />
      <div className="flex-1 overflow-hidden">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
