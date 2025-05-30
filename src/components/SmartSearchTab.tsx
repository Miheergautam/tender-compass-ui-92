import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Calendar, IndianRupee, Building2 } from 'lucide-react';
import CompatibilityScore from './CompatibilityScore';
import { Tender } from '../types/tender';

interface SmartSearchTabProps {
  onAnalyze?: () => void;
  onSaveTender?: (tender: Tender) => void;
}

const SmartSearchTab: React.FC<SmartSearchTabProps> = ({ onAnalyze, onSaveTender }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedOwnership, setSelectedOwnership] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const mockTenders: Tender[] = [
    { id: '1', name: 'Construction of 4-lane Highway from Pune to Nashik with modern infrastructure', organisation: 'Maharashtra PWD', amount: 450, compatibilityScore: 92, location: 'Pune, MH', deadline: '15-07-2025', category: 'Highway Construction', workTypes: ['Road Construction', 'Infrastructure', 'Highway'] },
    { id: '2', name: 'Smart City Development Project Phase 2 with IoT integration', organisation: 'Pune Smart City Ltd', amount: 1200, compatibilityScore: 88, location: 'Pune, MH', deadline: '22-08-2025', category: 'Smart City', workTypes: ['Smart Infrastructure', 'IoT', 'Urban Planning'] },
    { id: '3', name: 'Water Treatment Plant Upgrade with Advanced Filtration Systems', organisation: 'Mumbai Municipal Corporation', amount: 780, compatibilityScore: 85, location: 'Mumbai, MH', deadline: '10-09-2025', category: 'Water Management', workTypes: ['Water Treatment', 'Filtration', 'Municipal'] },
    { id: '4', name: 'Metro Rail Extension Project from Airport to City Center', organisation: 'Delhi Metro Rail Corporation', amount: 2500, compatibilityScore: 91, location: 'Delhi', deadline: '05-10-2025', category: 'Transportation', workTypes: ['Metro Rail', 'Transportation', 'Infrastructure'] },
    { id: '5', name: 'Green Building Complex with Solar Power Integration', organisation: 'Bangalore Development Authority', amount: 650, compatibilityScore: 89, location: 'Bangalore, KA', deadline: '18-11-2025', category: 'Green Building', workTypes: ['Green Construction', 'Solar', 'Sustainable'] },
    { id: '6', name: 'Port Modernization with Automated Cargo Handling Systems', organisation: 'Chennai Port Trust', amount: 1800, compatibilityScore: 87, location: 'Chennai, TN', deadline: '12-12-2025', category: 'Port Development', workTypes: ['Port Infrastructure', 'Automation', 'Cargo'] }
  ];

  const filteredAndSortedTenders = React.useMemo(() => {
    let filtered = mockTenders.filter(tender => {
      const matchesSearch = tender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tender.organisation.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesOwnership = selectedOwnership === 'all' || 
                              (selectedOwnership === 'government' && tender.organisation.includes('Corporation')) ||
                              (selectedOwnership === 'private' && !tender.organisation.includes('Corporation'));
      
      const matchesState = selectedState === 'all' || tender.location.includes(selectedState);
      
      const matchesAmount = (!minAmount || tender.amount >= parseInt(minAmount)) &&
                           (!maxAmount || tender.amount <= parseInt(maxAmount));
      
      return matchesSearch && matchesOwnership && matchesState && matchesAmount;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return b.compatibilityScore - a.compatibilityScore;
        case 'amount-high':
          return b.amount - a.amount;
        case 'amount-low':
          return a.amount - b.amount;
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        default:
          return b.compatibilityScore - a.compatibilityScore;
      }
    });

    return filtered;
  }, [searchTerm, sortBy, selectedOwnership, selectedState, minAmount, maxAmount]);

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
            <h2 className="text-2xl font-bold text-gray-900">Smart Search</h2>
            <p className="text-gray-600">Find tenders that match your expertise</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search tenders, organizations, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl border-2 border-gray-200 focus:border-teal-400"
          />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Ownership Filter */}
          <Select value={selectedOwnership} onValueChange={setSelectedOwnership}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Ownership" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ownership</SelectItem>
              <SelectItem value="government">Government</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>

          {/* State Filter */}
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              <SelectItem value="MH">Maharashtra</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="KA">Karnataka</SelectItem>
              <SelectItem value="TN">Tamil Nadu</SelectItem>
              <SelectItem value="GJ">Gujarat</SelectItem>
              <SelectItem value="RJ">Rajasthan</SelectItem>
            </SelectContent>
          </Select>

          {/* Amount Range Filters */}
          <div className="flex gap-2">
            <Input
              placeholder="Min Amount (Cr)"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              type="number"
              className="rounded-xl"
            />
            <Input
              placeholder="Max Amount (Cr)"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              type="number"
              className="rounded-xl"
            />
          </div>

          {/* Sort By */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Best Match</SelectItem>
              <SelectItem value="amount-high">Amount: High to Low</SelectItem>
              <SelectItem value="amount-low">Amount: Low to High</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 px-6 pb-6 overflow-hidden">
        <div className="h-full overflow-y-auto space-y-4 pr-2">
          {filteredAndSortedTenders.map((tender) => (
            <Card key={tender.id} className="group hover:shadow-lg transition-all duration-200 border-0 rounded-xl bg-white shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 pr-4">
                        <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2">
                          {tender.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{tender.organisation}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {tender.workTypes.slice(0, 3).map((workType, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {workType}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <CompatibilityScore score={tender.compatibilityScore} showTooltip={false} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <IndianRupee className="w-4 h-4 mr-2" />
                        <span className="font-medium">{formatAmount(tender.amount)}</span>
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
                      onClick={() => onAnalyze?.()}
                      className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200"
                    >
                      Analyse
                    </Button>
                    
                    <Button
                      onClick={() => onSaveTender?.(tender)}
                      variant="outline"
                      className="border-teal-200 text-teal-700 hover:bg-teal-50 rounded-lg transition-all duration-200"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredAndSortedTenders.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tenders found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartSearchTab;
