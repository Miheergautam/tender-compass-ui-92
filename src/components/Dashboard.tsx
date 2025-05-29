
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Upload, 
  FileText, 
  Eye, 
  Calendar, 
  User, 
  Settings, 
  History, 
  BarChart3, 
  LogOut, 
  Search,
  Filter,
  Download,
  Trash2,
  Clock
} from 'lucide-react';

interface DashboardProps {
  onAnalyze: () => void;
}

interface Document {
  id: string;
  name: string;
  uploadDate: string;
  status: 'analyzed' | 'pending' | 'processing';
  size: string;
  type: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onAnalyze }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dragActive, setDragActive] = useState(false);

  const [documents] = useState<Document[]>([
    { 
      id: '1', 
      name: 'Highway Construction Tender.pdf', 
      uploadDate: '2024-01-15', 
      status: 'analyzed',
      size: '2.4 MB',
      type: 'Construction'
    },
    { 
      id: '2', 
      name: 'Bridge Development Project.pdf', 
      uploadDate: '2024-01-10', 
      status: 'analyzed',
      size: '1.8 MB',
      type: 'Infrastructure'
    },
    { 
      id: '3', 
      name: 'Road Maintenance Contract.pdf', 
      uploadDate: '2024-01-08', 
      status: 'processing',
      size: '3.1 MB',
      type: 'Maintenance'
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      simulateUpload();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleAnalyze = () => {
    if (uploadedFile) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onAnalyze();
      }, 2000);
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', active: true },
    { icon: FileText, label: 'Documents' },
    { icon: History, label: 'History' },
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'analyzed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">TB</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                tenderBharat
              </h1>
              <p className="text-xs text-gray-500">Smart Analysis Platform</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-teal-50 hover:border-r-2 hover:border-teal-500 transition-all duration-200 ${
                item.active 
                  ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-600 font-medium' 
                  : 'text-gray-600 hover:text-teal-700'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full flex items-center px-6 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-xl">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Upload & Analyze Tender</h2>
            <p className="text-gray-600">Upload a tender document to get comprehensive analysis</p>
          </div>

          {/* Upload Section */}
          <Card className="mb-8 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Upload Tender Document</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-teal-400 bg-teal-50' 
                    : uploadedFile 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-gray-300 hover:border-teal-400 hover:bg-teal-50/50'
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
              >
                <Upload className={`mx-auto h-12 w-12 mb-4 transition-colors duration-300 ${
                  uploadedFile ? 'text-green-500' : 'text-gray-400'
                }`} />
                <div className="space-y-2">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-lg font-medium text-gray-900">
                      {uploadedFile ? uploadedFile.name : 'Drag and drop your PDF here, or click to browse'}
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

                {isUploading && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Uploading... {uploadProgress}%</p>
                  </div>
                )}
              </div>
              
              {uploadedFile && !isUploading && (
                <div className="mt-6 flex justify-center">
                  <Button 
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 px-8 py-3 rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      'Analyze Document'
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Document History */}
          <Card className="shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-xl font-semibold text-gray-900">Document History</CardTitle>
                
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64 rounded-xl border-2 border-gray-200 focus:border-teal-400"
                    />
                  </div>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-teal-400 focus:outline-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="analyzed">Analyzed</option>
                    <option value="processing">Processing</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
                      <Skeleton className="w-10 h-10 rounded" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                      <Skeleton className="w-20 h-8 rounded-lg" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 lg:grid-cols-1">
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="group border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-teal-300 transition-all duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-teal-100 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-teal-600" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {doc.uploadDate}
                              </span>
                              <span>{doc.size}</span>
                              <span className="hidden sm:inline">{doc.type}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                            {doc.status === 'processing' && (
                              <Clock className="w-3 h-3 inline mr-1" />
                            )}
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </span>
                          
                          <div className="flex space-x-2">
                            {doc.status === 'analyzed' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={onAnalyze}
                                className="flex items-center rounded-lg border-teal-200 text-teal-700 hover:bg-teal-50 transition-all duration-200"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View Analysis
                              </Button>
                            )}
                            
                            <Button variant="ghost" size="sm" className="rounded-lg hover:bg-gray-100">
                              <Download className="w-4 h-4" />
                            </Button>
                            
                            <Button variant="ghost" size="sm" className="rounded-lg hover:bg-red-50 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredDocuments.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
