import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users2, MapPin, Bell, BellOff } from 'lucide-react';

const ScheduleView = ({ onJoinRoom, onJoinClub }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [view, setView] = useState('week'); // 'day', 'week', 'month'

  const events = [
    {
      id: 1,
      title: "Friday Night Movies",
      type: "room",
      date: "2025-06-20",
      time: "8:00 PM",
      duration: "3 hours",
      participants: 4,
      status: "confirmed",
      isNotified: true,
      description: "Weekly movie night with the gang",
      location: "Private Room",
      roomData: {
        id: 1,
        name: "Friday Night Movies",
        members: 4,
        isOwner: true,
        status: "idle",
        currentShow: null
      }
    },
    {
      id: 2,
      title: "Marvel Mondays - Spider-Man Marathon",
      type: "club",
      date: "2025-06-23",
      time: "7:00 PM",
      duration: "4 hours",
      participants: 156,
      status: "upcoming",
      isNotified: true,
      description: "Complete Spider-Man movie marathon",
      location: "Marvel Mondays Club",
      clubData: {
        id: 2,
        name: "Marvel Mondays",
        description: "Weekly MCU marathons and discussions",
        members: 5672,
        nextEvent: "Spider-Man Marathon",
        startTime: "Mon 7:00 PM",
        category: "Superhero",
        isJoined: true
      }
    },
    {
      id: 3,
      title: "College Crew Reunion",
      type: "room",
      date: "2025-06-21",
      time: "6:30 PM",
      duration: "2 hours",
      participants: 6,
      status: "pending",
      isNotified: false,
      description: "Catching up and watching our favorite college shows",
      location: "Private Room"
    },
    {
      id: 4,
      title: "Stranger Things S5 Premiere",
      type: "club",
      date: "2025-06-22",
      time: "9:00 PM",
      duration: "2 hours",
      participants: 2847,
      status: "upcoming",
      isNotified: true,
      description: "The most anticipated premiere of the year!",
      location: "Sci-Fi Saturdays Club"
    }
  ];

  const handleJoinEvent = (event) => {
    console.log('Joining event:', event);
    if (event.type === 'room') {
      onJoinRoom(event.roomData);
    } else if (event.type === 'club') {
      onJoinClub(event.clubData);
    }
  };

  const toggleNotification = (eventId) => {
    console.log('Toggling notification for event:', eventId);
    // This would update the notification status
  };

  const getEventIcon = (type) => {
    return type === 'room' ? <Users2 className="h-4 w-4" /> : <Calendar className="h-4 w-4" />;
  };

  const getEventColor = (type) => {
    return type === 'room' ? 'purple' : 'blue';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-600';
      case 'upcoming': return 'bg-blue-600';
      case 'pending': return 'bg-yellow-600';
      default: return 'bg-slate-600';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    }
  };

  const groupEventsByDate = (events) => {
    return events.reduce((groups, event) => {
      const date = event.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    }, {});
  };

  const groupedEvents = groupEventsByDate(events);
  const sortedDates = Object.keys(groupedEvents).sort();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Schedule</h2>
          <p className="text-gray-400">Your upcoming rooms and club events</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={view === 'week' ? 'default' : 'outline'}
            onClick={() => setView('week')}
            className={view === 'week' ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-600 text-gray-300'}
          >
            Week
          </Button>
          <Button 
            variant={view === 'month' ? 'default' : 'outline'}
            onClick={() => setView('month')}
            className={view === 'month' ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-600 text-gray-300'}
          >
            Month
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Users2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">3</div>
              <div className="text-sm text-slate-400">Room Events</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">2</div>
              <div className="text-sm text-slate-400">Club Events</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Bell className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">4</div>
              <div className="text-sm text-slate-400">Notifications On</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Events Timeline */}
      <div className="space-y-6">
        {sortedDates.map((date) => (
          <div key={date}>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-purple-400" />
              {formatDate(date)}
            </h3>
            <div className="space-y-3">
              {groupedEvents[date].map((event) => (
                <Card key={event.id} className="p-5 bg-gray-800/70 border-gray-700 hover:bg-gray-800/90 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-10 h-10 ${getEventColor(event.type) === 'purple' ? 'bg-purple-600' : 'bg-blue-600'} rounded-lg flex items-center justify-center`}>
                        {getEventIcon(event.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-white">{event.title}</h4>
                          <Badge className={`${getStatusColor(event.status)} text-white text-xs`}>
                            {event.status}
                          </Badge>
                          <Badge variant="outline" className={`${
                            event.type === 'room' 
                              ? 'border-purple-500 text-purple-400' 
                              : 'border-blue-500 text-blue-400'
                          } text-xs`}>
                            {event.type}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-slate-400 mb-3">{event.description}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-slate-300">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.time} • {event.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users2 className="h-4 w-4" />
                            <span>{event.participants} {event.type === 'room' ? 'members' : 'attendees'}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toggleNotification(event.id)}
                        className={`border-gray-600 text-gray-400 hover:bg-gray-700 ${
                          !event.isNotified ? 'opacity-50' : ''
                        }`}
                      >
                        {event.isNotified ? (
                          <Bell className="h-4 w-4" />
                        ) : (
                          <BellOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleJoinEvent(event)}
                        className={`${
                          event.type === 'room' 
                            ? 'bg-purple-600 hover:bg-purple-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">No events scheduled</h3>
          <p className="text-slate-500">Create a room or join a club to see upcoming events here.</p>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;
