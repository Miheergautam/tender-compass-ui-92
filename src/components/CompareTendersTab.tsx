
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { GitCompare, X, Calendar, MapPin, IndianRupee, Building2, CheckCircle } from 'lucide-react';
import CompatibilityScore from './CompatibilityScore';

interface Tender {
  id: string;
  name: string;
  organisation: string;
  amount: number;
  compatibilityScore: number;
  location: string;
  deadline: string;
  category: string;
  workTypes: string[];
  paymentWeightage: { [key: string]: number };
}

const CompareTendersTab: React.FC = () => {
  const [selectedTenders, setSelectedTenders] = useState<Tender[]>([]);

  // Mock saved tenders data (same as MyTenders)
  const savedTenders: Tender[] = [
    { 
      id: '1', 
      name: 'Highway Construction Project Phase 2', 
      organisation: 'NHAI', 
      amount: 1200, 
      compatibilityScore: 92, 
      location: 'Mumbai, MH', 
      deadline: '15-08-2025', 
      category: 'Highway', 
      workTypes: ['Road Construction', 'Highway', 'Pavement'],
      paymentWeightage: { 'Road Work': 45, 'Drainage': 25, 'Signage': 15, 'Safety': 15 }
    },
    { 
      id: '2', 
      name: 'Metro Rail Extension Project', 
      organisation: 'DMRC', 
      amount: 2800, 
      compatibilityScore: 88, 
      location: 'Delhi NCR', 
      deadline: '20-12-2025', 
      category: 'Metro', 
      workTypes: ['Metro', 'Rail', 'Signaling'],
      paymentWeightage: { 'Rail Work': 50, 'Signaling': 30, 'Civil Work': 20 }
    },
    { 
      id: '3', 
      name: 'Smart City Infrastructure Development', 
      organisation: 'Smart City Mission', 
      amount: 850, 
      compatibilityScore: 76, 
      location: 'Pune, MH', 
      deadline: '10-10-2025', 
      category: 'Smart City', 
      workTypes: ['IoT', 'Smart Infrastructure', 'Technology'],
      paymentWeightage: { 'Technology': 40, 'Infrastructure': 35, 'Integration': 25 }
    },
    { 
      id: '4', 
      name: 'Water Treatment Plant Modernization', 
      organisation: 'Water Board', 
      amount: 560, 
      compatibilityScore: 84, 
      location: 'Chennai, TN', 
      deadline: '25-09-2025', 
      category: 'Water Management', 
      workTypes: ['Water Treatment', 'Filtration', 'Modernization'],
      paymentWeightage: { 'Treatment Systems': 45, 'Filtration': 30, 'Automation': 25 }
    },
    { 
      id: '5', 
      name: 'Solar Power Plant Installation', 
      organisation: 'MNRE', 
      amount: 740, 
      compatibilityScore: 91, 
      location: 'Rajasthan', 
      deadline: '15-11-2025', 
      category: 'Renewable Energy', 
      workTypes: ['Solar', 'Grid Integration', 'Installation'],
      paymentWeightage: { 'Solar Panels': 40, 'Grid Integration': 35, 'Civil Work': 25 }
    },
    { 
      id: '6', 
      name: 'Airport Terminal Expansion', 
      organisation: 'AAI', 
      amount: 1900, 
      compatibilityScore: 79, 
      location: 'Bangalore, KA', 
      deadline: '18-01-2026', 
      category: 'Aviation', 
      workTypes: ['Airport', 'Terminal', 'Construction'],
      paymentWeightage: { 'Terminal Construction': 50, 'MEP Work': 30, 'Interior': 20 }
    }
  ];

  const handleTenderSelect = (tenderId: string) => {
    if (selectedTenders.length >= 3) {
      return; // Maximum 3 tenders
    }
    
    const tender = savedTenders.find(t => t.id === tenderId);
    if (tender && !selectedTenders.find(t => t.id === tenderId)) {
      setSelectedTenders([...selectedTenders, tender]);
    }
  };

  const handleRemoveTender = (tenderId: string) => {
    setSelectedTenders(selectedTenders.filter(t => t.id !== tenderId));
  };

  const clearComparison = () => {
    setSelectedTenders([]);
  };

  const formatAmount = (amount: number) => {
    if (amount >= 100) {
      return `₹${amount.toFixed(2)} Cr.`;
    } else {
      return `₹${(amount * 10).toFixed(2)} L.`;
    }
  };

  const getBestValue = (field: string, values: number[]) => {
    switch (field) {
      case 'score':
        return Math.max(...values);
      case 'amount':
        return Math.min(...values); // Lower amount might be better for comparison
      default:
        return Math.max(...values);
    }
  };

  const isBestValue = (field: string, value: number, allValues: number[]) => {
    const bestValue = getBestValue(field, allValues);
    return value === bestValue;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">⚖️ Compare Tenders</h2>
          <p className="text-gray-600">Compare up to 3 tenders side by side to make informed decisions</p>
        </div>
        
        {selectedTenders.length > 0 && (
          <Button
            onClick={clearComparison}
            variant="outline"
            className="rounded-lg border-red-200 text-red-700 hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Comparison
          </Button>
        )}
      </div>

      {/* Tender Selection */}
      <Card className="rounded-xl border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <GitCompare className="w-5 h-5 mr-2 text-teal-600" />
            Select Tenders to Compare ({selectedTenders.length}/3)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tender {index + 1}
                  {index === 0 && <span className="text-red-500 ml-1">*</span>}
                </label>
                {selectedTenders[index] ? (
                  <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {selectedTenders[index].name.substring(0, 30)}...
                    </span>
                    <Button
                      onClick={() => handleRemoveTender(selectedTenders[index].id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Select onValueChange={handleTenderSelect} disabled={selectedTenders.length >= 3 && !selectedTenders[index]}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select a tender" />
                    </SelectTrigger>
                    <SelectContent>
                      {savedTenders
                        .filter(tender => !selectedTenders.find(selected => selected.id === tender.id))
                        .map((tender) => (
                          <SelectItem key={tender.id} value={tender.id}>
                            {tender.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {selectedTenders.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {selectedTenders.map((tender, index) => (
              <Card key={tender.id} className="rounded-xl border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2">
                        {tender.name}
                      </h3>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Tender {index + 1}
                      </Badge>
                    </div>
                    <CompatibilityScore score={tender.compatibilityScore} showTooltip={false} />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Basic Information */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Organisation</span>
                      <span className="text-sm font-medium text-gray-900">{tender.organisation}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Amount</span>
                      <span className={`text-sm font-medium ${
                        isBestValue('amount', tender.amount, selectedTenders.map(t => t.amount))
                          ? 'text-green-600 bg-green-50 px-2 py-1 rounded'
                          : 'text-gray-900'
                      }`}>
                        {formatAmount(tender.amount)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Compatibility</span>
                      <span className={`text-sm font-medium ${
                        isBestValue('score', tender.compatibilityScore, selectedTenders.map(t => t.compatibilityScore))
                          ? 'text-green-600 bg-green-50 px-2 py-1 rounded flex items-center'
                          : 'text-gray-900'
                      }`}>
                        {tender.compatibilityScore}%
                        {isBestValue('score', tender.compatibilityScore, selectedTenders.map(t => t.compatibilityScore)) && (
                          <CheckCircle className="w-3 h-3 ml-1" />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Location and Deadline */}
                  <div className="pt-3 border-t border-gray-200 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {tender.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {tender.deadline}
                    </div>
                  </div>

                  {/* Work Types */}
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Work Types</p>
                    <div className="flex flex-wrap gap-1">
                      {tender.workTypes.slice(0, 3).map((workType, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {workType}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Payment Weightage */}
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">Payment Weightage</p>
                    <div className="space-y-1">
                      {Object.entries(tender.paymentWeightage).slice(0, 3).map(([work, percentage]) => (
                        <div key={work} className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">{work}</span>
                          <span className="font-medium text-gray-900">{percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Comparison Table */}
          {selectedTenders.length > 1 && (
            <Card className="rounded-xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Quick Comparison Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Criteria</th>
                        {selectedTenders.map((tender, index) => (
                          <th key={tender.id} className="text-center py-3 px-2 text-sm font-medium text-gray-700">
                            Tender {index + 1}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 text-sm text-gray-600">Compatibility Score</td>
                        {selectedTenders.map((tender) => (
                          <td key={tender.id} className="py-3 px-2 text-center">
                            <span className={`text-sm font-medium ${
                              isBestValue('score', tender.compatibilityScore, selectedTenders.map(t => t.compatibilityScore))
                                ? 'text-green-600 bg-green-50 px-2 py-1 rounded'
                                : 'text-gray-900'
                            }`}>
                              {tender.compatibilityScore}%
                            </span>
                          </td>
                        ))}
                      </tr>
                      
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 text-sm text-gray-600">Tender Amount</td>
                        {selectedTenders.map((tender) => (
                          <td key={tender.id} className="py-3 px-2 text-center">
                            <span className={`text-sm font-medium ${
                              isBestValue('amount', tender.amount, selectedTenders.map(t => t.amount))
                                ? 'text-green-600 bg-green-50 px-2 py-1 rounded'
                                : 'text-gray-900'
                            }`}>
                              {formatAmount(tender.amount)}
                            </span>
                          </td>
                        ))}
                      </tr>
                      
                      <tr>
                        <td className="py-3 px-2 text-sm text-gray-600">Submission Deadline</td>
                        {selectedTenders.map((tender) => (
                          <td key={tender.id} className="py-3 px-2 text-center text-sm text-gray-900">
                            {tender.deadline}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {selectedTenders.length === 0 && (
        <div className="text-center py-12">
          <GitCompare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start Comparing Tenders</h3>
          <p className="text-gray-500">Select tenders from your saved list to compare them side by side</p>
        </div>
      )}
    </div>
  );
};

export default CompareTendersTab;
