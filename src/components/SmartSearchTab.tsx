
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Calendar, IndianRupee, SlidersHorizontal, Save, Check, Building2 } from 'lucide-react';
import CompatibilityScore from './CompatibilityScore';
import { Tender } from '../types/tender';

interface SmartSearchTabProps {
  onAnalyze: () => void;
  onSaveTender: (tender: Tender) => void;
}

const SmartSearchTab: React.FC<SmartSearchTabProps> = ({ onAnalyze, onSaveTender }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrganisation, setSelectedOrganisation] = useState('all');
  const [selectedOrgType, setSelectedOrgType] = useState('all');
  const [selectedOwnership, setSelectedOwnership] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [amountLowerLimit, setAmountLowerLimit] = useState('');
  const [amountUpperLimit, setAmountUpperLimit] = useState('');
  const [sortBy, setSortBy] = useState('score');
  const [showFilters, setShowFilters] = useState(true);
  const [savedTenders, setSavedTenders] = useState<Set<string>>(new Set());

  // New high-value tenders from the provided data
  const newHighValueTenders: Tender[] = [
    { id: 'nh60-nashik-1', name: 'Upgrad Of Exist Road To 4/6 Lane With 2lane Service Road On Both Sides And Const. Of 8lane Ef At Tier1 On Single Pier Sec Frm Nashik Phata To Alandi Phata Pkgi Of Nh60', organisation: 'NHAI', amount: 4256.67, compatibilityScore: 92, location: 'Maharashtra', deadline: '30-08-2025', category: 'Highway', workTypes: ['Highway', 'Elevated Flyover', '8-Lane'], savedDate: new Date().toISOString().split('T')[0] },
    { id: 'nh4b-maharashtra-2', name: 'Const. Of 6lane Gf Starting From Its Junc With Nh4b(New Nh348)Near Pagote Till Its Junc On Nh48 At Chowk In Maharashtra To Be Executed On Bot Mode', organisation: 'NHAI', amount: 3653.09, compatibilityScore: 89, location: 'Maharashtra', deadline: '30-08-2025', category: 'Highway', workTypes: ['6-Lane', 'BOT Mode', 'Greenfield'], savedDate: new Date().toISOString().split('T')[0] },
    { id: 'nh60-alandi-3', name: 'Upgrad Of Exist Road To 4/6 Lane With 2lane Service Road On Both Sides And Const. Of 8lane Elevated Flyover At Tier1 On Single Pier Sect From Alandi Phata To Khed', organisation: 'NHAI', amount: 3177.66, compatibilityScore: 91, location: 'Maharashtra', deadline: '30-08-2025', category: 'Highway', workTypes: ['Elevated Flyover', '8-Lane', 'Service Road'], savedDate: new Date().toISOString().split('T')[0] },
    { id: 'nh948a-karnataka-4', name: 'Const. Of Strr(West Side) Nh948a Kunigal (Ramanagara Taluk) To S Mudugadapalli (Hosur Taluk) From Km 79 To Km 144.25 Dc Phaseii In Karnataka On Ham', organisation: 'NHAI', amount: 2779.17, compatibilityScore: 86, location: 'Karnataka', deadline: '12-06-2025', category: 'Highway', workTypes: ['STRR', 'HAM', 'Phase II'], savedDate: new Date().toISOString().split('T')[0] },
    { id: 'nh948a-obalapura-5', name: 'Const. Of Strr (West Side) Nh948a Obalapura (Nelamangala Taluk) To Kunigal(Ramanagara Taluk) From Km 0 To Km 79 Dc Phasei In Karnataka On Ham', organisation: 'NHAI', amount: 2642.40, compatibilityScore: 85, location: 'Karnataka', deadline: '12-06-2025', category: 'Highway', workTypes: ['STRR', 'HAM', 'Phase I'], savedDate: new Date().toISOString().split('T')[0] },
    { id: 'ec20-hassan-6', name: '4lane With Paved Shoulders From Ranganathpura (Hassan) To Keresooragondanahalli In Hassan-Hiriyur Section Of Ec-20 In Karnataka On Ham', organisation: 'NHAI', amount: 2626.32, compatibilityScore: 88, location: 'Karnataka', deadline: '23-06-2025', category: 'Highway', workTypes: ['4-Lane', 'Paved Shoulders', 'HAM'], savedDate: new Date().toISOString().split('T')[0] },
    { id: 'nh744-rajapalayam-7', name: '4 Laning Of Rajapalayam To Shenkottai Section Of Nh-744 From Km 71.600 To Km 139900 In Tamil Nadu On Hybrid Annuity Mode', organisation: 'NHAI', amount: 2361.08, compatibilityScore: 87, location: 'Tamil Nadu', deadline: '26-06-2025', category: 'Highway', workTypes: ['4-Lane', 'Hybrid Annuity', '68.3km'], savedDate: new Date().toISOString().split('T')[0] },
    { id: 'hyderabad-expressway-8', name: 'Development Of 4 Lane Ac Greenfield Regional Expressway On Northern Side Of Hyderabad From Pragnapur Vill To Rayagiri Vill For A Design Length Of 43.000 Km', organisation: 'NHAI', amount: 1728.22, compatibilityScore: 84, location: 'Telangana', deadline: '18-06-2025', category: 'Expressway', workTypes: ['4-Lane', 'Greenfield', 'Expressway'], savedDate: new Date().toISOString().split('T')[0] },
    { id: 'hyderabad-rayagiri-9', name: 'Development Of 4-Lane Access Controlled Gf Regional Expressway On Northern Side Of Hyderabad From Rayagiri Village To Tangad Palle Village', organisation: 'NHAI', amount: 1547.04, compatibilityScore: 83, location: 'Telangana', deadline: '18-06-2025', category: 'Expressway', workTypes: ['Access Controlled', 'Greenfield', 'Regional'], savedDate: new Date().toISOString().split('T')[0] },
    { id: 'hyderabad-girmapur-10', name: 'Development Of 4-Lane Access Controlled Gf Regional Expressway On Northern Side Of Hyderabad From Girmapur Village To Reddipalle Village', organisation: 'NHAI', amount: 1529.19, compatibilityScore: 82, location: 'Telangana', deadline: '18-06-2025', category: 'Expressway', workTypes: ['Access Controlled', '4-Lane', 'Regional'], savedDate: new Date().toISOString().split('T')[0] }
  ];

  // 20 mock tenders with realistic variations
  const mockTenders: Tender[] = [
    { id: '1', name: 'Development, Operations And Maintenance Of Innovative Urban Ropeway Transport Network In Shimla Project (Phase 2)', organisation: 'Himachal Pradesh PWD', amount: 3500, compatibilityScore: 95, location: 'Shimla, HP', deadline: '02-06-2025', category: 'Development', workTypes: ['Transport', 'Infrastructure', 'Urban Development'] },
    { id: '2', name: 'Construction Of New 4 Lane Highway With Paved Shoulder From Dareota Village To Kalar Bala Village', organisation: 'NHAI', amount: 622, compatibilityScore: 88, location: 'Himachal Pradesh', deadline: '12-06-2025', category: 'Highway', workTypes: ['Road Construction', 'Highway', 'Pavement'] },
    { id: '3', name: 'Metro Rail Extension Project Phase 3 with Advanced Signaling and Safety Systems', organisation: 'DMRC', amount: 2800, compatibilityScore: 92, location: 'Delhi NCR', deadline: '15-08-2025', category: 'Metro', workTypes: ['Metro', 'Rail', 'Signaling', 'Safety'] },
    { id: '4', name: 'Smart City Infrastructure Development with IoT Integration in Tier-2 Cities', organisation: 'Smart City Mission', amount: 1200, compatibilityScore: 85, location: 'Bhopal, MP', deadline: '20-07-2025', category: 'Smart City', workTypes: ['IoT', 'Smart Infrastructure', 'Technology'] },
    { id: '5', name: 'Construction of Multi-Modal Transport Hub with Integrated Facilities', organisation: 'Karnataka PWD', amount: 890, compatibilityScore: 78, location: 'Bangalore, KA', deadline: '10-09-2025', category: 'Transport', workTypes: ['Transport Hub', 'Multi-Modal', 'Integration'] },
    { id: '6', name: 'Solar Power Plant Installation and Grid Integration for Rural Electrification', organisation: 'MNRE', amount: 567, compatibilityScore: 82, location: 'Rajasthan', deadline: '05-08-2025', category: 'Renewable Energy', workTypes: ['Solar', 'Grid Integration', 'Rural Development'] },
    { id: '7', name: 'Water Treatment Plant Modernization with Advanced Filtration Technology', organisation: 'Water Board', amount: 445, compatibilityScore: 76, location: 'Chennai, TN', deadline: '25-09-2025', category: 'Water Management', workTypes: ['Water Treatment', 'Filtration', 'Modernization'] },
    { id: '8', name: 'Coastal Road Development Project with Anti-Erosion Measures', organisation: 'Maharashtra PWD', amount: 1560, compatibilityScore: 89, location: 'Mumbai, MH', deadline: '12-11-2025', category: 'Infrastructure', workTypes: ['Coastal Engineering', 'Road', 'Erosion Control'] },
    { id: '9', name: 'Airport Terminal Expansion with Sustainable Architecture and Green Features', organisation: 'AAI', amount: 2100, compatibilityScore: 84, location: 'Kochi, KL', deadline: '18-10-2025', category: 'Aviation', workTypes: ['Airport', 'Terminal', 'Green Building'] },
    { id: '10', name: 'Industrial Waste Management Facility with Recycling Plant Setup', organisation: 'Pollution Control Board', amount: 680, compatibilityScore: 71, location: 'Gurgaon, HR', deadline: '08-07-2025', category: 'Environment', workTypes: ['Waste Management', 'Recycling', 'Industrial'] },
    { id: '11', name: 'Healthcare Infrastructure Development in Rural Areas with Telemedicine', organisation: 'Ministry of Health', amount: 520, compatibilityScore: 73, location: 'Patna, BR', deadline: '14-11-2025', category: 'Healthcare', workTypes: ['Healthcare', 'Rural Development', 'Telemedicine'] },
    { id: '12', name: 'Educational Complex Construction with Research and Innovation Centers', organisation: 'UGC', amount: 980, compatibilityScore: 80, location: 'Hyderabad, TG', deadline: '22-01-2026', category: 'Education', workTypes: ['Education', 'Research', 'Innovation'] },
    { id: '13', name: 'Port Development and Container Handling Automation Project', organisation: 'Port Trust', amount: 3200, compatibilityScore: 91, location: 'Visakhapatnam, AP', deadline: '28-11-2025', category: 'Port', workTypes: ['Port Development', 'Automation', 'Container Handling'] },
    { id: '14', name: 'Sports Complex Development with Olympic Standard Facilities', organisation: 'Sports Authority', amount: 750, compatibilityScore: 65, location: 'Pune, MH', deadline: '18-07-2025', category: 'Sports', workTypes: ['Sports', 'Complex', 'Olympic Standards'] },
    { id: '15', name: 'Rural Road Connectivity Enhancement Under PMGSY Phase 4', organisation: 'NRRDA', amount: 420, compatibilityScore: 77, location: 'Odisha', deadline: '30-06-2025', category: 'Rural Development', workTypes: ['Rural Roads', 'Connectivity', 'PMGSY'] },
    { id: '16', name: 'Flyover Construction with Pedestrian and Cycling Infrastructure', organisation: 'Delhi PWD', amount: 850, compatibilityScore: 83, location: 'New Delhi', deadline: '15-10-2025', category: 'Infrastructure', workTypes: ['Flyover', 'Pedestrian', 'Cycling'] },
    { id: '17', name: 'Digital Infrastructure Setup for Government Buildings and Offices', organisation: 'NIC', amount: 340, compatibilityScore: 69, location: 'Ahmedabad, GJ', deadline: '25-08-2025', category: 'Digital', workTypes: ['Digital Infrastructure', 'Government', 'Technology'] },
    { id: '18', name: 'Integrated Township Development with Sustainable Housing Solutions', organisation: 'HUDCO', amount: 2600, compatibilityScore: 86, location: 'Lucknow, UP', deadline: '06-03-2026', category: 'Housing', workTypes: ['Township', 'Sustainable Housing', 'Development'] },
    { id: '19', name: 'Railway Station Modernization with Passenger Amenity Enhancement', organisation: 'Indian Railways', amount: 1200, compatibilityScore: 79, location: 'Kolkata, WB', deadline: '20-12-2025', category: 'Railway', workTypes: ['Railway', 'Modernization', 'Passenger Amenities'] },
    { id: '20', name: 'Flood Control and Drainage System Improvement in Urban Areas', organisation: 'WRD', amount: 960, compatibilityScore: 74, location: 'Guwahati, AS', deadline: '10-08-2025', category: 'Water Management', workTypes: ['Flood Control', 'Drainage', 'Urban Planning'] }
  ];

  // Combine new high-value tenders with existing mock tenders
  const allTenders = [...newHighValueTenders, ...mockTenders];

  const organisations = Array.from(new Set(allTenders.map(t => t.organisation)));
  const organisationTypes = ['Government', 'PSU', 'Private', 'Autonomous Body', 'Corporation'];
  const ownershipTypes = ['Central', 'State', 'Municipal', 'Private', 'Joint Venture'];
  const states = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Himachal Pradesh', 'Delhi', 'Kerala', 'Haryana', 'Uttar Pradesh', 'West Bengal', 'Andhra Pradesh', 'Gujarat', 'Bihar', 'Odisha', 'Assam', 'Madhya Pradesh'];

  const filteredAndSortedTenders = useMemo(() => {
    let filtered = allTenders.filter(tender => {
      const matchesSearch = tender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tender.organisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tender.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesOrg = selectedOrganisation === 'all' || tender.organisation === selectedOrganisation;
      
      // Amount filtering with lower and upper limits
      let matchesAmount = true;
      if (amountLowerLimit && !isNaN(Number(amountLowerLimit))) {
        matchesAmount = matchesAmount && tender.amount >= Number(amountLowerLimit);
      }
      if (amountUpperLimit && !isNaN(Number(amountUpperLimit))) {
        matchesAmount = matchesAmount && tender.amount <= Number(amountUpperLimit);
      }
      
      return matchesSearch && matchesOrg && matchesAmount;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.compatibilityScore - a.compatibilityScore;
        case 'amount':
          return b.amount - a.amount;
        case 'date':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        default:
          return b.compatibilityScore - a.compatibilityScore;
      }
    });

    return filtered;
  }, [searchTerm, selectedOrganisation, amountLowerLimit, amountUpperLimit, sortBy]);

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
      savedDate: new Date().toISOString().split('T')[0]
    };
    onSaveTender(tenderWithSaveDate);
    setSavedTenders(prev => new Set([...prev, tender.id]));
    
    // Remove from saved state after 2 seconds to allow re-saving
    setTimeout(() => {
      setSavedTenders(prev => {
        const newSet = new Set(prev);
        newSet.delete(tender.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 p-6 space-y-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organisation</label>
                <Select value={selectedOrganisation} onValueChange={setSelectedOrganisation}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All Organisations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Organisations</SelectItem>
                    {organisations.map(org => (
                      <SelectItem key={org} value={org}>{org}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organisation Type</label>
                <Select value={selectedOrgType} onValueChange={setSelectedOrgType}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {organisationTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ownership</label>
                <Select value={selectedOwnership} onValueChange={setSelectedOwnership}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All Ownership" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ownership</SelectItem>
                    {ownershipTypes.map(ownership => (
                      <SelectItem key={ownership} value={ownership}>{ownership}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount Range (₹ Cr.)</label>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Results</label>
                <div className="text-sm text-gray-600 bg-white rounded-lg p-2 border">
                  {filteredAndSortedTenders.length} of {allTenders.length} tenders
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

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
                      onClick={onAnalyze}
                      className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200"
                    >
                      Analyse
                    </Button>
                    
                    <Button
                      onClick={() => handleSaveTender(tender)}
                      variant="outline"
                      className={`border-teal-200 rounded-lg transition-all duration-200 ${
                        savedTenders.has(tender.id) 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'text-teal-700 hover:bg-teal-50'
                      }`}
                    >
                      {savedTenders.has(tender.id) ? (
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tenders found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartSearchTab;

