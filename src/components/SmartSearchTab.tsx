import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Calendar,
  IndianRupee,
  SlidersHorizontal,
  Save,
  Check,
  Ruler,
} from "lucide-react";
import CompatibilityScore from "./CompatibilityScore";
import { Tender } from "../types/tender";
import { useNavigate } from "react-router-dom";

import { useTenderContext } from "@/context/TenderContext";

interface SmartSearchTabProps {
  onAnalyze: (id: string) => void;
  onSaveTender: (tender: Tender) => void;
}

const SmartSearchTab: React.FC<SmartSearchTabProps> = ({
  onAnalyze,
  onSaveTender,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrganisation, setSelectedOrganisation] = useState("all");
  const [selectedOrgType, setSelectedOrgType] = useState("all");
  const [selectedContType, setSelectedContType] = useState("all");
  const [selectedOwnership, setSelectedOwnership] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [amountLowerLimit, setAmountLowerLimit] = useState("");
  const [amountUpperLimit, setAmountUpperLimit] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [showFilters, setShowFilters] = useState(false);
  const [savedTenders, setSavedTenders] = useState<Set<string>>(new Set());

  const navigate = useNavigate();

  const { tenders, loading, error } = useTenderContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-600 text-sm">Loading tenders...</p>
      </div>
    );
  }

  if (error || !tenders) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-red-600 text-sm">
          Failed to load tenders. Please try again.
        </p>
      </div>
    );
  }

  const organisations = Array.from(
    new Set(tenders.map((t) => t.organization))
  ).filter((org) => org);

  const contractTypes = Array.from(
    new Set(tenders.map((t) => t.metadata?.type))
  ).filter((type) => type);

  const states = Array.from(
    new Set(
      tenders.map((t) => {
        const location = t.location || "";
        const parts = location.split(",");
        return parts.length === 2 ? parts[1].trim() : parts[0].trim();
      })
    )
  ).filter((state) => state);

  // const organisationTypes = [
  //   "Government",
  //   "PSU",
  //   "Private",
  //   "Autonomous Body",
  //   "Corporation",
  //   "EPC Contract",
  // ];
  const ownershipTypes = [
    "Central",
    "State",
    "Municipal",
    "Private",
    "Joint Venture",
  ];
  // const states = [
  //   "Himachal Pradesh",
  //   "Delhi",
  //   "Maharashtra",
  //   "Karnataka",
  //   "Tamil Nadu",
  //   "Rajasthan",
  //   "Kerala",
  //   "Haryana",
  //   "Uttar Pradesh",
  //   "West Bengal",
  //   "Telangana",
  //   "Andhra Pradesh",
  //   "Gujarat",
  //   "Bihar",
  //   "Odisha",
  //   "Assam",
  //   "Madhya Pradesh",
  //   "Sikkim",
  // ];

  function parseEstimatedCost(costStr) {
    const match = costStr.match(/([\d,.]+)\s*Cr\.?/i);
    if (!match) return NaN;
    return parseFloat(match[1].replace(/,/g, ""));
  }

  const filteredAndSortedTenders = useMemo(() => {
    const filtered = tenders.filter((tender) => {
      const matchesSearch =
        tender.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesOrg =
        selectedOrganisation === "all" ||
        tender.organization.toLowerCase() ===
          selectedOrganisation.toLowerCase();

      // Amount filtering with lower and upper limits
      let matchesAmount = true;
      const estimatedCostCr = parseEstimatedCost(tender.estimatedCost);

      if (amountLowerLimit && !isNaN(Number(amountLowerLimit))) {
        matchesAmount =
          matchesAmount && estimatedCostCr >= Number(amountLowerLimit);
      }

      if (amountUpperLimit && !isNaN(Number(amountUpperLimit))) {
        matchesAmount =
          matchesAmount && estimatedCostCr <= Number(amountUpperLimit);
      }

      // State filter
      const matchesState =
        selectedState === "all" ||
        (tender.location &&
          tender.location.toLowerCase() === selectedState.toLowerCase());

      // Organization type filter
      const matchesContType =
        selectedContType === "all" ||
        (tender.metadata?.type &&
          tender.metadata.type.toLowerCase() ===
            selectedContType.toLowerCase());

      return (
        matchesSearch &&
        matchesOrg &&
        matchesAmount &&
        matchesState &&
        matchesContType
      );
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.score - a.score;
        case "amount":
          return b.estimatedCost - a.estimatedCost;
        case "date":
          return (
            new Date(a.submissionDate).getTime() -
            new Date(b.submissionDate).getTime()
          );
        default:
          return b.score - a.score;
      }
    });

    return filtered;
  }, [
    searchTerm,
    selectedOrganisation,
    amountLowerLimit,
    amountUpperLimit,
    sortBy,
    tenders,
    selectedState,
    selectedContType,
  ]);

  const formatAmount = (amount: number) => {
    if (amount >= 100) {
      return `₹${amount.toFixed(2)} Cr.`;
    } else {
      return `₹${(amount * 10).toFixed(2)} L.`;
    }
  };

  const handleSaveTender = (tender: Tender) => {
    const tenderWithSaveDate = {
      ...tender,
      savedDate: new Date().toISOString().split("T")[0],
    };
    onSaveTender(tenderWithSaveDate);
    setSavedTenders((prev) => new Set([...prev, tender.id]));

    // Remove from saved state after 2 seconds to allow re-saving
    setTimeout(() => {
      setSavedTenders((prev) => {
        const newSet = new Set(prev);
        newSet.delete(tender.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex-shrink-0 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Smart Search</h2>
            <p className="text-gray-600">
              Discover and analyze relevant tenders
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="AI search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl border-2 border-gray-200 focus:border-teal-400"
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Organisation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organisation
                </label>
                <Select
                  value={selectedOrganisation}
                  onValueChange={setSelectedOrganisation}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All Organisations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Organisations</SelectItem>
                    {organisations.map((org) => (
                      <SelectItem key={org} value={org}>
                        {org}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Contract Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contract Type
                </label>
                <Select
                  value={selectedContType}
                  onValueChange={setSelectedContType}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {contractTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ownership */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ownership
                </label>
                <Select
                  value={selectedOwnership}
                  onValueChange={setSelectedOwnership}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All Ownership" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ownership</SelectItem>
                    {ownershipTypes.map((ownership) => (
                      <SelectItem key={ownership} value={ownership}>
                        {ownership}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Range (₹ Cr.)
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min"
                    value={amountLowerLimit}
                    onChange={(e) => setAmountLowerLimit(e.target.value)}
                    className="rounded-lg"
                    type="number"
                  />
                  <Input
                    placeholder="Max"
                    value={amountUpperLimit}
                    onChange={(e) => setAmountUpperLimit(e.target.value)}
                    className="rounded-lg"
                    type="number"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Compatibility Score</SelectItem>
                    <SelectItem value="amount">Tender Amount</SelectItem>
                    <SelectItem value="date">Deadline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Showing X of Y */}
              <div className="mt-4 text-sm text-gray-500 font-medium text-center sm:text-right sm:col-span-3">
                Showing {filteredAndSortedTenders.length} of {tenders.length}{" "}
                tenders
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Tenders List */}
      <div className="flex-1 pb-6 overflow-hidden">
        <div className="h-full overflow-y-auto space-y-4 pr-2">
          {filteredAndSortedTenders.map((tender) => (
            <Card
              key={tender._id}
              className="group hover:shadow-lg transition-all duration-200 border-0 rounded-xl bg-white shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 pr-4">
                        <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2">
                          {tender?.bio.slice(0, 150)}...
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {tender?.organization}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {tender?.metadata?.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <CompatibilityScore
                          score={tender?.score}
                          showTooltip={false}
                          id={tender?._id}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <IndianRupee className="w-4 h-4 mr-2" />
                        <span className="font-medium">
                          {tender?.estimatedCost}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{tender?.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Ruler className="w-4 h-4 mr-2" />
                        <span>{tender?.metadata?.length}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Deadline: {tender?.submissionDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => {
                        navigate(`../analysis/${tender._id}`);
                      }}
                      className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200"
                    >
                      Analyse
                    </Button>

                    <Button
                      variant="outline"
                      className={`border-teal-200 rounded-lg transition-all duration-200 ${
                        savedTenders.has(tender._id)
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "text-teal-700 hover:bg-teal-50"
                      }`}
                    >
                      {savedTenders.has(tender._id) ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredAndSortedTenders.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tenders found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartSearchTab;
