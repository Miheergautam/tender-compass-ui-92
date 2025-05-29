
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target } from 'lucide-react';

interface AnalysisPageProps {
  onBack: () => void;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [hoveredButton, setHoveredButton] = useState<string>('');

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

  // Mock payment weightage data
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

  // Mock site images
  const siteImages = [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg'
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderWorkTable = () => {
    if (!selectedCategory || !hoveredButton) return null;
    
    const categoryData = workCategories[selectedCategory as keyof typeof workCategories];
    const tableData = categoryData?.data[hoveredButton];
    
    if (!tableData) return null;

    return (
      <div className="mt-4">
        <h4 className="font-semibold mb-2 text-indigo-700">{hoveredButton}</h4>
        <div className="overflow-auto max-h-64">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left border">Item</th>
                <th className="p-2 text-left border">Quantity</th>
                <th className="p-2 text-left border">Rate</th>
                <th className="p-2 text-left border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{row.item}</td>
                  <td className="p-2 border">{row.quantity}</td>
                  <td className="p-2 border">{row.rate}</td>
                  <td className="p-2 border font-medium">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="outline" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Tender Analysis</h1>
        </div>

        {/* Tender Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Tender Biography</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Project Name</p>
                  <p className="font-medium">{tenderBio.projectName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{tenderBio.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Value</p>
                  <p className="font-medium">{tenderBio.estimatedValue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">{tenderBio.duration}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Authority</p>
                  <p className="font-medium">{tenderBio.authority}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CardTitle>Compatibility Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(tenderBio.compatibilityScore)} mb-2`}>
                {tenderBio.compatibilityScore}
              </div>
              <div className="text-gray-600">out of 100</div>
              <Target className="w-8 h-8 mx-auto mt-2 text-indigo-600" />
            </CardContent>
          </Card>
        </div>

        {/* Nature of Work Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Nature of Work</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="roadside-drainage">Roadside Drainage</TabsTrigger>
                <TabsTrigger value="structures-work">Structures Work</TabsTrigger>
                <TabsTrigger value="protection-work">Protection Work</TabsTrigger>
                <TabsTrigger value="tcs-layer">TCS Layer</TabsTrigger>
              </TabsList>
              
              {Object.keys(workCategories).map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[400px]">
                    <div className="space-y-2">
                      {workCategories[category as keyof typeof workCategories].buttons.map((button) => (
                        <Button
                          key={button}
                          variant="outline"
                          className="w-full justify-start hover:bg-indigo-50"
                          onMouseEnter={() => setHoveredButton(button)}
                          onMouseLeave={() => setHoveredButton('')}
                        >
                          {button}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="lg:col-span-3 bg-gray-50 rounded-lg p-4">
                      {renderWorkTable()}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Payment Weightage Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Payment Weightage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto max-h-64 mb-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left border">Work Type</th>
                    <th className="p-3 text-left border">Sub Work</th>
                    <th className="p-3 text-left border">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentWeightage.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-3 border">{item.work}</td>
                      <td className="p-3 border">{item.subwork}</td>
                      <td className="p-3 border font-medium">{item.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {topThreeWorks.map((work, index) => (
                <Card key={index} className="bg-indigo-50 border-indigo-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-700">{work.percentage}%</div>
                    <div className="text-sm text-indigo-600">{work.name}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Site Images Section */}
        <Card>
          <CardHeader>
            <CardTitle>Site Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {siteImages.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg border">
                  <img
                    src={image}
                    alt={`Site image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisPage;
