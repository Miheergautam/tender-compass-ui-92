import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, FileText, Clock, Target, IndianRupee } from 'lucide-react';

const Dashboard = () => {
  const mockData = [
    { month: 'Jan', score: 75, tenders: 12 },
    { month: 'Feb', score: 82, tenders: 15 },
    { month: 'Mar', score: 78, tenders: 18 },
    { month: 'Apr', score: 85, tenders: 22 },
    { month: 'May', score: 88, tenders: 25 },
    { month: 'Jun', score: 91, tenders: 28 }
  ];

  const workTypeData = [
    { type: 'Road Construction', count: 45, color: '#0891b2' },
    { type: 'Building', count: 32, color: '#059669' },
    { type: 'Water Management', count: 28, color: '#7c3aed' },
    { type: 'Infrastructure', count: 25, color: '#dc2626' }
  ];

  const recentTenders = [
    { name: 'Highway Construction Project', score: 92, deadline: '2024-06-15' },
    { name: 'Smart City Development', score: 88, deadline: '2024-06-20' },
    { name: 'Water Treatment Plant', score: 85, deadline: '2024-06-25' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your tender analysis overview.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tenders</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Score</p>
                <p className="text-2xl font-bold text-gray-900">87.5</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +3.2% improvement
                </p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8 new tenders
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">₹2,450 Cr</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +15% increase
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Compatibility Score Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line type="monotone" dataKey="score" stroke="#0891b2" strokeWidth={3} dot={{ fill: '#0891b2', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Work Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={workTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                >
                  {workTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Tender Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTenders.map((tender, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{tender.name}</h4>
                  <p className="text-sm text-gray-600">Deadline: {tender.deadline}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-700">Compatibility</div>
                    <div className="text-lg font-bold text-teal-600">{tender.score}%</div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${tender.score >= 90 ? 'bg-green-500' : tender.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
