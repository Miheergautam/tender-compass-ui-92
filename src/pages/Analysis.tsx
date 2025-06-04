
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
    compatibilityScore: 87
  };

  // Location insights data
  const locationInsights = [
    { 
      title: "Terrain", 
      content: "The terrain along the **Rishi - Rongli - Kupup** road in Sikkim is **high-altitude mountainous terrain**, characterized by steep slopes, deep valleys, and rugged ridges typical of the Eastern Himalayas. The Kupup end, near the India-China border, reaches elevations above 4,000 meters (13,000 ft), featuring alpine conditions." 
    },
    { 
      title: "Climate", 
      content: "Based on the location in Sikkim (Eastern Himalayas):\n\n*   **Climate Zone:** **Subtropical Highland** (Köppen classification primarily Cwb/Cwc, with alpine conditions at the highest elevations like Kupup).\n*   **Suitable Working Season:** **Dry seasons (October-November & March-May)**. Avoid monsoon (June-September) due to heavy rain, landslides, and winter (December-February) due to snow/ice at higher elevations (especially Kupup).\n\n**Response:**  \n**Climate Type: Subtropical Highland  \nWorking Season: October-November & March-May**" 
    },
    { 
      title: "Logistics", 
      content: "The logistical difficulty for construction at Rishi-Rongli-Kupup Road in Sikkim is **Extremely High** due to the region's rugged Himalayan terrain, extreme altitude (up to 12,000+ feet), frequent landslides, heavy monsoons, and limited access routes, severely complicating transport and labor deployment." 
    },
    { 
      title: "Safety", 
      content: "Based on current assessments of the Rishi-Rongli-Kupup road in Sikkim:  \n\n**Risk Level: LOW**  \nSikkim has minimal terrorism-related activity, and this route shows no significant insurgent or extremist threats. However, general travel risks (e.g., landslides, weather) exist due to its remote Himalayan terrain. Always monitor local advisories.  \n\n*Sources: Indian Ministry of Home Affairs and South Asia Terrorism Portal.*" 
    },
    { 
      title: "Soil Type", 
      content: "Based on the location along the Rishi-Rongli-Kupup road in Sikkim:  \n\n- **Soil Type**: Predominantly brown forest soils and red soils in lower elevations, transitioning to thin, stony mountain soils at higher altitudes (notably near Kupup).  \n- **Rock Availability**: Abundant metamorphic rocks (gneiss, schist) and some igneous formations suitable for aggregates, though extraction is often restricted in ecologically sensitive Himalayan zones.  \n\n*(Note: Site-specific surveys are recommended for precise assessment due to Sikkim's complex terrain and environmental regulations.)*" 
    },
    { 
      title: "Material Availability", 
      content: "Based on the remote location along the Rishi-Rongli-Kupup road in East Sikkim:  \n**Diesel/petrol pumps** are extremely limited; the nearest reliable options are in Gangtok (~60 km away).  \n**Cement vendors** are unavailable near Kupup; limited suppliers may exist in Rongli or Rangpo.  \n\n*Note: This high-altitude area has sparse infrastructure—stock essential supplies before traveling.*" 
    }
  ];

  // Nature of work content
  const workCategories = {
    'roadside-drainage': 'Here are the extracted details for **Roadside Drainage** work from the provided pages:\n\n---\n\n### **Roadside Drainage Details**  \n\n#### **1. Drain Types & Quantities**  \n\n| S.No | Drain Type                          | Minimum Length (m) | Material Specification       |\n|------|-------------------------------------|--------------------|------------------------------|\n| 1    | V-Shape drains                      | 23,655.00          | PCC (M15 grade concrete)     |\n|      | *or equivalent as per site conditions* |                    |                              |\n\n**Total Length:** **23,655 meters** (indicative minimum)  \n\n---\n\n#### **2. Key Specifications**  \n1. **Built-up Areas:**  \n   - **RCC covered drains cum footpaths** shall be provided.  \n   - **RCC covers** must have **locking arrangements** to prevent sliding.  \n   - **Invert levels** to match ground slopes of adjoining properties.  \n\n2. **Traffic Load Consideration:**  \n   - **RCC covers** over drains must be designed to withstand traffic loads at property access points.  \n\n3. **Cutting Portions:**  \n   - **Lined drains** of suitable size (to be finalized in consultation with the Authority Engineer).  \n\n4. **Hydraulic Design:**  \n   - **RCC drain sections** must accommodate runoff from:  \n     - Carriageway  \n     - Adjoining areas  \n\n---\n\n#### **3. Contractor's Responsibilities**  \n- Final **length, type, size, and invert levels** of drains to be determined by the contractor based on:  \n  - Site drainage requirements  \n  - Approval from the Authority's Engineer  \n- **No additional payment** for increases in drain length beyond the specified minimum.  \n\n---\n\n### **Notes**  \n- **Compliance Standards:** IRC:SP:48-2023 (Chapter 2 & Para 5.12).  \n- **Flexibility:** Contractor may propose equivalent drain types if site conditions demand.  \n\n--- \n\nLet me know if you need further breakdowns (e.g., cross-section details, reinforcement specs).',
    
    'structures-work': "Here's the compiled list of all structures (culverts and bridges) with their design details, excluding NIL entries:\n\n### 1. Culverts to be Reconstructed (Slab Type)\n| S.No | Design Chainage (Km) | Type | Span Arrangement (No x m) | Min Clear Width (m) |\n|------|----------------------|------|---------------------------|---------------------|\n| 1    | 55+580               | SLAB | 1 x 2.0                   | 8.80                |\n| 2    | 55+700               | SLAB | 1 x 2.0                   | 8.80                |\n| 3    | 55+890               | SLAB | 1 x 2.0                   | 8.80                |\n\n### 2. Additional New Culverts (Slab Type with Catch Pit)\n(126 locations from chainage 55+775 to 74+340 - showing first 10 and last 5 for brevity)\n\n| S.No | Design Chainage (Km) | Type | Span Arrangement (No x m) | Min Clear Width (m) |\n|------|----------------------|------|---------------------------|---------------------|\n| 1    | 55+775               | SLAB | 1 x 6.0                   | 8.80                |\n| 2    | 55+970               | SLAB | 1 x 3.0                   | 8.80                |\n| ...  | ...                  | ...  | ...                       | ...                 |\n| 122  | 73+360               | SLAB | 1 x 2.0                   | 8.80                |\n| 123  | 73+640               | SLAB | 1 x 2.0                   | 8.80                |\n| 124  | 73+730               | SLAB | 1 x 2.0                   | 8.80                |\n| 125  | 74+160               | SLAB | 1 x 2.0                   | 8.80                |\n| 126  | 74+340               | SLAB | 1 x 2.0                   | 8.80                |\n\n**Span Variants**: 2.0m (most common), 3.0m, 4.0m, 6.0m  \n**Total Culverts**: 129 (3 reconstructed + 126 new)  \n**Standard Width**: 8.80m for all culverts  \n\n### 3. New Minor Bridges (MNB)\n| S.No | Design Chainage (Km) | Type | Span Arrangement (No x m) | Width (m) |\n|------|----------------------|------|---------------------------|-----------|\n| 1    | 56+925               | MNB  | 1 x 10.0                  | 14.50     |\n| 2    | 65+755               | MNB  | 1 x 10.0                  | 14.50     |\n| 3    | 66+530               | MNB  | 1 x 8.0                   | 14.50     |\n| 4    | 68+140               | MNB  | 1 x 10.0                  | 14.50     |\n\n**Key Features**:\n- All high-level bridges with footpaths\n- Designed to carry utility services (OFC/telephone)\n- Standard width: 14.5m\n- GAD drawings provided in tender documents\n\n### 4. Pipe Culverts at Junctions\n- HP culverts to be constructed as per site requirements\n- Balancing pipe culverts if needed\n- As per Schedule 'D' standards\n\n### General Specifications:\n1. **Design Codes**: IRC:SP:73-2018 (Section 7)  \n2. **Protection Works**:  \n   - Floor protection as per IRC codes  \n   - Railing/parapet repairs where required  \n3. **Drainage**:  \n   - Catch pits for all new culverts  \n   - Bridge deck drainage as per manual  \n\n*Note: All quantities are minimum specified; actual may increase based on site conditions without constituting Change of Scope.*",
    
    'protection-work': 'Here are the extracted protection work details from Page 165, presented in structured markdown tables:\n\n### Protection Works Summary\n| **Type**           | **Total Length (m)** | **Side** | **Combined Features**               |\n|--------------------|----------------------|----------|-------------------------------------|\n| Breast Wall        | 10,650               | LHS/RHS  | With drains/pavement                |\n| Retaining Wall     | 3,890                | LHS/RHS  | With drains/breast walls            |\n| Gabion Wall        | 60                   | LHS      | With stone pitching                 |\n| Stone Pitching     | 60                   | RHS      | With gabion wall                    |\n\n---\n\n### Detailed Protection Works Breakdown\n\n#### 1. Breast Walls\n| **Sr.No** | **Location** | **Length (m)** | **Combined Features**               |\n|-----------|-------------|----------------|-------------------------------------|\n| 4         | BHS         | 1,520          | Flexible pavement + BHS drain       |\n| 5         | LHS         | 1,860          | Flexible pavement + BHS drain       |\n| 6         | LHS         | 3,945          | Flexible pavement + drain           |\n| 9         | RHS         | 1,025          | Retaining wall + drain              |\n| 10        | RHS         | 960            | Flexible pavement + BHS drain       |\n| 11        | RHS         | 3,310          | Flexible pavement + drain           |\n| 13        | LHS         | 1,390          | Retaining wall + drain              |\n\n#### 2. Retaining Walls\n| **Sr.No** | **Location** | **Length (m)** | **Combined Features**               |\n|-----------|-------------|----------------|-------------------------------------|\n| 8         | LHS         | 985            | Flexible pavement + RHS drain       |\n| 9         | LHS         | 1,025          | RHS breast wall + drain             |\n| 12        | RHS         | 1,490          | Flexible pavement + LHS drain       |\n| 13        | RHS         | 1,390          | LHS breast wall + drain             |\n\n#### 3. Gabion Wall & Stone Pitching\n| **Sr.No** | **Type**       | **Location** | **Length (m)** | **Combined Features**               |\n|-----------|---------------|-------------|----------------|-------------------------------------|\n| 7         | Gabion Wall   | LHS         | 60             | Flexible pavement + RHS stone pitching |\n| 7         | Stone Pitching| RHS         | 60             | Flexible pavement + LHS gabion wall |\n\n---\n\n### Notes:\n1. **Total Project Length**: 19,135 m (all protection works are part of flexible pavement construction).\n2. **Side Abbreviations**: \n   - **LHS**: Left Hand Side \n   - **RHS**: Right Hand Side \n   - **BHS**: Both Hand Sides\n3. **Design Compliance**: All works conform to IRC: SP: 73-2018 and IRC: SP: 48-2023 standards.\n4. **Variability**: Lengths may adjust during execution based on site conditions (per Note 1 on Page 165).\n\nLet me know if you need further breakdowns or additional details from other sections.',
    
    'road-composition': "Based on the provided pages, I can summarize the TCS (Typical Cross Section) types and their applications, but the document doesn't contain specific details about pavement layer thicknesses or materials. Here's the structured information available:\n\n### TCS Types and Their Applications\n\n| TCS Type | Application Description | Length (m) |\n|----------|------------------------|------------|\n| TCS-I | New construction of flexible pavement & BHS drain | 240 |\n| TCS-II | New construction of flexible pavement & LHS drain | 1,295 |\n| TCS-III | New construction of flexible pavement & RHS drain | 1,055 |\n| TCS-IV | New construction of flexible pavement, BHS breast wall & BHS drain | 1,520 |\n| TCS-V | New construction of flexible pavement, LHS breast wall & BHS drain | 1,860 |\n| TCS-VI | New construction of flexible pavement, LHS breast wall & drain | 3,945 |\n| TCS-VII | New construction of flexible pavement, LHS gabion wall & RHS stone pitching | 60 |\n| TCS-VIII | New construction of flexible pavement, LHS retaining wall & RHS drain | 985 |\n| TCS-IX | New construction of flexible pavement, LHS retaining wall, RHS breast wall & drain | 1,025 |\n| TCS-X | New construction of flexible pavement, RHS breast wall & BHS drain | 960 |\n| TCS-XI | New construction of flexible pavement, RHS breast wall & drain | 3,310 |\n| TCS-XII | New construction of flexible pavement, RHS retaining wall & LHS drain | 1,490 |\n| TCS-XIII | New construction of flexible pavement, RHS retaining wall, LHS breast wall & drain | 1,390 |\n\n**Total Length:** 19,135 meters\n\n### Key Notes:\n1. All TCS types involve flexible pavement construction with various combinations of:\n   - Drainage systems (BHS/LHS/RHS)\n   - Retaining structures (breast walls, gabion walls, retaining walls)\n   - Stone pitching\n\n2. The document references that detailed cross-sections are in Annex-III of Schedule-A, which would contain the actual layer details (thickness, materials, etc.)\n\n3. The TCS schedule is indicative and subject to site conditions and authority approval\n\nFor complete pavement layer details (bituminous layers, granular sub-base, etc.), we would need to see:\n1. Annex-III of Schedule-A as referenced on page 158\n2. The actual typical cross-section drawings for each TCS type\n3. The pavement design specifications from the project documents\n\nWould you like me to suggest a typical flexible pavement composition that might be used in such projects (based on standard Indian road specifications)?"
  };

  // Payment weightage content
  const paymentWeightageContent = "Here's the consolidated Payment Weightage table with only non-zero percentage entries:\n\n### I. Road Works (41.794% of Contract Price)\n| Sub-Work | Stage for Payment | Weightage % |\n|----------|-------------------|-------------|\n| **B.1 - Reconstruction/New realignment/bypass (Flexible pavement)** | | |\n| | (1) Earthwork up to top of embankment | 22.70% |\n| | (2) Sub-Grade | 0.68% |\n| | (3) Sub Base Course | 12.11% |\n| | (4) Non-Bituminous Base Course | 12.76% |\n| | (5) Bituminous Base Course | 12.76% |\n| | (6) Wearing Coat | 7.69% |\n| **D - Culverts** | Culverts (length < 6m) | 31.30% |\n\n### II. Minor Bridges/Underpasses/Overpasses (1.950% of Contract Price)\n| Sub-Work | Stage for Payment | Weightage % |\n|----------|-------------------|-------------|\n| **A.2 - New Minor Bridges** | | |\n| | (1) Foundation | 27.42% |\n| | (2) Sub-structure | 35.27% |\n| | (3) Super-structure | 25.28% |\n| | (4) Miscellaneous Works | 6.35% |\n| | (5) Approaches | 5.68% |\n\n### IV. Other Works (56.256% of Contract Price)\n| Sub-Work | Stage for Payment | Weightage % |\n|----------|-------------------|-------------|\n| **(ii) Road side Drain** | | |\n| | (a) PCC Drain | 2.69% |\n| | (c) Unlined surface drains | 0.10% |\n| **(iii) Road signs, markings, km stones** | | 3.18% |\n| **(iv) Overhead gantry signs** | | 0.06% |\n| **(v) Junction improvement** | | 0.21% |\n| **(vi) Project facilities** | (a) Bus Bays, (b) Truck lay-byes | 0.22% |\n| **(viii) Protection works** | | |\n| | (a) Crash Barrier | 0.45% |\n| | (b) Retaining Wall | 25.12% |\n| | (c) Breast Wall | 59.32% |\n| | (d) Parapet | 3.15% |\n| | (e) Hydro seeding for Erosion control | 2.24% |\n| **(ix) Safety management** | | 0.18% |\n| **(x) Utility Ducts** | | 2.89% |\n| **(xi) Helipad** | | 0.19% |\n\n*Note: All 0% weightage entries and inactive work stages (e.g., rigid pavement sections) have been excluded.*";

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
                      <ScrollArea className="h-32">
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
