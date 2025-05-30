
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, SortAsc, SortDesc, MapPin, Calendar, ZoomIn, X, Target, TrendingUp, AlertTriangle, Filter } from 'lucide-react';

const Analysis = () => {
  const navigate = useNavigate();
  const [selectedWorkType, setSelectedWorkType] = useState('');
  const [hoveredButton, setHoveredButton] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('roadside-drainage');

  // Mock data for tender bio
  const tenderBio = {
    projectName: "Mumbai-Pune Highway Development Project - Phase 2",
    location: "Maharashtra State Highway 21, Km 45-78",
    estimatedValue: "₹2,450 Crores",
    duration: "36 Months",
    authority: "Maharashtra State Road Development Corporation (MSRDC)",
    tenderDate: "15th March 2024",
    submissionDeadline: "25th April 2024",
    compatibilityScore: 87
  };

  // Location insights data
  const locationInsights = [
    { title: "Current Terrain Type", content: "Mixed terrain with 60% plains and 40% hilly sections. Moderate elevation changes." },
    { title: "Climate Zone & Working Season", content: "Tropical monsoon climate. Optimal working: Oct-May. Monsoon restrictions: Jun-Sep." },
    { title: "Logistical Difficulty", content: "Medium difficulty. Good rail/road connectivity. 15km from nearest cement plant." },
    { title: "Human Threat & Terrorism", content: "Low risk zone. No recent security incidents. Standard security protocols sufficient." },
    { title: "Soil Type & Rock Availability", content: "Black cotton soil (65%), laterite (35%). Local stone quarries within 25km radius." },
    { title: "Critique of Fuel/Cement Access", content: "Excellent fuel access via highway. Cement supply secured through nearby plants." }
  ];

  // Nature of work data
  const workCategories = {
    'roadside-drainage': {
      buttons: ['Box Culverts', 'Pipe Culverts', 'Side Drains', 'Catch Pits', 'Storm Water Drains'],
      data: {
        'Box Culverts': [
          { item: 'Excavation for foundation', quantity: '1,850 cum', rate: '₹285', amount: '₹5,27,250' },
          { item: 'PCC M15 grade', quantity: '180 cum', rate: '₹3,800', amount: '₹6,84,000' },
          { item: 'RCC M25 grade', quantity: '650 cum', rate: '₹5,200', amount: '₹33,80,000' },
          { item: 'Steel reinforcement', quantity: '32 MT', rate: '₹68,000', amount: '₹21,76,000' },
          { item: 'Formwork', quantity: '890 sqm', rate: '₹420', amount: '₹3,73,800' }
        ],
        'Pipe Culverts': [
          { item: 'RCC Pipes 1200mm dia', quantity: '280 RM', rate: '₹1,450', amount: '₹4,06,000' },
          { item: 'Bedding & Surrounds', quantity: '220 cum', rate: '₹950', amount: '₹2,09,000' },
          { item: 'Headwall construction', quantity: '8 Nos', rate: '₹35,000', amount: '₹2,80,000' }
        ],
        'Side Drains': [
          { item: 'Concrete Side Drains', quantity: '2,500 RM', rate: '₹850', amount: '₹21,25,000' },
          { item: 'Stone Lining', quantity: '1,800 sqm', rate: '₹520', amount: '₹9,36,000' }
        ],
        'Catch Pits': [
          { item: 'RCC Catch Pits', quantity: '45 Nos', rate: '₹12,000', amount: '₹5,40,000' },
          { item: 'Grating & Covers', quantity: '45 Nos', rate: '₹3,500', amount: '₹1,57,500' }
        ],
        'Storm Water Drains': [
          { item: 'Major Storm Drains', quantity: '1,200 RM', rate: '₹2,200', amount: '₹26,40,000' },
          { item: 'Inlet Structures', quantity: '28 Nos', rate: '₹18,000', amount: '₹5,04,000' }
        ]
      }
    },
    'structures-work': {
      buttons: ['Major Bridge', 'Minor Bridge', 'ROB/RUB', 'Retaining Wall', 'Abutments'],
      data: {
        'Major Bridge': [
          { item: 'Foundation Work (Well/Pile)', quantity: '1,200 cum', rate: '₹6,800', amount: '₹81,60,000' },
          { item: 'Pier Construction', quantity: '850 cum', rate: '₹7,200', amount: '₹61,20,000' },
          { item: 'Superstructure PSC', quantity: '1,800 cum', rate: '₹8,500', amount: '₹1,53,00,000' },
          { item: 'Deck Slab', quantity: '920 cum', rate: '₹6,200', amount: '₹57,04,000' }
        ],
        'Minor Bridge': [
          { item: 'Abutment Work', quantity: '580 cum', rate: '₹5,400', amount: '₹31,32,000' },
          { item: 'Deck Slab Construction', quantity: '420 cum', rate: '₹5,800', amount: '₹24,36,000' },
          { item: 'Approach Slab', quantity: '180 cum', rate: '₹4,200', amount: '₹7,56,000' }
        ],
        'ROB/RUB': [
          { item: 'Foundation for ROB', quantity: '850 cum', rate: '₹6,500', amount: '₹55,25,000' },
          { item: 'Superstructure Girders', quantity: '120 cum', rate: '₹9,200', amount: '₹11,04,000' }
        ],
        'Retaining Wall': [
          { item: 'Mass Concrete Retaining Wall', quantity: '650 cum', rate: '₹4,800', amount: '₹31,20,000' },
          { item: 'Stone Masonry Wall', quantity: '480 cum', rate: '₹3,600', amount: '₹17,28,000' }
        ],
        'Abutments': [
          { item: 'RCC Abutment Construction', quantity: '320 cum', rate: '₹6,800', amount: '₹21,76,000' },
          { item: 'Wing Wall Construction', quantity: '180 cum', rate: '₹5,200', amount: '₹9,36,000' }
        ]
      }
    },
    'protection-work': {
      buttons: ['Slope Protection', 'Toe Wall', 'Breast Wall', 'Stone Pitching', 'Gabion Work'],
      data: {
        'Slope Protection': [
          { item: 'Stone Pitching 300mm thick', quantity: '3,200 sqm', rate: '₹680', amount: '₹21,76,000' },
          { item: 'Filter Layer', quantity: '1,100 cum', rate: '₹1,450', amount: '₹15,95,000' },
          { item: 'Weep holes', quantity: '180 Nos', rate: '₹850', amount: '₹1,53,000' }
        ],
        'Toe Wall': [
          { item: 'Mass Concrete M15', quantity: '650 cum', rate: '₹4,200', amount: '₹27,30,000' },
          { item: 'Stone Masonry', quantity: '420 cum', rate: '₹3,800', amount: '₹15,96,000' }
        ],
        'Breast Wall': [
          { item: 'RCC Breast Wall', quantity: '450 cum', rate: '₹5,800', amount: '₹26,10,000' },
          { item: 'Drainage Behind Wall', quantity: '280 sqm', rate: '₹680', amount: '₹1,90,400' }
        ],
        'Stone Pitching': [
          { item: 'Random Rubble Stone Pitching', quantity: '2,800 sqm', rate: '₹720', amount: '₹20,16,000' },
          { item: 'Bedding Material', quantity: '420 cum', rate: '₹1,200', amount: '₹5,04,000' }
        ],
        'Gabion Work': [
          { item: 'Gabion Boxes', quantity: '180 cum', rate: '₹2,800', amount: '₹5,04,000' },
          { item: 'Stone Filling', quantity: '180 cum', rate: '₹1,500', amount: '₹2,70,000' }
        ]
      }
    },
    'tcs-layer': {
      buttons: ['Bituminous Work', 'Granular Base', 'Sub Base', 'Prime Coat', 'Tack Coat'],
      data: {
        'Bituminous Work': [
          { item: 'DBM (Dense Bituminous Mix)', quantity: '18,500 sqm', rate: '₹195', amount: '₹36,07,500' },
          { item: 'BC (Bituminous Concrete)', quantity: '18,500 sqm', rate: '₹145', amount: '₹26,82,500' },
          { item: 'SDBC (Semi Dense Bituminous)', quantity: '12,000 sqm', rate: '₹165', amount: '₹19,80,000' }
        ],
        'Granular Base': [
          { item: 'WMM Grade-II', quantity: '8,500 cum', rate: '₹2,200', amount: '₹1,87,00,000' },
          { item: 'GSB (Granular Sub Base)', quantity: '12,000 cum', rate: '₹1,850', amount: '₹2,22,00,000' }
        ],
        'Sub Base': [
          { item: 'Granular Sub Base Course', quantity: '15,000 cum', rate: '₹1,650', amount: '₹2,47,50,000' },
          { item: 'Compaction & Finishing', quantity: '18,500 sqm', rate: '₹45', amount: '₹8,32,500' }
        ],
        'Prime Coat': [
          { item: 'Bituminous Prime Coat', quantity: '18,500 sqm', rate: '₹28', amount: '₹5,18,000' },
          { item: 'Curing & Protection', quantity: '18,500 sqm', rate: '₹12', amount: '₹2,22,000' }
        ],
        'Tack Coat': [
          { item: 'Bituminous Tack Coat', quantity: '18,500 sqm', rate: '₹18', amount: '₹3,33,000' },
          { item: 'Surface Preparation', quantity: '18,500 sqm', rate: '₹8', amount: '₹1,48,000' }
        ]
      }
    }
  };

  // Payment weightage data
  const paymentWeightage = [
    { work: 'Structures Work', subwork: 'Bridges & Major Culverts', percentage: 38 },
    { work: 'Earthwork', subwork: 'Excavation & Embankment', percentage: 28 },
    { work: 'Pavement Work', subwork: 'Bituminous Layers', percentage: 22 },
    { work: 'Protection Work', subwork: 'Slope & Toe Protection', percentage: 8 },
    { work: 'Drainage Work', subwork: 'Cross Drainage', percentage: 4 }
  ];

  // Site images data
  const siteImages = [
    { id: '1', src: '/placeholder.svg', title: 'Project Site Overview', location: 'Km 45+200', date: '2024-03-15' },
    { id: '2', src: '/placeholder.svg', title: 'Bridge Construction Area', location: 'Km 52+800', date: '2024-03-14' },
    { id: '3', src: '/placeholder.svg', title: 'Drainage System Layout', location: 'Km 48+600', date: '2024-03-13' },
    { id: '4', src: '/placeholder.svg', title: 'Road Alignment Survey', location: 'Km 56+400', date: '2024-03-12' },
    { id: '5', src: '/placeholder.svg', title: 'Material Storage Area', location: 'Km 50+100', date: '2024-03-11' },
    { id: '6', src: '/placeholder.svg', title: 'Equipment Staging', location: 'Km 46+750', date: '2024-03-10' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return { 
      color: 'text-green-600', 
      bgColor: 'from-green-400 to-green-600',
      icon: TrendingUp,
      label: 'Excellent Match'
    };
    if (score >= 50) return { 
      color: 'text-yellow-600', 
      bgColor: 'from-yellow-400 to-yellow-600',
      icon: Target,
      label: 'Good Match'
    };
    return { 
      color: 'text-red-600', 
      bgColor: 'from-red-400 to-red-600',
      icon: AlertTriangle,
      label: 'Poor Match'
    };
  };

  const scoreData = getScoreColor(tenderBio.compatibilityScore);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (tenderBio.compatibilityScore / 100) * circumference;

  const filteredPaymentData = paymentWeightage
    .filter(item => 
      item.work.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subwork.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return sortOrder === 'asc' ? a.percentage - b.percentage : b.percentage - a.percentage;
    });

  const topThreeWorks = paymentWeightage.slice(0, 3);

  const renderWorkTable = () => {
    if (!hoveredButton) return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Hover over a work type to view details</p>
      </div>
    );
    
    const categoryData = workCategories[activeTab as keyof typeof workCategories];
    const tableData = categoryData?.data[hoveredButton as keyof typeof categoryData.data];
    
    if (!tableData) return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No data available for this selection</p>
      </div>
    );

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-lg text-teal-700">{hoveredButton}</h4>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl">
              <SortAsc className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="overflow-auto max-h-80 rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gradient-to-r from-teal-50 to-blue-50">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-700 border-b">Item Description</th>
                <th className="p-4 text-left font-semibold text-gray-700 border-b">Quantity</th>
                <th className="p-4 text-left font-semibold text-gray-700 border-b">Rate</th>
                <th className="p-4 text-left font-semibold text-gray-700 border-b">Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-4 border-b border-gray-100 font-medium">{row.item}</td>
                  <td className="p-4 border-b border-gray-100">{row.quantity}</td>
                  <td className="p-4 border-b border-gray-100">{row.rate}</td>
                  <td className="p-4 border-b border-gray-100 font-semibold text-teal-700">{row.amount}</td>
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
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)} 
              className="mr-4 rounded-xl border-2 hover:bg-teal-50 hover:border-teal-300 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Tender Analysis Report
            </h1>
          </div>

          {/* Tender Bio & Compatibility Score */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3 shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
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
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Submission Deadline</p>
                      <p className="font-medium text-red-600">{tenderBio.submissionDeadline}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compatibility Score */}
            <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Compatibility Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-2">
                <div className="relative group">
                  <div className="w-32 h-32 mx-auto relative">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-200" />
                      <circle
                        cx="50" cy="50" r="45"
                        stroke="url(#scoreGradient)"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1000 ease-in-out"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" className="stop-color-teal-400" />
                          <stop offset="100%" className="stop-color-blue-600" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className={`text-3xl font-bold ${scoreData.color} mb-1`}>
                        {tenderBio.compatibilityScore}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">out of 100</div>
                      <scoreData.icon className={`w-5 h-5 mt-1 ${scoreData.color}`} />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                      <div className="font-medium">{scoreData.label}</div>
                      <div className="text-gray-300 mt-1">Based on your profile match</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Insights Panel */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Location Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locationInsights.map((insight, index) => (
                  <Card key={index} className="p-4 bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105">
                    <h4 className="font-semibold text-teal-700 mb-2 text-sm">{insight.title}</h4>
                    <div className="text-sm text-gray-700 max-h-20 overflow-y-auto">
                      {insight.content}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nature of Work Section */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Nature of Work</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6 bg-gray-100 rounded-xl p-1">
                  <TabsTrigger 
                    value="roadside-drainage" 
                    className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Roadside Drainage
                  </TabsTrigger>
                  <TabsTrigger 
                    value="structures-work"
                    className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Structures Work
                  </TabsTrigger>
                  <TabsTrigger 
                    value="protection-work"
                    className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Protection Work
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tcs-layer"
                    className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
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
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-xl font-semibold text-gray-900">Payment Weightage by Work</CardTitle>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search work types..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-48 rounded-xl border-2"
                    />
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="rounded-xl"
                  >
                    {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto max-h-80 mb-6 rounded-xl border border-gray-200">
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
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="p-4 border-b border-gray-100 font-medium">{item.work}</td>
                        <td className="p-4 border-b border-gray-100">{item.subwork}</td>
                        <td className="p-4 border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(item.percentage / 40) * 100}%` }}
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
                  <Card key={index} className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200 rounded-xl hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        {work.percentage}%
                      </div>
                      <div className="text-sm font-medium text-gray-700">{work.work}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(work.percentage / 40) * 100}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Site Images Gallery */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Site Images Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {siteImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="font-medium text-xs truncate">{image.title}</h4>
                      <div className="flex items-center text-xs text-gray-200 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {image.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lightbox Modal */}
              {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                  <div className="relative max-w-4xl max-h-full">
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
                    >
                      <X className="w-8 h-8" />
                    </button>

                    <img
                      src={selectedImage.src}
                      alt={selectedImage.title}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                      <h3 className="text-lg font-semibold mb-2">{selectedImage.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-200">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {selectedImage.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {selectedImage.date}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="absolute inset-0 -z-10"
                    onClick={() => setSelectedImage(null)}
                  ></div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
