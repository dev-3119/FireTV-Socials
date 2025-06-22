import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Users2, Calendar, Check, CheckCheck, Bell, Star } from 'lucide-react';

const MessagesView = ({ onJoinRoom, onJoinClub }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const conversations = [
    {
      id: 1,
      type: 'room_invite',
      title: 'Room Invitation',
      subtitle: 'Mike invited you to "Friday Night Movies"',
      timestamp: '2 min ago',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      roomName: 'Friday Night Movies',
      inviter: 'Mike Johnson',
      priority: 'high',
      roomData: {
        id: 1,
        name: "Friday Night Movies",
        members: 4,
        isOwner: false,
        status: "watching",
        currentShow: "The Matrix"
      }
    },
    {
      id: 2,
      type: 'club_invite',
      title: 'Club Invitation',
      subtitle: 'Sarah invited you to "Marvel Mondays"',
      timestamp: '15 min ago',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b602?w=40&h=40&fit=crop&crop=face',
      clubName: 'Marvel Mondays',
      inviter: 'Sarah Chen',
      priority: 'high',
      clubData: {
        id: 1,
        name: "Marvel Mondays",
        description: "Weekly MCU marathons and discussions",
        members: 5672,
        nextEvent: "Spider-Man: No Way Home",
        startTime: "Mon 8:00 PM",
        category: "Superhero",
        isJoined: false
      }
    },
    {
      id: 3,
      type: 'direct_message',
      title: 'Emma Wilson',
      subtitle: 'Hey! Want to watch the new episode tonight?',
      timestamp: '1 hour ago',
      unread: false,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      priority: 'normal'
    },
    {
      id: 4,
      type: 'room_chat',
      title: 'College Crew (Room)',
      subtitle: 'Alex: Anyone up for a horror marathon?',
      timestamp: '3 hours ago',
      unread: false,
      avatar: null,
      isGroup: true,
      priority: 'normal'
    },
    {
      id: 5,
      type: 'club_announcement',
      title: 'Sci-Fi Saturdays',
      subtitle: 'New event: Dune Part Two premiere this Saturday!',
      timestamp: '1 day ago',
      unread: false,
      avatar: null,
      isGroup: true,
      priority: 'normal'
    }
  ];

  const handleAcceptInvite = (conversation) => {
    console.log('Accepting invite:', conversation);
    if (conversation.type === 'room_invite') {
      onJoinRoom(conversation.roomData);
    } else if (conversation.type === 'club_invite') {
      onJoinClub(conversation.clubData);
    }
  };

  const handleDeclineInvite = (conversation) => {
    console.log('Declining invite:', conversation);
    // Remove from list or mark as declined
  };

  const getConversationIcon = (type) => {
    switch (type) {
      case 'room_invite':
      case 'room_chat':
        return <Users2 className="h-5 w-5" />;
      case 'club_invite':
      case 'club_announcement':
        return <Calendar className="h-5 w-5" />;
      default:
        return <MessageCircle className="h-5 w-5" />;
    }
  };

  const getConversationGradient = (type) => {
    switch (type) {
      case 'room_invite':
      case 'room_chat':
        return 'from-purple-600 to-pink-600';
      case 'club_invite':
      case 'club_announcement':
        return 'from-cyan-600 to-blue-600';
      default:
        return 'from-green-600 to-emerald-600';
    }
  };

  const renderInviteCard = (conversation) => (
    <Card className="p-6 bg-gray-900/40 border-gray-800/50 mb-6 backdrop-blur-sm rounded-xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img 
            src={conversation.avatar} 
            alt={conversation.inviter}
            className="w-12 h-12 rounded-full ring-2 ring-purple-400/50"
          />
          <div>
            <h4 className="font-bold text-white text-lg">{conversation.inviter}</h4>
            <p className="text-sm text-gray-400">
              invited you to {conversation.type === 'room_invite' ? 'room' : 'club'}
            </p>
          </div>
        </div>
        <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-lg">{conversation.timestamp}</span>
      </div>
      
      <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
        <h5 className="font-bold text-purple-300 text-lg">
          {conversation.roomName || conversation.clubName}
        </h5>
        {conversation.type === 'room_invite' && conversation.roomData.currentShow && (
          <p className="text-sm text-gray-400 mt-1">
            Currently watching: {conversation.roomData.currentShow}
          </p>
        )}
      </div>

      <div className="flex space-x-4">
        <Button 
          onClick={() => handleAcceptInvite(conversation)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex-1 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
        >
          Accept
        </Button>
        <Button 
          onClick={() => handleDeclineInvite(conversation)}
          variant="outline" 
          className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white flex-1 font-semibold rounded-lg transition-all duration-300"
        >
          Decline
        </Button>
      </div>
    </Card>
  );

  if (selectedConversation) {
    const conversation = conversations.find(c => c.id === selectedConversation);
    if (conversation && (conversation.type === 'room_invite' || conversation.type === 'club_invite')) {
      return (
        <div className="space-y-8 animate-fade-in">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedConversation(null)}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-4 py-2 rounded-lg font-medium"
            >
              ← Back
            </Button>
            <h2 className="text-3xl font-bold text-white">Invitation Details</h2>
          </div>
          {renderInviteCard(conversation)}
        </div>
      );
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Messages
          </h2>
          <p className="text-gray-400 text-lg mt-2">Chat history, invites, and notifications</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 text-sm font-semibold rounded-lg">
            <Bell className="h-4 w-4 mr-1" />
            {conversations.filter(c => c.unread).length} unread
          </Badge>
        </div>
      </div>

      {/* Conversation List */}
      <div className="space-y-4">
        {conversations.map((conversation) => (
          <Card 
            key={conversation.id} 
            className={`p-6 border-gray-800/50 cursor-pointer transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm rounded-xl ${
              conversation.unread 
                ? 'bg-gray-900/50 hover:bg-gray-900/70 ring-1 ring-purple-500/30' 
                : 'bg-gray-900/30 hover:bg-gray-900/50'
            }`}
            onClick={() => {
              if (conversation.type === 'room_invite' || conversation.type === 'club_invite') {
                setSelectedConversation(conversation.id);
              }
            }}
          >
            <div className="flex items-start space-x-5">
              {/* Avatar or Icon */}
              <div className="flex-shrink-0">
                {conversation.avatar ? (
                  <div className="relative">
                    <img 
                      src={conversation.avatar} 
                      alt={conversation.title}
                      className="w-14 h-14 rounded-full"
                    />
                    {conversation.priority === 'high' && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`w-14 h-14 bg-gradient-to-r ${getConversationGradient(conversation.type)} rounded-full flex items-center justify-center shadow-lg`}>
                    {getConversationIcon(conversation.type)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-bold truncate text-lg ${conversation.unread ? 'text-white' : 'text-gray-300'}`}>
                    {conversation.title}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-lg">
                      {conversation.timestamp}
                    </span>
                    {conversation.unread && (
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
                <p className={`text-sm truncate mb-3 ${conversation.unread ? 'text-gray-300' : 'text-gray-400'}`}>
                  {conversation.subtitle}
                </p>
                
                {/* Type Badge */}
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={`text-xs font-medium bg-gradient-to-r ${getConversationGradient(conversation.type)} text-white border-none px-3 py-1 rounded-lg`}
                  >
                    {conversation.type.replace('_', ' ')}
                  </Badge>
                  
                  {/* Status indicators */}
                  <div className="flex-shrink-0">
                    {conversation.type === 'direct_message' && !conversation.unread && (
                      <CheckCheck className="h-4 w-4 text-blue-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {conversations.length === 0 && (
        <div className="text-center py-16">
          <MessageCircle className="h-20 w-20 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-400 mb-3">No messages yet</h3>
          <p className="text-gray-500 text-lg">Start a conversation or join a room to see messages here.</p>
        </div>
      )}
    </div>
  );
};

export default MessagesView;
