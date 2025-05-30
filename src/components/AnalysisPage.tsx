import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2, Bookmark, ExternalLink, MapPin, Calendar, IndianRupee, Building2, Clock, Users, TrendingUp, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface AnalysisPageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ onBack, onNavigate }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Mock data for the charts
  const lineChartData = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ];

  const barChartData = [
    { name: 'Category A', value: 400 },
    { name: 'Category B', value: 300 },
    { name: 'Category C', value: 200 },
    { name: 'Category D', value: 100 },
  ];

  const pieChartData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const pieChartColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="rounded-xl shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl font-bold">Tender Analysis</CardTitle>
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dashboard
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overview Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-blue-50 border-0 shadow-sm">
                  <CardContent className="flex items-center space-x-4 p-4">
                    <Building2 className="text-blue-500 w-6 h-6" />
                    <div>
                      <p className="text-gray-600 text-sm">Organisation</p>
                      <p className="font-semibold">Example Corp</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-0 shadow-sm">
                  <CardContent className="flex items-center space-x-4 p-4">
                    <IndianRupee className="text-green-500 w-6 h-6" />
                    <div>
                      <p className="text-gray-600 text-sm">Tender Value</p>
                      <p className="font-semibold">₹5.2 Cr</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-50 border-0 shadow-sm">
                  <CardContent className="flex items-center space-x-4 p-4">
                    <Calendar className="text-yellow-500 w-6 h-6" />
                    <div>
                      <p className="text-gray-600 text-sm">Submission Date</p>
                      <p className="font-semibold">2024-03-15</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-red-50 border-0 shadow-sm">
                  <CardContent className="flex items-center space-x-4 p-4">
                    <MapPin className="text-red-500 w-6 h-6" />
                    <div>
                      <p className="text-gray-600 text-sm">Location</p>
                      <p className="font-semibold">Bangalore</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Analysis Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Detailed Analysis</h3>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-700">Financial Performance</h4>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Download</Button>
                      <Button variant="outline" size="sm"><Share2 className="w-4 h-4 mr-2" />Share</Button>
                      <Button variant="ghost" size="sm" onClick={toggleBookmark}>
                        {isBookmarked ? <Bookmark className="w-4 h-4 text-blue-500" /> : <Bookmark className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Market Trends Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Market Trends</h3>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <h4 className="text-lg font-medium text-gray-700 mb-4">Category Distribution</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Competitive Analysis Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Competitive Analysis</h3>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <h4 className="text-lg font-medium text-gray-700 mb-4">Market Share</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {
                          pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                          ))
                        }
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisPage;
