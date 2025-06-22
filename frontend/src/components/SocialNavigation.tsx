
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users2, Globe, MessageCircle, Contact, Calendar, Settings } from 'lucide-react';

const SocialNavigation = ({ currentView, onViewChange, onOpenSettings }) => {
  const navigationItems = [
    { id: 'rooms', label: 'Rooms', icon: Users2 },
    { id: 'clubs', label: 'Clubs', icon: Globe },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'contacts', label: 'Contacts', icon: Contact },
    { id: 'schedule', label: 'Schedule', icon: Calendar }
  ];

  return (
    <div className="bg-black/90 backdrop-blur border-b border-gray-800 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Social Navigation */}
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
                {item.label}
              </Button>
            );
          })}
        </div>

        {/* Settings */}
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

export default SocialNavigation;
