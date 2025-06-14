import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Tender } from "@/context/tenderContext";
import BioAndScore from "./BioAndScore";
import SiteImages from "./SiteImages";

const OthersAnalysis = ({ tenderData }: { tenderData: Tender }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="mr-4 rounded-xl border-2 hover:bg-teal-50 hover:border-teal-300 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Other Type Tender Analysis Report
            </h1>
          </div>

          {/* Tender Bio & Compatibility Score Unavailable */}
          <BioAndScore tenderData={tenderData} isOthers={true} />

          {/* Limited Information Notice */}

          <Card className="shadow-lg border-0 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <p className="text-gray-800 font-medium text-sm">
                  <span className="font-semibold text-yellow-700">
                    Other Tender Type:
                  </span>{" "}
                  Limited analysis features available for this tender category.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Site Images Gallery */}
          <SiteImages tenderData={tenderData} />
        </div>
      </div>
    </div>
  );
};

export default OthersAnalysis;
