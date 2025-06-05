import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Trash2,
  Heart,
} from "lucide-react";
import CompatibilityScore from "./CompatibilityScore";
import { Tender } from "../types/tender";

interface MyTendersTabProps {
  savedTenders: Tender[];
  onAnalyze: (id: string) => void;
  onRemoveTender: (tenderId: string) => void;
}

const MyTendersTab: React.FC<MyTendersTabProps> = ({
  savedTenders,
  onAnalyze,
  onRemoveTender,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("saved-date");

  // New Sikkim tender card to be displayed first
  const sikkimTender: Tender = {
    id: "sikkim-road-2025",
    name: "Construction Improvement of Rishi Rongli Kupup Road from KM 53 to KM 70",
    organisation: "Border Roads Organization",
    amount: 223.69,
    compatibilityScore: 67,
    location: "Sikkim",
    deadline: "19-06-2025",
    category: "Road Construction",
    workTypes: ["Road Construction", "EPC Contract", "Mountain Terrain"],
    savedDate: new Date().toISOString().split("T")[0],
  };

  // Generate additional mock tenders to reach 40+ total
  const additionalMockTenders: Tender[] = [
    {
      id: "saved-1",
      name: "Green Building Construction with LEED Certification Standards",
      organisation: "Green Building Council",
      amount: 1200,
      compatibilityScore: 87,
      location: "Pune, MH",
      deadline: "15-07-2025",
      category: "Green Building",
      workTypes: ["Green Construction", "LEED", "Sustainable"],
      savedDate: "2024-01-20",
    },
    {
      id: "saved-2",
      name: "Renewable Energy Storage System Installation for Grid Stability",
      organisation: "Power Grid Corporation",
      amount: 890,
      compatibilityScore: 91,
      location: "Gujarat",
      deadline: "22-08-2025",
      category: "Energy Storage",
      workTypes: ["Energy Storage", "Grid", "Renewable"],
      savedDate: "2024-01-19",
    },
    {
      id: "saved-3",
      name: "Urban Forestry Development with Biodiversity Conservation",
      organisation: "Forest Department",
      amount: 340,
      compatibilityScore: 76,
      location: "Bangalore, KA",
      deadline: "10-09-2025",
      category: "Environment",
      workTypes: ["Forestry", "Biodiversity", "Conservation"],
      savedDate: "2024-01-18",
    },
    {
      id: "saved-4",
      name: "Smart Traffic Management System with AI Integration",
      organisation: "Traffic Police",
      amount: 560,
      compatibilityScore: 84,
      location: "Chennai, TN",
      deadline: "05-10-2025",
      category: "Smart City",
      workTypes: ["Traffic Management", "AI", "Smart Systems"],
      savedDate: "2024-01-17",
    },
    {
      id: "saved-5",
      name: "Coastal Protection Works with Marine Engineering Solutions",
      organisation: "Coastal Development Authority",
      amount: 1500,
      compatibilityScore: 89,
      location: "Goa",
      deadline: "18-11-2025",
      category: "Marine Engineering",
      workTypes: ["Coastal Protection", "Marine", "Engineering"],
      savedDate: "2024-01-16",
    },
    {
      id: "saved-6",
      name: "Hospital Infrastructure Modernization with Advanced Medical Equipment",
      organisation: "State Health Department",
      amount: 780,
      compatibilityScore: 82,
      location: "Jaipur, RJ",
      deadline: "12-12-2025",
      category: "Healthcare",
      workTypes: ["Hospital", "Medical Equipment", "Modernization"],
      savedDate: "2024-01-15",
    },
    {
      id: "saved-7",
      name: "Agricultural Processing Unit with Cold Storage Facilities",
      organisation: "Agriculture Department",
      amount: 450,
      compatibilityScore: 74,
      location: "Punjab",
      deadline: "20-06-2025",
      category: "Agriculture",
      workTypes: ["Processing", "Cold Storage", "Agriculture"],
      savedDate: "2024-01-14",
    },
    {
      id: "saved-8",
      name: "Skill Development Center with Modern Training Equipment",
      organisation: "Ministry of Skill Development",
      amount: 320,
      compatibilityScore: 78,
      location: "Bhubaneswar, OR",
      deadline: "08-08-2025",
      category: "Education",
      workTypes: ["Skill Development", "Training", "Education"],
      savedDate: "2024-01-13",
    },
    {
      id: "saved-9",
      name: "Cultural Heritage Site Restoration and Conservation Project",
      organisation: "Archaeological Survey",
      amount: 680,
      compatibilityScore: 71,
      location: "Agra, UP",
      deadline: "25-09-2025",
      category: "Heritage",
      workTypes: ["Heritage", "Restoration", "Conservation"],
      savedDate: "2024-01-12",
    },
    {
      id: "saved-10",
      name: "Public Transport Electrification with Charging Infrastructure",
      organisation: "State Transport Corporation",
      amount: 950,
      compatibilityScore: 86,
      location: "Kochi, KL",
      deadline: "14-10-2025",
      category: "Transport",
      workTypes: ["Electrification", "Charging", "Public Transport"],
      savedDate: "2024-01-11",
    },
    {
      id: "saved-11",
      name: "Disaster Management Control Room with Emergency Communication Systems",
      organisation: "Disaster Management Authority",
      amount: 420,
      compatibilityScore: 80,
      location: "Dehradun, UK",
      deadline: "30-07-2025",
      category: "Disaster Management",
      workTypes: ["Emergency Systems", "Communication", "Control Room"],
      savedDate: "2024-01-10",
    },
    {
      id: "saved-12",
      name: "Textile Industry Modernization with Automated Manufacturing",
      organisation: "Textile Corporation",
      amount: 1100,
      compatibilityScore: 77,
      location: "Coimbatore, TN",
      deadline: "16-11-2025",
      category: "Industry",
      workTypes: ["Textile", "Automation", "Manufacturing"],
      savedDate: "2024-01-09",
    },
    {
      id: "saved-13",
      name: "Science and Technology Park Development with Research Facilities",
      organisation: "Department of Science",
      amount: 1800,
      compatibilityScore: 88,
      location: "Hyderabad, TG",
      deadline: "22-12-2025",
      category: "Research",
      workTypes: ["Science Park", "Research", "Technology"],
      savedDate: "2024-01-08",
    },
    {
      id: "saved-14",
      name: "Community Health Center Upgrade with Telemedicine Facilities",
      organisation: "Community Health Department",
      amount: 290,
      compatibilityScore: 75,
      location: "Ranchi, JH",
      deadline: "10-08-2025",
      category: "Healthcare",
      workTypes: ["Community Health", "Telemedicine", "Upgrade"],
      savedDate: "2024-01-07",
    },
    {
      id: "saved-15",
      name: "Municipal Solid Waste Processing Plant with Energy Recovery",
      organisation: "Municipal Corporation",
      amount: 640,
      compatibilityScore: 83,
      location: "Indore, MP",
      deadline: "28-09-2025",
      category: "Waste Management",
      workTypes: ["Waste Processing", "Energy Recovery", "Municipal"],
      savedDate: "2024-01-06",
    },
    {
      id: "saved-16",
      name: "Pharmaceutical Manufacturing Facility with GMP Standards",
      organisation: "Pharmaceutical Board",
      amount: 1300,
      compatibilityScore: 85,
      location: "Baddi, HP",
      deadline: "18-01-2026",
      category: "Pharmaceutical",
      workTypes: ["Manufacturing", "GMP", "Pharmaceutical"],
      savedDate: "2024-01-05",
    },
    {
      id: "saved-17",
      name: "Food Processing Complex with Quality Control Laboratory",
      organisation: "Food Processing Department",
      amount: 520,
      compatibilityScore: 79,
      location: "Nagpur, MH",
      deadline: "12-08-2025",
      category: "Food Processing",
      workTypes: ["Food Processing", "Quality Control", "Laboratory"],
      savedDate: "2024-01-04",
    },
    {
      id: "saved-18",
      name: "Digital Library and Information Center with Modern Technology",
      organisation: "Library Development Board",
      amount: 180,
      compatibilityScore: 72,
      location: "Thiruvananthapuram, KL",
      deadline: "05-07-2025",
      category: "Digital Infrastructure",
      workTypes: ["Digital Library", "Information Center", "Technology"],
      savedDate: "2024-01-03",
    },
    {
      id: "saved-19",
      name: "Automotive Testing Track with Advanced Safety Features",
      organisation: "Automotive Research Association",
      amount: 860,
      compatibilityScore: 81,
      location: "Chennai, TN",
      deadline: "20-10-2025",
      category: "Automotive",
      workTypes: ["Testing Track", "Safety", "Automotive"],
      savedDate: "2024-01-02",
    },
    {
      id: "saved-20",
      name: "Renewable Energy Research Center with Laboratory Facilities",
      organisation: "Energy Research Institute",
      amount: 970,
      compatibilityScore: 90,
      location: "Delhi",
      deadline: "15-12-2025",
      category: "Research",
      workTypes: ["Renewable Energy", "Research", "Laboratory"],
      savedDate: "2024-01-01",
    },
    {
      id: "saved-21",
      name: "Urban Planning and Development with GIS Integration",
      organisation: "Urban Development Authority",
      amount: 750,
      compatibilityScore: 77,
      location: "Surat, GJ",
      deadline: "08-11-2025",
      category: "Urban Planning",
      workTypes: ["Urban Planning", "GIS", "Development"],
      savedDate: "2023-12-30",
    },
    {
      id: "saved-22",
      name: "Water Conservation Project with Rainwater Harvesting Systems",
      organisation: "Water Conservation Board",
      amount: 380,
      compatibilityScore: 74,
      location: "Jodhpur, RJ",
      deadline: "25-07-2025",
      category: "Water Conservation",
      workTypes: ["Water Conservation", "Rainwater Harvesting", "Systems"],
      savedDate: "2023-12-29",
    },
    {
      id: "saved-23",
      name: "Tourism Infrastructure Development with Eco-friendly Approach",
      organisation: "Tourism Development Corporation",
      amount: 610,
      compatibilityScore: 78,
      location: "Shimla, HP",
      deadline: "14-09-2025",
      category: "Tourism",
      workTypes: ["Tourism", "Infrastructure", "Eco-friendly"],
      savedDate: "2023-12-28",
    },
    {
      id: "saved-24",
      name: "Fire Safety and Emergency Services Upgrade with Modern Equipment",
      organisation: "Fire Department",
      amount: 340,
      compatibilityScore: 80,
      location: "Kolkata, WB",
      deadline: "02-08-2025",
      category: "Safety",
      workTypes: ["Fire Safety", "Emergency Services", "Equipment"],
      savedDate: "2023-12-27",
    },
    {
      id: "saved-25",
      name: "Mining Safety and Environmental Monitoring System",
      organisation: "Mining Department",
      amount: 480,
      compatibilityScore: 76,
      location: "Jharia, JH",
      deadline: "19-10-2025",
      category: "Mining",
      workTypes: ["Mining Safety", "Environmental Monitoring", "System"],
      savedDate: "2023-12-26",
    },
  ];

  // Place Sikkim tender first, then existing saved tenders, then additional mock tenders
  const allTenders = [sikkimTender, ...savedTenders, ...additionalMockTenders];

  const filteredAndSortedTenders = React.useMemo(() => {
    let filtered = allTenders.filter(
      (tender) =>
        tender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.organisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.compatibilityScore - a.compatibilityScore;
        case "amount":
          return b.amount - a.amount;
        case "saved-date":
          return (
            new Date(b.savedDate || "").getTime() -
            new Date(a.savedDate || "").getTime()
          );
        default:
          return (
            new Date(b.savedDate || "").getTime() -
            new Date(a.savedDate || "").getTime()
          );
      }
    });

    return filtered;
  }, [searchTerm, sortBy, allTenders]);

  const formatAmount = (amount: number) => {
    if (amount >= 100) {
      return `₹${amount.toFixed(2)} Cr.`;
    } else {
      return `₹${(amount * 10).toFixed(2)} L.`;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Tenders</h2>
            <p className="text-gray-600">{allTenders.length} saved tenders</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search saved tenders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-2 border-gray-200 focus:border-teal-400"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saved-date">Recently Saved</SelectItem>
              <SelectItem value="score">Compatibility Score</SelectItem>
              <SelectItem value="amount">Tender Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 px-6 pb-6 overflow-hidden">
        <div className="h-full overflow-y-auto space-y-4 pr-2">
          {filteredAndSortedTenders.map((tender) => (
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
                        {tender.savedDate && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Heart className="w-3 h-3 mr-1 text-red-500" />
                            <span>
                              Saved on{" "}
                              {new Date(tender.savedDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-shrink-0">
                        <CompatibilityScore
                          score={tender.compatibilityScore}
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
                        <span>Deadline: {tender.deadline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={onAnalyze}
                      className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200"
                    >
                      Analyse
                    </Button>

                    <Button
                      onClick={() => onRemoveTender(tender.id)}
                      variant="outline"
                      className="border-red-200 text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredAndSortedTenders.length === 0 && (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No saved tenders found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTendersTab;
