
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Eye, Calendar, User, Settings, History, BarChart3, LogOut } from 'lucide-react';

interface DashboardProps {
  onAnalyze: () => void;
}

interface Document {
  id: string;
  name: string;
  uploadDate: string;
  status: 'analyzed' | 'pending';
}

const Dashboard: React.FC<DashboardProps> = ({ onAnalyze }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [documents] = useState<Document[]>([
    { id: '1', name: 'Highway Construction Tender.pdf', uploadDate: '2024-01-15', status: 'analyzed' },
    { id: '2', name: 'Bridge Development Project.pdf', uploadDate: '2024-01-10', status: 'analyzed' },
    { id: '3', name: 'Road Maintenance Contract.pdf', uploadDate: '2024-01-08', status: 'pending' }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAnalyze = () => {
    if (uploadedFile) {
      onAnalyze();
    }
  };

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', active: true },
    { icon: FileText, label: 'Documents' },
    { icon: History, label: 'History' },
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-indigo-700">tenderBharat</h1>
          <p className="text-sm text-gray-500">Smart Analysis Platform</p>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-indigo-50 transition-colors ${
                item.active ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700' : 'text-gray-600'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full flex items-center px-6 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Upload & Analyze Tender</h2>
            <p className="text-gray-600">Upload a tender document to get comprehensive analysis</p>
          </div>

          {/* Upload Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upload Tender Document</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-lg font-medium text-gray-900">
                      {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                  <p className="text-gray-500">PDF files only (Max 10MB)</p>
                </div>
              </div>
              
              {uploadedFile && (
                <div className="mt-4 flex justify-center">
                  <Button 
                    onClick={handleAnalyze}
                    className="bg-indigo-600 hover:bg-indigo-700 px-8 py-2"
                  >
                    Analyze Document
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Document History */}
          <Card>
            <CardHeader>
              <CardTitle>Document History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Document Name</th>
                      <th className="text-left py-3 px-4">Upload Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-gray-400" />
                          {doc.name}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {doc.uploadDate}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            doc.status === 'analyzed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {doc.status === 'analyzed' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={onAnalyze}
                              className="flex items-center"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Analysis
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
