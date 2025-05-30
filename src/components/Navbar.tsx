
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Bell, Settings, LogOut, Upload, FileText, HelpCircle, Hammer } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Hammer className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                TenderBharat
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === 'dashboard'
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === 'documents'
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>My Documents</span>
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search documents..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm" className="rounded-lg">
              <Settings className="w-5 h-5" />
            </Button>

            {/* Help Icon */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-lg">
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-[100]">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">📞 Mobile:</span>
                      <a href="tel:+919876543210" className="text-sm text-teal-600 hover:text-teal-800 font-medium">
                        +91 98765 43210
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">✉️ Email:</span>
                      <a href="mailto:help@tenderbharat.com" className="text-sm text-teal-600 hover:text-teal-800 font-medium">
                        help@tenderbharat.com
                      </a>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* User Avatar */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
            </div>

            {/* Logout */}
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
