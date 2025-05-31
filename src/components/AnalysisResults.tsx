
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReactMarkdown from 'react-markdown';

interface AnalysisResultsProps {
  results: any;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  const renderMarkdownContent = (content: string) => {
    return (
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown
          components={{
            table: ({ children }) => (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold text-left">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-gray-300 px-4 py-2">
                {children}
              </td>
            ),
            h1: ({ children }) => (
              <h1 className="text-xl font-bold mb-4 text-gray-900">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-lg font-semibold mb-3 text-gray-800">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-md font-medium mb-2 text-gray-700">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="mb-2 text-gray-600">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-6 mb-4">{children}</ul>
            ),
            li: ({ children }) => (
              <li className="mb-1 text-gray-600">{children}</li>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Tender Bio Section */}
      {results.tenderBio && (
        <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Tender Biography</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Project Name</p>
                  <p className="font-semibold text-gray-900">{results.tenderBio.projectName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
                  <p className="font-medium text-gray-700">{results.tenderBio.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Estimated Value</p>
                  <p className="font-semibold text-teal-700 text-lg">{results.tenderBio.estimatedValue}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Duration</p>
                  <p className="font-medium text-gray-700">{results.tenderBio.duration}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Authority</p>
                  <p className="font-medium text-gray-700">{results.tenderBio.authority}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Compatibility Score</p>
                  <p className="font-semibold text-teal-700 text-lg">{results.tenderBio.compatibilityScore}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Work Categories Section */}
      {results.workCategories && (
        <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Nature of Work</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="roadside-drainage">
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

              <TabsContent value="roadside-drainage" className="mt-6">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 max-h-96 overflow-y-auto">
                  {renderMarkdownContent(results.workCategories['roadside-drainage']?.data || 'No data available')}
                </div>
              </TabsContent>

              <TabsContent value="structures-work" className="mt-6">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 max-h-96 overflow-y-auto">
                  {renderMarkdownContent(results.workCategories['structures-work']?.data || 'No data available')}
                </div>
              </TabsContent>

              <TabsContent value="protection-work" className="mt-6">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 max-h-96 overflow-y-auto">
                  {renderMarkdownContent(results.workCategories['protection-work']?.data || 'No data available')}
                </div>
              </TabsContent>

              <TabsContent value="tcs-layer" className="mt-6">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 max-h-96 overflow-y-auto">
                  {renderMarkdownContent(results.workCategories['tcs-layer']?.data || 'No data available')}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Payment Weightage Section */}
      {results.paymentWeightage && (
        <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Payment Weightage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 max-h-96 overflow-y-auto">
              {renderMarkdownContent(results.paymentWeightage)}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalysisResults;
