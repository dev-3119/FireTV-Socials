
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Play, Bell, Calendar } from 'lucide-react';

const UpcomingEventsRow = ({ onJoinRoom, onJoinClub }) => {
  const upcomingEvents = [
    {
      id: 1,
      type: 'club',
      title: "Stranger Things S5 Premiere",
      poster: "src/icon/Stranger_Things_logo.png",
      startTime: "2h 30m",
      memberCount: 2847,
      category: "Sci-Fi Drama",
      attendingFriends: [
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108755-2616b612b602?w=40&h=40&fit=crop&crop=face"
      ]
    },
    {
      id: 2,
      type: 'room',
      title: "Friday Movie Night",
      poster: "src/icon/friday-night-funkin-logo-png_seeklogo-411208.png",
      startTime: "1h 15m",
      memberCount: 4,
      category: "Private Room",
      attendingFriends: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
      ]
    },
    {
      id: 3,
      type: 'club',
      title: "Marvel's Secret Wars",
      poster: "src/icon/images.jpeg",
      startTime: "3h 45m",
      memberCount: 5672,
      category: "Superhero",
      attendingFriends: [
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
      ]
    },
    {
      id: 4,
      type: 'room',
      title: "College Crew Reunion",
      poster: "src/icon/st,small,507x507-pad,600x600,f8f8f8.u2.jpg",
      startTime: "Tomorrow 8PM",
      memberCount: 6,
      category: "Private Room",
      attendingFriends: []
    }
  ];

  const handleEventAction = (event) => {
    if (event.type === 'room') {
      onJoinRoom(event);
    } else {
      onJoinClub(event);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
        <Button variant="outline" className="border-gray-600 text-black hover:bg-gray-800">
          <Calendar className="h-4 w-4 mr-2" />
          View All
        </Button>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-4">
        {upcomingEvents.map((event) => (
          <Card 
            key={event.id} 
            className="flex-shrink-0 w-72 bg-gray-900/70 border-gray-700 overflow-hidden hover:bg-gray-900/90 transition-all duration-300 hover:scale-105 cursor-pointer group"
          >
            <div className="relative">
              <img 
                src={event.poster} 
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              {/* Event Type Badge */}
              <div className="absolute top-2 left-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  event.type === 'room' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-cyan-600 text-white'
                }`}>
                  {event.type === 'room' ? 'Private Room' : 'Public Club'}
                </span>
              </div>

              {/* Countdown */}
              <div className="absolute top-2 right-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                <Clock className="h-3 w-3 text-yellow-400" />
                <span className="text-xs text-white font-medium">{event.startTime}</span>
              </div>

              {/* Category */}
              <div className="absolute bottom-2 left-3">
                <span className="text-xs bg-gray-800/80 text-gray-200 px-2 py-1 rounded-full">
                  {event.category}
                </span>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                {event.title}
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>
                    {event.type === 'room' 
                      ? `${event.memberCount} members` 
                      : `${event.memberCount.toLocaleString()} joined`
                    }
                  </span>
                </div>

                {/* Attending Friends */}
                {event.attendingFriends.length > 0 && (
                  <div className="flex -space-x-2">
                    {event.attendingFriends.slice(0, 3).map((avatar, index) => (
                      <img 
                        key={index}
                        src={avatar} 
                        alt={`Friend ${index + 1}`}
                        className="w-6 h-6 rounded-full border-2 border-gray-800"
                      />
                    ))}
                    {event.attendingFriends.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center">
                        <span className="text-xs text-gray-300">+{event.attendingFriends.length - 3}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex space-x-2 pt-2">
                <Button 
                  size="sm" 
                  className={`flex-1 ${
                    event.type === 'room' 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-cyan-600 hover:bg-cyan-700'
                  }`}
                  onClick={() => handleEventAction(event)}
                >
                  <Play className="h-3 w-3 mr-1" />
                  Join
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Bell className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEventsRow;
