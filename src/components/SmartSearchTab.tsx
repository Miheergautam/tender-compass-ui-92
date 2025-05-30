import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, SortAsc, Calendar, MapPin, Building, IndianRupee, Users, Clock, TrendingUp, Star } from 'lucide-react';

const SmartSearchTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    ownership: '',
    minAmount: '',
    maxAmount: '',
    state: '',
    sortBy: 'relevance'
  });

  // Mock tender data
  const tenders = [
    {
      id: 1,
      title: "Construction of 4-lane Highway NH-48",
      organization: "National Highways Authority of India",
      location: "Gujarat",
      amount: "₹850 Cr",
      deadline: "2024-04-15",
      compatibility: 92,
      ownership: "Central",
      category: "Infrastructure",
      posted: "2024-03-01"
    },
    {
      id: 2,
      title: "Supply of Medical Equipment to Government Hospitals",
      organization: "Department of Health, Karnataka",
      location: "Karnataka",
      amount: "₹120 Cr",
      deadline: "2024-04-22",
      compatibility: 78,
      ownership: "State",
      category: "Medical Supplies",
      posted: "2024-03-05"
    },
    {
      id: 3,
      title: "Development of Smart City Infrastructure",
      organization: "Municipal Corporation, Maharashtra",
      location: "Maharashtra",
      amount: "₹1500 Cr",
      deadline: "2024-05-01",
      compatibility: 65,
      ownership: "PSU",
      category: "Urban Development",
      posted: "2024-03-10"
    },
    {
      id: 4,
      title: "Procurement of IT Hardware for Government Schools",
      organization: "Department of Education, Tamil Nadu",
      location: "Tamil Nadu",
      amount: "₹90 Cr",
      deadline: "2024-04-29",
      compatibility: 88,
      ownership: "Central",
      category: "IT Hardware",
      posted: "2024-03-15"
    },
    {
      id: 5,
      title: "Construction of Rural Roads under PMGSY",
      organization: "Ministry of Rural Development",
      location: "Uttar Pradesh",
      amount: "₹320 Cr",
      deadline: "2024-05-10",
      compatibility: 70,
      ownership: "Central",
      category: "Infrastructure",
      posted: "2024-03-20"
    },
    {
      id: 6,
      title: "Supply of Agricultural Equipment to Farmers",
      organization: "Department of Agriculture, Andhra Pradesh",
      location: "Andhra Pradesh",
      amount: "₹60 Cr",
      deadline: "2024-05-15",
      compatibility: 95,
      ownership: "State",
      category: "Agriculture",
      posted: "2024-03-25"
    },
    {
      id: 7,
      title: "Upgradation of Water Supply System",
      organization: "Jal Nigam, Uttar Pradesh",
      location: "Uttar Pradesh",
      amount: "₹450 Cr",
      deadline: "2024-05-22",
      compatibility: 82,
      ownership: "PSU",
      category: "Water Supply",
      posted: "2024-03-30"
    },
    {
      id: 8,
      title: "Development of Renewable Energy Projects",
      organization: "Ministry of New and Renewable Energy",
      location: "Gujarat",
      amount: "₹1200 Cr",
      deadline: "2024-06-01",
      compatibility: 75,
      ownership: "Central",
      category: "Renewable Energy",
      posted: "2024-04-05"
    },
    {
      id: 9,
      title: "Construction of Affordable Housing Units",
      organization: "Housing Department, West Bengal",
      location: "West Bengal",
      amount: "₹280 Cr",
      deadline: "2024-06-10",
      compatibility: 90,
      ownership: "State",
      category: "Housing",
      posted: "2024-04-10"
    },
    {
      id: 10,
      title: "Supply of Educational Materials to Schools",
      organization: "Department of Education, Karnataka",
      location: "Karnataka",
      amount: "₹75 Cr",
      deadline: "2024-06-15",
      compatibility: 85,
      ownership: "Private",
      category: "Education",
      posted: "2024-04-15"
    }
  ];

  const filteredTenders = tenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tender.organization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesOwnership = !filters.ownership || tender.ownership === filters.ownership;
    const matchesState = !filters.state || tender.location.includes(filters.state);
    
    // Amount filtering
    let matchesAmount = true;
    if (filters.minAmount || filters.maxAmount) {
      const amount = parseFloat(tender.amount.replace(/[₹,\sCr]/g, ''));
      const minAmount = filters.minAmount ? parseFloat(filters.minAmount) : 0;
      const maxAmount = filters.maxAmount ? parseFloat(filters.maxAmount) : Infinity;
      matchesAmount = amount >= minAmount && amount <= maxAmount;
    }
    
    return matchesSearch && matchesOwnership && matchesState && matchesAmount;
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      ownership: '',
      minAmount: '',
      maxAmount: '',
      state: '',
      sortBy: 'relevance'
    });
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search tenders by title, organization, or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-teal-400 transition-colors"
        />
      </div>

      {/* Filters Section */}
      <Card className="bg-gray-50 border-0 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            </div>
            <Button variant="outline" onClick={clearFilters} className="rounded-lg">
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Ownership Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ownership</label>
              <Select value={filters.ownership} onValueChange={(value) => handleFilterChange('ownership', value)}>
                <SelectTrigger className="rounded-lg border-gray-300">
                  <SelectValue placeholder="Select ownership" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg z-[100]">
                  <SelectItem value="Central">Central Government</SelectItem>
                  <SelectItem value="State">State Government</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="PSU">Public Sector</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount Range Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Amount (₹ Cr)</label>
              <Input
                type="number"
                placeholder="0"
                value={filters.minAmount}
                onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                className="rounded-lg border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Amount (₹ Cr)</label>
              <Input
                type="number"
                placeholder="1000"
                value={filters.maxAmount}
                onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                className="rounded-lg border-gray-300"
              />
            </div>

            {/* State Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <Select value={filters.state} onValueChange={(value) => handleFilterChange('state', value)}>
                <SelectTrigger className="rounded-lg border-gray-300">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg z-[100] max-h-60 overflow-y-auto">
                  <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                  <SelectItem value="Gujarat">Gujarat</SelectItem>
                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                  <SelectItem value="West Bengal">West Bengal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sort By */}
          <div className="mt-4 flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
              <SelectTrigger className="w-48 rounded-lg border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg z-[100]">
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="amount">Amount (High to Low)</SelectItem>
                <SelectItem value="compatibility">Compatibility Score</SelectItem>
                <SelectItem value="posted">Recently Posted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Found <span className="font-semibold text-teal-600">{filteredTenders.length}</span> matching tenders
        </p>
        <Button variant="outline" className="rounded-lg">
          <SortAsc className="w-4 h-4 mr-2" />
          Sort Options
        </Button>
      </div>

      {/* Tender Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenders.map(tender => (
          <Card key={tender.id} className="bg-white border-0 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 space-y-3">
              <h3 className="text-lg font-semibold text-teal-700">{tender.title}</h3>
              <div className="flex items-center space-x-2 text-gray-600">
                <Building className="w-4 h-4" />
                <span className="text-sm">{tender.organization}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{tender.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <IndianRupee className="w-4 h-4" />
                <span className="text-sm">{tender.amount}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Deadline: {tender.deadline}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Posted: {tender.posted}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-teal-100 text-teal-700 rounded-full px-2 py-1 text-xs font-medium">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Compatibility: {tender.compatibility}%
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs font-medium">
                  <Star className="w-3 h-3 mr-1" />
                  {tender.category}
                </Badge>
              </div>
              <Button className="w-full rounded-lg">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SmartSearchTab;
