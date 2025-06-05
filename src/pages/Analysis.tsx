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
import { useTenderContext } from "@/context/TenderContext";
import { useParams } from "react-router-dom";

const Analysis = () => {
  const navigate = useNavigate();
  const { curTender, setCurTender, tenders } = useTenderContext();

  const [selectedImage, setSelectedImage] = useState<any>(null);

  // Calculate days left
  const submissionDate = new Date("2025-06-19");
  const today = new Date();
  const timeDiff = submissionDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) setCurTender(tenders.find((tender) => tender._id === id));
  }, [id, setCurTender, tenders]);

  // Tender bio data from placeholder
  const tenderBio = {
    brief: curTender?.Bio || "No tender bio available.",
    location: curTender?.Location || "No tender location available.",
    estimatedCost: curTender["Estimated Cost"] || "Not specified",
    emd: curTender?.EMD || "Not specified",
    length: curTender?.Length || "Not specified",
    type: curTender?.Type || "Not specified",
    downloadDocuments: curTender["Download Documents"] || "Not specified",
    organisation: curTender?.Organization || "Not specified",
    organisationId: curTender["Organization Tender ID"] || "Not specified",
    website: curTender?.Website || "Not specified",
    submissionDeadline: curTender["Submission Date"] || "Not specified",
    compatibilityScore: 83,
  };

  // Location insights data
  const locationInsights = [
    {
      title: "Terrain",
      content: curTender?.metadata?.Terrain || "No data available",
    },
    {
      title: "Climate",
      content: curTender?.metadata?.Climate || "No data available",
    },
    {
      title: "Logistics",
      content: curTender?.metadata?.Logistics || "No data available",
    },
    {
      title: "Safety",
      content: curTender?.metadata?.Safety || "No data available",
    },
    {
      title: "Soil Type",
      content: curTender?.metadata?.SoilType || "No data available",
    },
    {
      title: "Material Availability",
      content: curTender?.metadata?.MaterialAvailability || "No data available",
    },
  ];

  // Nature of work content
  const workCategories = {
    "road-composition": curTender?.metadata["Road Composition"],

    "roadside-drainage": curTender?.metadata["Roadside Drainage"],

    "structures-work": curTender?.metadata["Structures Work"],

    "protection-work": curTender?.metadata["Protection Work"],
  };

  // Payment weightage content
  const paymentWeightageContent = curTender?.metadata["Payment Weightage"];

  const siteImages = [
    {
      id: "1",
      src: curTender?.metadata["Location Images"][0],
      title: "Rishi-Rongli-Kupup Road Overview",
      location: "Sikkim Border Route",
      date: "2024-03-15",
      link: curTender?.metadata["Location Images"][0],
    },
    {
      id: "2",
      src: curTender?.metadata["Location Images"][1],
      title: "High Altitude Terrain",
      location: "Kupup Area",
      date: "2024-03-14",
      link: curTender?.metadata["Location Images"][1],
    },
    {
      id: "3",
      src: curTender?.metadata["Location Images"][2],
      title: "Mountain Road Construction",
      location: "Rongli Section",
      date: "2024-03-13",
      link: curTender?.metadata["Location Images"][2],
    },
    {
      id: "4",
      src: curTender?.metadata["Location Images"][3],
      title: "Alpine Conditions",
      location: "High Altitude Section",
      date: "2024-03-12",
      link: curTender?.metadata["Location Images"][3],
    },
  ];

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locationInsights.map((insight, index) => (
                  <Card
                    key={index}
                    className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200 rounded-xl hover:shadow-md transition-all duration-300"
                  >
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-teal-700 mb-3 text-sm">
                        {insight.title}
                      </h4>
                      <ScrollArea className="h-24">
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

          {/* Site Images Gallery */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Site Images Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {siteImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => window.open(image.link, "_blank")}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.title}
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
                      <h4 className="font-medium text-xs truncate">
                        {image.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-200 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {image.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
