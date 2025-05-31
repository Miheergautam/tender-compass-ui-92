
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import PdfUpload from './PdfUpload';
import AnalysisResults from './AnalysisResults';

interface AnalysisPageProps {
  onBack: () => void;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ onBack }) => {
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  const handleAnalysisComplete = (results: any) => {
    console.log('Analysis results received:', results);
    setAnalysisResults(results);
    setShowResults(true);
  };

  const handleStartNew = () => {
    setAnalysisResults(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar currentPage="analysis" onNavigate={() => {}} />
      
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                onClick={onBack} 
                className="mr-4 rounded-xl border-2 hover:bg-teal-50 hover:border-teal-300 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                PDF Tender Analysis
              </h1>
            </div>
            
            {showResults && (
              <Button
                onClick={handleStartNew}
                variant="outline"
                className="rounded-xl border-2 hover:bg-teal-50 hover:border-teal-300 transition-all duration-200"
              >
                Analyze New PDF
              </Button>
            )}
          </div>

          {/* Content */}
          {!showResults ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <PdfUpload onAnalysisComplete={handleAnalysisComplete} />
            </div>
          ) : (
            <AnalysisResults results={analysisResults} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
