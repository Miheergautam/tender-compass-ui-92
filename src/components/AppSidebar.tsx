import React from "react";
import {
  BarChart3,
  Search,
  FileText,
  Folder,
  Building2,
  GitCompare,
  Bell,
  Settings,
  LogOut,
  MessageSquare,
  Hammer,
} from "lucide-react";

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  activeTab,
  setActiveTab,
  onLogout,
}) => {
  const sidebarItems = [
    { icon: BarChart3, label: "Dashboard", key: "dashboard" },
    { icon: Search, label: "Smart Search", key: "smart-search" },
    { icon: Folder, label: "My Tenders", key: "my-tenders" },
    { icon: Building2, label: "Company Profile", key: "company-profile" },
    { icon: GitCompare, label: "Compare Tenders", key: "compare-tenders" },
    { icon: MessageSquare, label: "Feedback", key: "feedback" },
  ];

  const bottomItems = [
    { icon: Bell, label: "Notifications", key: "notifications" },
    { icon: Settings, label: "Settings", key: "settings" },
  ];

  return (
    <div className="w-64 h-full bg-white shadow-xl border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <Hammer className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              TenderBharat
            </h1>
            <p className="text-xs text-gray-500">Find Your Perfect Tender</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 mt-6">
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(item.key)}
            className={`w-full flex items-center px-6 py-3 text-left hover:bg-teal-50 hover:border-r-2 hover:border-teal-500 transition-all duration-200 ${
              activeTab === item.key
                ? "bg-teal-50 text-teal-700 border-r-2 border-teal-600 font-medium"
                : "text-gray-600 hover:text-teal-700"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </button>
        ))}

        <div className="mt-8 pt-4 border-t border-gray-200">
          {bottomItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-all duration-200 ${
                activeTab === item.key
                  ? "bg-gray-50 text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-700"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={async () => {
            try {
              await fetch("/auth/logout", {
                method: "GET",
                credentials: "include",
              });
              onLogout();
            } catch (error) {
              console.error("Logout failed", error);
            }
          }}
          className="w-full flex items-center px-6 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-xl"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AppSidebar;
