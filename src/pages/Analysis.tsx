import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTenderContext, Tender } from "@/context/tenderContext";
import EPCAnalysis from "@/components/analysis/EPCAnalysis";
import HAMAnalysis from "@/components/analysis/HAMAnalysis";
import BOTAnalysis from "@/components/analysis/BOTAnalysis";
import ItemRateAnalysis from "@/components/analysis/ItemRateAnalysis";
import OthersAnalysis from "@/components/analysis/OthersAnalysis";

const Analysis = () => {
  const { tender_id } = useParams<{ tender_id: string }>();
  const { tenders, loading, error } = useTenderContext();
  const [tender, setTender] = useState<Tender>(null);

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

  const renderAnalysisComponent = () => {
    switch (tender?.metadata?.type.toUpperCase()) {
      case "EPC":
        return <EPCAnalysis tenderData={tender} />;
      case "HAM":
        return <HAMAnalysis tenderData={tender} />;
      case "ITEM-RATE":
        return <ItemRateAnalysis tenderData={tender} />;
      case "BOT":
        return <BOTAnalysis tenderData={tender} />;
      case "OTHERS":
        return <OthersAnalysis tenderData={tender} />;
      default:
        return <EPCAnalysis tenderData={tender} />;
    }
  };

  return renderAnalysisComponent();
};

export default Analysis;
