import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { toCamelCase } from "@/helpers";
import { useLocation } from "react-router-dom";

type OfficeLocation = {
  type: string;
  location: string;
};

type Site = {
  name: string;
  value: string;
  location: string;
};

type PreferredTender = {
  work: string;
  mode_order: string[];
  authority: string[];
  amount_range_cr: string;
};

type BridgeWork = {
  minor: boolean;
  span_up_to_m: number;
  major: boolean;
  comfort_level: string;
};

export type CompanyProfile = {
  _id: string;
  companyName: string;
  officeLocations: OfficeLocation[];
  ongoingSites: Site[];
  previousWorks: string[];
  preferredTender: PreferredTender;
  bridgeWork: BridgeWork;
  userId: string;
};

export interface CompanyProfileContextType {
  profile: CompanyProfile | null;
  updateProfile: (updatedData: Partial<CompanyProfile>) => Promise<void>;
}

const CompanyProfileContext = createContext<
  CompanyProfileContextType | undefined
>(undefined);

function normalizeKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(normalizeKeys);
  } else if (obj !== null && typeof obj === "object") {
    const result: Record<string, any> = {};
    for (const key in obj) {
      if (!key) continue;
      const newKey = toCamelCase(key);
      result[newKey] = normalizeKeys(obj[key]);
    }
    return result;
  }
  return obj;
}

export const CompanyProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    const publicUrls = ["/", "/login"];
    if (publicUrls.includes(pathname)) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/profile", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        console.log("Fetched profile data:", data);

        if (!data || Object.keys(data).length === 0) {
          setProfile(null);
          return;
        }

        const normalizedProfile = normalizeKeys(data) as CompanyProfile;
        setProfile(normalizedProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      }
    };

    fetchProfile();
  }, [pathname]);

  const updateProfile = async (updatedData: Partial<CompanyProfile>) => {
    if (!profile) {
      console.error("No profile loaded to update");
      return;
    }

    try {
      const updatedProfile = { ...profile, ...updatedData };

      const res = await fetch("http://localhost:8000/api/profile", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const savedProfile = await res.json();

      if (!savedProfile || Object.keys(savedProfile).length === 0) {
        setProfile(null);
        return;
      }

      const normalizedProfile = normalizeKeys(savedProfile) as CompanyProfile;
      setProfile(normalizedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  return (
    <CompanyProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </CompanyProfileContext.Provider>
  );
};

export const useCompanyProfile = () => {
  const context = useContext(CompanyProfileContext);
  if (!context) {
    throw new Error(
      "useCompanyProfile must be used within a CompanyProfileProvider"
    );
  }
  return context;
};
