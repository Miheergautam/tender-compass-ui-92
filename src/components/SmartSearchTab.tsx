import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DualRangeSlider from "@/components/DualSlider";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CompatibilityScore from "./CompatibilityScore";
import { Tender } from "../context/tenderContext";
import { useTenderContext } from "../context/tenderContext";

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
  const [selectedState, setSelectedState] = useState("all");
  const [amountRange, setAmountRange] = useState([10, 2000]);
  const [sortBy, setSortBy] = useState("score");
  const [showFilters, setShowFilters] = useState(false);
  const [savedTenders, setSavedTenders] = useState<Set<string>>(new Set());
  const [todayTendersOnly, setTodayTendersOnly] = useState(false);
  const [selectedWorkType, setSelectedWorkType] = useState("EPC");
  const [currentPage, setCurrentPage] = useState(1);
  const tendersPerPage = 10;

  const { tenders, loading, error } = useTenderContext();

  function parseEstimatedCost(costStr) {
    const match = costStr.match(/([\d,.]+)\s*Cr\.?/i);
    if (!match) return NaN;
    return parseFloat(match[1].replace(/,/g, ""));
  }

  const filteredAndSortedTenders = useMemo(() => {
    if (!tenders || tenders.length === 0) {
      return [];
    }

    const today = new Date().toISOString().split("T")[0];

    const filtered = tenders.filter((tender) => {
      const matchesSearch =
        !searchTerm ||
        searchTerm.trim() === "" ||
        tender.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.location?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesOrg =
        selectedOrganisation === "all" ||
        tender.organization === selectedOrganisation;

      const matchesAmount =
        !amountRange ||
        amountRange.length !== 2 ||
        (parseEstimatedCost(tender.estimatedCost) >= amountRange[0] &&
          parseEstimatedCost(tender.estimatedCost) <= amountRange[1]);

      const matchesToday = !todayTendersOnly || tender.submissionDate === today;

      const matchesWorkType =
        selectedWorkType.toLowerCase() === "all" ||
        selectedWorkType.toLowerCase() === "others" ||
        tender.metadata?.type
          ?.toLowerCase()
          ?.includes(selectedWorkType.toLowerCase());

      return (
        matchesSearch &&
        matchesOrg &&
        matchesAmount &&
        matchesToday &&
        matchesWorkType
      );
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.compatibilityScore - a.compatibilityScore;
        case "amount":
          return b.estimatedCost - a.estimatedCost;
        case "date":
          return (
            new Date(a.submissionDate).getTime() -
            new Date(b.submissionDate).getTime()
          );
        default:
          return b.compatibilityScore - a.compatibilityScore;
      }
    });

    return filtered;
  }, [
    searchTerm,
    selectedOrganisation,
    amountRange,
    sortBy,
    todayTendersOnly,
    selectedWorkType,
    tenders,
  ]);

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

  const workTypes = ["Item-rate", "EPC", "HAM", "BOT", "Others"];

  const organisations = Array.from(
    new Set(tenders.map((t) => t.organization))
  ).filter((org) => org);

  const states = Array.from(
    new Set(
      tenders.map((t) => {
        const location = t.location || "";
        const parts = location.split(",");
        return parts.length === 2 ? parts[1].trim() : parts[0].trim();
      })
    )
  ).filter((state) => state);

  const totalPages = Math.ceil(
    filteredAndSortedTenders.length / tendersPerPage
  );
  const startIndex = (currentPage - 1) * tendersPerPage;
  const currentTenders = filteredAndSortedTenders.slice(
    startIndex,
    startIndex + tendersPerPage
  );

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
    setSavedTenders((prev) => new Set([...prev, tender._id]));

    setTimeout(() => {
      setSavedTenders((prev) => {
        const newSet = new Set(prev);
        newSet.delete(tender._id);
        return newSet;
      });
    }, 2000);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Smart Search</h2>
            <p className="text-gray-600">
              Discover and analyze relevant tenders
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={todayTendersOnly ? "default" : "outline"}
              onClick={() => setTodayTendersOnly(!todayTendersOnly)}
              className={`flex items-center gap-2 ${
                todayTendersOnly
                  ? "bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Today Tenders
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Work Type Selection */}
        <div className="flex gap-0 p-1 bg-gray-100 rounded-lg">
          {workTypes.map((type) => (
            <Button
              key={type}
              variant="ghost"
              onClick={() => setSelectedWorkType(type)}
              className={`flex-1 rounded-md transition-all duration-200 ${
                selectedWorkType === type
                  ? "bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type}
            </Button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="AI search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl border-2 border-gray-200 focus:border-teal-400"
          />
        </div>

        {showFilters && (
          <Card className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Range: ₹{amountRange[0]} Cr - ₹{amountRange[1]} Cr
                </label>
                <div className="px-2">
                  <DualRangeSlider
                    value={amountRange}
                    onValueChange={setAmountRange}
                    max={2000}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="flex-1 px-6 pb-6 overflow-hidden">
        <div className="h-full overflow-y-auto space-y-4 pr-2">
          {currentTenders.map((tender) => (
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
                          {tender?.bio}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {tender?.organization}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {/* {tender.workTypes
                            .slice(0, 3)
                            .map((workType, index) => ( */}
                          <span
                            // key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tender?.metadata?.type}
                          </span>
                          {/* ))} */}
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <CompatibilityScore
                          score={tender?.compatibilityScore}
                          showTooltip={false}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <IndianRupee className="w-4 h-4 mr-2" />
                        <span className="font-medium">
                          {formatAmount(
                            parseEstimatedCost(tender?.estimatedCost)
                          )}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{tender?.location}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Deadline: {tender?.submissionDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => onAnalyze(tender._id)}
                      className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200"
                    >
                      Analyse
                    </Button>

                    <Button
                      onClick={() => handleSaveTender(tender)}
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

          {currentTenders.length === 0 && (
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

        {/* Pagination */}
        {filteredAndSortedTenders.length > 0 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <span className="text-sm text-gray-600 px-3">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartSearchTab;
