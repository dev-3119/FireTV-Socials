
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users2, Globe, MessageCircle, Contact, Calendar, Settings, Power } from 'lucide-react';

const EnhancedSocialNavigation = ({ currentView, onViewChange, onOpenSettings, onToggleSocialMode }) => {
  const navigationItems = [
    { id: 'rooms', label: 'Rooms', icon: Users2, description: 'Private spaces' },
    { id: 'clubs', label: 'Clubs', icon: Globe, description: 'Public communities' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, description: 'Chat & invites' },
    { id: 'contacts', label: 'Contacts', icon: Contact, description: 'Friends' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, description: 'Upcoming events' }
  ];

  return (
    <div className="bg-black/95 backdrop-blur border-b border-gray-800 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Social Mode Toggle - Far Left */}
        <div className="flex items-center space-x-6">
          <Button
            onClick={onToggleSocialMode}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-full hover:from-purple-700 hover:to-cyan-700 transition-all duration-300"
          >
            <Power className="h-4 w-4 mr-2" />
            Social Mode
          </Button>
        </div>

        {/* Main Navigation - Center */}
        <div className="flex items-center space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                onClick={() => onViewChange(item.id)}
                className={`px-6 py-3 h-auto transition-all duration-200 ${
                  currentView === item.id 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-semibold text-sm">{item.label}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Settings - Right */}
        <Button
          variant="ghost"
          onClick={onOpenSettings}
          className="text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <Settings className="h-5 w-5 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
};

export default EnhancedSocialNavigation;
