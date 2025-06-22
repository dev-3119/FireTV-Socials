import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Users, Heart, Send, Smile, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';

const PlaybackView = ({ activeRoom, activeClub, chatVisible, onToggleChat, onExitPlayback }) => {
  const [chatMessage, setChatMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(3);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const [messages, setMessages] = useState([]);


  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      console.log('Sending message:', chatMessage);
      setChatMessage('');
    }
  };

  const handleExitAttempt = () => {
    if (activeRoom) {
      setShowExitConfirm(true);
    } else {
      onExitPlayback();
    }
  };

  useEffect(() => {
    if (chatVisible) {
      setUnreadCount(0);
    }
  }, [chatVisible]);

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Main Video Area */}
      <div className="relative w-full h-full flex">
        {/* Video Content */}
        <div className={`relative bg-[#0f0f0f] flex items-center justify-center transition-all duration-300 ${
          chatVisible ? 'w-3/4' : 'w-full'
        }`}>
          {/* Simulated Video Content */}
          <div className="w-full h-full bg-gradient-to-br from-[#1c1c1e] to-black flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {activeRoom ? 'Synchronized Playback Active' : 'Independent Playback'}
              </h2>
              <p className="text-gray-400">
                {activeRoom 
                  ? 'All viewers are synced • Admin controls active'
                  : 'Your personal viewing experience'}
              </p>
            </div>
          </div>

          {/* Exit Button */}
          <div className="absolute top-4 left-4">
            <Button
              onClick={handleExitAttempt}
              variant="outline"
              className="bg-black/70 border border-gray-600 text-white hover:bg-black/90"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Exit
            </Button>
          </div>

          {/* Chat Toggle */}
          {!chatVisible && (
            <div className="absolute bottom-4 right-4">
              <Button
                onClick={onToggleChat}
                className="bg-black/70 border border-gray-600 text-white hover:bg-black/90 relative"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat
                {unreadCount > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
                    {unreadCount}
                  </div>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Chat Panel */}
        {chatVisible && (
          <div className="w-1/4 bg-[#1c1c1e] border-l border-gray-700 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-cyan-400" />
                <h3 className="font-semibold text-white">
                  {activeRoom ? 'Room Chat' : 'Club Chat'}
                </h3>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {activeRoom ? activeRoom.members : '2.8k'}
                  </span>
                </div>
              </div>
              <Button
                onClick={onToggleChat}
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-cyan-400">{msg.user}</span>
                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-300">{msg.message}</p>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <Input
                  placeholder="Send a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-[#2a2a2d] border-gray-600 text-white"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-cyan-600 hover:bg-cyan-700"
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
        )}
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-60">
          <Card className="p-6 bg-[#1c1c1e] border border-gray-700 max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Exit Room?</h3>
            <p className="text-gray-300 mb-6">
              You're currently in a synchronized room. Exiting will disconnect you from the shared session.
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={onExitPlayback}
                variant="destructive"
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Exit Room
              </Button>
              <Button
                onClick={() => setShowExitConfirm(false)}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:text-white hover:border-white"
              >
                Stay
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PlaybackView;