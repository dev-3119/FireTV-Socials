import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users2, Plus, Crown, Play, Video, Clock, ArrowLeft, Search, UserPlus, Trash2, Calendar } from 'lucide-react';
import InviteFriendsDrawer from '@/components/InviteFriendsDrawer';
import { useEffect } from 'react';



const EnhancedRoomsView = ({ activeRoom, onJoinRoom, onCreateRoom, onStartPlayback, onBack }) => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteDrawer, setShowInviteDrawer] = useState(false);

  const [userRooms, setUserRooms] = useState(() => {
  const stored = localStorage.getItem('userRooms');
  return stored ? JSON.parse(stored) : [
    {
      id: 1,
      name: "Friday Night Movies",
      members: 4,
      isOwner: true,
      status: "idle",
      currentShow: null,
      memberAvatars: [
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108755-2616b612b602?w=40&h=40&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
      ],
      invited: false,
      createdAt: "2 days ago"
    },
    {
      id: 2,
      name: "College Crew",
      members: 6,
      isOwner: false,
      status: "live",
      currentShow: "The Matrix",
      memberAvatars: [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      ],
      invited: false,
      createdAt: "1 week ago"
    },
    {
      id: 3,
      name: "Family Movie Night",
      members: 3,
      isOwner: false,
      status: "waiting",
      currentShow: null,
      memberAvatars: [
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face"
      ],
      invited: true,
      createdAt: "3 days ago"
    }
  ];
});

useEffect(() => {
  localStorage.setItem('userRooms', JSON.stringify(userRooms));
}, [userRooms]);




  const filteredRooms = userRooms.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateRoom = () => {
  if (newRoomName.trim()) {
    const newRoom = {
      id: Date.now(),
      name: newRoomName,
      members: 1,
      isOwner: true,
      status: 'idle',
      currentShow: null,
      memberAvatars: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
      ],
      invited: false,
      createdAt: "Just now"
    };
    setUserRooms(prev => [...prev, newRoom]);
    setNewRoomName('');
    setShowCreateRoom(false);
  }
};

const handleDeleteRoom = (roomId, e) => {
  e.stopPropagation();
  setUserRooms(prev => prev.filter(room => room.id !== roomId));
};



  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'bg-red-500';
      case 'waiting': return 'bg-cyan-500';
      case 'idle': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'live': return 'Live';
      case 'waiting': return 'Waiting';
      case 'idle': return 'Idle';
      default: return 'Idle';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            My Rooms
          </h2>
          <p className="text-gray-400 text-lg mt-2">Private spaces for watching with friends</p>
        </div>
        <Button 
          onClick={() => setShowCreateRoom(true)}
          className="bg-gradient-to-r from-cyan-700 to-blue-700 hover:from-cyan-800 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-cyan-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Room
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input 
  placeholder="Search rooms..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="pl-12 py-4 bg-transparent border border-gray-600 text-white text-lg rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
  style={{ backdropFilter: 'blur(6px)' }}
/>
      </div>

      {/* Create Room Form */}
      {showCreateRoom && (
        <Card className="p-6 bg-gradient-to-r from-[#1b1f2a] to-[#2a2f3a] border-[#2e3a4a] backdrop-blur-sm rounded-xl shadow-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Create New Room</h3>
          <div className="flex space-x-3">
            <Input 
              placeholder="Room name"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="flex-1 bg-[#2a2f3a] border-[#3a4a5a] text-white focus:ring-2 focus:ring-cyan-500"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateRoom()}
            />
            <Button onClick={handleCreateRoom} className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white focus:ring-2 focus:ring-cyan-500">
              Create
            </Button>
            <Button
  variant="outline"
  onClick={() => setShowCreateRoom(false)}
  className="border-[#3a4a5a] text-white bg-[#2a2f3a] hover:bg-[#333b44] hover:text-white focus:ring-2 focus:ring-cyan-500"
>
  Cancel
</Button>
          </div>
        </Card>
      )}

      {/* Rooms Grid */}
      <div className="space-y-6">
        {/* Invited Rooms */}
        {filteredRooms.filter(room => room.invited).length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-cyan-400" />
              Pending Invites
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.filter(room => room.invited).map((room) => (
                <Card key={room.id} className="p-6 bg-gradient-to-br from-[#1b1f2a] to-[#2a2f3a] border-[#2e3a4a] hover:from-[#222836] hover:to-[#333b44] transition-all duration-300 cursor-pointer hover:scale-105 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-cyan-500/10 focus:ring-2 focus:ring-cyan-500">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-white text-lg">{room.name}</h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(room.status)}`}>
                      {getStatusLabel(room.status)}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex -space-x-2">
                      {room.memberAvatars.map((avatar, index) => (
                        <img 
                          key={index}
                          src={avatar} 
                          alt={`Member ${index + 1}`}
                          className="w-8 h-8 rounded-full border-2 border-gray-800"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-300">{room.members} members</span>
                    <div className="flex items-center text-xs text-gray-400 ml-auto">
                      <Calendar className="h-3 w-3 mr-1" />
                      {room.createdAt}
                    </div>
                  </div>

                  <Button 
  onClick={() => onJoinRoom(room)}
  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white focus:ring-2 focus:ring-cyan-500"
>
  Accept Invite
</Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* My Rooms */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Users2 className="h-5 w-5 mr-2 text-cyan-400" />
            My Rooms
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.filter(room => !room.invited).map((room) => (
              <Card key={room.id} className="p-6 bg-gradient-to-br from-[#1b1f2a] to-[#2a2f3a] border-[#2e3a4a] hover:from-[#222836] hover:to-[#333b44] transition-all duration-300 cursor-pointer hover:scale-105 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-cyan-500/10 focus:ring-2 focus:ring-cyan-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {room.isOwner && <Crown className="h-5 w-5 text-cyan-400" />}
                    <h3 className="font-semibold text-white text-lg">{room.name}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(room.status)}`}>
                      {getStatusLabel(room.status)}
                    </div>
                    {room.isOwner && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleDeleteRoom(room.id, e)}
                        className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/30 focus:ring-2 focus:ring-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex -space-x-2">
                    {room.memberAvatars.map((avatar, index) => (
                      <img 
                        key={index}
                        src={avatar} 
                        alt={`Member ${index + 1}`}
                        className="w-8 h-8 rounded-full border-2 border-gray-700"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-300">{room.members} members</span>
                  <div className="flex items-center text-xs text-gray-400 ml-auto">
                    <Calendar className="h-3 w-3 mr-1" />
                    {room.createdAt}
                  </div>
                </div>

                {room.currentShow && (
                  <p className="text-sm text-cyan-400 mb-3">
                    Currently watching: {room.currentShow}
                  </p>
                )}

                <Button 
  onClick={() => onJoinRoom(room)}
  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white focus:ring-2 focus:ring-cyan-500"
>
  <Video className="h-4 w-4 mr-2" />
  Enter Room
</Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedRoomsView;
