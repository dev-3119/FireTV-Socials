
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, MessageCircle, UserPlus, Video, Search, Circle, Star, Crown } from 'lucide-react';

const ContactsView = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const friends = [
    {
      id: 1,
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b602?w=60&h=60&fit=crop&crop=face",
      status: "online",
      currentActivity: "Watching Stranger Things",
      lastSeen: null,
      isVip: true
    },
    {
      id: 2,
      name: "Mike Johnson",
      username: "mikej",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      status: "online",
      currentActivity: "In Friday Night Movies room",
      lastSeen: null,
      isVip: false
    },
    {
      id: 3,
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      status: "away",
      currentActivity: null,
      lastSeen: "2 hours ago",
      isVip: false
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      username: "alexr",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      status: "offline",
      currentActivity: null,
      lastSeen: "1 day ago",
      isVip: false
    },
    {
      id: 5,
      name: "Jordan Kim",
      username: "jordank",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face",
      status: "online",
      currentActivity: "Browsing clubs",
      lastSeen: null,
      isVip: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'away': return 'text-yellow-400';
      case 'offline': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineFriends = filteredFriends.filter(friend => friend.status === 'online');
  const offlineFriends = filteredFriends.filter(friend => friend.status !== 'online');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Contacts
          </h2>
          <p className="text-gray-400 text-lg mt-2">
            {onlineFriends.length} friends online • {friends.length} total friends
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105">
          <UserPlus className="h-5 w-5 mr-2" />
          Add Friend
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input 
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 py-4 bg-gray-900/50 border-gray-700 text-white text-lg rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
        />
      </div>

      {/* Online Friends */}
      {onlineFriends.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Circle className="h-4 w-4 bg-green-400 rounded-full mr-3" />
            Online ({onlineFriends.length})
          </h3>
          <div className="space-y-4">
            {onlineFriends.map((friend) => (
              <Card key={friend.id} className="p-6 bg-gray-900/30 border-gray-800/50 hover:bg-gray-900/50 transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-sm rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-5">
                    <div className="relative">
                      <img 
                        src={friend.avatar} 
                        alt={friend.name}
                        className="w-16 h-16 rounded-full ring-2 ring-green-400/50"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusDot(friend.status)} rounded-full border-2 border-black`}></div>
                      {friend.isVip && (
                        <div className="absolute -top-1 -left-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                          <Crown className="h-3 w-3 text-black" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="font-bold text-white text-lg">{friend.name}</h4>
                        <span className="text-sm text-gray-400">@{friend.username}</span>
                        {friend.isVip && <Star className="h-4 w-4 text-yellow-400" />}
                      </div>
                      <p className={`text-sm ${getStatusColor(friend.status)} capitalize font-medium`}>
                        {friend.status}
                        {friend.currentActivity && (
                          <span className="text-gray-400"> • {friend.currentActivity}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105">
                      <Video className="h-4 w-4 mr-1" />
                      Invite
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Offline Friends */}
      {offlineFriends.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Circle className="h-4 w-4 bg-gray-400 rounded-full mr-3" />
            Offline ({offlineFriends.length})
          </h3>
          <div className="space-y-4">
            {offlineFriends.map((friend) => (
              <Card key={friend.id} className="p-6 bg-gray-900/20 border-gray-800/30 hover:bg-gray-900/40 transition-all duration-300 backdrop-blur-sm rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-5">
                    <div className="relative">
                      <img 
                        src={friend.avatar} 
                        alt={friend.name}
                        className="w-16 h-16 rounded-full grayscale opacity-70"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusDot(friend.status)} rounded-full border-2 border-black`}></div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="font-bold text-gray-300 text-lg">{friend.name}</h4>
                        <span className="text-sm text-gray-500">@{friend.username}</span>
                      </div>
                      <p className="text-sm text-gray-500 font-medium">
                        Last seen {friend.lastSeen}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-300" disabled>
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {filteredFriends.length === 0 && (
        <div className="text-center py-16">
          <Users className="h-20 w-20 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-400 mb-3">No friends found</h3>
          <p className="text-gray-500 text-lg">Try adjusting your search or add some friends to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ContactsView;
