import { Tender } from "@/context/tenderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarkdownRenderer from "./MarkdownRenderer";
import { ExternalLink } from "lucide-react";

const LocationInsights = ({ tenderData }: { tenderData: Tender }) => {
  const locationInsights = [
    {
      title: "Terrain",
      content: tenderData?.metadata?.terrain || "",
    },
    {
      title: "Climate",
      content: tenderData?.metadata?.climate || "",
    },

    {
      title: "Logistics",
      content: tenderData?.metadata?.logistics || "",
    },
    {
      title: "Safety",
      content: tenderData?.metadata?.safety || "",
    },
    {
      title: "Soil Type",
      content: tenderData?.metadata?.soilType || "",
    },
    {
      title: "Material Availability",
      content: tenderData?.metadata?.materialAvailability || "",
    },
  ];

  const locationCitationLinks = [
    {
      title: "bhuvan.nrsc.gov.in",
      url: "https://bhuvan.nrsc.gov.in/home/index.php",
    },
    {
      title: "gsi.gov.in",
      url: "https://www.gsi.gov.in/webcenter/portal/OCBIS",
    },
    {
      title: "geonames.org",
      url: "https://www.geonames.org/servlet/geonames",
    },
  ];
  return (
    <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Location Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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

        {/* Citations Section */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            <span className="font-semibold text-gray-900">Citations - </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {locationCitationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 text-xs font-medium transition"
                >
                  <span>{link.title}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationInsights;
