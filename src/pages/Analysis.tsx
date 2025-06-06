import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ZoomIn,
  X,
  Target,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useParams } from "react-router-dom";

import { useTenderContext } from "@/context/TenderContext";

const Analysis = () => {
  const navigate = useNavigate();
  const { tender_id } = useParams<{ tender_id: string }>();
  const { tenders, loading, error } = useTenderContext();
  const [tender, setTender] = useState<any>(null);

  useEffect(() => {
    if (tender_id) {
      const foundTender = tenders.find((t) => t._id === tender_id);
      setTender(foundTender || null);
    }
  }, [tender_id, tenders]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="text-gray-600 text-lg font-medium animate-pulse">
          Loading tender data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="text-red-600 text-lg font-semibold">
          ⚠️ Error loading tenders. Please try again.
        </div>
      </div>
    );
  }

  if (!tender) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="text-gray-500 text-lg font-semibold">
          🚫 Tender not found.
        </div>
      </div>
    );
  }

  // Calculate days left
  const submissionDate = new Date(tender["Submission Date"]);
  const today = new Date();
  const timeDiff = submissionDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Tender bio data from placeholder
  const tenderBio = {
    brief: tender["Bio"],
    location: tender["Location"],
    estimatedCost: tender["Estimated Cost"],
    emd: tender["EMD"],
    length: tender["Length"],
    type: tender["Type"],
    downloadDocuments: tender["Download Documents"],
    organisation: tender["Organization"],
    organisationId: tender["Organization Tender ID"],
    website: tender["Website"],
    submissionDeadline: tender["Submission Date"],
    compatibilityScore: 67,
  };

  // Location insights data
  const locationInsights = [
    {
      title: "Terrain",
      content: tender.metadata["Terrain"],
    },
    {
      title: "Climate",
      content: tender.metadata["Climate"],
    },
    {
      title: "Logistics",
      content: tender.metadata["Logistics"],
    },
    {
      title: "Safety",
      content: tender.metadata["Safety"],
    },
    {
      title: "Soil Type",
      content: tender.metadata["Soil Type"],
    },
    {
      title: "Material Availability",
      content: tender.metadata["Material Availability"],
    },
  ];

  // Nature of work content
  const workCategories = {
    "road-composition": tender.metadata["Road Composition"],

    "roadside-drainage": tender.metadata["Roadside Drainage"],

    "structures-work": tender.metadata["Structures Work"],

    "protection-work": tender.metadata["Protection Work"],
  };

  // Payment weightage content
  const paymentWeightageContent = tender.metadata["Payment Weightage"];

  const getScoreColor = (score: number) => {
    if (score >= 80)
      return {
        color: "text-green-600",
        bgColor: "from-green-400 to-green-600",
        icon: TrendingUp,
        label: "Excellent Match",
      };
    if (score >= 50)
      return {
        color: "text-yellow-600",
        bgColor: "from-yellow-400 to-yellow-600",
        icon: Target,
        label: "Good Match",
      };
    return {
      color: "text-red-600",
      bgColor: "from-red-400 to-red-600",
      icon: AlertTriangle,
      label: "Poor Match",
    };
  };

  const scoreData = getScoreColor(tenderBio.compatibilityScore);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset =
    circumference - (tenderBio.compatibilityScore / 100) * circumference;

  const compatibilityAnalysisContent = `### Executive Summary

    **Overall Compatibility Score: 67/100** - This tender represents a moderate match for your organization's capabilities and strategic objectives.
    
    ### Strengths & Opportunities
    
    #### Technical Compatibility ✅
    - **Road Construction Expertise**: Strong alignment with your company's core competencies in highway and infrastructure development
    - **EPC Model Experience**: Your organization has demonstrated success in Engineering, Procurement, and Construction contracts
    - **Mountainous Terrain Projects**: Previous experience with challenging topographical conditions provides competitive advantage
    
    #### Financial Viability ✅
    - **Project Scale**: ₹223.69 Cr. contract value aligns with your typical project portfolio
    - **EMD Requirement**: ₹4.46 Cr. EMD is within manageable limits for your financial capacity
    - **Payment Structure**: Staged payment weightage provides healthy cash flow management opportunities
    
    ### Challenges & Risk Factors
    
    #### Logistical Complexity ⚠️
    | Challenge | Impact Level | Mitigation Strategy |
    |-----------|--------------|-------------------|
    | **Remote Location** | High | Establish forward base camps in Gangtok |
    | **Material Transport** | Very High | Pre-position critical materials before monsoon |
    | **Equipment Mobilization** | High | Plan phased equipment deployment |
    
    #### Environmental & Operational Risks ⚠️
    - **Weather Windows**: Limited working season (March-May, October-November)
    - **Altitude Challenges**: Operations up to 4,000m require specialized equipment and procedures
    - **Border Proximity**: Additional security clearances and compliance requirements
    
    ### Recommendation Matrix
    
    | Criteria | Score | Rationale |
    |----------|-------|-----------|
    | **Technical Fit** | 8/10 | Strong match with core competencies |
    | **Financial Viability** | 7/10 | Appropriate scale, manageable EMD |
    | **Risk Profile** | 5/10 | High logistical complexity, environmental challenges |
    | **Strategic Value** | 7/10 | Enhances portfolio diversity, government relationship |
    | **Resource Availability** | 6/10 | Requires specialized mountain construction resources |
    
    ### Strategic Recommendations
    
    #### Proceed with Bid Preparation ✅
    **Rationale**: Despite logistical challenges, this project offers significant strategic value and aligns well with your technical capabilities.
    
    #### Key Success Factors
    1. **Early Mobilization**: Begin material positioning 6 months before project start
    2. **Local Partnerships**: Establish relationships with Sikkim-based suppliers and contractors
    3. **Weather Planning**: Build detailed climate-responsive construction schedules
    4. **Risk Mitigation**: Secure comprehensive insurance for high-altitude operations
    
    #### Bid Strategy Recommendations
    - **Pricing**: Add 15-20% contingency for logistical complexities
    - **Timeline**: Request extended completion period to account for weather constraints
    - **Local Content**: Emphasize commitment to local employment and supplier engagement
    - **Technology**: Propose advanced project management systems for remote monitoring
    
    ### Conclusion
    
    This tender represents a **moderate-to-good opportunity** with manageable risks. Your organization's technical expertise and financial capacity align well with project requirements. Success will depend on thorough planning for logistical challenges and effective risk mitigation strategies.
    
    **Recommendation**: **PROCEED** with bid preparation, incorporating suggested risk mitigation strategies.`;

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
              Tender Analysis Report
            </h1>
          </div>

          {/* Tender Bio & Compatibility Score */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3 shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Tender Biography
                  </CardTitle>
                  <div className="text-right">
                    <div
                      className={`text-lg font-bold ${
                        daysLeft > 30
                          ? "text-green-600"
                          : daysLeft > 7
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {daysLeft > 0
                        ? `${daysLeft} days left`
                        : "Deadline passed"}
                    </div>
                    <div className="text-sm text-gray-500">to submit</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {tenderBio.brief}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Location
                    </p>
                    <p className="font-medium text-gray-700 text-sm">
                      {tenderBio.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Submission Date
                    </p>
                    <p className="font-medium text-gray-700 text-sm">
                      {tenderBio.submissionDeadline}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Estimated Cost
                    </p>
                    <p className="font-semibold text-teal-700 text-sm">
                      ₹{tenderBio.estimatedCost}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      EMD
                    </p>
                    <p className="font-medium text-gray-700 text-sm">
                      ₹{tenderBio.emd}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Length
                    </p>
                    <p className="font-medium text-gray-700 text-sm">
                      {tenderBio.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Type
                    </p>
                    <p className="font-medium text-gray-700 text-sm">
                      {tenderBio.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Download Documents
                    </p>
                    <a
                      href={tenderBio.downloadDocuments}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      Download <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Organisation
                    </p>
                    <p className="font-medium text-gray-700 text-sm">
                      {tenderBio.organisation}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Organisation ID
                    </p>
                    <p className="font-medium text-gray-700 text-sm">
                      {tenderBio.organisationId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Website
                    </p>
                    <a
                      href={tenderBio.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      Visit Website <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compatibility Score */}
            <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Compatibility Score
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-2">
                <div className="relative group">
                  <div className="w-32 h-32 mx-auto relative">
                    <svg
                      className="w-32 h-32 transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="url(#scoreGradient)"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1000 ease-in-out"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="scoreGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" className="stop-color-teal-400" />
                          <stop offset="100%" className="stop-color-blue-600" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div
                        className={`text-3xl font-bold ${scoreData.color} mb-1`}
                      >
                        {tenderBio.compatibilityScore}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        out of 100
                      </div>
                      <scoreData.icon
                        className={`w-5 h-5 mt-1 ${scoreData.color}`}
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                      <div className="font-medium">{scoreData.label}</div>
                      <div className="text-gray-300 mt-1">
                        Based on your profile match
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Insights Panel */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Location Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-[500px] gap-4">
                {locationInsights.map((insight, index) => (
                  <Card
                    key={index}
                    className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200 rounded-xl hover:shadow-md transition-all duration-300"
                  >
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-teal-700 mb-3 text-sm">
                        {insight.title}
                      </h4>
                      <ScrollArea className="h-40">
                        <MarkdownRenderer
                          content={insight.content}
                          className="text-xs"
                        />
                      </ScrollArea>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nature of Work Section */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Nature of Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="road-composition">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6 bg-gray-100 rounded-xl p-1">
                  <TabsTrigger
                    value="road-composition"
                    className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Road Composition
                  </TabsTrigger>
                  <TabsTrigger
                    value="roadside-drainage"
                    className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Roadside Drainage
                  </TabsTrigger>
                  <TabsTrigger
                    value="structures-work"
                    className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Structures Work
                  </TabsTrigger>
                  <TabsTrigger
                    value="protection-work"
                    className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Protection Work
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
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Payment Weightage by Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <ScrollArea className="h-96 p-6">
                  <MarkdownRenderer content={paymentWeightageContent} />
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          {/* Compatibility Analysis Section */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Compatibility Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <ScrollArea className="h-96 p-6">
                  <MarkdownRenderer content={compatibilityAnalysisContent} />
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          {/* Site Images Gallery */}
          {tender?.metadata?.["Location Images"]?.length > 0 && (
            <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Site Images Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {tender.metadata["Location Images"].map((image: string) => (
                    <div
                      key={image}
                      className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                      onClick={() => window.open(image, "_blank")}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={image}
                          alt="Site Image"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>

                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center text-xs text-gray-200 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <a
                            href={image}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Location
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
