
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Search, SortAsc, SortDesc, Hammer } from 'lucide-react';
import CompatibilityScore from './CompatibilityScore';
import ImageGallery from './ImageGallery';
import Navbar from './Navbar';

interface AnalysisPageProps {
  onBack: () => void;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('roadside-drainage');
  const [hoveredButton, setHoveredButton] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = useState('percentage');

  // Mock data for tender bio
  const tenderBio = {
    projectName: "Highway Development Project - Phase 2",
    location: "Mumbai-Pune Expressway",
    estimatedValue: "₹250 Crores",
    duration: "24 Months",
    authority: "Maharashtra State Road Development Corporation",
    compatibilityScore: 87
  };

  // Mock data for nature of work categories
  const workCategories = {
    'roadside-drainage': {
      buttons: ['Box Culverts', 'Pipe Culverts', 'Side Drains', 'Catch Pits'],
      data: {
        'Box Culverts': [
          { item: 'Excavation', quantity: '1500 cum', rate: '₹250', amount: '₹3,75,000' },
          { item: 'Concrete Work', quantity: '500 cum', rate: '₹4500', amount: '₹22,50,000' },
          { item: 'Reinforcement', quantity: '25 MT', rate: '₹65000', amount: '₹16,25,000' }
        ],
        'Pipe Culverts': [
          { item: 'RCC Pipes', quantity: '200 RM', rate: '₹1200', amount: '₹2,40,000' },
          { item: 'Bedding & Surrounds', quantity: '150 cum', rate: '₹800', amount: '₹1,20,000' }
        ]
      }
    },
    'structures-work': {
      buttons: ['Major Bridge', 'Minor Bridge', 'ROB/RUB', 'Retaining Wall'],
      data: {
        'Major Bridge': [
          { item: 'Foundation Work', quantity: '800 cum', rate: '₹5500', amount: '₹44,00,000' },
          { item: 'Superstructure', quantity: '1200 cum', rate: '₹6000', amount: '₹72,00,000' }
        ],
        'Minor Bridge': [
          { item: 'Abutment Work', quantity: '400 cum', rate: '₹4800', amount: '₹19,20,000' },
          { item: 'Deck Slab', quantity: '600 cum', rate: '₹5200', amount: '₹31,20,000' }
        ]
      }
    },
    'protection-work': {
      buttons: ['Slope Protection', 'Toe Wall', 'Breast Wall', 'Stone Pitching'],
      data: {
        'Slope Protection': [
          { item: 'Stone Pitching', quantity: '2000 sqm', rate: '₹450', amount: '₹9,00,000' },
          { item: 'Filter Layer', quantity: '800 cum', rate: '₹1200', amount: '₹9,60,000' }
        ]
      }
    },
    'tcs-layer': {
      buttons: ['Bituminous Work', 'Granular Base', 'Sub Base', 'Prime Coat'],
      data: {
        'Bituminous Work': [
          { item: 'DBM', quantity: '15000 sqm', rate: '₹180', amount: '₹27,00,000' },
          { item: 'BC Layer', quantity: '15000 sqm', rate: '₹120', amount: '₹18,00,000' }
        ]
      }
    }
  };

  const paymentWeightage = [
    { work: 'Earthwork', subwork: 'Excavation & Embankment', percentage: 25 },
    { work: 'Structures', subwork: 'Bridges & Culverts', percentage: 35 },
    { work: 'Pavement', subwork: 'Bituminous Work', percentage: 20 },
    { work: 'Protection', subwork: 'Slope Protection', percentage: 12 },
    { work: 'Drainage', subwork: 'Cross Drainage', percentage: 8 }
  ];

  const topThreeWorks = [
    { name: 'Structures Work', percentage: 35 },
    { name: 'Earthwork', percentage: 25 },
    { name: 'Pavement Work', percentage: 20 }
  ];

  const siteImages = [
    {
      id: '1',
      src: '/placeholder.svg',
      title: 'Project Site Overview',
      location: 'Mumbai-Pune Expressway',
      date: '2024-01-15'
    },
    {
      id: '2',
      src: '/placeholder.svg',
      title: 'Bridge Construction Area',
      location: 'Km 45+200',
      date: '2024-01-14'
    },
    {
      id: '3',
      src: '/placeholder.svg',
      title: 'Drainage System',
      location: 'Km 47+800',
      date: '2024-01-13'
    },
    {
      id: '4',
      src: '/placeholder.svg',
      title: 'Road Alignment',
      location: 'Km 50+100',
      date: '2024-01-12'
    }
  ];

