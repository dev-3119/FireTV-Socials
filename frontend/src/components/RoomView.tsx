import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Users2, Plus, Crown, Play, MessageCircle, Video,
  UserPlus, Trash2, Circle, Star
} from 'lucide-react';

import BrowseContentView from './BrowseContentView';
import QueueManagerView from './QueueManagerView';

const RoomView = ({ activeRoom, onJoinRoom, onCreateRoom, onStartPlayback }) => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [isInLounge, setIsInLounge] = useState(false);
  const [showBrowseContent, setShowBrowseContent] = useState(false);
  const [showQueueManager, setShowQueueManager] = useState(false);
  const [showInviteFriends, setShowInviteFriends] = useState(false);

  const inviteRef = useRef(null);

  const onlineFriends = [
    {
      id: 1,
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop",
      status: "online",
      currentActivity: "Watching Stranger Things",
      isVip: true
    },
    {
      id: 2,
      name: "Mike Johnson",
      username: "mikej",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      status: "online",
      currentActivity: "In Friday Night Movies room",
      isVip: false
    }
  ];

  const handleInviteFriend = (friend) => {
    console.log(`Invited ${friend.name}`);
  };

  const roomsRef = useRef([]);
  const [userRooms, setUserRooms] = useState(() => {
    const stored = localStorage.getItem('userRooms');
    if (stored) {
      roomsRef.current = JSON.parse(stored);
      return JSON.parse(stored);
    }
    const defaultRooms = [
      {
        id: 1,
        name: "Friday Night Movies",
        members: 4,
        isOwner: true,
        status: "idle",
        currentShow: null,
        thumbnails: []
      }
    ];
    roomsRef.current = defaultRooms;
    return defaultRooms;
  });

  useEffect(() => {
    localStorage.setItem('userRooms', JSON.stringify(userRooms));
  }, [userRooms]);

  const handleCreateRoom = () => {
    if (newRoomName.trim()) {
      const newRoom = {
        id: crypto.randomUUID?.() || Date.now(),
        name: newRoomName,
        members: 1,
        isOwner: true,
        status: 'idle',
        currentShow: null,
        thumbnails: []
      };
      roomsRef.current.push(newRoom);
      setUserRooms([...roomsRef.current]);
      onCreateRoom(newRoomName);
      setNewRoomName('');
      setShowCreateRoom(false);
    }
  };

  const handleDeleteRoom = (id, e) => {
    e.stopPropagation();
    roomsRef.current = roomsRef.current.filter(room => room.id !== id);
    setUserRooms([...roomsRef.current]);
  };

  const handleStartWatching = () => {
    onStartPlayback({ title: 'Selected Content', type: 'room' });
  };

  const handleAddToQueue = (movie) => {
    console.log("Movie added to queue:", movie);
  };

  if (showBrowseContent) {
    return (
      <BrowseContentView
        onBack={() => setShowBrowseContent(false)}
        onAddToQueue={handleAddToQueue}
      />
    );
  }

  if (showQueueManager) {
    return (
      <QueueManagerView
        onBack={() => setShowQueueManager(false)}
      />
    );
  }

  return (
    <div className="space-y-6 pt-16 relative">
      <div className="flex items-center justify-between relative">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Crown className="h-6 w-6 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white">{activeRoom?.name || 'Room'}</h2>
          </div>
          <div className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
            {activeRoom?.members} members
          </div>
        </div>
        <div className="flex space-x-3 relative">
          {activeRoom?.isOwner && (
            <div className="relative">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setShowInviteFriends(prev => !prev)}
                ref={inviteRef}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Friends
              </Button>

              {showInviteFriends && (
                <div className="absolute right-0 mt-2 w-[360px] bg-gray-900 border border-gray-700 rounded-xl p-4 z-50 shadow-xl">
                  <h4 className="text-white text-lg font-semibold mb-3">Online Friends</h4>
                  <ul className="space-y-4 max-h-[300px] overflow-y-auto">
                    {onlineFriends.map((friend) => (
                      <li key={friend.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-semibold">{friend.name}</span>
                              <span className="text-xs text-gray-400">@{friend.username}</span>
                              {friend.isVip && <Star className="h-3 w-3 text-yellow-400" />}
                            </div>
                            <p className="text-sm text-gray-400">{friend.currentActivity}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleInviteFriend(friend)}
                          className="bg-cyan-600 hover:bg-cyan-700 text-white"
                        >
                          Invite
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <Button
            variant="outline"
            onClick={() => setIsInLounge(!isInLounge)}
            className={`border-cyan-500 ${isInLounge ? 'bg-cyan-600 text-white' : 'text-cyan-400 hover:bg-cyan-600 hover:text-white'}`}
          >
            <Video className="h-4 w-4 mr-2" />
            {isInLounge ? 'Exit Lounge' : 'Enter Lounge'}
          </Button>
        </div>
      </div>

      {!isInLounge && (
        <div className="space-y-6">
          <Card className="aspect-video bg-black border-gray-700 flex items-center justify-center relative max-w-4xl">
            <div className="text-center">
              <Play className="h-16 w-16 text-cyan-400 mb-4 mx-auto" />
              <p className="text-xl text-white mb-2">Ready to start watching</p>
              <p className="text-gray-400">Select content to begin synchronized playback</p>
            </div>
          </Card>
          <div className="flex space-x-4">
            {activeRoom?.isOwner && (
              <Button onClick={handleStartWatching} className="bg-cyan-600 hover:bg-cyan-700">
                <Play className="h-4 w-4 mr-2" />
                Start Watching
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setShowBrowseContent(true)}
              className="border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white"
            >
              Browse Content
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowQueueManager(true)}
              className="border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white"
            >
              Queue Manager
            </Button>
          </div>
        </div>
      )}

      {isInLounge && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white">Video Lounge</h3>
          <div className="grid grid-cols-2 gap-4 max-w-4xl">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="aspect-video bg-gray-800 border-gray-700 p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <Users2 className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-sm text-gray-400 mb-2">User {i}</p>
                  <div className="w-3 h-3 bg-green-400 rounded-full mx-auto animate-pulse"></div>
                </div>
              </Card>
            ))}
          </div>

          {/* ✅ Game and Vote Buttons */}
<div className="flex space-x-4">
  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
    🎮 Game
  </Button>
  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
    🗳️ Vote
  </Button>
</div>

        </div>
      )}
    </div>
  );
};

export default RoomView;
