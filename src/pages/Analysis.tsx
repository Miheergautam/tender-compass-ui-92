
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, MapPin, Calendar, ZoomIn, X, Target, TrendingUp, AlertTriangle, ExternalLink } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

const Analysis = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<any>(null);

  // Calculate days left
  const submissionDate = new Date('2025-06-19');
  const today = new Date();
  const timeDiff = submissionDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Tender bio data from placeholder
  const tenderBio = {
    brief: "construction improvement of rishi rongli kupup from km 53 design chainage km 55.44 to km 70 design chainage km 74.575 net design length 19.135 km from existing cl 9 to nhdl specifications through epc mode in sikkim under project swastik",
    location: "Sikkim",
    estimatedCost: "223.69 Cr.",
    emd: "4.46 Cr.",
    length: "19.135 km",
    type: "EPC Contract",
    downloadDocuments: "https://defproc.gov.in/nicgep/app",
    organisation: "Border Roads Organization",
    organisationId: "2025_BRO_706797_1",
    website: "https://defproc.gov.in/nicgep/app",
    submissionDeadline: "19 June 2025",
    compatibilityScore: 67
  };

  // Updated location insights with proper markdown content
  const locationInsights = [
    { 
      title: "Terrain", 
      content: "### Terrain Type  \n- **Description**: Mountainous with steep slopes" 
    },
    { 
      title: "Climate", 
      content: "### Climate & Construction Season  \n- **Climate Zone**: Alpine/Temperate (High-altitude region)  \n- **Working Season**: April to October (Dry months, avoiding monsoon/winter)" 
    },
    { 
      title: "Logistics", 
      content: "### Logistical Difficulty  \n- **Road Name**: Rishi - Rongli – Kupup  \n- **Location**: Sikkim  \n- **Difficulty**: High (mountainous terrain, remote access)" 
    },
    { 
      title: "Safety", 
      content: "### Human Threat/Terrorism Risk  \n- **Risk Level**: Low to Moderate  \n- **Context**: Sikkim generally experiences low terrorism activity, but proximity to borders may pose sporadic risks.  \n\n*(Note: Risk assessments may vary based on current geopolitical conditions.)*" 
    },
    { 
      title: "Soil Type", 
      content: "### Soil Type & Rock Availability  \n- **Primary Soil**: Brown forest soils  \n- **Rock Availability**: Suitable for aggregates (granite/basalt likely)  \n\n*Note: Based on typical Sikkim geology; confirm with local testing for exact specifications.*" 
    },
    { 
      title: "Material Availability", 
      content: "### Fuel/Cement Vendor Availability  \n- **Diesel/Petrol Pumps**: Available in Rongli and Kupup (major towns along the route)  \n- **Cement Vendors**: Limited local availability; nearest reliable suppliers in Gangtok (~50km from Rongli)  \n\n*Note: Remote stretches may require advance procurement planning.*" 
    }
  ];

  // Nature of work content
  const workCategories = {
    'roadside-drainage': `### Roadside Drainage Details

#### Drainage Specifications
| Drain Type                     | Minimum Length (m) | Material/Design Standard               |
|--------------------------------|--------------------|----------------------------------------|
| V-Shape drains in PCC – M15    | 23,655.00          | As per IRC: SP:48-2023 (Chapter 2, Para 5.12) |

#### Key Requirements
- **Built-up Areas**: 
  - RCC covered drains cum Footpath mandatory
  - Invert levels based on ground slopes of adjoining properties/open grounds
  - RCC covers with locking mechanism to prevent sliding
- **Traffic Load Areas**: 
  - RCC covers designed for traffic load at property access points
- **Cutting Portions**: 
  - Lined drains of suitable size (to be finalized with Authority Engineer)
- **Runoff Accommodation**: 
  - RCC drain sections must handle runoff from carriageway & adjoining areas

#### Notes
- **Indicative Quantities**: 
  - 23,655m is the minimum specified length (may increase as per site conditions)
- **Approval Required**: 
  - Final drain types/sizes/invert levels require Authority Engineer's approval
- **Scope Clarification**: 
  - Length increases beyond specified minimum do not constitute Change of Scope`,
    
    'structures-work': `### Culverts (Reconstruction)
| S.No | Design Chainage (Km) | Type | Span Arrangement (No x m) | Clear Width (m) |
|------|----------------------|------|---------------------------|-----------------|
| 1    | 55+580               | SLAB | 1 x 2.0                   | 8.80            |
| 2    | 55+700               | SLAB | 1 x 2.0                   | 8.80            |
| 3    | 55+890               | SLAB | 1 x 2.0                   | 8.80            |

### Additional New Culverts
| S.No | Design Chainage (Km) | Type | Span Arrangement (No x m) | Clear Width (m) |
|------|----------------------|------|---------------------------|-----------------|
| 1    | 55+775               | SLAB | 1 x 6.0                   | 8.80            |
| 2    | 55+970               | SLAB | 1 x 3.0                   | 8.80            |
| 3    | 56+100               | SLAB | 1 x 6.0                   | 8.80            |
| ...  | ...                  | ...  | ...                       | ...             |
| 126  | 74+340               | SLAB | 1 x 2.0                   | 8.80            |

**Note**: Total 126 culverts (SLAB type) with spans ranging from 2.0m to 6.0m and uniform clear width of 8.80m. Full list available in source tables.

### Minor Bridges (New Construction)
| S.No | Design Chainage (Km) | Type | Span Arrangement (No x m) | Width (m) |
|------|----------------------|------|---------------------------|-----------|
| 1    | 56+925               | MNB  | 1 x 10.0                  | 14.5      |
| 2    | 65+755               | MNB  | 1 x 10.0                  | 14.5      |
| 3    | 66+530               | MNB  | 1 x 8.0                   | 14.5      |
| 4    | 68+140               | MNB  | 1 x 10.0                  | 14.5      |

### General Specifications
- **Design Standards**: IRC:SP:73-2018
- **Carriageway**: Minimum width as per manual (8.80m for culverts, 14.5m for bridges)
- **Footpaths**: Mandatory for all new bridges
- **Utility Services**: Designed to carry OFC/telephone lines
- **High-Level Bridges**: All new bridges to be high-level

### Pipe Culverts
- **HP Culverts**: To be constructed at cross-road junctions as per site requirements
- **Balancing Culverts**: Additional pipe culverts if needed

### Protection Works
- **Floor Protection**: As per IRC codes
- **Railing/Parapets**: Repairs/replacements specified but no locations listed

### Notes
- Quantities are minimums; may increase based on site conditions without constituting Change of Scope.
- All structures to be approved by Authority Engineer.`,
    
    'protection-work': `### Protection Works Summary  

| Type              | Side | Length (m) | Associated Features          | TCS Reference |  
|-------------------|------|------------|------------------------------|---------------|  
| Breast Wall       | BHS  | 1520       | Flexible Pavement, Drain     | TCS-IV        |  
| Breast Wall       | LHS  | 1860       | Flexible Pavement, Drain     | TCS-V         |  
| Breast Wall       | LHS  | 3945       | Flexible Pavement, Drain     | TCS-VI        |  
| Gabion Wall       | LHS  | 60         | Stone Pitching (RHS)         | TCS-VII       |  
| Retaining Wall    | LHS  | 985        | Flexible Pavement, Drain     | TCS-VIII      |  
| Retaining Wall    | LHS  | 1025       | Breast Wall (RHS), Drain     | TCS-IX        |  
| Breast Wall       | RHS  | 960        | Flexible Pavement, Drain     | TCS-X         |  
| Breast Wall       | RHS  | 3310       | Flexible Pavement, Drain     | TCS-XI        |  
| Retaining Wall    | RHS  | 1490       | Flexible Pavement, Drain     | TCS-XII       |  
| Retaining Wall    | RHS  | 1390       | Breast Wall (LHS), Drain     | TCS-XIII      |  

### Key Observations  
- **Total Length with Protection Works**: 19,135 m (entire project)  
- **Highest Quantity**: Breast Walls (LHS - 3,945 m)  
- **Unique Feature**: Gabion Wall paired with Stone Pitching (TCS-VII)  

### Notes  
- **Material Specifications**: [Data unavailable]  
- **Design Standards**: IRC: SP: 73-2018 (implied from context)  
- **Execution Flexibility**: Lengths may vary based on site conditions (per Note 1, Page 165)`,

    'road-composition': `### Typical Cross Section (TCS) Schedule

| TCS Type | Proposal Description | Length (m) | Associated Features |
|----------|----------------------|------------|---------------------|
| TCS-I    | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT & BHS DRAIN | 240 | BHS Drain |
| TCS-II   | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT & LHS DRAIN | 1295 | LHS Drain |
| TCS-III  | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT & RHS DRAIN | 1055 | RHS Drain |
| TCS-IV   | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, BHS BREAST WALL & BHS DRAIN | 1520 | BHS Breast Wall, BHS Drain |
| TCS-V    | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, LHS BREAST WALL & BHS DRAIN | 1860 | LHS Breast Wall, BHS Drain |
| TCS-VI   | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, LHS BREAST WALL & DRAIN | 3945 | LHS Breast Wall, Drain |
| TCS-VII  | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, LHS GABION WALL & RHS STONE PITCHING | 60 | LHS Gabion Wall, RHS Stone Pitching |
| TCS-VIII | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, LHS RETAINING WALL & RHS DRAIN | 985 | LHS Retaining Wall, RHS Drain |
| TCS-IX   | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, LHS RETAINING WALL, RHS BREAST WALL & DRAIN | 1025 | LHS Retaining Wall, RHS Breast Wall, Drain |
| TCS-X    | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, RHS BREAST WALL & BHS DRAIN | 960 | RHS Breast Wall, BHS Drain |
| TCS-XI   | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, RHS BREAST WALL & DRAIN | 3310 | RHS Breast Wall, Drain |
| TCS-XII  | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, RHS RETAINING WALL & LHS DRAIN | 1490 | RHS Retaining Wall, LHS Drain |
| TCS-XIII | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, RHS RETAINING WALL, LHS BREAST WALL & DRAIN | 1390 | RHS Retaining Wall, LHS Breast Wall, Drain |

**Total Length**: 19,135 m  

### Pavement Composition (Generic for Flexible Pavement)
- **Surface Course**: [Material/Thickness unavailable]  
- **Base Course**: [Material/Thickness unavailable]  
- **Sub-base**: [Material/Thickness unavailable]  
- **Subgrade**: [Specifications unavailable]  

### Notes  
- **Width**: Carriageway width varies per structure (tapering as per manual if different from approaches)  
- **Drain Types**: BHS (Both Hand Side), LHS (Left Hand Side), RHS (Right Hand Side)  
- **Wall Types**: Breast Wall, Gabion Wall, Retaining Wall  

[Additional layer details would require Annex-III of Schedule-A]`
  };

  // Payment weightage content
  const paymentWeightage = `### Payment Weightage  

#### Road Works (41.794%)  
| Stage | Sub-Stage | Weightage |  
|-------|-----------|-----------|  
| **B.1- Reconstruction/New Realignment/Bypass (Flexible Pavement)** | Earthwork up to top of embankment | 22.70% |  
|  | Sub-Grade | 0.68% |  
|  | Sub-Base Course | 12.11% |  
|  | Non-Bituminous Base Course | 12.76% |  
|  | Bituminous Base Course | 12.76% |  
|  | Wearing Coat | 7.69% |  
| **D- Culverts** | Culverts (length < 6 m) | 31.30% |  

#### Minor Bridges/Underpasses/Overpasses (1.950%)  
| Stage | Sub-Stage | Weightage |  
|-------|-----------|-----------|  
| **A.2- New Minor Bridges (length >6m and <60m)** | Foundation | 27.42% |  
|  | Sub-structure | 35.27% |  
|  | Super-structure | 25.28% |  
|  | Miscellaneous Works | 6.35% |  
|  | Approaches | 5.68% |  

#### Other Works (56.256%)  
| Category | Sub-Work | Weightage |  
|----------|----------|-----------|  
| **Roadside Drain** | PCC Drain | 2.69% |  
|  | Unlined surface drains | 0.10% |  
| **Road Signs & Safety** | Signs, markings, km stones | 3.18% |  
|  | Overhead gantry signs | 0.06% |  
| **Junction & Facilities** | Junction improvement | 0.21% |  
|  | Bus Bays/Truck lay-byes | 0.22% |  
| **Protection Works** | Crash Barrier | 0.45% |  
|  | Retaining Wall | 25.12% |  
|  | Breast Wall | 59.32% |  
|  | Parapet | 3.15% |  
|  | Hydro seeding | 2.24% |  
| **Utilities** | Utility Ducts | 2.89% |  
| **Miscellaneous** | Helipad | 0.19% |  

**Notes**:  
- *Excludes all 0% weightage entries*.  
- *For culverts, payment is split: 75% on structure completion, 25% on protection works*.`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500">Submission Deadline</div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-orange-500" />
              <span className="font-medium text-gray-900">19 June 2025</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                daysLeft <= 7 ? 'bg-red-100 text-red-800' : 
                daysLeft <= 30 ? 'bg-orange-100 text-orange-800' : 
                'bg-green-100 text-green-800'
              }`}>
                {daysLeft} days left
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Tender Overview */}
        <Card className="border-0 shadow-md rounded-xl">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                  Construction Improvement of Rishi Rongli Kupup Road from KM 53 to KM 70
                </CardTitle>
                <p className="text-gray-600 leading-relaxed">{tenderBio.brief}</p>
              </div>
              <div className="ml-6 text-right">
                <div className="flex items-center justify-end space-x-2 mb-2">
                  <Target className="w-5 h-5 text-teal-600" />
                  <span className="text-sm text-gray-600">Compatibility Score</span>
                </div>
                <div className="text-3xl font-bold text-teal-600">{tenderBio.compatibilityScore}%</div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Estimated Cost</div>
                <div className="text-lg font-semibold text-gray-900">₹{tenderBio.estimatedCost}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">EMD</div>
                <div className="text-lg font-semibold text-gray-900">₹{tenderBio.emd}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Length</div>
                <div className="text-lg font-semibold text-gray-900">{tenderBio.length}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Type</div>
                <div className="text-lg font-semibold text-gray-900">{tenderBio.type}</div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{tenderBio.location}</span>
                </div>
                <div>Organisation: {tenderBio.organisation}</div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={() => window.open(tenderBio.downloadDocuments, '_blank')}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Download Documents</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Analysis Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location Insights */}
          <Card className="border-0 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Location Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4 pr-4">
                  {locationInsights.map((insight, index) => (
                    <div key={index} className="border-l-4 border-teal-400 pl-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-teal-600">🔹</span>
                        <h4 className="font-medium text-gray-900">{insight.title}:</h4>
                      </div>
                      <MarkdownRenderer content={insight.content} />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Nature of Work */}
          <Card className="border-0 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Nature of Work</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="roadside-drainage" className="h-96">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="roadside-drainage" className="text-xs">Drainage</TabsTrigger>
                  <TabsTrigger value="structures-work" className="text-xs">Structures</TabsTrigger>
                </TabsList>
                
                <TabsContent value="roadside-drainage" className="mt-4 h-80">
                  <ScrollArea className="h-full">
                    <div className="pr-4">
                      <MarkdownRenderer content={workCategories['roadside-drainage']} />
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="structures-work" className="mt-4 h-80">
                  <ScrollArea className="h-full">
                    <div className="pr-4">
                      <MarkdownRenderer content={workCategories['structures-work']} />
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Payment Weightage */}
          <Card className="border-0 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Payment Weightage</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="pr-4">
                  <MarkdownRenderer content={paymentWeightage} />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Additional Work Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Protection Work</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="pr-4">
                  <MarkdownRenderer content={workCategories['protection-work']} />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Road Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                <div className="pr-4">
                  <MarkdownRenderer content={workCategories['road-composition']} />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              onClick={() => setSelectedImage(null)}
              variant="ghost"
              size="sm"
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </Button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;

