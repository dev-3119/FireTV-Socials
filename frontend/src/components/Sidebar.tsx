
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users2, Calendar, Contact, MessageCircle, Clock, Home, Zap } from 'lucide-react';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'rooms', label: 'Rooms', icon: Users2, description: 'Private spaces', color: 'from-purple-500 to-pink-500' },
    { id: 'clubs', label: 'Clubs', icon: Calendar, description: 'Public events', color: 'from-cyan-500 to-blue-500' },
    { id: 'contacts', label: 'Contacts', icon: Contact, description: 'Friends online', color: 'from-green-500 to-emerald-500' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, description: 'Chat & invites', color: 'from-yellow-500 to-orange-500' },
    { id: 'schedule', label: 'Schedule', icon: Clock, description: 'Upcoming events', color: 'from-red-500 to-pink-500' },
  ];

  return (
    <div className="w-full bg-black/95 backdrop-blur-md border-b border-gray-800/50 shadow-2xl">
      {/* Header */}
      <div className="px-8 py-4 border-b border-gray-800/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Social Hub</h2>
              <p className="text-sm text-gray-400">Stay connected</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300 font-medium">Social Mode Active</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-8 py-4">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                onClick={() => onSectionChange(item.id)}
                className={`flex-shrink-0 h-auto px-6 py-3 transition-all duration-300 rounded-xl ${
                  isActive 
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-current/25 scale-105` 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/70 hover:scale-105'
                }`}
              >
                <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-semibold text-sm">{item.label}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
