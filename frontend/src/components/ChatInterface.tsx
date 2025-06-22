
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Smile, Flag, MoreHorizontal } from 'lucide-react';

const ChatInterface = ({ type }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b602?w=32&h=32&fit=crop&crop=face',
      message: 'So excited for tonight\'s episode!',
      timestamp: '8:45 PM',
      type: 'message'
    },
    {
      id: 2,
      user: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      message: '🍿 Got the snacks ready!',
      timestamp: '8:47 PM',
      type: 'message'
    },
    {
      id: 3,
      user: 'System',
      avatar: null,
      message: 'Emma Wilson joined the room',
      timestamp: '8:48 PM',
      type: 'system'
    },
    {
      id: 4,
      user: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      message: 'Hey everyone! Just made it',
      timestamp: '8:48 PM',
      type: 'message'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face',
        message: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'message'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900/50">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">
          {type === 'room' ? 'Room Chat' : 'Club Chat'}
        </h3>
        <p className="text-sm text-slate-400">
          {messages.filter(m => m.type === 'message').length} messages
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start space-x-3 ${
              msg.type === 'system' ? 'justify-center' : ''
            }`}>
              {msg.type === 'system' ? (
                <div className="text-xs text-slate-500 italic">
                  {msg.message}
                </div>
              ) : (
                <>
                  <img 
                    src={msg.avatar} 
                    alt={msg.user}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-white">{msg.user}</span>
                      <span className="text-xs text-slate-500">{msg.timestamp}</span>
                      {type === 'club' && (
                        <Button size="sm" variant="ghost" className="h-4 w-4 p-0 text-slate-500 hover:text-red-400">
                          <Flag className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-slate-300 break-words">{msg.message}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex space-x-2">
          <Input 
            placeholder={`Send a message${type === 'club' ? ' to the club' : ''}...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
          />
          <Button 
            size="sm" 
            onClick={handleSendMessage}
            className="bg-purple-600 hover:bg-purple-700"
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mt-2">
          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
            <Smile className="h-4 w-4 mr-1" />
            Emoji
          </Button>
          {type === 'club' && (
            <span className="text-xs text-slate-500">
              Remember: 15+ flags = chat ban
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
