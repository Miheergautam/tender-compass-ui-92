
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const InsightsTab: React.FC = () => {
  // Mock data for charts
  const compatibilityTrends = [
    { month: 'Jan', score: 78 },
    { month: 'Feb', score: 82 },
    { month: 'Mar', score: 85 },
    { month: 'Apr', score: 79 },
    { month: 'May', score: 88 },
    { month: 'Jun', score: 92 },
  ];

  const workTypes = [
    { type: 'Infrastructure', count: 24, percentage: 30 },
    { type: 'Construction', count: 18, percentage: 22.5 },
    { type: 'Transportation', count: 15, percentage: 18.8 },
    { type: 'Water Management', count: 12, percentage: 15 },
    { type: 'Environment', count: 8, percentage: 10 },
    { type: 'Technology', count: 3, percentage: 3.7 },
  ];

  const topOrganisations = [
    { name: 'NHAI', analysed: 12, avgScore: 84 },
    { name: 'PWD', analysed: 10, avgScore: 78 },
    { name: 'DMRC', analysed: 8, avgScore: 89 },
    { name: 'Smart City Mission', analysed: 6, avgScore: 82 },
    { name: 'Water Board', analysed: 5, avgScore: 76 },
  ];

  const monthlyAnalysis = [
    { month: 'Jan', tenders: 8, avgAmount: 650 },
    { month: 'Feb', tenders: 12, avgAmount: 720 },
    { month: 'Mar', tenders: 15, avgAmount: 890 },
    { month: 'Apr', tenders: 10, avgAmount: 560 },
    { month: 'May', tenders: 18, avgAmount: 980 },
    { month: 'Jun', tenders: 22, avgAmount: 1100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">📊 Insights & Trends</h2>
        <p className="text-gray-600">Analytics and insights from your tender analysis</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="rounded-xl border-0 shadow-lg bg-gradient-to-r from-teal-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">85%</div>
              <div className="text-sm opacity-90">Avg Compatibility</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-xl border-0 shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">47</div>
              <div className="text-sm opacity-90">Tenders Analyzed</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-xl border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">₹2.1K</div>
              <div className="text-sm opacity-90">Avg Tender Value (Cr)</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-xl border-0 shadow-lg bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">12</div>
              <div className="text-sm opacity-90">High Match Tenders</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compatibility Score Trends */}
        <Card className="rounded-xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Compatibility Score Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={compatibilityTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#0D9488" 
                  strokeWidth={3}
                  dot={{ fill: '#0D9488', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, fill: '#0D9488' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Analysis */}
        <Card className="rounded-xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Monthly Tender Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend />
                <Bar dataKey="tenders" fill="#3B82F6" name="Tenders Analyzed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Work Types Distribution */}
        <Card className="rounded-xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Most Common Work Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={workTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percentage }) => `${type} (${percentage}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {workTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Organizations */}
        <Card className="rounded-xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Most Analyzed Organizations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topOrganisations} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#666" />
                <YAxis dataKey="name" type="category" stroke="#666" width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} 
                />
                <Bar dataKey="analysed" fill="#10B981" name="Tenders Analyzed" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Best Performing Sectors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {workTypes.slice(0, 3).map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{type.type}</span>
                  <span className="text-sm text-teal-600 font-semibold">{type.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              High Compatibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topOrganisations.slice(0, 3).map((org, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{org.name}</span>
                  <span className="text-sm text-green-600 font-semibold">{org.avgScore}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Total Value</span>
                <span className="text-sm text-blue-600 font-semibold">₹45.2K Cr</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Success Rate</span>
                <span className="text-sm text-green-600 font-semibold">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Avg Processing</span>
                <span className="text-sm text-purple-600 font-semibold">2.3 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InsightsTab;
