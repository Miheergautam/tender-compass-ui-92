import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Tender = {
  _id: string;
  id: string;
  Bio: string;
  Location: string;
  SubmissionDate: string;
  EMD: string;
  Organization: string;
  OrganizationTenderID: string;
  Website: string;
  DownloadDocuments: string;
  Length: string;
  Type: string;
  zip_file_id: string;
  metadata: Record<string, string>; // Could also be strongly typed if needed
};

type TenderContextType = {
  tenders: Tender[];
  loading: boolean;
  error: string | null;
};

const TenderContext = createContext<TenderContextType | undefined>(undefined);

export const useTenderContext = () => {
  const context = useContext(TenderContext);
  if (!context) {
    throw new Error("useTenderContext must be used within a TenderProvider");
  }
  return context;
};

export const TenderProvider = ({ children }: { children: ReactNode }) => {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/tenders");
        if (!response.ok) throw new Error("Failed to fetch tenders");
        const data = await response.json();
        setTenders(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTenders();
  }, []);

  return (
    <TenderContext.Provider value={{ tenders, loading, error }}>
      {children}
    </TenderContext.Provider>
  );
};
