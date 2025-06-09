import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { toCamelCase } from "@/helpers";

export type Tender = {
  _id: string;
  bio: string;
  location: string;
  submissionDate: string;
  emd: string;
  organization: string;
  organizationTenderId: string;
  website: string;
  downloadDocuments: string;
  length: string;
  type: string;
  zip_file_id: string;
  metadata: Record<string, string | null>;
  score: number | null;
  score_analysis: string | null;
  estimatedCost: number | null;
};

type TenderContextType = {
  tenders: Tender[];
  loading: boolean;
  error: string | null;
};

function normalizeKeys(
  obj: Record<string | null, string | null>
): Record<string, string | null> {
  const result: Record<string, string | null> = {};
  for (const key in obj) {
    if (!key) continue;
    const newKey = toCamelCase(key);
    result[newKey] = obj[key];
  }
  return result;
}

const TenderContext = createContext<TenderContextType | undefined>(undefined);

export const TenderProvider = ({ children }: { children: ReactNode }) => {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tendersRes, scoresRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/tenders"),
          fetch("http://127.0.0.1:8000/api/compatibility"),
        ]);

        if (!tendersRes.ok || !scoresRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [tendersData, scoresData] = await Promise.all([
          tendersRes.json(),
          scoresRes.json(),
        ]);

        const enrichedTenders = tendersData.map((tender) => {
          const scoreObj = scoresData.find(
            (score) => score.tender_id === tender._id
          );

          return {
            ...tender,
            metadata: normalizeKeys(tender.metadata),
            score: scoreObj?.compatibility_score ?? null,
            score_analysis: scoreObj?.compatibility_analysis ?? null,
          };
        });

        setTenders(enrichedTenders);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <TenderContext.Provider value={{ tenders, loading, error }}>
      {children}
    </TenderContext.Provider>
  );
};

export const useTenderContext = () => {
  const context = useContext(TenderContext);
  if (!context) {
    throw new Error("useTenderContext must be used within a TenderProvider");
  }
  return context;
};
