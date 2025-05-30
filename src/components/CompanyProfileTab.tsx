
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Phone, Mail, Edit3, Award, FileText, TrendingUp, Calendar } from 'lucide-react';
import CompatibilityScore from './CompatibilityScore';
import { useToast } from '@/hooks/use-toast';

const CompanyProfileTab: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: 'Infrastructure Solutions Pvt. Ltd.',
    contactPerson: 'Rajesh Kumar',
    email: 'rajesh.kumar@infrasolutions.com',
    phone: '+91 98765 43210',
    address: '123, Business Park, Sector 18, Gurgaon, Haryana - 122015',
    workTypes: ['Road Construction', 'Bridge Development', 'Highway Projects', 'Infrastructure', 'Water Management'],
    description: 'Leading infrastructure development company with 15+ years of experience in road construction and bridge development projects across North India.',
  });
  
  const { toast } = useToast();

  const [editData, setEditData] = useState(companyData);

  const handleSaveProfile = () => {
    setCompanyData(editData);
    setIsEditModalOpen(false);
    toast({
      title: "Profile Updated",
      description: "Your company profile has been updated successfully.",
    });
  };

  const recentTenders = [
    { id: 1, name: 'Highway Construction Project Phase 2', score: 92, date: '2024-01-15' },
    { id: 2, name: 'Bridge Development Initiative', score: 88, date: '2024-01-12' },
    { id: 3, name: 'Water Management System Upgrade', score: 85, date: '2024-01-10' },
    { id: 4, name: 'Smart City Infrastructure Development', score: 79, date: '2024-01-08' },
    { id: 5, name: 'Rural Road Connectivity Project', score: 91, date: '2024-01-05' },
  ];

  const stats = {
    avgCompatibilityScore: 87,
    tendersUploaded: 47,
    wins: 12,
    successRate: 68,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🏢 Company Profile</h2>
          <p className="text-gray-600">Manage your organization's information and track performance</p>
        </div>
        
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Company Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <Input
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                  <Input
                    value={editData.contactPerson}
                    onChange={(e) => setEditData({...editData, contactPerson: e.target.value})}
                    className="rounded-lg"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <Input
                    value={editData.phone}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    className="rounded-lg"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <Textarea
                  value={editData.address}
                  onChange={(e) => setEditData({...editData, address: e.target.value})}
                  className="rounded-lg"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  value={editData.description}
                  onChange={(e) => setEditData({...editData, description: e.target.value})}
                  className="rounded-lg"
                  rows={4}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Types (comma separated)</label>
                <Input
                  value={editData.workTypes.join(', ')}
                  onChange={(e) => setEditData({...editData, workTypes: e.target.value.split(', ').map(s => s.trim())})}
                  className="rounded-lg"
                  placeholder="Road Construction, Bridge Development, etc."
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white">
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Information */}
        <div className="lg:col-span-2">
          <Card className="rounded-xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-teal-600" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{companyData.name}</h3>
                <p className="text-gray-600">{companyData.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Registered Address</p>
                      <p className="text-sm text-gray-600">{companyData.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">{companyData.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Contact Person</p>
                      <p className="text-sm text-gray-600">{companyData.contactPerson}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">{companyData.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900 mb-3">Types of Work Usually Bidded</p>
                <div className="flex flex-wrap gap-2">
                  {companyData.workTypes.map((type, index) => (
                    <Badge key={index} variant="secondary" className="bg-teal-100 text-teal-800 hover:bg-teal-200">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Stats */}
        <div>
          <Card className="rounded-xl border-0 shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-teal-600" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <CompatibilityScore score={stats.avgCompatibilityScore} showTooltip={false} />
                <p className="text-sm text-gray-600 mt-2">Average Compatibility Score</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.tendersUploaded}</div>
                  <div className="text-xs text-blue-700">Tenders Uploaded</div>
                </div>
                
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.wins}</div>
                  <div className="text-xs text-green-700">Successful Bids</div>
                </div>
              </div>
              
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{stats.successRate}%</div>
                <div className="text-xs text-purple-700">Success Rate</div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="rounded-xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start rounded-lg">
                <FileText className="w-4 h-4 mr-2" />
                Export Profile Data
              </Button>
              
              <Button variant="outline" className="w-full justify-start rounded-lg">
                <Award className="w-4 h-4 mr-2" />
                View Certificates
              </Button>
              
              <Button variant="outline" className="w-full justify-start rounded-lg">
                <TrendingUp className="w-4 h-4 mr-2" />
                Performance Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Analysis */}
      <Card className="rounded-xl border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Last 5 Analyzed Tenders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTenders.map((tender) => (
              <div key={tender.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{tender.name}</h4>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(tender.date).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <CompatibilityScore score={tender.score} showTooltip={false} />
                  <Button variant="outline" size="sm" className="rounded-lg">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyProfileTab;
