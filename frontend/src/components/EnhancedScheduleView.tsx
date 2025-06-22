import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users2, Globe, Bell, Play, Star } from 'lucide-react';

const EnhancedScheduleView = ({ onJoinRoom, onJoinClub }) => {
  const [filter, setFilter] = useState('all');

  const scheduledEvents = [
    {
      id: 1,
      type: 'room',
      title: 'Friday Night Movies',
      description: 'The Dark Knight marathon',
      startTime: 'Tonight 9:00 PM',
      duration: '3 hours',
      members: 4,
      host: 'Sarah Chen',
      hostAvatar: 'src/icon/friday-night-funkin-logo-png_seeklogo-411208.png',
      isToday: true,
      reminded: false,
      roomData: { id: 1, name: 'Friday Night Movies', members: 4 }
    },
    {
      id: 2,
      type: 'club',
      title: 'Marvel Universe Club',
      description: 'Avengers: Endgame Discussion',
      startTime: 'Tomorrow 8:00 PM',
      duration: '2 hours',
      members: 150,
      host: 'Marvel Universe Club',
      hostAvatar: 'src/icon/marvel-comics-logo-png_seeklogo-88891.png',
      isToday: false,
      reminded: true,
      clubData: { id: 1, name: 'Marvel Universe', members: 12500 }
    },
    {
      id: 3,
      type: 'club',
      title: 'Stranger Things Fans',
      description: 'Season 5 Predictions & Theories',
      startTime: 'Saturday 7:00 PM',
      duration: '1.5 hours',
      members: 80,
      host: 'Stranger Things Fans',
      hostAvatar: 'src/icon/stranger-things-logo-png_seeklogo-479256.png',
      isToday: false,
      reminded: false,
      clubData: { id: 2, name: 'Stranger Things Fans', members: 8200 }
    },
    {
      id: 4,
      type: 'room',
      title: 'College Crew',
      description: 'Comedy night - The Office marathon',
      startTime: 'Sunday 6:00 PM',
      duration: '4 hours',
      members: 6,
      host: 'Mike Johnson',
      hostAvatar: 'src/icon/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
      isToday: false,
      reminded: false,
      roomData: { id: 2, name: 'College Crew', members: 6 }
    },
    {
      id: 5,
      type: 'club',
      title: 'Anime Central',
      description: 'Studio Ghibli Marathon',
      startTime: 'Next Monday 2:00 PM',
      duration: '6 hours',
      members: 200,
      host: 'Anime Central',
      hostAvatar: 'src/icon/one-piece-skull-logo-png_seeklogo-613212.png',
      isToday: false,
      reminded: true,
      clubData: { id: 3, name: 'Anime Central', members: 15600 }
    }
  ];

  const [reminders, setReminders] = useState(
    new Set(scheduledEvents.filter(event => event.reminded).map(event => event.id))
  );

  const handleToggleReminder = (eventId) => {
    setReminders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const handleJoinEvent = (event) => {
    if (event.type === 'room') {
      onJoinRoom(event.roomData);
    } else {
      onJoinClub(event.clubData);
    }
  };

  const filteredEvents = scheduledEvents.filter(event => {
    if (filter === 'today') return event.isToday;
    if (filter === 'week') return !event.isToday;
    return true;
  });

  const todayEvents = filteredEvents.filter(event => event.isToday);
  const upcomingEvents = filteredEvents.filter(event => !event.isToday);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Schedule</h2>
          <p className="text-gray-400 text-lg mt-2">Upcoming social engagements and watch parties</p>
        </div>
        <div className="flex space-x-2">
          {["all", "today", "week"].map(option => (
            <Button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 ${
                filter === option ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }`}
            >
              {option === 'all' ? 'All Events' : option === 'today' ? 'Today' : 'This Week'}
            </Button>
          ))}
        </div>
      </div>

      {todayEvents.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-400" /> Today
          </h3>
          {todayEvents.map(event => renderEventCard(event, reminders, handleToggleReminder, handleJoinEvent))}
        </div>
      )}

      {upcomingEvents.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-400" /> Upcoming ({upcomingEvents.length})
          </h3>
          {upcomingEvents.map(event => renderEventCard(event, reminders, handleToggleReminder, handleJoinEvent))}
        </div>
      )}
    </div>
  );
};

const renderEventCard = (event, reminders, toggleReminder, joinEvent) => {
  const isReminded = reminders.has(event.id);
  const Icon = event.type === 'room' ? Users2 : Globe;

  return (
    <Card key={event.id} className="p-6 bg-zinc-900 text-white rounded-xl mb-4 shadow border border-zinc-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={event.hostAvatar}
              alt={event.host}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/48')}
            />
            <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
              event.type === 'room' ? 'bg-purple-500' : 'bg-blue-400'
            }`}>
              <Icon className="h-3 w-3 text-white" />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white flex items-center">
              {event.title}
              {event.isToday && (
                <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-yellow-400 text-black rounded-full">
                  TODAY
                </span>
              )}
            </h4>
            <p className="text-gray-400 text-sm">{event.description}</p>
            <div className="flex text-sm text-gray-400 space-x-4 mt-1">
              <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {event.startTime}</span>
              <span>Duration: {event.duration}</span>
              <span className="flex items-center"><Users2 className="h-4 w-4 mr-1" /> {event.members} {event.type === 'room' ? 'members' : 'expected'}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => toggleReminder(event.id)}
            className={`${
              isReminded
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black border border-gray-300'
            } px-4 py-2 rounded-md flex items-center`}
          >
            <Bell className="h-4 w-4 mr-2" />
            {isReminded ? 'Reminded' : 'Remind Me'}
          </Button>
          <Button
            onClick={() => joinEvent(event)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Calendar className="h-4 w-4 mr-2" /> Join Event
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EnhancedScheduleView;