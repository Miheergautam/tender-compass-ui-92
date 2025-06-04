
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, SortAsc, SortDesc, MapPin, Calendar, ZoomIn, X, Target, TrendingUp, AlertTriangle, ExternalLink } from 'lucide-react';

const Analysis = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  // Calculate days left
  const submissionDate = new Date('2025-06-19');
  const today = new Date();
  const timeDiff = submissionDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Tender bio data
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
    { title: "Terrain", content: "The terrain along the **Rishi - Rongli - Kupup** road in Sikkim is **high-altitude mountainous terrain**, characterized by steep slopes, deep valleys, and rugged ridges typical of the Eastern Himalayas. The Kupup end, near the India-China border, reaches elevations above 4,000 meters (13,000 ft), featuring alpine conditions." },
    { title: "Climate", content: "Based on the location in Sikkim (Eastern Himalayas):\n\n*   **Climate Zone:** **Subtropical Highland** (Köppen classification primarily Cwb/Cwc, with alpine conditions at the highest elevations like Kupup).\n*   **Suitable Working Season:** **Dry seasons (October-November & March-May)**. Avoid monsoon (June-September) due to heavy rain, landslides, and winter (December-February) due to snow/ice at higher elevations (especially Kupup).\n\n**Response:**  \n**Climate Type: Subtropical Highland  \nWorking Season: October-November & March-May**" },
    { title: "Logistics", content: "The logistical difficulty for construction at Rishi-Rongli-Kupup Road in Sikkim is **Extremely High** due to the region's rugged Himalayan terrain, extreme altitude (up to 12,000+ feet), frequent landslides, heavy monsoons, and limited access routes, severely complicating transport and labor deployment." },
    { title: "Safety", content: "Based on current assessments of the Rishi-Rongli-Kupup road in Sikkim:  \n\n**Risk Level: LOW**  \nSikkim has minimal terrorism-related activity, and this route shows no significant insurgent or extremist threats. However, general travel risks (e.g., landslides, weather) exist due to its remote Himalayan terrain. Always monitor local advisories.  \n\n*Sources: Indian Ministry of Home Affairs and South Asia Terrorism Portal.*" },
    { title: "Soil Type", content: "Based on the location along the Rishi-Rongli-Kupup road in Sikkim:  \n\n- **Soil Type**: Predominantly brown forest soils and red soils in lower elevations, transitioning to thin, stony mountain soils at higher altitudes (notably near Kupup).  \n- **Rock Availability**: Abundant metamorphic rocks (gneiss, schist) and some igneous formations suitable for aggregates, though extraction is often restricted in ecologically sensitive Himalayan zones.  \n\n*(Note: Site-specific surveys are recommended for precise assessment due to Sikkim's complex terrain and environmental regulations.)*" },
    { title: "Material Availability", content: "Based on the remote location along the Rishi-Rongli-Kupup road in East Sikkim:  \n**Diesel/petrol pumps** are extremely limited; the nearest reliable options are in Gangtok (~60 km away).  \n**Cement vendors** are unavailable near Kupup; limited suppliers may exist in Rongli or Rangpo.  \n\n*Note: This high-altitude area has sparse infrastructure—stock essential supplies before traveling.*" }
  ];

  // Payment weightage markdown content
  const paymentWeightageContent = `
### I. Road Works (41.794% of Contract Price)
| Sub-Work | Stage for Payment | Weightage % |
|----------|-------------------|-------------|
| **B.1 - Reconstruction/New realignment/bypass (Flexible pavement)** | | |
| | (1) Earthwork up to top of embankment | 22.70% |
| | (2) Sub-Grade | 0.68% |
| | (3) Sub Base Course | 12.11% |
| | (4) Non-Bituminous Base Course | 12.76% |
| | (5) Bituminous Base Course | 12.76% |
| | (6) Wearing Coat | 7.69% |
| **D - Culverts** | Culverts (length < 6m) | 31.30% |

### II. Minor Bridges/Underpasses/Overpasses (1.950% of Contract Price)
| Sub-Work | Stage for Payment | Weightage % |
|----------|-------------------|-------------|
| **A.2 - New Minor Bridges** | | |
| | (1) Foundation | 27.42% |
| | (2) Sub-structure | 35.27% |
| | (3) Super-structure | 25.28% |
| | (4) Miscellaneous Works | 6.35% |
| | (5) Approaches | 5.68% |

### IV. Other Works (56.256% of Contract Price)
| Sub-Work | Stage for Payment | Weightage % |
|----------|-------------------|-------------|
| **(ii) Road side Drain** | | |
| | (a) PCC Drain | 2.69% |
| | (c) Unlined surface drains | 0.10% |
| **(iii) Road signs, markings, km stones** | | 3.18% |
| **(iv) Overhead gantry signs** | | 0.06% |
| **(v) Junction improvement** | | 0.21% |
| **(vi) Project facilities** | (a) Bus Bays, (b) Truck lay-byes | 0.22% |
| **(viii) Protection works** | | |
| | (a) Crash Barrier | 0.45% |
| | (b) Retaining Wall | 25.12% |
| | (c) Breast Wall | 59.32% |
| | (d) Parapet | 3.15% |
| | (e) Hydro seeding for Erosion control | 2.24% |
| **(ix) Safety management** | | 0.18% |
| **(x) Utility Ducts** | | 2.89% |
| **(xi) Helipad** | | 0.19% |

*Note: All 0% weightage entries and inactive work stages (e.g., rigid pavement sections) have been excluded.*
  `;

  // Nature of work markdown content
  const workCategories = {
    'roadside-drainage': `
### Roadside Drainage Details

#### 1. Drain Types & Quantities

| S.No | Drain Type                          | Minimum Length (m) | Material Specification       |
|------|-------------------------------------|--------------------|------------------------------|
| 1    | V-Shape drains                      | 23,655.00          | PCC (M15 grade concrete)     |
|      | *or equivalent as per site conditions* |                    |                              |

**Total Length:** **23,655 meters** (indicative minimum)

#### 2. Key Specifications
1. **Built-up Areas:**
   - **RCC covered drains cum footpaths** shall be provided.
   - **RCC covers** must have **locking arrangements** to prevent sliding.
   - **Invert levels** to match ground slopes of adjoining properties.

2. **Traffic Load Consideration:**
   - **RCC covers** over drains must be designed to withstand traffic loads at property access points.

3. **Cutting Portions:**
   - **Lined drains** of suitable size (to be finalized in consultation with the Authority Engineer).

4. **Hydraulic Design:**
   - **RCC drain sections** must accommodate runoff from:
     - Carriageway
     - Adjoining areas

#### 3. Contractor's Responsibilities
- Final **length, type, size, and invert levels** of drains to be determined by the contractor based on:
  - Site drainage requirements
  - Approval from the Authority's Engineer
- **No additional payment** for increases in drain length beyond the specified minimum.

### Notes
- **Compliance Standards:** IRC:SP:48-2023 (Chapter 2 & Para 5.12).
- **Flexibility:** Contractor may propose equivalent drain types if site conditions demand.
    `,
    'structures-work': `
### Structures Work Details

#### 1. Culverts to be Reconstructed (Slab Type)
| S.No | Design Chainage (Km) | Type | Span Arrangement (No x m) | Min Clear Width (m) |
|------|----------------------|------|---------------------------|---------------------|
| 1    | 55+580               | SLAB | 1 x 2.0                   | 8.80                |
| 2    | 55+700               | SLAB | 1 x 2.0                   | 8.80                |
| 3    | 55+890               | SLAB | 1 x 2.0                   | 8.80                |

#### 2. Additional New Culverts (Slab Type with Catch Pit)
(126 locations from chainage 55+775 to 74+340 - showing first 10 and last 5 for brevity)

| S.No | Design Chainage (Km) | Type | Span Arrangement (No x m) | Min Clear Width (m) |
|------|----------------------|------|---------------------------|---------------------|
| 1    | 55+775               | SLAB | 1 x 6.0                   | 8.80                |
| 2    | 55+970               | SLAB | 1 x 3.0                   | 8.80                |
| ...  | ...                  | ...  | ...                       | ...                 |
| 122  | 73+360               | SLAB | 1 x 2.0                   | 8.80                |
| 123  | 73+640               | SLAB | 1 x 2.0                   | 8.80                |
| 124  | 73+730               | SLAB | 1 x 2.0                   | 8.80                |
| 125  | 74+160               | SLAB | 1 x 2.0                   | 8.80                |
| 126  | 74+340               | SLAB | 1 x 2.0                   | 8.80                |

**Span Variants**: 2.0m (most common), 3.0m, 4.0m, 6.0m
**Total Culverts**: 129 (3 reconstructed + 126 new)
**Standard Width**: 8.80m for all culverts

#### 3. New Minor Bridges (MNB)
| S.No | Design Chainage (Km) | Type | Span Arrangement (No x m) | Width (m) |
|------|----------------------|---------------------------|-----------|
| 1    | 56+925               | MNB  | 1 x 10.0                  | 14.50     |
| 2    | 65+755               | MNB  | 1 x 10.0                  | 14.50     |
| 3    | 66+530               | MNB  | 1 x 8.0                   | 14.50     |
| 4    | 68+140               | MNB  | 1 x 10.0                  | 14.50     |

**Key Features:**
- All high-level bridges with footpaths
- Designed to carry utility services (OFC/telephone)
- Standard width: 14.5m
- GAD drawings provided in tender documents

#### 4. Pipe Culverts at Junctions
- HP culverts to be constructed as per site requirements
- Balancing pipe culverts if needed
- As per Schedule 'D' standards

### General Specifications:
1. **Design Codes**: IRC:SP:73-2018 (Section 7)
2. **Protection Works:**
   - Floor protection as per IRC codes
   - Railing/parapet repairs where required
3. **Drainage:**
   - Catch pits for all new culverts
   - Bridge deck drainage as per manual

*Note: All quantities are minimum specified; actual may increase based on site conditions without constituting Change of Scope.*
    `,
    'protection-work': `
### Protection Works Summary
| **Type**           | **Total Length (m)** | **Side** | **Combined Features**               |
|--------------------|----------------------|----------|-------------------------------------|
| Breast Wall        | 10,650               | LHS/RHS  | With drains/pavement                |
| Retaining Wall     | 3,890                | LHS/RHS  | With drains/breast walls            |
| Gabion Wall        | 60                   | LHS      | With stone pitching                 |
| Stone Pitching     | 60                   | RHS      | With gabion wall                    |

#### 1. Breast Walls
| **Sr.No** | **Location** | **Length (m)** | **Combined Features**               |
|-----------|-------------|----------------|-------------------------------------|
| 4         | BHS         | 1,520          | Flexible pavement + BHS drain       |
| 5         | LHS         | 1,860          | Flexible pavement + BHS drain       |
| 6         | LHS         | 3,945          | Flexible pavement + drain           |
| 9         | RHS         | 1,025          | Retaining wall + drain              |
| 10        | RHS         | 960            | Flexible pavement + BHS drain       |
| 11        | RHS         | 3,310          | Flexible pavement + drain           |
| 13        | LHS         | 1,390          | Retaining wall + drain              |

#### 2. Retaining Walls
| **Sr.No** | **Location** | **Length (m)** | **Combined Features**               |
|-----------|-------------|----------------|-------------------------------------|
| 8         | LHS         | 985            | Flexible pavement + RHS drain       |
| 9         | LHS         | 1,025          | RHS breast wall + drain             |
| 12        | RHS         | 1,490          | Flexible pavement + LHS drain       |
| 13        | RHS         | 1,390          | LHS breast wall + drain             |

#### 3. Gabion Wall & Stone Pitching
| **Sr.No** | **Type**       | **Location** | **Length (m)** | **Combined Features**               |
|-----------|---------------|-------------|----------------|-------------------------------------|
| 7         | Gabion Wall   | LHS         | 60             | Flexible pavement + RHS stone pitching |
| 7         | Stone Pitching| RHS         | 60             | Flexible pavement + LHS gabion wall |

### Notes:
1. **Total Project Length**: 19,135 m (all protection works are part of flexible pavement construction).
2. **Side Abbreviations:**
   - **LHS**: Left Hand Side
   - **RHS**: Right Hand Side
   - **BHS**: Both Hand Sides
3. **Design Compliance**: All works conform to IRC: SP: 73-2018 and IRC: SP: 48-2023 standards.
4. **Variability**: Lengths may adjust during execution based on site conditions (per Note 1 on Page 165).
    `,
    'road-composition': `
### TCS Types and Their Applications

| TCS Type | Application Description | Length (m) |
|----------|------------------------|------------|
| TCS-I | New construction of flexible pavement & BHS drain | 240 |
| TCS-II | New construction of flexible pavement & LHS drain | 1,295 |
| TCS-III | New construction of flexible pavement & RHS drain | 1,055 |
| TCS-IV | New construction of flexible pavement, BHS breast wall & BHS drain | 1,520 |
| TCS-V | New construction of flexible pavement, LHS breast wall & BHS drain | 1,860 |
| TCS-VI | New construction of flexible pavement, LHS breast wall & drain | 3,945 |
| TCS-VII | New construction of flexible pavement, LHS gabion wall & RHS stone pitching | 60 |
| TCS-VIII | New construction of flexible pavement, LHS retaining wall & RHS drain | 985 |
| TCS-IX | New construction of flexible pavement, LHS retaining wall, RHS breast wall & drain | 1,025 |
| TCS-X | New construction of flexible pavement, RHS breast wall & BHS drain | 960 |
| TCS-XI | New construction of flexible pavement, RHS breast wall & drain | 3,310 |
| TCS-XII | New construction of flexible pavement, RHS retaining wall & LHS drain | 1,490 |
| TCS-XIII | New construction of flexible pavement, RHS retaining wall, LHS breast wall & drain | 1,390 |

**Total Length:** 19,135 meters

### Key Notes:
1. All TCS types involve flexible pavement construction with various combinations of:
   - Drainage systems (BHS/LHS/RHS)
   - Retaining structures (breast walls, gabion walls, retaining walls)
   - Stone pitching

2. The document references that detailed cross-sections are in Annex-III of Schedule-A, which would contain the actual layer details (thickness, materials, etc.)

3. The TCS schedule is indicative and subject to site conditions and authority approval

For complete pavement layer details (bituminous layers, granular sub-base, etc.), we would need to see:
1. Annex-III of Schedule-A as referenced on page 158
2. The actual typical cross-section drawings for each TCS type
3. The pavement design specifications from the project documents
    `
  };

  // Site images with working URLs only
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

  const renderMarkdownContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentTable: string[] = [];
    let inTable = false;

    lines.forEach((line, index) => {
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        if (!inTable) {
          inTable = true;
          currentTable = [];
        }
        currentTable.push(line);
      } else {
        if (inTable && currentTable.length > 0) {
          // Render table
          const tableRows = currentTable.filter(row => row.trim() !== '' && !row.includes('---'));
          if (tableRows.length > 1) {
            const headers = tableRows[0].split('|').map(h => h.trim()).filter(h => h !== '');
            const rows = tableRows.slice(1).map(row => 
              row.split('|').map(cell => cell.trim()).filter(cell => cell !== '')
            );

            elements.push(
              <div key={`table-${index}`} className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-teal-50 to-blue-50">
                      {headers.map((header, i) => (
                        <th key={i} className="border border-gray-300 p-3 text-left font-semibold text-gray-700">
                          {header.replace(/\*\*/g, '')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        {row.map((cell, j) => (
                          <td key={j} className="border border-gray-300 p-3">
                            {cell.replace(/\*\*/g, '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          currentTable = [];
          inTable = false;
        }

        if (line.trim()) {
          if (line.startsWith('### ')) {
            elements.push(
              <h3 key={index} className="text-lg font-semibold text-teal-700 mb-3 mt-6">
                {line.replace('### ', '')}
              </h3>
            );
          } else if (line.startsWith('#### ')) {
            elements.push(
              <h4 key={index} className="text-md font-semibold text-gray-800 mb-2 mt-4">
                {line.replace('#### ', '')}
              </h4>
            );
          } else if (line.startsWith('**') && line.endsWith('**')) {
            elements.push(
              <p key={index} className="font-semibold text-gray-800 mb-2">
                {line.replace(/\*\*/g, '')}
              </p>
            );
          } else if (line.startsWith('*Note:') || line.startsWith('*Sources:')) {
            elements.push(
              <p key={index} className="text-sm text-gray-600 italic mb-2">
                {line.replace(/^\*/, '')}
              </p>
            );
          } else if (line.startsWith('- ')) {
            elements.push(
              <li key={index} className="ml-4 mb-1 text-gray-700">
                {line.replace('- ', '')}
              </li>
            );
          } else if (line.trim() !== '') {
            elements.push(
              <p key={index} className="text-gray-700 mb-2 leading-relaxed">
                {line}
              </p>
            );
          }
        }
      }
    });

    return <div className="prose-sm max-w-none">{elements}</div>;
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
                  <Card key={index} className="p-4 bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105">
                    <h4 className="font-semibold text-teal-700 mb-2 text-sm">{insight.title}</h4>
                    <div className="text-sm text-gray-700 max-h-32 overflow-y-auto">
                      {renderMarkdownContent(insight.content)}
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
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 min-h-[400px]">
                      {renderMarkdownContent(content)}
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
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                {renderMarkdownContent(paymentWeightageContent)}
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
