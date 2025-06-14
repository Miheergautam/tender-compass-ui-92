import { Tender } from "@/context/tenderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import TruncatedText from "./TurncatedText";
import { TrendingUp, Target, AlertTriangle } from "lucide-react";

const BioAndScore = ({
  tenderData,
  isOthers = false,
}: {
  tenderData: Tender;
  isOthers?: boolean;
}) => {
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

  const scoreData = getScoreColor(tenderData.compatibilityScore);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset =
    circumference - (tenderData.compatibilityScore / 100) * circumference;

  // Calculate days left
  let daysLeft = null;
  if (tenderData?.submissionDate) {
    const submissionDate = new Date(tenderData?.submissionDate);
    const today = new Date();
    const timeDiff = submissionDate.getTime() - today.getTime();
    daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  return (
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
                {daysLeft
                  ? daysLeft > 0
                    ? `${daysLeft} days left`
                    : "Deadline passed"
                  : ""}
              </div>
              <div className="text-sm text-gray-500">
                {" "}
                {daysLeft ? "to submit" : ""}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-gray-700 text-sm leading-relaxed">
              {tenderData?.bio}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
              <p className="font-medium text-gray-700 text-sm">
                {tenderData?.location}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Submission Date
              </p>
              <p className="font-medium text-gray-700 text-sm">
                {tenderData?.submissionDate}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Estimated Cost
              </p>
              <p className="font-semibold text-teal-700 text-sm">
                ₹{tenderData?.estimatedCost}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">EMD</p>
              <p className="font-medium text-gray-700 text-sm">
                ₹{tenderData?.emd}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Length</p>
              <p className="font-medium text-gray-700 text-sm">
                {tenderData?.metadata?.length}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Type</p>
              <p className="font-medium text-gray-700 text-sm">
                {tenderData?.metadata?.type === "EPC Contract"
                  ? "EPC"
                  : tenderData?.metadata?.type}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Download Documents
              </p>
              {tenderData?.downloadDocuments && (
                <a
                  href={tenderData?.downloadDocuments}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  Download <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Organisation
              </p>
              <p className="font-medium text-gray-700 text-sm">
                {tenderData?.organization}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Organisation ID
              </p>
              <p className="font-medium text-gray-700 text-sm break-words max-w-[18ch]">
                {
                  <TruncatedText
                    text={tenderData?.organizationTenderId || ""}
                    limit={17}
                  />
                }
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Website</p>
              {tenderData?.website && (
                <a
                  href={tenderData?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  Visit Website <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}
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
          {tenderData?.compatibilityScore ? (
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
                  <div className={`text-3xl font-bold ${scoreData.color} mb-1`}>
                    {tenderData?.compatibilityScore}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    out of 100
                  </div>
                  <scoreData.icon
                    className={`w-5 h-5 mt-1 ${scoreData.color}`}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32">
              <AlertTriangle className="w-8 h-8 text-gray-400 mb-2" />
              <div className="text-lg font-semibold text-gray-600 mb-1">
                Score Unavailable
              </div>
              <div className="text-xs text-gray-500">
                {isOthers
                  ? " Analysis not available for this tender type"
                  : `${
                      tenderData?.metadata?.type === "EPC Contract"
                        ? "EPC"
                        : tenderData?.metadata?.type
                    } project analysis not available`}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default BioAndScore;
