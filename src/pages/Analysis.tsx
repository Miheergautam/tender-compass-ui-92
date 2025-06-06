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
      content: `**Terrain Type**: Mountainous  
*This region in the Eastern Himalayas features steep slopes, high altitude, and rugged terrain typical of Sikkim's topography.*` 
    },
    { 
      title: "Climate", 
      content: `- **Climate Zone**: Alpine (Köppen: ET) at higher elevations (Kupup), Humid Subtropical (Köppen: Cwa) at lower elevations (Gangtok/Rongli)  
- **Working Season**: March to May (primary dry window), October to November (secondary period for lower segments, avoiding monsoon and extreme cold)` 
    },
    { 
      title: "Logistics", 
      content: `**Level**: Very High  
**Reason**: Extreme mountainous terrain, high altitude (up to 4,000m), and frequent landslides/monsoon disruptions in Sikkim's remote eastern Himalayas.  

| Key Challenge         | Impact                          |
|-----------------------|---------------------------------|
| **Terrain**           | Steep slopes, unstable geology  |
| **Accessibility**     | Limited roads, narrow passages  |
| **Weather**           | Heavy snowfall/monsoon delays   |
| **Transport**         | Machinery/material haulage issues |` 
    },
    { 
      title: "Safety", 
      content: `| Risk Factor       | Level       |
|-------------------|-------------|
| **Overall Risk**  | **Low**     |
| **Border Proximity** | Moderate   |
| **Insurgency Activity** | Very Low  |

- **Key Factors**:  
  - Gangtok and Sikkim have minimal terrorism history; no active insurgencies reported.  
  - Proximity to China border increases strategic sensitivity but has low civilian threat.  
- **Current Advisory**:  
  No travel restrictions; standard border-area vigilance advised.  

*Note: Remote terrain may complicate emergency response, but no specific terror threats exist.*` 
    },
    { 
      title: "Soil Type", 
      content: `- **Soil Type**: Predominantly **brown forest soil** (loamy, acidic) mixed with clay and organic matter, typical of Sikkim's Himalayan slopes.  
- **Rock Availability**: **Yes** – abundant **gneiss, schist, and quartzite** from local quarries; suitable for aggregates but extraction may face terrain challenges.  

| Feature          | Details                          |
|------------------|----------------------------------|
| **Soil Type**    | Brown forest soil (loamy-clayey) |
| **Rock Sources** | Gneiss, schist, quartzite        |` 
    },
    { 
      title: "Material Availability", 
      content: `- **Diesel/Petrol**: Available in Gangtok city (multiple pumps). Limited options beyond Rongli; last reliable refill at Gangtok before Kupup.  

- **Cement**: Available in Gangtok (major suppliers like ACC/Ambuja). Sparse beyond Rongli; no vendors confirmed near Kupup.  

**Note**: Remote terrain necessitates stocking fuel/cement in Gangtok before heading toward Kupup.` 
    }
  ];

  // Citation links for location insights
  const locationCitationLinks = [
    {
      title: "Sikkim Climate and Weather Data",
      url: "https://www.climate-data.org/asia/india/sikkim/gangtok-4025/"
    },
    {
      title: "Border Roads Organization Projects",
      url: "https://bro.gov.in/content/projects"
    },
    {
      title: "Himalayan Construction Challenges Study",
      url: "https://www.researchgate.net/publication/mountainous-construction"
    }
  ];

  // Nature of work content
  const workCategories = {
    'road-composition': `### Typical Cross Section (TCS) Schedule

| TCS Type | Proposal Description | Length (m) | Associated Features |
|----------|----------------------|------------|---------------------|
| TCS-I | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT & BHS DRAIN | 240 | BHS Drain |
| TCS-II | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT & LHS DRAIN | 1295 | LHS Drain |
| TCS-III | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT & RHS DRAIN | 1055 | RHS Drain |
| TCS-IV | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, BHS BREAST WALL & BHS DRAIN | 1520 | BHS Breast Wall, BHS Drain |
| TCS-V | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, LHS BREAST WALL & BHS DRAIN | 1860 | LHS Breast Wall, BHS Drain |
| TCS-VI | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, LHS BREAST WALL & DRAIN | 3945 | LHS Breast Wall, Drain |
| TCS-VII | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, LHS GABION WALL & RHS STONE PITCHING | 60 | LHS Gabion Wall, RHS Stone Pitching |
| TCS-VIII | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, LHS RETAINING WALL & RHS DRAIN | 985 | LHS Retaining Wall, RHS Drain |
| TCS-IX | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, LHS RETAINING WALL, RHS BREAST WALL & DRAIN | 1025 | LHS Retaining Wall, RHS Breast Wall, Drain |
| TCS-X | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, RHS BREAST WALL & BHS DRAIN | 960 | RHS Breast Wall, BHS Drain |
| TCS-XI | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, RHS BREAST WALL & DRAIN | 3310 | RHS Breast Wall, Drain |
| TCS-XII | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, RHS RETAINING WALL & LHS DRAIN | 1490 | RHS Retaining Wall, LHS Drain |
| TCS-XIII | NEW CONSTRUCTION OF FLEXIBLE PAVEMENT, RHS RETAINING WALL, LHS BREAST WALL & DRAIN | 1390 | RHS Retaining Wall, LHS Breast Wall, Drain |

**Total Length**: 19,135 m

### Pavement Layer Details (Assumed Standard for Flexible Pavement)
- **Surface Course**: BC – 30 mm
- **Base Course**: DBM – 60 mm
- **Sub-base**: WMM – 250 mm
- **Subgrade**: GSB – 200 mm  
- **Total Thickness**: **540 mm**

### Notes
- **Material Specifications**: Refer to Annex-III of Schedule-A
- **Width**: Carriageway width to match approach roads with proper tapering
- **Approval**: Final TCS subject to site conditions and Authority approval`,
    
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
- **Execution Flexibility**: Lengths may vary based on site conditions (per Note 1, Page 165)`
  };

  // Payment weightage content
  const paymentWeightageContent = `### Payment Weightage  

#### Road Works (41.794%)  
| Sub-Work | Stage | Weightage |  
|----------|-------|-----------|  
| Reconstruction/New realignment/bypass (Flexible pavement) | Earthwork up to top of embankment | 22.70% |  
| Reconstruction/New realignment/bypass (Flexible pavement) | Sub-Grade | 0.68% |  
| Reconstruction/New realignment/bypass (Flexible pavement) | Sub Base Course | 12.11% |  
| Reconstruction/New realignment/bypass (Flexible pavement) | Non-Bituminous Base Course | 12.76% |  
| Reconstruction/New realignment/bypass (Flexible pavement) | Bituminous Base Course | 12.76% |  
| Reconstruction/New realignment/bypass (Flexible pavement) | Wearing Coat | 7.69% |  
| Re-Construction and New culverts | Culverts (length < 6 m) | 31.30% |  

#### Minor Bridges/Underpasses/Overpasses (1.950%)  
| Sub-Work | Stage | Weightage |  
|----------|-------|-----------|  
| New Minor bridges (length >6 and <60 m) | Foundation: On completion of foundation work of abutments and piers | 27.42% |  
| New Minor bridges (length >6 and <60 m) | Sub-structure: On completion of abutments and piers with cap | 35.27% |  
| New Minor bridges (length >6 and <60 m) | Super-structure: Completion up to deck slab including bearings | 25.28% |  
| New Minor bridges (length >6 and <60 m) | Miscellaneous Works: Wearing coat, expansion joint, crash barrier, railings | 6.35% |  
| New Minor bridges (length >6 and <60 m) | Approaches: Wing walls, retaining walls, stone pitching | 5.68% |  

#### Other Works (56.256%)  
| Sub-Work | Stage | Weightage |  
|----------|-------|-----------|  
| Road side Drain | PCC Drain | 2.69% |  
| Road side Drain | Unlined surface drains | 0.10% |  
| Road signs, markings, km stones, safety devices | Road signs, markings, km stones, safety devices | 3.18% |  
| Overhead gantry mounted signs | Overhead gantry mounted signs | 0.06% |  
| Junction improvement | Junction improvement | 0.21% |  
| Project facilities | Bus Bays, Truck lay-byes | 0.22% |  
| Protection works | Crash Barrier | 0.45% |  
| Protection works | Retaining Wall | 25.12% |  
| Protection works | Breast Wall | 59.32% |  
| Protection works | Parapet | 3.15% |  
| Protection works | Hydro seeding and mulching for Erosion control | 2.24% |  
| Safety and traffic management | Safety and traffic management during construction | 0.18% |  
| Utility Ducts | Utility Ducts across the road | 2.89% |  
| Helipad | Helipad | 0.19% |`;

  // Compatibility Analysis content
  const compatibilityAnalysisContent = `### Executive Summary

**Overall Compatibility Score: 67/100** - This tender represents a moderate match for your organization's capabilities and strategic objectives.

### Strengths & Opportunities

#### Technical Compatibility ✅
- **Road Construction Expertise**: Strong alignment with your company's core competencies in highway and infrastructure development
- **EPC Model Experience**: Your organization has demonstrated success in Engineering, Procurement, and Construction contracts
- **Mountainous Terrain Projects**: Previous experience with challenging topographical conditions provides competitive advantage

#### Financial Viability ✅
- **Project Scale**: ₹223.69 Cr. contract value aligns with your typical project portfolio
- **EMD Requirement**: ₹4.46 Cr. EMD is within manageable limits for your financial capacity
- **Payment Structure**: Staged payment weightage provides healthy cash flow management opportunities

### Challenges & Risk Factors

#### Logistical Complexity ⚠️
| Challenge | Impact Level | Mitigation Strategy |
|-----------|--------------|-------------------|
| **Remote Location** | High | Establish forward base camps in Gangtok |
| **Material Transport** | Very High | Pre-position critical materials before monsoon |
| **Equipment Mobilization** | High | Plan phased equipment deployment |

#### Environmental & Operational Risks ⚠️
- **Weather Windows**: Limited working season (March-May, October-November)
- **Altitude Challenges**: Operations up to 4,000m require specialized equipment and procedures
- **Border Proximity**: Additional security clearances and compliance requirements

### Recommendation Matrix

| Criteria | Score | Rationale |
|----------|-------|-----------|
| **Technical Fit** | 8/10 | Strong match with core competencies |
| **Financial Viability** | 7/10 | Appropriate scale, manageable EMD |
| **Risk Profile** | 5/10 | High logistical complexity, environmental challenges |
| **Strategic Value** | 7/10 | Enhances portfolio diversity, government relationship |
| **Resource Availability** | 6/10 | Requires specialized mountain construction resources |

### Strategic Recommendations

#### Proceed with Bid Preparation ✅
**Rationale**: Despite logistical challenges, this project offers significant strategic value and aligns well with your technical capabilities.

#### Key Success Factors
1. **Early Mobilization**: Begin material positioning 6 months before project start
2. **Local Partnerships**: Establish relationships with Sikkim-based suppliers and contractors
3. **Weather Planning**: Build detailed climate-responsive construction schedules
4. **Risk Mitigation**: Secure comprehensive insurance for high-altitude operations

#### Bid Strategy Recommendations
- **Pricing**: Add 15-20% contingency for logistical complexities
- **Timeline**: Request extended completion period to account for weather constraints
- **Local Content**: Emphasize commitment to local employment and supplier engagement
- **Technology**: Propose advanced project management systems for remote monitoring

### Conclusion

This tender represents a **moderate-to-good opportunity** with manageable risks. Your organization's technical expertise and financial capacity align well with project requirements. Success will depend on thorough planning for logistical challenges and effective risk mitigation strategies.

**Recommendation**: **PROCEED** with bid preparation, incorporating suggested risk mitigation strategies.`;

  const siteImages = [
    { 
      id: '1', 
      src: 'https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3176458044061348240', 
      title: 'Rishi-Rongli-Kupup Road Overview', 
      location: 'Sikkim Border Route', 
      date: '2024-03-15',
      link: 'https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3176458044061348240'
    },
    { 
      id: '2', 
      src: 'https://www.team-bhp.com/forum/attachments/travelogues/1435211d1690135415t-snarl-old-silk-route-rishi-khola-gnathang-kupup-east-sikkim-icchey-gaon-img_5847.jpg', 
      title: 'High Altitude Terrain', 
      location: 'Kupup Area', 
      date: '2024-03-14',
      link: 'https://www.team-bhp.com/forum/attachments/travelogues/1435211d1690135415t-snarl-old-silk-route-rishi-khola-gnathang-kupup-east-sikkim-icchey-gaon-img_5847.jpg'
    },
    { 
      id: '3', 
      src: 'https://www.team-bhp.com/forum/attachments/travelogues/1435202d1690135374t-snarl-old-silk-route-rishi-khola-gnathang-kupup-east-sikkim-icchey-gaon-img_5674.jpg', 
      title: 'Mountain Road Construction', 
      location: 'Rongli Section', 
      date: '2024-03-13',
      link: 'https://www.team-bhp.com/forum/attachments/travelogues/1435202d1690135374t-snarl-old-silk-route-rishi-khola-gnathang-kupup-east-sikkim-icchey-gaon-img_5674.jpg'
    },
    { 
      id: '4', 
      src: 'https://www.team-bhp.com/forum/attachments/travelogues/1435210d1690135374t-snarl-old-silk-route-rishi-khola-gnathang-kupup-east-sikkim-icchey-gaon-img_5862.jpg', 
      title: 'Alpine Conditions', 
      location: 'High Altitude Section', 
      date: '2024-03-12',
      link: 'https://www.team-bhp.com/forum/attachments/travelogues/1435210d1690135374t-snarl-old-silk-route-rishi-khola-gnathang-kupup-east-sikkim-icchey-gaon-img_5862.jpg'
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
                <div className="mb-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
              
              {/* Citations Section */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Citations - </span>
                  <div className="mt-2 space-y-1">
                    {locationCitationLinks.map((link, index) => (
                      <div key={index}>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:text-blue-800 underline text-xs flex items-center"
                        >
                          {link.title} <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nature of Work Section */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Nature of Work</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="road-composition">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6 bg-gray-100 rounded-xl p-1">
                  <TabsTrigger 
                    value="road-composition"
                    className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Road Composition
                  </TabsTrigger>
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
                </TabsList>
                
                {Object.entries(workCategories).map(([category, content]) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                      <ScrollArea className="h-96 p-6">
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
                <ScrollArea className="h-96 p-6">
                  <MarkdownRenderer content={paymentWeightageContent} />
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          {/* Compatibility Analysis Section */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Compatibility Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                <ScrollArea className="h-96 p-6">
                  <MarkdownRenderer content={compatibilityAnalysisContent} />
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
                    onClick={() => window.open(image.link, '_blank')}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
