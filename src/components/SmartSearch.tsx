import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import CompatibilityScore from "./CompatibilityScore";
interface Tender {
  id: string;
  name: string;
  organisation: string;
  amount: number;
  compatibilityScore: number;
  location: string;
  deadline: string;
  category: string;
}

interface SmartSearchProps {
  onAnalyze: () => void;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ onAnalyze }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrganisation, setSelectedOrganisation] = useState("all");
  const [amountRange, setAmountRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("score");
  const [showFilters, setShowFilters] = useState(false);

  // Mock tender data - 20 tenders with varied information
  const mockTenders: Tender[] = [
    {
      id: "1",
      name: "Development, Operations And Maintenance Of Innovative Urban Ropeway Transport Network In Shimla Project (Phase 2)",
      organisation: "Himachal Pradesh PWD",
      amount: 3500,
      compatibilityScore: 85,
      location: "Shimla, Himachal Pradesh",
      deadline: "02-06-2025",
      category: "Development",
    },
    {
      id: "2",
      name: "Construction Of New 4 Lane Highway With Paved Shoulder From Dareota Village To Kalar Bala Village",
      organisation: "NHAI",
      amount: 622,
      compatibilityScore: 78,
      location: "Himachal Pradesh",
      deadline: "12-06-2025",
      category: "Construction",
    },
    {
      id: "3",
      name: "Improvement Construction Of Existing Cl 5 Road To NH Intermediate Lane Specification With Hard Shoulder",
      organisation: "HPPWD",
      amount: 433.88,
      compatibilityScore: 72,
      location: "Kaza, Himachal Pradesh",
      deadline: "11-06-2025",
      category: "Road Development",
    },
    {
      id: "4",
      name: "Construction Of Special Protection For Prevention Of Landslide In Pandoh To Manali Section",
      organisation: "BRO",
      amount: 316.23,
      compatibilityScore: 92,
      location: "Mandi, Himachal Pradesh",
      deadline: "12-06-2025",
      category: "Infrastructure",
    },
    {
      id: "5",
      name: "Smart City Development Project Including Digital Infrastructure and IoT Implementation",
      organisation: "Smart City Mission",
      amount: 850.75,
      compatibilityScore: 68,
      location: "Chandigarh",
      deadline: "25-05-2025",
      category: "Smart City",
    },
    {
      id: "6",
      name: "Construction of Multi-Level Parking Complex with Solar Panel Installation",
      organisation: "Delhi Municipal Corporation",
      amount: 245.5,
      compatibilityScore: 81,
      location: "New Delhi",
      deadline: "18-06-2025",
      category: "Construction",
    },
    {
      id: "7",
      name: "Waste Management and Recycling Plant Setup in Industrial Area",
      organisation: "Pollution Control Board",
      amount: 567.3,
      compatibilityScore: 76,
      location: "Gurgaon, Haryana",
      deadline: "08-07-2025",
      category: "Environment",
    },
    {
      id: "8",
      name: "Highway Widening Project with Advanced Traffic Management Systems",
      organisation: "NHAI",
      amount: 1200.0,
      compatibilityScore: 89,
      location: "Jaipur, Rajasthan",
      deadline: "15-08-2025",
      category: "Highway",
    },
    {
      id: "9",
      name: "Construction of Water Treatment Plant with Capacity 50 MLD",
      organisation: "Water Resources Department",
      amount: 425.8,
      compatibilityScore: 74,
      location: "Lucknow, UP",
      deadline: "30-06-2025",
      category: "Water Management",
    },
    {
      id: "10",
      name: "Railway Station Modernization with Passenger Amenities Enhancement",
      organisation: "Indian Railways",
      amount: 890.25,
      compatibilityScore: 83,
      location: "Mumbai, Maharashtra",
      deadline: "20-07-2025",
      category: "Railway",
    },
    {
      id: "11",
      name: "Construction of Flyover with Pedestrian Walkway and Cycling Track",
      organisation: "Karnataka PWD",
      amount: 678.4,
      compatibilityScore: 77,
      location: "Bangalore, Karnataka",
      deadline: "10-09-2025",
      category: "Infrastructure",
    },
    {
      id: "12",
      name: "Solar Power Plant Installation in Government Buildings",
      organisation: "MNRE",
      amount: 356.9,
      compatibilityScore: 71,
      location: "Chennai, Tamil Nadu",
      deadline: "05-08-2025",
      category: "Renewable Energy",
    },
    {
      id: "13",
      name: "Metro Rail Extension Project with Modern Signaling Systems",
      organisation: "DMRC",
      amount: 2500.0,
      compatibilityScore: 94,
      location: "Delhi NCR",
      deadline: "12-12-2025",
      category: "Metro",
    },
    {
      id: "14",
      name: "Port Development and Container Handling Facility Upgrade",
      organisation: "Port Trust",
      amount: 1890.75,
      compatibilityScore: 86,
      location: "Visakhapatnam, AP",
      deadline: "28-11-2025",
      category: "Port Development",
    },
    {
      id: "15",
      name: "Airport Terminal Expansion with Sustainable Design Features",
      organisation: "AAI",
      amount: 1567.2,
      compatibilityScore: 79,
      location: "Kochi, Kerala",
      deadline: "15-10-2025",
      category: "Aviation",
    },
    {
      id: "16",
      name: "Integrated Township Development with Smart Infrastructure",
      organisation: "HUDCO",
      amount: 3200.5,
      compatibilityScore: 87,
      location: "Pune, Maharashtra",
      deadline: "22-01-2026",
      category: "Township",
    },
    {
      id: "17",
      name: "Construction of Multipurpose Sports Complex with Modern Facilities",
      organisation: "Sports Authority",
      amount: 234.6,
      compatibilityScore: 65,
      location: "Bhopal, MP",
      deadline: "18-07-2025",
      category: "Sports",
    },
    {
      id: "18",
      name: "Digital Health Infrastructure Setup in Rural Healthcare Centers",
      organisation: "Ministry of Health",
      amount: 445.3,
      compatibilityScore: 73,
      location: "Patna, Bihar",
      deadline: "25-09-2025",
      category: "Healthcare",
    },
    {
      id: "19",
      name: "Construction of Educational Complex with Research Facilities",
      organisation: "UGC",
      amount: 789.4,
      compatibilityScore: 80,
      location: "Hyderabad, Telangana",
      deadline: "14-11-2025",
      category: "Education",
    },
    {
      id: "20",
      name: "Industrial Park Development with Environmental Compliance Systems",
      organisation: "Industrial Development Corporation",
      amount: 1456.8,
      compatibilityScore: 82,
      location: "Ahmedabad, Gujarat",
      deadline: "06-03-2026",
      category: "Industrial",
    },
  ];

  const organisations = Array.from(
    new Set(mockTenders.map((t) => t.organisation))
  );
  const maxAmount = Math.max(...mockTenders.map((t) => t.amount));

  const filteredAndSortedTenders = useMemo(() => {
    let filtered = mockTenders.filter((tender) => {
      const matchesSearch =
        tender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.organisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesOrg =
        selectedOrganisation === "all" ||
        tender.organisation === selectedOrganisation;
      const matchesAmount =
        tender.amount >= amountRange[0] && tender.amount <= amountRange[1];

      return matchesSearch && matchesOrg && matchesAmount;
    });

    // Sort tenders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.compatibilityScore - a.compatibilityScore;
        case "amount":
          return b.amount - a.amount;
        case "date":
          return (
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          );
        default:
          return b.compatibilityScore - a.compatibilityScore;
      }
    });

    return filtered;
  }, [searchTerm, selectedOrganisation, amountRange, sortBy]);

  const formatAmount = (amount: number) => {
    if (amount >= 100) {
      return `₹${amount.toFixed(2)} Cr.`;
    } else {
      return `₹${(amount * 10).toFixed(2)} L.`;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Smart Search</h2>
          <p className="text-gray-600">Discover and analyze relevant tenders</p>
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

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search tenders by name, organisation, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 rounded-xl border-2 border-gray-200 focus:border-teal-400"
        />
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                Amount Range: ₹{amountRange[0]} - ₹{amountRange[1]} Cr.
              </label>
              <Slider
                value={amountRange}
                onValueChange={setAmountRange}
                max={maxAmount}
                step={10}
                className="mt-2"
              />
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
          </div>
        </Card>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredAndSortedTenders.length} of {mockTenders.length}{" "}
        tenders
      </div>

      {/* Tender Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
        {filteredAndSortedTenders.map((tender) => (
          <Card
            key={tender.id}
            className="group hover:shadow-lg transition-all duration-200 border-0 rounded-xl bg-white shadow-md"
          >
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 pr-3">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2">
                    {tender.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-1">
                    {tender.organisation}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <CompatibilityScore
                    score={tender.compatibilityScore}
                    showTooltip={false}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-xs text-gray-600">
                  <IndianRupee className="w-3 h-3 mr-1" />
                  <span className="font-medium">
                    {formatAmount(tender.amount)}
                  </span>
                </div>

                <div className="flex items-center text-xs text-gray-600">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span className="truncate">{tender.location}</span>
                </div>

                <div className="flex items-center text-xs text-gray-600">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>Deadline: {tender.deadline}</span>
                </div>
              </div>

              <Button
                onClick={onAnalyze}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform group-hover:scale-105"
                size="sm"
              >
                Analyse Tender
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

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
  );
};

export default SmartSearch;
