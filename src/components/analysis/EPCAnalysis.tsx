import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import LocationInsights from "./LocationInsights";
import { ArrowLeft } from "lucide-react";
import MarkdownRenderer from "@/components/analysis/MarkdownRenderer";
import { Tender } from "@/context/tenderContext";
import CurrentSite from "./CurrentSite";
import BioAndScore from "./BioAndScore";
import SiteImages from "./SiteImages";
import CompatibilityAnalysis from "./CompatibilityAnalysis";
import PaymentWeightage from "./PaymentWeightage";

const EPCAnalysis = ({ tenderData }: { tenderData: Tender }) => {
  const navigate = useNavigate();

  // EPC Nature of Work categories
  const workCategories = {
    "road-composition": tenderData?.metadata?.roadComposition,
    "structures-work":
      tenderData?.metadata?.structures || tenderData?.metadata?.structuresWork,
    "protection-work":
      tenderData?.metadata?.protection || tenderData?.metadata?.protectionWork,
    "roadside-drainage":
      tenderData?.metadata?.drainage || tenderData?.metadata?.roadsideDrainage,
    "intersections-grade": tenderData?.metadata?.gradeSeperators,
    "road-safety": tenderData?.metadata?.facilities,
    utilities: tenderData?.metadata?.otherWorks,
  };

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
              EPC Tender Analysis Report
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
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-6 bg-gray-100 rounded-xl p-1">
                  <TabsTrigger
                    value="road-composition"
                    className="rounded-lg text-xs"
                  >
                    Road Composition
                  </TabsTrigger>
                  <TabsTrigger
                    value="structures-work"
                    className="rounded-lg text-xs"
                  >
                    Structures Work
                  </TabsTrigger>
                  <TabsTrigger
                    value="protection-work"
                    className="rounded-lg text-xs"
                  >
                    Protection Work
                  </TabsTrigger>
                  <TabsTrigger
                    value="roadside-drainage"
                    className="rounded-lg text-xs"
                  >
                    Roadside Drainage
                  </TabsTrigger>
                  <TabsTrigger
                    value="intersections-grade"
                    className="rounded-lg text-xs"
                  >
                    Intersections
                  </TabsTrigger>
                  <TabsTrigger
                    value="road-safety"
                    className="rounded-lg text-xs"
                  >
                    Road Safety
                  </TabsTrigger>
                  <TabsTrigger value="utilities" className="rounded-lg text-xs">
                    Utilities
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

          {/* Payment Weightage Section */}

          <PaymentWeightage tenderData={tenderData} />

          {/* Compatibility Analysis Section */}

          <CompatibilityAnalysis tenderData={tenderData} />

          {/* Site Images Gallery */}

          <SiteImages tenderData={tenderData} />
        </div>
      </div>
    </div>
  );
};

export default EPCAnalysis;
