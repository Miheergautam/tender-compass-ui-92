import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Plus,
  X,
  Calendar,
  IndianRupee,
} from "lucide-react";
import CompatibilityScore from "./CompatibilityScore";
import {
  useCompanyProfile,
  CompanyProfile,
} from "@/context/companyProfileContext";
import { useToast } from "@/hooks/use-toast";
import DualRangeSlider from "./DualSlider";

const CompanyProfileTab: React.FC = () => {
  const { profile, defaultProfile, updateProfile } = useCompanyProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { toast } = useToast();

  const [editData, setEditData] = useState<CompanyProfile>(defaultProfile);

  useEffect(() => {
    if (profile) {
      setEditData(profile);
    }
  }, [profile]);

  const workTypeOptions = ["Item-rate", "EPC", "HAM", "BOT", "Others"];
  const authorityOptions = [
    "BRO",
    "NHAI",
    "NHIDCL",
    "State PWDs",
    "Municipal Corporations",
    "Others",
  ];

  const validateRequiredFields = () => {
    const requiredFields = [
      { field: editData?.companyName, name: "Company Name" },
      { field: editData?.contactPerson, name: "Contact Person" },
      { field: editData?.contactPersonEmail, name: "Email" },
      { field: editData?.phoneNumber, name: "Phone" },
      { field: editData?.description, name: "Description" },
    ];

    const missingFields = requiredFields.filter(
      ({ field }) => !field || field.toString().trim() === ""
    );

    if (missingFields.length > 0) {
      toast({
        variant: "destructive",
        title: "Required Fields Missing",
        description: `Please fill in: ${missingFields
          .map(({ name }) => name)
          .join(", ")}`,
      });
      return false;
    }

    // Add email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      editData?.contactPersonEmail &&
      !emailRegex.test(editData.contactPersonEmail)
    ) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return false;
    }

    // Add phone number validation (must be exactly 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (
      editData?.phoneNumber &&
      !phoneRegex.test(editData.phoneNumber.replace(/\s+/g, ""))
    ) {
      toast({
        variant: "destructive",
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
      });
      return false;
    }

    // Validate headquarters location
    if (!editData?.officeLocations || editData.officeLocations.length === 0) {
      toast({
        variant: "destructive",
        title: "Office Location Required",
        description: "Please add at least one office location (headquarters).",
      });
      return false;
    }

    // Check if headquarters exists and has required fields
    const headquarters = editData.officeLocations.find(
      (location) => location.type === "Headquarters"
    );

    if (!headquarters) {
      toast({
        variant: "destructive",
        title: "Headquarters Required",
        description: "Please designate one office location as headquarters.",
      });
      return false;
    }

    // Validate headquarters location field
    if (!headquarters.location || headquarters.location.trim() === "") {
      toast({
        variant: "destructive",
        title: "Headquarters Location Missing",
        description: "Please specify the headquarters location.",
      });
      return false;
    }

    return true;
  };

  const handleSaveProfile = async () => {
    if (!validateRequiredFields()) {
      return;
    }

    if (!editData) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Profile data is missing. Please try again.",
      });
      return;
    }

    try {
      await updateProfile(editData);

      setIsEditModalOpen(false);

      toast({
        title: "Profile Updated",
        description: "Your company profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description:
          error?.message ||
          "There was an error updating your profile. Please try again.",
      });
    }
  };

  const toggleWorkType = (workType: string) => {
    setEditData((prev) => ({
      ...prev,
      workTypes: prev.workTypes.includes(workType)
        ? prev.workTypes.filter((w) => w !== workType)
        : [...prev.workTypes, workType],
    }));
  };

  const toggleAuthority = (authority: string) => {
    setEditData((prev) => ({
      ...prev,
      preferredAuthorities: prev.preferredAuthorities.includes(authority)
        ? prev.preferredAuthorities.filter((a) => a !== authority)
        : [...prev.preferredAuthorities, authority],
    }));
  };

  const recentTenders = [
    {
      id: 1,
      name: "Highway Construction Project Phase 2",
      score: 92,
      date: "2024-01-15",
      organisation: "NHAI",
      amount: 850,
      location: "Maharashtra",
      deadline: "15-06-2025",
      workTypes: ["Highway", "Construction", "Infrastructure"],
    },
    {
      id: 2,
      name: "Bridge Development Initiative",
      score: 88,
      date: "2024-01-12",
      organisation: "State PWD",
      amount: 420,
      location: "Karnataka",
      deadline: "22-07-2025",
      workTypes: ["Bridge", "Development", "Infrastructure"],
    },
    {
      id: 3,
      name: "Water Management System Upgrade",
      score: 85,
      date: "2024-01-10",
      organisation: "Water Board",
      amount: 320,
      location: "Rajasthan",
      deadline: "30-08-2025",
      workTypes: ["Water Management", "System Upgrade", "Infrastructure"],
    },
    {
      id: 4,
      name: "Smart City Infrastructure Development",
      score: 79,
      date: "2024-01-08",
      organisation: "Smart City Mission",
      amount: 680,
      location: "Gujarat",
      deadline: "10-09-2025",
      workTypes: ["Smart City", "Infrastructure", "Technology"],
    },
    {
      id: 5,
      name: "Rural Road Connectivity Project",
      score: 91,
      date: "2024-01-05",
      organisation: "NRRDA",
      amount: 290,
      location: "Odisha",
      deadline: "18-10-2025",
      workTypes: ["Rural Roads", "Connectivity", "Infrastructure"],
    },
  ];

  const formatAmount = (amount: number) => {
    if (amount >= 100) {
      return `₹${amount.toFixed(2)} Cr.`;
    } else {
      return `₹${(amount * 10).toFixed(2)} L.`;
    }
  };

  // Manage addresses
  function getHeadquartersLocation(): string {
    const headquarters = editData.officeLocations?.find(
      (office) => office.type.toLowerCase() === "headquarters"
    );
    return headquarters ? headquarters.location : "";
  }

  function updateHeadquartersLocation(newHeadquartersLocation: string) {
    const existingHeadquarters = editData.officeLocations?.find(
      (office) => office.type.toLowerCase() === "headquarters"
    );

    if (existingHeadquarters) {
      // Update existing headquarters
      setEditData({
        ...editData,
        officeLocations: editData.officeLocations.map((office) => {
          if (office.type.toLowerCase() === "headquarters") {
            return {
              ...office,
              location: newHeadquartersLocation,
            };
          }
          return office;
        }),
      });
    } else {
      // Add new headquarters if none exists
      setEditData({
        ...editData,
        officeLocations: [
          ...(editData.officeLocations || []),
          {
            type: "Headquarters",
            location: newHeadquartersLocation,
          },
        ],
      });
    }
  }

  function addRegionalOffice(): void {
    setEditData((prev) => ({
      ...prev,
      officeLocations: [
        ...(prev.officeLocations || []),
        {
          type: "Branch",
          location: "",
        },
      ],
    }));
  }

  function updateRegionalOffice(index: number, newLocation: string): void {
    setEditData((prev) => {
      const regionalOffices =
        prev.officeLocations?.filter(
          (office) => office.type.toLowerCase() === "branch"
        ) || [];

      if (regionalOffices[index]) {
        const originalIndex = prev.officeLocations?.findIndex(
          (office) =>
            office.type.toLowerCase() === "branch" &&
            office === regionalOffices[index]
        );

        if (originalIndex !== -1 && originalIndex !== undefined) {
          const newOfficeLocations = [...(prev.officeLocations || [])];
          newOfficeLocations[originalIndex] = {
            ...newOfficeLocations[originalIndex],
            location: newLocation,
          };

          return {
            ...prev,
            officeLocations: newOfficeLocations,
          };
        }
      }

      return prev;
    });
  }

  function removeRegionalOffice(index: number): void {
    setEditData((prev) => {
      const regionalOffices =
        prev.officeLocations?.filter(
          (office) => office.type.toLowerCase() === "branch"
        ) || [];

      if (regionalOffices[index]) {
        const originalIndex = prev.officeLocations?.findIndex(
          (office) =>
            office.type.toLowerCase() === "branch" &&
            office === regionalOffices[index]
        );

        if (originalIndex !== -1 && originalIndex !== undefined) {
          const newOfficeLocations = [...(prev.officeLocations || [])];
          newOfficeLocations.splice(originalIndex, 1);

          return {
            ...prev,
            officeLocations: newOfficeLocations,
          };
        }
      }

      return prev;
    });
  }

  // Manage sites
  function addPreviousSite(): void {
    setEditData((prev) => {
      const newSitesInfo = prev.sitesInfo ? [...prev.sitesInfo] : [];

      if (!newSitesInfo[0]) {
        newSitesInfo[0] = { previousSites: [], currentSites: [] };
      } else {
        newSitesInfo[0] = { ...newSitesInfo[0] };
      }

      if (!newSitesInfo[0].previousSites) {
        newSitesInfo[0].previousSites = [];
      } else {
        newSitesInfo[0].previousSites = [...newSitesInfo[0].previousSites];
      }

      newSitesInfo[0].previousSites.push({
        location: "",
      });

      return {
        ...prev,
        sitesInfo: newSitesInfo,
      };
    });
  }

  function updatePreviousSite(index: number, location: string): void {
    setEditData((prev) => {
      if (prev.sitesInfo?.[0]?.previousSites?.[index]) {
        const newSitesInfo = [...prev.sitesInfo];
        newSitesInfo[0] = {
          ...newSitesInfo[0],
          previousSites: [...newSitesInfo[0].previousSites],
        };
        newSitesInfo[0].previousSites[index] = {
          ...newSitesInfo[0].previousSites[index],
          location,
        };

        return {
          ...prev,
          sitesInfo: newSitesInfo,
        };
      }

      return prev;
    });
  }

  function removePreviousSite(index: number): void {
    setEditData((prev) => {
      if (prev.sitesInfo?.[0]?.previousSites) {
        const newSitesInfo = [...prev.sitesInfo];
        newSitesInfo[0] = {
          ...newSitesInfo[0],
          previousSites: [...newSitesInfo[0].previousSites],
        };
        newSitesInfo[0].previousSites.splice(index, 1);

        return {
          ...prev,
          sitesInfo: newSitesInfo,
        };
      }

      return prev;
    });
  }

  function addCurrentSite(): void {
    setEditData((prev) => {
      const newSitesInfo = prev.sitesInfo ? [...prev.sitesInfo] : [];

      if (!newSitesInfo[0]) {
        newSitesInfo[0] = { previousSites: [], currentSites: [] };
      } else {
        newSitesInfo[0] = { ...newSitesInfo[0] };
      }

      if (!newSitesInfo[0].currentSites) {
        newSitesInfo[0].currentSites = [];
      } else {
        newSitesInfo[0].currentSites = [...newSitesInfo[0].currentSites];
      }

      newSitesInfo[0].currentSites.push({
        location: "",
      });

      return {
        ...prev,
        sitesInfo: newSitesInfo,
      };
    });
  }

  function updateCurrentSite(index: number, location: string): void {
    setEditData((prev) => {
      if (prev.sitesInfo?.[0]?.currentSites?.[index]) {
        const newSitesInfo = [...prev.sitesInfo];
        newSitesInfo[0] = {
          ...newSitesInfo[0],
          currentSites: [...newSitesInfo[0].currentSites],
        };
        newSitesInfo[0].currentSites[index] = {
          ...newSitesInfo[0].currentSites[index],
          location,
        };

        return {
          ...prev,
          sitesInfo: newSitesInfo,
        };
      }

      return prev;
    });
  }

  function removeCurrentSite(index: number): void {
    setEditData((prev) => {
      if (prev.sitesInfo?.[0]?.currentSites) {
        const newSitesInfo = [...prev.sitesInfo];
        newSitesInfo[0] = {
          ...newSitesInfo[0],
          currentSites: [...newSitesInfo[0].currentSites],
        };
        newSitesInfo[0].currentSites.splice(index, 1);

        return {
          ...prev,
          sitesInfo: newSitesInfo,
        };
      }

      return prev;
    });
  }

  // Check if basic company info is empty
  const isBasicInfoEmpty =
    !profile.companyName &&
    !profile.contactPerson &&
    !profile.contactPersonEmail &&
    !profile.phoneNumber &&
    !profile.description &&
    !profile.officeLocations.find(
      ({ type }) => type.toLowerCase() === "headquarters"
    );

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Company Profile
          </h2>
          <p className="text-gray-600">
            Manage your organization's information and track performance
          </p>
        </div>

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Company Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={editData?.companyName || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, companyName: e.target.value })
                    }
                    className="rounded-lg"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={editData.contactPerson || ""}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        contactPerson: e.target.value,
                      })
                    }
                    className="rounded-lg"
                    placeholder="Enter contact person name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    value={editData.contactPersonEmail || ""}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        contactPersonEmail: e.target.value,
                      })
                    }
                    className="rounded-lg"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={editData.phoneNumber || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, phoneNumber: e.target.value })
                    }
                    className="rounded-lg"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              {/* Addresses */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headquarters Address <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={getHeadquartersLocation()}
                  onChange={(e) => updateHeadquartersLocation(e.target.value)}
                  className="rounded-lg"
                  rows={2}
                  placeholder="Enter headquarters address"
                />
              </div>

              {/* Regional Offices */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Regional Offices
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addRegionalOffice()}
                    className="rounded-lg"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Office
                  </Button>
                </div>
                {editData.officeLocations
                  ?.filter((office) => office.type.toLowerCase() === "branch")
                  .map((office, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={office.location}
                        onChange={(e) =>
                          updateRegionalOffice(index, e.target.value)
                        }
                        placeholder="Regional office address"
                        className="rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeRegionalOffice(index)}
                        className="rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
              </div>

              {/* Previous Sites */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Previous Sites
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addPreviousSite()}
                    className="rounded-lg"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Site
                  </Button>
                </div>
                {editData.sitesInfo?.[0]?.previousSites?.map((site, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={site.location}
                      onChange={(e) =>
                        updatePreviousSite(index, e.target.value)
                      }
                      placeholder="Previous site location"
                      className="rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removePreviousSite(index)}
                      className="rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Current Sites */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Current Sites
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addCurrentSite()}
                    className="rounded-lg"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Site
                  </Button>
                </div>
                {editData.sitesInfo?.[0]?.currentSites?.map((site, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={site.location}
                      onChange={(e) => updateCurrentSite(index, e.target.value)}
                      placeholder="Current site location"
                      className="rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeCurrentSite(index)}
                      className="rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Work Types Multi-select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Types
                </label>
                <div className="flex flex-wrap gap-2">
                  {workTypeOptions.map((workType) => (
                    <div
                      key={workType}
                      onClick={() => toggleWorkType(workType)}
                      className={`px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                        editData.workTypes?.includes(workType)
                          ? "bg-teal-100 border-teal-500 text-teal-800"
                          : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {workType}
                    </div>
                  ))}
                </div>
              </div>

              {/* Preferred Authorities Multi-select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Authorities
                </label>
                <div className="flex flex-wrap gap-2">
                  {authorityOptions.map((authority) => (
                    <div
                      key={authority}
                      onClick={() => toggleAuthority(authority)}
                      className={`px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                        editData.preferredAuthorities?.includes(authority)
                          ? "bg-blue-100 border-blue-500 text-blue-800"
                          : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {authority}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tender Amount Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tender Amount Range
                </label>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Lower Limit (₹ Cr)
                    </label>
                    <Input
                      type="number"
                      value={editData.tenderAmountRange?.lowerLimit || 0}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          tenderAmountRange: {
                            ...editData.tenderAmountRange,
                            lowerLimit: Math.max(
                              0,
                              Math.min(
                                Number(e.target.value),
                                (editData.tenderAmountRange?.upperLimit ||
                                  2000) - 10
                              )
                            ),
                          },
                        })
                      }
                      className="rounded-lg"
                      min="0"
                      max="2000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Upper Limit (₹ Cr)
                    </label>
                    <Input
                      type="number"
                      value={editData.tenderAmountRange?.upperLimit || 2000}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          tenderAmountRange: {
                            ...editData.tenderAmountRange,
                            upperLimit: Math.min(
                              2000,
                              Math.max(
                                Number(e.target.value),
                                (editData.tenderAmountRange?.lowerLimit || 0) +
                                  10
                              )
                            ),
                          },
                        })
                      }
                      className="rounded-lg"
                      min="0"
                      max="2000"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <DualRangeSlider
                    value={[
                      editData.tenderAmountRange?.lowerLimit || 0,
                      editData.tenderAmountRange?.upperLimit || 2000,
                    ]}
                    onValueChange={([lowerLimit, upperLimit]) =>
                      setEditData({
                        ...editData,
                        tenderAmountRange: { lowerLimit, upperLimit },
                      })
                    }
                    min={0}
                    max={2000}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹0 Cr</span>
                    <span className="text-center font-medium text-blue-600">
                      ₹{editData.tenderAmountRange?.lowerLimit || 0} Cr - ₹
                      {editData.tenderAmountRange?.upperLimit || 2000} Cr
                    </span>
                    <span>₹2000 Cr</span>
                  </div>
                </div>
              </div>

              {/* Bridge Works */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Bridge Works
                </h3>
                {/* Minor Bridges */}
                <div className="space-y-3">
                  <h4 className="text-md font-medium text-gray-700">
                    Minor Bridges
                  </h4>
                  <div className="flex items-center space-x-3">
                    <Label htmlFor="minor-comfortable">Comfortable?</Label>
                    <Switch
                      id="minor-comfortable"
                      checked={editData.bridgeWork?.minor || false}
                      onCheckedChange={(checked) =>
                        setEditData({
                          ...editData,
                          bridgeWork: {
                            ...editData.bridgeWork,
                            minor: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Max Span: {editData.bridgeWork?.spanForMinor || 0}m
                    </Label>
                    <Slider
                      value={[editData.bridgeWork?.spanForMinor || 0]}
                      onValueChange={([value]) =>
                        setEditData({
                          ...editData,
                          bridgeWork: {
                            ...editData.bridgeWork,
                            spanForMinor: value,
                          },
                        })
                      }
                      min={0}
                      max={50}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0m</span>
                      <span>50m</span>
                    </div>
                  </div>
                </div>

                {/* Major Bridges */}
                <div className="space-y-3">
                  <h4 className="text-md font-medium text-gray-700">
                    Major Bridges
                  </h4>
                  <div className="flex items-center space-x-3">
                    <Label htmlFor="major-comfortable">Comfortable?</Label>
                    <Switch
                      id="major-comfortable"
                      checked={editData.bridgeWork?.major || false}
                      onCheckedChange={(checked) =>
                        setEditData({
                          ...editData,
                          bridgeWork: {
                            ...editData.bridgeWork,
                            major: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Max Span: {editData.bridgeWork?.spanForMajor || 0}m
                    </Label>
                    <Slider
                      value={[editData.bridgeWork?.spanForMajor || 0]}
                      onValueChange={([value]) =>
                        setEditData({
                          ...editData,
                          bridgeWork: {
                            ...editData.bridgeWork,
                            spanForMajor: value,
                          },
                        })
                      }
                      min={0}
                      max={300}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0m</span>
                      <span>300m</span>
                    </div>
                  </div>
                </div>

                {/* Bridge Work Intensity */}
                <div className="space-y-3">
                  <Label>Preferred Bridge-Work Intensity</Label>
                  <RadioGroup
                    value={editData?.bridgeWork?.intensity || "Low"}
                    onValueChange={(value) =>
                      setEditData({
                        ...editData,
                        bridgeWork: {
                          ...editData.bridgeWork,
                          intensity: value,
                        },
                      })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Low" id="low" />
                      <Label htmlFor="low">Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Medium" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="High" id="high" />
                      <Label htmlFor="high">High</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={editData.description || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  className="rounded-lg"
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveProfile}
                  className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Company Information */}
        <Card className="rounded-xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-teal-600" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isBasicInfoEmpty ? (
              <p className="text-gray-500 text-center py-12 px-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
                <span className="block text-lg font-medium text-gray-700 mb-2">
                  No Details Found
                </span>
                Click on Edit Profile and add your company's details.
              </p>
            ) : (
              <>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {profile.companyName}
                  </h3>
                  <p className="text-gray-600">{profile.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Headquarters
                        </p>
                        <p className="text-sm text-gray-600">
                          {getHeadquartersLocation()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Email
                        </p>
                        <p className="text-sm text-gray-600">
                          {profile.contactPersonEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Contact Person
                        </p>
                        <p className="text-sm text-gray-600">
                          {profile.contactPerson}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Phone
                        </p>
                        <p className="text-sm text-gray-600">
                          {profile.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Last 5 Analyzed Tenders */}
        <Card className="rounded-xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Last 5 Analyzed Tenders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTenders.map((tender) => (
                <Card
                  key={tender.id}
                  className="group hover:shadow-lg transition-all duration-200 border-0 rounded-xl bg-white shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1 pr-4">
                            <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2">
                              {tender.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {tender.organisation}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {tender.workTypes
                                .slice(0, 3)
                                .map((workType, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                  >
                                    {workType}
                                  </span>
                                ))}
                            </div>
                          </div>

                          <div className="flex-shrink-0">
                            <CompatibilityScore
                              score={tender.score}
                              showTooltip={false}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <IndianRupee className="w-4 h-4 mr-2" />
                            <span className="font-medium">
                              {formatAmount(tender.amount)}
                            </span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{tender.location}</span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>
                              Analyzed:{" "}
                              {new Date(tender.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          variant="outline"
                          className="border-teal-200 rounded-lg text-teal-700 hover:bg-teal-50 transition-all duration-200"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyProfileTab;
