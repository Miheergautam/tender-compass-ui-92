
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

  // Location insights data
  const locationInsights = [
    { 
      title: "Terrain", 
      content: `### Terrain Type  
- **Description**: Mountainous with steep slopes` 
    },
    { 
      title: "Climate", 
      content: `### Climate & Construction Season  
- **Climate Zone**: Alpine/Temperate (High-altitude region)  
- **Working Season**: April to October (Dry months, avoiding monsoon/winter)` 
    },
    { 
      title: "Logistics", 
      content: `### Logistical Difficulty  
- **Road Name**: Rishi - Rongli – Kupup  
- **Location**: Sikkim  
- **Difficulty**: High (mountainous terrain, remote access)` 
    },
    { 
      title: "Safety", 
      content: `### Human Threat/Terrorism Risk  
- **Risk Level**: Low to Moderate  
- **Context**: Sikkim generally experiences low terrorism activity, but proximity to borders may pose sporadic risks.  

*(Note: Risk assessments may vary based on current geopolitical conditions.)*` 
    },
    { 
      title: "Soil Type", 
      content: `### Soil Type & Rock Availability  
- **Primary Soil**: Brown forest soils  
- **Rock Availability**: Suitable for aggregates (granite/basalt likely)  

*Note: Based on typical Sikkim geology; confirm with local testing for exact specifications.*` 
    },
    { 
      title: "Material Availability", 
      content: `### Fuel/Cement Vendor Availability  
- **Diesel/Petrol Pumps**: Available in Rongli and Kupup (major towns along the route)  
- **Cement Vendors**: Limited local availability; nearest reliable suppliers in Gangtok (~50km from Rongli)  

*Note: Remote stretches may require advance procurement planning.*` 
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
  const paymentWeightageContent = `### Payment Weightage  

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

  // Site images from provided URLs
  const siteImages = [
    { 
      id: '1', 
      src: 'https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3176458044061348240', 
      title: 'Rishi-Rongli-Kupup Road Overview', 
      location: 'Sikkim Border Route', 
      date: '2024-03-15' 
    },
    { 
      id: '2', 
      src: 'https://www.team-bhp.com/forum/attachments/travelogues/1435211d1690135415t-snarl-old-silk-route-rishi-khola-gnathang-kupup-east-sikkim-icchey-gaon-img_5847.jpg', 
      title: 'High Altitude Terrain', 
      location: 'Kupup Area', 
      date: '2024-03-14' 
    },
    { 
      id: '3', 
      src: 'https://www.team-bhp.com/forum/attachments/travelogues/1435202d1690135374t-snarl-old-silk-route-rishi-khola-gnathang-kupup-east-sikkim-icchey-gaon-img_5674.jpg', 
      title: 'Mountain Road Construction', 
      location: 'Rongli Section', 
      date: '2024-03-13' 
    },
    { 
      id: '4', 
      src: 'https://www.team-bhp.com/forum/attachments/travelogues/1435210d1690135374t-snarl-old-silk-route-rishi-khola-gnathang-kupup-east-sikkim-icchey-gaon-img_5862.jpg', 
      title: 'Alpine Conditions', 
      location: 'High Altitude Section', 
      date: '2024-03-12' 
    }
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
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-900">Tender Biography</CardTitle>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${daysLeft > 30 ? 'text-green-600' : daysLeft > 7 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                    </div>
                    <div className="text-sm text-gray-500">to submit</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <p className="text-gray-700 text-sm leading-relaxed">{tenderBio.brief}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderBio.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Submission Date</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderBio.submissionDeadline}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Estimated Cost</p>
                    <p className="font-semibold text-teal-700 text-sm">₹{tenderBio.estimatedCost}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">EMD</p>
                    <p className="font-medium text-gray-700 text-sm">₹{tenderBio.emd}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Length</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderBio.length}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Type</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderBio.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Download Documents</p>
                    <a 
                      href={tenderBio.downloadDocuments} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-medium text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      Download <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Organisation</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderBio.organisation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Organisation ID</p>
                    <p className="font-medium text-gray-700 text-sm">{tenderBio.organisationId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Website</p>
                    <a 
                      href={tenderBio.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-medium text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      Visit Website <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
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
                  <Card key={index} className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200 rounded-xl hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-teal-700 mb-3 text-sm">{insight.title}</h4>
                      <ScrollArea className="h-24">
                        <MarkdownRenderer content={insight.content} className="text-xs" />
                      </ScrollArea>
                    </CardContent>
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
              <Tabs defaultValue="roadside-drainage">
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
                    value="road-composition"
                    className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Road Composition
                  </TabsTrigger>
                </TabsList>
                
                {Object.entries(workCategories).map(([category, content]) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                      <ScrollArea className="h-64 p-6">
                        <MarkdownRenderer content={content} />
                      </ScrollArea>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Payment Weightage Section */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Payment Weightage by Work</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <ScrollArea className="h-64 p-6">
                  <MarkdownRenderer content={paymentWeightageContent} />
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          {/* Site Images Gallery */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Site Images Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
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
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
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
