
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const SmartSearchFilters: React.FC = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    state: '',
    department: '',
    ownership: '',
    sortBy: '',
    lowerLimit: '',
    upperLimit: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="rounded-xl border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">Smart Search</CardTitle>
          <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {isFiltersOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">State</label>
                  <Select value={filters.state} onValueChange={(value) => handleFilterChange('state', value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                      <SelectItem value="rajasthan">Rajasthan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Department</label>
                  <Select value={filters.department} onValueChange={(value) => handleFilterChange('department', value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nhai">NHAI</SelectItem>
                      <SelectItem value="pwd">PWD</SelectItem>
                      <SelectItem value="irrigation">Irrigation</SelectItem>
                      <SelectItem value="railways">Railways</SelectItem>
                      <SelectItem value="urban-development">Urban Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Ownership</label>
                  <Select value={filters.ownership} onValueChange={(value) => handleFilterChange('ownership', value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select Ownership" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="ppp">Public-Private Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Sort By</label>
                  <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-newest">Date (Newest First)</SelectItem>
                      <SelectItem value="date-oldest">Date (Oldest First)</SelectItem>
                      <SelectItem value="value-high">Value (High to Low)</SelectItem>
                      <SelectItem value="value-low">Value (Low to High)</SelectItem>
                      <SelectItem value="deadline">Submission Deadline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Tender Value Range (₹ Crores)</label>
                  <div className="flex gap-2 items-center">
                    <Input
                      placeholder="Lower Limit"
                      value={filters.lowerLimit}
                      onChange={(e) => handleFilterChange('lowerLimit', e.target.value)}
                      className="rounded-xl"
                      type="number"
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      placeholder="Upper Limit"
                      value={filters.upperLimit}
                      onChange={(e) => handleFilterChange('upperLimit', e.target.value)}
                      className="rounded-xl"
                      type="number"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline" className="rounded-xl">Clear Filters</Button>
                <Button className="rounded-xl bg-gradient-to-r from-teal-500 to-blue-600">Apply Filters</Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center text-gray-500 py-8">
          <p>Use the filters above to search for relevant tenders</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSearchFilters;
