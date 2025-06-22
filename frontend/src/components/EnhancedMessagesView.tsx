
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Users2, Globe, Clock, Check, X, Send, Heart, Smile } from 'lucide-react';

const EnhancedMessagesView = ({ onJoinRoom, onJoinClub }) => {
  const [selectedThread, setSelectedThread] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const messageThreads = [
    {
      id: 1,
      type: 'room_invite',
      title: 'Friday Night Movies',
      sender: 'Sarah Chen',
      senderAvatar: "src/icon/friday-night-funkin-logo-png_seeklogo-411208.png",
      message: 'Hey! Want to join our movie night? We\'re watching The Dark Knight!',
      time: '5 min ago',
      unread: true,
      roomData: { id: 1, name: 'Friday Night Movies', members: 4 }
    },
    {
      id: 2,
      type: 'club_invite',
      title: 'Marvel Universe Club',
      sender: 'Mike Johnson',
      senderAvatar: "src/icon/marvel-comics-logo-png_seeklogo-88891.png",
      message: 'Marvel Universe Club is having an Avengers marathon this weekend. Join us!',
      time: '2 hours ago',
      unread: true,
      clubData: { id: 1, name: 'Marvel Universe', members: 12500 }
    },
    {
      id: 3,
      type: 'room_chat',
      title: 'College Crew',
      sender: 'Multiple',
      senderAvatar: "src/icon/st,small,507x507-pad,600x600,f8f8f8.u2.jpg",
      message: 'Alex: This movie is amazing! 🔥',
      time: '1 day ago',
      unread: false,
      roomData: { id: 2, name: 'College Crew', members: 6 }
    },
    {
      id: 4,
      type: 'club_chat',
      title: 'Stranger Things Fans',
      sender: 'Multiple',
      senderAvatar: "src/icon/stranger-things-logo-png_seeklogo-479256.png",
      message: 'Emma: Can\'t wait for season 5 predictions tonight!',
      time: '2 days ago',
      unread: false,
      clubData: { id: 2, name: 'Stranger Things Fans', members: 8200 }
    }
  ];

  const fullChatHistory = {
    1: [
      { id: 1, sender: 'Sarah Chen', message: 'Hey everyone! Movie night tonight?', time: '2 hours ago', isOwn: false },
      { id: 2, sender: 'You', message: 'Count me in! What are we watching?', time: '1 hour ago', isOwn: true },
      { id: 3, sender: 'Sarah Chen', message: 'Hey! Want to join our movie night? We\'re watching The Dark Knight!', time: '5 min ago', isOwn: false },
      { id: 4, type: 'system', message: 'Sarah Chen invited you to Friday Night Movies', time: '5 min ago' }
    ],
    2: [
      { id: 1, sender: 'Mike Johnson', message: 'Marvel Universe Club is having an Avengers marathon this weekend. Join us!', time: '2 hours ago', isOwn: false },
      { id: 2, type: 'system', message: 'Mike Johnson invited you to Marvel Universe Club', time: '2 hours ago' }
    ],
    3: [
      { id: 1, sender: 'Alex', message: 'This scene is amazing! 🔥', time: '2 days ago', isOwn: false },
      { id: 2, sender: 'Sarah', message: 'I love this movie', time: '2 days ago', isOwn: false },
      { id: 3, sender: 'You', message: 'Same here! Great choice', time: '1 day ago', isOwn: true },
      { id: 4, type: 'system', message: 'Movie ended', time: '1 day ago' }
    ]
  };

  const handleAcceptInvite = (thread) => {
    if (thread.type === 'room_invite') {
      onJoinRoom(thread.roomData);
    } else if (thread.type === 'club_invite') {
      onJoinClub(thread.clubData);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const getThreadIcon = (type) => {
    switch (type) {
      case 'room_invite':
      case 'room_chat':
        return Users2;
      case 'club_invite':
      case 'club_chat':
        return Globe;
      default:
        return MessageCircle;
    }
  };

  const getThreadColor = (type) => {
    switch (type) {
      case 'room_invite':
      case 'room_chat':
        return 'text-purple-400';
      case 'club_invite':
      case 'club_chat':
        return 'text-cyan-400';
      default:
        return 'text-gray-400';
    }
  };

  if (selectedThread) {
    const thread = messageThreads.find(t => t.id === selectedThread);
    const messages = fullChatHistory[selectedThread] || [];

    return (
      <div className="flex h-[80vh]">
        {/* Chat Thread */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setSelectedThread(null)}
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                ← Back
              </Button>
              <img 
                src={thread.senderAvatar} 
                alt={thread.sender}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-white">{thread.title}</h3>
                <p className="text-sm text-gray-400">{thread.sender}</p>
              </div>
            </div>
            
            {(thread.type === 'room_invite' || thread.type === 'club_invite') && (
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleAcceptInvite(thread)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Accept
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  <X className="h-4 w-4 mr-2" />
                  Decline
                </Button>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                {msg.type === 'system' ? (
                  <div className="text-center text-gray-500 text-sm italic bg-gray-800/50 px-3 py-2 rounded-lg">
                    {msg.message}
                  </div>
                ) : (
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.isOwn 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-800 text-white'
                  }`}>
                    {!msg.isOwn && (
                      <p className="text-xs font-medium mb-1 text-purple-400">{msg.sender}</p>
                    )}
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-gray-800">
            <div className="flex space-x-2">
              <Input
                placeholder="Send a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-gray-800 border-gray-600 text-white"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex space-x-2 mt-2">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Messages
        </h2>
        <p className="text-gray-400 text-lg mt-2">Chat threads and actionable invites</p>
      </div>

      {/* Message Threads */}
      <div className="space-y-4">
        {messageThreads.map((thread) => {
          const Icon = getThreadIcon(thread.type);
          const isInvite = thread.type.includes('invite');
          
          return (
            <Card 
              key={thread.id} 
              className={`p-6 transition-all duration-300 cursor-pointer hover:scale-[1.02] backdrop-blur-sm rounded-xl ${
                thread.unread 
                  ? 'bg-[#1a1a1c] border-[#00b2ff]/50 shadow-[0_0_8px_#00b2ff55] hover:bg-[#1e1e20]' 
                  : 'bg-[#0f0f10] border-[#2c2c2e] hover:bg-[#1a1a1c] hover:border-[#00b2ff33]'
              }`}
              onClick={() => setSelectedThread(thread.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={thread.senderAvatar} 
                      alt={thread.sender}
                      className="w-12 h-12 rounded-full"
                    />
                    {thread.unread && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon className={`h-4 w-4 ${getThreadColor(thread.type)}`} />
                      <h3 className="font-semibold text-white">{thread.title}</h3>
                      {isInvite && (
                        <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded-full font-medium">
                          Invite
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{thread.sender}</p>
                    <p className="text-sm text-gray-300">{thread.message}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-2">{thread.time}</p>
                    {isInvite && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcceptInvite(thread);
                        }}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-1 text-xs"
                      >
                        Accept
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    {thread.unread && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {messageThreads.length === 0 && (
        <div className="text-center py-16">
          <MessageCircle className="h-20 w-20 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-400 mb-3">No messages yet</h3>
          <p className="text-gray-500 text-lg">Join some rooms and clubs to start chatting!</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedMessagesView;
