
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users2, Calendar, Crown, Globe, ChevronRight } from 'lucide-react';

const SocialRows = ({ onJoinRoom, onJoinClub }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Social Features</h2>
      
      <div className="grid grid-cols-2 gap-8">
        {/* Rooms Card */}
        <Card 
          className="p-8 bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30 hover:from-purple-900/70 hover:to-blue-900/70 transition-all duration-300 cursor-pointer group"
          onClick={() => onJoinRoom(null)}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Users2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Rooms</h3>
                  <p className="text-purple-200">Private watch parties</p>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-purple-300 group-hover:translate-x-1 transition-transform" />
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Create private spaces for synchronized viewing with friends. 
              Full admin controls and synced playback.
            </p>
            
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-yellow-400" />
                <span className="text-sm text-gray-300">Admin Controls</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Synced Playback</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Clubs Card */}
        <Card 
          className="p-8 bg-gradient-to-br from-cyan-900/50 to-green-900/50 border-cyan-500/30 hover:from-cyan-900/70 hover:to-green-900/70 transition-all duration-300 cursor-pointer group"
          onClick={() => onJoinClub(null)}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-green-600 rounded-2xl flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Clubs</h3>
                  <p className="text-cyan-200">Public premiere events</p>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-cyan-300 group-hover:translate-x-1 transition-transform" />
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Join community premiere events and watch parties. 
              Independent playback with shared chat experience.
            </p>
            
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-cyan-400" />
                <span className="text-sm text-gray-300">Public Events</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Live Chat</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SocialRows;
