
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Bell, Mail, Smartphone, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LanguageNotificationsTab: React.FC = () => {
  const [language, setLanguage] = useState('en');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [uiAlerts, setUIAlerts] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [newTenderAlerts, setNewTenderAlerts] = useState(true);
  const [compatibilityAlerts, setCompatibilityAlerts] = useState(true);
  const [analysisUpdates, setAnalysisUpdates] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your language and notification preferences have been updated.",
    });
  };

  const notificationTypes = [
    {
      id: 'new-tender',
      title: 'New Similar Tender Found',
      description: 'Get notified when tenders matching your profile are discovered',
      enabled: newTenderAlerts,
      setEnabled: setNewTenderAlerts,
      icon: Bell,
    },
    {
      id: 'high-compatibility',
      title: 'High Compatibility Detected',
      description: 'Alerts for tenders with compatibility score above 85%',
      enabled: compatibilityAlerts,
      setEnabled: setCompatibilityAlerts,
      icon: Bell,
    },
    {
      id: 'analysis-updated',
      title: 'Analysis Updated',
      description: 'Notifications when tender analysis is completed or updated',
      enabled: analysisUpdates,
      setEnabled: setAnalysisUpdates,
      icon: Bell,
    },
    {
      id: 'weekly-digest',
      title: 'Weekly Digest',
      description: 'Summary of new opportunities and trending tenders',
      enabled: weeklyDigest,
      setEnabled: setWeeklyDigest,
      icon: Mail,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🌐 Language & Notifications</h2>
        <p className="text-gray-600">Customize your language preferences and notification settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Settings */}
        <Card className="rounded-xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-teal-600" />
              Language Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interface Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="hi">🇮🇳 हिंदी (Hindi)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-2">
                Change the display language for the entire interface
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Coming Soon</h4>
              <p className="text-sm text-blue-700">
                Full Hindi language support is currently under development. 
                Basic translations are available for key interface elements.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Regional Preferences</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Date Format</span>
                  <span className="text-sm text-gray-500">DD-MM-YYYY</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Currency</span>
                  <span className="text-sm text-gray-500">₹ INR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Time Zone</span>
                  <span className="text-sm text-gray-500">IST (UTC+5:30)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Channels */}
        <Card className="rounded-xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-teal-600" />
              Notification Channels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-900">Email Notifications</span>
                    <p className="text-xs text-gray-500">Receive updates via email</p>
                  </div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-900">UI Alerts</span>
                    <p className="text-xs text-gray-500">In-app notification banners</p>
                  </div>
                </div>
                <Switch
                  checked={uiAlerts}
                  onCheckedChange={setUIAlerts}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-900">SMS Notifications</span>
                    <p className="text-xs text-gray-500">Critical updates via SMS</p>
                  </div>
                </div>
                <Switch
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-900">Sound Alerts</span>
                    <p className="text-xs text-gray-500">Audio notifications</p>
                  </div>
                </div>
                <Switch
                  checked={soundAlerts}
                  onCheckedChange={setSoundAlerts}
                />
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                You can customize when and how you receive notifications based on your preferences.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Types */}
      <Card className="rounded-xl border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notificationTypes.map((notification) => (
              <div key={notification.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <notification.icon className="w-5 h-5 text-teal-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notification.enabled}
                    onCheckedChange={notification.setEnabled}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-lg px-8"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default LanguageNotificationsTab;
