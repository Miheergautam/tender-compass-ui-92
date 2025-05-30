
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/Dashboard";
import AnalysisPage from "@/components/AnalysisPage";
import Navbar from "@/components/Navbar";
import SmartSearchFilters from "@/components/SmartSearchFilters";
import { HardHat } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (!authStatus) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleNavigation = (page: string) => {
    if (page === 'analysis') {
      navigate('/analysis');
    } else {
      setCurrentPage(page);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'smart-search':
        return <SmartSearchFilters />;
      case 'analysis':
        return <AnalysisPage onBack={() => setCurrentPage('dashboard')} />;
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigation}
        onLogout={handleLogout}
        logo={<HardHat className="w-8 h-8 text-white" />}
        appName="TenderBharat"
      />
      
      <div className="pt-16">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
