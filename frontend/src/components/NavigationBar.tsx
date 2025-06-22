
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Search, Tv, Download, Settings, User } from 'lucide-react';
import SocialModeToggle from '@/components/SocialModeToggle';

const NavigationBar = ({ socialModeActive, onToggleSocialMode, currentView, onViewChange }) => {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, active: currentView === 'home' },
    { id: 'search', label: 'Search', icon: Search, active: currentView === 'search' },
    { id: 'live-tv', label: 'Live TV', icon: Tv, active: currentView === 'live-tv' },
    { id: 'install-apps', label: 'Install Apps', icon: Download, active: currentView === 'install-apps' }
  ];

  const appIcons = [
    { name: 'Netflix', color: 'bg-red-600', logo: 'N' },
    { name: 'Prime Video', color: 'bg-blue-600', logo: 'PV' },
    { name: 'YouTube', color: 'bg-red-500', logo: 'YT' },
    { name: 'Disney+', color: 'bg-blue-700', logo: 'D+' },
    { name: 'Hulu', color: 'bg-green-500', logo: 'H' },
    { name: 'HBO Max', color: 'bg-purple-600', logo: 'HBO' }
  ];

  return (
    <div className="bg-black/90 backdrop-blur border-b border-gray-800 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Profile + Social Toggle + Main Nav */}
        <div className="flex items-center space-x-6">
          {/* Profile Avatar */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <span className="text-white font-medium">Fire TV User</span>
          </div>

          {/* Social Mode Toggle */}
          <SocialModeToggle 
            active={socialModeActive}
            onToggle={onToggleSocialMode}
          />

          {/* Main Navigation - Only show in Private Mode */}
          {!socialModeActive && (
            <div className="flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={item.active ? "default" : "ghost"}
                    onClick={() => onViewChange && onViewChange(item.id)}
                    className={`px-4 py-2 h-auto transition-all duration-200 ${
                      item.active 
                        ? 'bg-white text-black hover:bg-gray-200' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Section - App Icons */}
        <div className="flex items-center space-x-3">
          {appIcons.map((app) => (
            <Button
              key={app.name}
              variant="outline"
              size="icon"
              className={`w-12 h-12 ${app.color} border-none text-white hover:scale-110 transition-transform font-bold text-xs`}
              title={app.name}
            >
              {app.logo}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