  const filteredPaymentData = paymentWeightage
    .filter(item => 
      item.work.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subwork.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortBy as keyof typeof a];
      const bVal = b[sortBy as keyof typeof b];
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return sortOrder === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });

  const renderWorkTable = () => {
    if (!selectedCategory || !hoveredButton) return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Hover over a button to view details</p>
      </div>
    );
    
    const categoryData = workCategories[selectedCategory as keyof typeof workCategories];
    const tableData = categoryData?.data[hoveredButton];
    
    if (!tableData) return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No data available for this selection</p>
      </div>
    );

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-lg text-teal-700">{hoveredButton}</h4>
          <div className="text-sm text-gray-500">
            {tableData.length} items
          </div>
        </div>
        
        <div className="overflow-auto max-h-80 rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gradient-to-r from-teal-50 to-blue-50">
              <tr>
                <th className="p-3 text-left font-semibold text-gray-700 border-b">Item</th>
                <th className="p-3 text-left font-semibold text-gray-700 border-b">Quantity</th>
                <th className="p-3 text-left font-semibold text-gray-700 border-b">Rate</th>
                <th className="p-3 text-left font-semibold text-gray-700 border-b">Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="p-3 border-b border-gray-100 font-medium">{row.item}</td>
                  <td className="p-3 border-b border-gray-100">{row.quantity}</td>
                  <td className="p-3 border-b border-gray-100">{row.rate}</td>
                  <td className="p-3 border-b border-gray-100 font-semibold text-teal-700">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar currentPage="analysis" onNavigate={() => {}} />
      
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="outline" 
              onClick={onBack} 
              className="mr-4 rounded-xl border-2 hover:bg-teal-50 hover:border-teal-300 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Tender Analysis
            </h1>
          </div>

          {/* Loading Skeletons */}
          {isLoading ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <Skeleton className="h-48 w-full rounded-xl" />
                </div>
                <Skeleton className="h-48 w-full rounded-xl" />
              </div>
              <Skeleton className="h-96 w-full rounded-xl" />
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          ) : (
            <>
              {/* Tender Bio Section */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <Card className="lg:col-span-3 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">Tender Biography</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Project Name</p>
                          <p className="font-semibold text-gray-900">{tenderBio.projectName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
                          <p className="font-medium text-gray-700">{tenderBio.location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Estimated Value</p>
                          <p className="font-semibold text-teal-700 text-lg">{tenderBio.estimatedValue}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Duration</p>
                          <p className="font-medium text-gray-700">{tenderBio.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Authority</p>
                          <p className="font-medium text-gray-700">{tenderBio.authority}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900">Compatibility Score</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-2">
                    <CompatibilityScore score={tenderBio.compatibilityScore} />
                  </CardContent>
                </Card>
              </div>

              {/* Nature of Work Section */}
              <Card className="mb-8 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">Nature of Work</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6 bg-gray-100 rounded-xl p-1">
                      <TabsTrigger 
                        value="roadside-drainage" 
                        className="rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                      >
                        Roadside Drainage
                      </TabsTrigger>
                      <TabsTrigger 
                        value="structures-work"
                        className="rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                      >
                        Structures Work
                      </TabsTrigger>
                      <TabsTrigger 
                        value="protection-work"
                        className="rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                      >
                        Protection Work
                      </TabsTrigger>
                      <TabsTrigger 
                        value="tcs-layer"
                        className="rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                      >
                        TCS Layer
                      </TabsTrigger>
                    </TabsList>
                    
                    {Object.keys(workCategories).map((category) => (
                      <TabsContent key={category} value={category} className="mt-0">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[400px]">
                          <div className="space-y-3">
                            {workCategories[category as keyof typeof workCategories].buttons.map((button) => (
                              <Button
                                key={button}
                                variant="outline"
                                className={`w-full justify-start rounded-xl border-2 transition-all duration-200 ${
                                  hoveredButton === button
                                    ? 'bg-gradient-to-r from-teal-50 to-blue-50 border-teal-300 text-teal-700 shadow-md'
                                    : 'hover:bg-teal-50 hover:border-teal-200 hover:text-teal-600'
                                }`}
                                onMouseEnter={() => setHoveredButton(button)}
                                onMouseLeave={() => setHoveredButton('')}
                              >
                                {button}
                              </Button>
                            ))}
                          </div>
                          
                          <div className="lg:col-span-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                            {renderWorkTable()}
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>

              {/* Payment Weightage Section */}
              <Card className="mb-8 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <CardTitle className="text-xl font-semibold text-gray-900">Payment Weightage</CardTitle>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search work types..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-full sm:w-48 rounded-xl border-2 border-gray-200 focus:border-teal-400"
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-teal-400 focus:outline-none bg-white text-sm"
                        >
                          <option value="percentage">Sort by Percentage</option>
                          <option value="work">Sort by Work Type</option>
                          <option value="subwork">Sort by Sub Work</option>
                        </select>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                          className="rounded-xl border-2"
                        >
                          {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto max-h-80 mb-6 rounded-lg border border-gray-200">
                    <table className="w-full">
                      <thead className="sticky top-0 bg-gradient-to-r from-teal-50 to-blue-50">
                        <tr>
                          <th className="p-4 text-left font-semibold text-gray-700 border-b">Work Type</th>
                          <th className="p-4 text-left font-semibold text-gray-700 border-b">Sub Work</th>
                          <th className="p-4 text-left font-semibold text-gray-700 border-b">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPaymentData.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="p-4 border-b border-gray-100 font-medium">{item.work}</td>
                            <td className="p-4 border-b border-gray-100">{item.subwork}</td>
                            <td className="p-4 border-b border-gray-100">
                              <div className="flex items-center space-x-3">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(item.percentage / 35) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="font-semibold text-teal-700 min-w-[3rem]">{item.percentage}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {topThreeWorks.map((work, index) => (
                      <Card key={index} className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200 rounded-xl">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                            {work.percentage}%
                          </div>
                          <div className="text-sm font-medium text-gray-700">{work.name}</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                            <div 
                              className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${(work.percentage / 35) * 100}%` }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Site Images Section */}
              <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">Site Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageGallery images={siteImages} />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
