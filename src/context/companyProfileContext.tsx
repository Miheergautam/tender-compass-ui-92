import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { toCamelCase } from "@/helpers";
import { useLocation } from "react-router-dom";

type OfficeLocation = {
  type: string;
  location: string;
};

type Site = {
  location: string;
};

type SitesInfo = {
  previousSites: Site[];
  currentSites: Site[];
};

type WorkType = string;

type BridgeWork = {
  minor: boolean;
  major: boolean;
  spanForMinor: number;
  spanForMajor: number;
  intensity: string;
};

type TenderAmountRange = {
  lowerLimit: number;
  upperLimit: number;
  description?: string;
};

export type CompanyProfile = {
  _id: string;
  companyName: string;
  contactPerson: string;
  contactPersonEmail: string;
  phoneNumber: string;
  officeLocations: OfficeLocation[];
  sitesInfo: SitesInfo[];
  workTypes: WorkType[];
  preferredAuthorities: string[];
  bridgeWork: BridgeWork;
  tenderAmountRange: TenderAmountRange;
  description: string;
  userId: string;
};

export interface CompanyProfileContextType {
  profile: CompanyProfile | null;
  defaultProfile: CompanyProfile;
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

const defaultProfile: CompanyProfile = {
  _id: "",
  companyName: "",
  contactPerson: "",
  contactPersonEmail: "",
  phoneNumber: "",
  officeLocations: [],
  sitesInfo: [],
  workTypes: [],
  preferredAuthorities: [],
  bridgeWork: {
    minor: false,
    major: false,
    spanForMinor: 0,
    spanForMajor: 0,
    intensity: "",
  },
  tenderAmountRange: {
    lowerLimit: 0,
    upperLimit: 2000,
    description: "",
  },
  description: "",
  userId: "",
};

const transformToSnakeCase = (updatedProfile: CompanyProfile) => {
  return {
    company_name: updatedProfile?.companyName || "",
    contact_person: updatedProfile?.contactPerson || "",
    contact_person_email:
      updatedProfile?.contactPersonEmail || "dummy@example.com",
    phone_number: updatedProfile?.phoneNumber || "1234567890",
    office_locations: updatedProfile?.officeLocations || [],
    sites_info:
      updatedProfile?.sitesInfo?.map((siteInfo) => ({
        previous_sites: siteInfo?.previousSites || [],
        current_sites: siteInfo?.currentSites || [],
      })) || [],
    work_types: updatedProfile?.workTypes || [],
    preferred_authorities: updatedProfile?.preferredAuthorities || [],
    bridge_work: {
      minor: updatedProfile?.bridgeWork?.minor || false,
      major: updatedProfile?.bridgeWork?.major || false,
      span_for_minor: updatedProfile?.bridgeWork?.spanForMinor || 0,
      span_for_major: updatedProfile?.bridgeWork?.spanForMajor || 0,
      intensity: updatedProfile?.bridgeWork?.intensity || "",
    },
    tender_amount_range: {
      lower_limit: updatedProfile?.tenderAmountRange?.lowerLimit || 0,
      upper_limit: updatedProfile?.tenderAmountRange?.upperLimit || 0,
    },
    description: updatedProfile?.description || "",
  };
};

export const CompanyProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const { pathname } = useLocation();
  const [firstUpdate, setFirstUpdate] = useState<boolean>(true);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8000/api/profile", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Failed to fetch profile:", data);
        if (data.detail.toLowerCase().trim() === "profile not found") {
          setFirstUpdate(true);
        }
        setProfile(defaultProfile);
        return;
      }

      if (!data || Object.keys(data).length === 0) {
        setProfile(defaultProfile);
        return;
      }

      const normalizedProfile = normalizeKeys(data) as CompanyProfile;
      setProfile(normalizedProfile);
      setFirstUpdate(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(defaultProfile);
    }
  }, []);

  useEffect(() => {
    const publicUrls = ["/", "/login"];
    if (publicUrls.includes(pathname)) return;

    fetchProfile();
  }, [pathname, fetchProfile]);

  const refetchProfile = () => {
    fetchProfile();
  };

  const updateProfile = async (updatedData: Partial<CompanyProfile>) => {
    if (!profile) {
      console.error("No profile loaded to update");
      return;
    }

    try {
      const oldProfile = { ...profile };
      const updatedProfile = { ...profile, ...updatedData };
      const transformedProfile = transformToSnakeCase(updatedProfile);

      const res = await fetch("http://localhost:8000/api/profile", {
        method: firstUpdate ? "POST" : "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedProfile),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const savedProfile = await res.json();

      if (!savedProfile || Object.keys(savedProfile).length === 0) {
        setProfile(oldProfile);
        return;
      }

      refetchProfile();

      if (firstUpdate) {
        setFirstUpdate(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  return (
    <CompanyProfileContext.Provider
      value={{ profile, defaultProfile, updateProfile }}
    >
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
