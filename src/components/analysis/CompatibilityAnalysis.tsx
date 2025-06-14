import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import CompatibilityAnalysisRenderer from "./CompatibilityAnalysisRenderer";
import { Tender } from "../../context/tenderContext";

const CompatibilityAnalysis = ({ tenderData }: { tenderData: Tender }) => {
  return (
    <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Compatibility Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
          <ScrollArea className="h-auto p-6">
            <CompatibilityAnalysisRenderer
              content={tenderData?.compatibilityAnalysis}
            />
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
export default CompatibilityAnalysis;
