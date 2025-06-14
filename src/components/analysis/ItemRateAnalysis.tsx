import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { Tender } from "@/context/tenderContext";
import MarkdownRenderer from "@/components/analysis/MarkdownRenderer";
import BioAndScore from "./BioAndScore";
import CurrentSite from "./CurrentSite";
import LocationInsights from "./LocationInsights";
import CompatibilityAnalysis from "./CompatibilityAnalysis";
import SiteImages from "./SiteImages";
import BOQRenderer from "./BOQRenderer";

const ItemRateAnalysis = ({ tenderData }: { tenderData: Tender }) => {
  const navigate = useNavigate();

  // Item-Rate Nature of Work categories (only 3)
  const workCategories = {
    "road-composition": tenderData?.metadata?.roadComposition,
    "structures-work":
      tenderData?.metadata?.structures || tenderData?.metadata?.structuresWork,
    "road-safety": tenderData?.metadata?.facilities,
  };

  const boqContent = `### Bill of Quantities (BOQ)

| Item Code | Description | Unit | Quantity | Rate | Amount |
|-----------|-------------|------|----------|------|---------|
| 001 | Excavation in ordinary soil | Cum | 1500 | ₹250 | ₹3,75,000 |
| 002 | Concrete Grade M25 | Cum | 500 | ₹4500 | ₹22,50,000 |
| 003 | Steel Reinforcement | MT | 25 | ₹65000 | ₹16,25,000 |
| 004 | Bituminous Concrete | Cum | 800 | ₹8500 | ₹68,00,000 |
| 005 | Road Safety Equipment | LS | 1 | ₹25,00,000 | ₹25,00,000 |

### Total Project Cost: ₹1,35,50,000`;

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
              Item-Rate Tender Analysis Report
            </h1>
          </div>

          {/* Tender Bio & Compatibility Score */}
          <BioAndScore tenderData={tenderData} />

          {/* Current Site Information */}
          <CurrentSite tenderData={tenderData} />

          {/* Location Insights Panel */}
          <LocationInsights tenderData={tenderData} />

          {/* Nature of Work Section */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Nature of Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="road-composition">
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 rounded-xl p-1">
                  <TabsTrigger value="road-composition" className="rounded-lg">
                    Road Composition
                  </TabsTrigger>
                  <TabsTrigger value="structures-work" className="rounded-lg">
                    Structures Work
                  </TabsTrigger>
                  <TabsTrigger value="road-safety" className="rounded-lg">
                    Road Safety
                  </TabsTrigger>
                </TabsList>

                {Object.entries(workCategories).map(([category, content]) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                      <ScrollArea className="h-96 p-6">
                        <MarkdownRenderer content={content} />
                      </ScrollArea>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* BOQ Section (instead of Payment Weightage) */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Bill of Quantities (BOQ)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <ScrollArea className="h-96 p-6">
                  <BOQRenderer content={boqContent} />
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          {/* Compatibility Analysis Section */}
          <CompatibilityAnalysis tenderData={tenderData} />

          {/* Site Images Gallery */}
          <SiteImages tenderData={tenderData} />
        </div>
      </div>
    </div>
  );
};

export default ItemRateAnalysis;
