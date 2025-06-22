
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Play } from 'lucide-react';

const UpcomingClubEvents = ({ onJoinClub }) => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Stranger Things S5 Premiere",
      poster: "https://images.unsplash.com/photo-1489599546738-36c3e1106dd3?w=400&h=600&fit=crop",
      startTime: "2h 30m",
      memberCount: 2847,
      category: "Sci-Fi Drama"
    },
    {
      id: 2,
      title: "The Mandalorian Season Finale",
      poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      startTime: "5h 15m",
      memberCount: 1923,
      category: "Space Adventure"
    },
    {
      id: 3,
      title: "Wednesday Season 2 Launch",
      poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      startTime: "1d 3h",
      memberCount: 3456,
      category: "Dark Comedy"
    },
    {
      id: 4,
      title: "Marvel's Secret Wars",
      poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
      startTime: "2d 8h",
      memberCount: 5672,
      category: "Superhero"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Upcoming Club Events</h2>
          <p className="text-slate-400">Join the community for premiere watch parties</p>
        </div>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-4">
        {upcomingEvents.map((event) => (
          <Card key={event.id} className="flex-shrink-0 w-72 bg-slate-800/70 border-slate-700 overflow-hidden hover:bg-slate-800/90 transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div className="relative">
              <img 
                src={event.poster} 
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-2 left-3 right-3">
                <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                  {event.category}
                </span>
              </div>
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                <Clock className="h-3 w-3 text-yellow-400" />
                <span className="text-xs text-white font-medium">Starts in {event.startTime}</span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {event.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{event.memberCount.toLocaleString()} joined</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white transition-all duration-200"
                  onClick={() => onJoinClub(event)}
                >
                  <Play className="h-3 w-3 mr-1" />
                  Preview
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpcomingClubEvents;
