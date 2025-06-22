
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Search, UserPlus, X, Users } from 'lucide-react';

const InviteFriendsDrawer = ({ isOpen, onClose, roomName }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [invitedFriends, setInvitedFriends] = useState(new Set());

  // Mock contacts data
  const contacts = [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
      status: "online",
      mutualFriends: 5
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b602?w=40&h=40&fit=crop&crop=face",
      status: "online",
      mutualFriends: 8
    },
    {
      id: 3,
      name: "Mike Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      status: "offline",
      mutualFriends: 3
    },
    {
      id: 4,
      name: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      status: "online",
      mutualFriends: 12
    },
    {
      id: 5,
      name: "James Brown",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      status: "online",
      mutualFriends: 7
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = (contactId) => {
    const newInvited = new Set(invitedFriends);
    if (newInvited.has(contactId)) {
      newInvited.delete(contactId);
    } else {
      newInvited.add(contactId);
    }
    setInvitedFriends(newInvited);
    console.log('Inviting contact:', contactId, 'to room:', roomName);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="bg-gradient-to-b from-gray-900 to-black border-gray-700 text-white max-h-[80vh]">
        <DrawerHeader className="border-b border-gray-700 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <DrawerTitle className="text-xl font-bold text-white">
                  Invite Friends
                </DrawerTitle>
                <p className="text-sm text-gray-400">to "{roomName}"</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-800 focus:ring-2 focus:ring-orange-500"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DrawerHeader>

        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 bg-gray-800/70 border-gray-600 text-white text-lg rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Contacts List */}
          <div className="space-y-3">
            {filteredContacts.map((contact) => {
              const isInvited = invitedFriends.has(contact.id);
              return (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-700/50 hover:from-gray-800/70 hover:to-gray-700/70 transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full border-2 border-gray-600"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
                        contact.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{contact.name}</h3>
                      <p className="text-sm text-gray-400">
                        {contact.mutualFriends} mutual friends
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleInvite(contact.id)}
                    variant={isInvited ? "outline" : "default"}
                    className={`px-4 py-2 transition-all duration-200 focus:ring-2 focus:ring-orange-500 ${
                      isInvited
                        ? 'border-green-500 text-green-400 hover:bg-green-600 hover:text-white'
                        : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white'
                    }`}
                  >
                    {isInvited ? (
                      <>
                        <X className="h-4 w-4 mr-2" />
                        Invited
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Invite
                      </>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>

          {filteredContacts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400 text-lg">No friends found</p>
              <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
            </div>
          )}

          {/* Summary */}
          {invitedFriends.size > 0 && (
            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-xl p-4 border border-orange-600/30">
              <p className="text-white font-medium">
                {invitedFriends.size} friend{invitedFriends.size !== 1 ? 's' : ''} invited
              </p>
              <p className="text-orange-300 text-sm mt-1">
                Invitations will be sent when you close this panel
              </p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default InviteFriendsDrawer;
