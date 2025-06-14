import { Tender } from "@/context/tenderContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarkdownRenderer from "@/components/analysis/MarkdownRenderer";

const PaymentWeightage = ({ tenderData }: { tenderData: Tender }) => {
  return (
    <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          Payment Weightage by Work
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
          <ScrollArea className="h-96 p-6">
            <MarkdownRenderer
              content={tenderData?.metadata?.paymentWeightage}
            />
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
export default PaymentWeightage;
