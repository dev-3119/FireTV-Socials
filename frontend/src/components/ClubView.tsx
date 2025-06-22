import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Users, Clock, Flag, Star, TrendingUp, Play, Globe } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';

const ClubView = ({ activeClub, onJoinClub, onStartPlayback }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingClubs = [
    {
      id: 1,
      name: "Marvel Mondays",
      description: "Weekly MCU marathons and discussions",
      members: 5672,
      nextEvent: "Spider-Man: No Way Home",
      startTime: "Mon 8:00 PM",
      category: "Superhero",
      isJoined: true
    },
    {
      id: 2,
      name: "Sci-Fi Saturdays", 
      description: "Classic and new sci-fi premieres",
      members: 3421,
      nextEvent: "Dune: Part Two",
      startTime: "Sat 7:00 PM",
      category: "Sci-Fi",
      isJoined: false
    },
    {
      id: 3,
      name: "Horror House",
      description: "Spine-chilling premieres and classics", 
      members: 2876,
      nextEvent: "The Nun's Secret",
      startTime: "Fri 10:00 PM",
      category: "Horror",
      isJoined: true
    },
    {
      id: 4,
      name: "Anime Alliance",
      description: "Latest anime episodes and movies",
      members: 8934,
      nextEvent: "One Piece Film: Red", 
      startTime: "Sun 6:00 PM",
      category: "Anime",
      isJoined: false
    }
  ];

  const handleJoinEvent = () => {
    console.log('Joining club event');
    onStartPlayback({ title: activeClub.nextEvent, type: 'club' });
  };

  if (activeClub) {
    return (
      <div className="space-y-6 pt-16">
        {/* Club Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">{activeClub.name || activeClub.title}</h2>
              <p className="text-gray-400">{activeClub.members?.toLocaleString() || activeClub.memberCount?.toLocaleString()} members • Next: {activeClub.startTime}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button 
              onClick={handleJoinEvent}
              className="bg-green-600 hover:bg-green-700 px-6 py-3"
            >
              <Play className="h-4 w-4 mr-2" />
              Join Event
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300">
              <Flag className="h-4 w-4 mr-2" />
              Report
            </Button>
          </div>
        </div>

        {/* Countdown Banner */}
        <Card className="p-8 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-cyan-500/30">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              {activeClub.nextEvent || activeClub.title}
            </h3>
            <div className="flex items-center justify-center space-x-8 text-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">01</div>
                <div className="text-sm text-gray-400">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">45</div>
                <div className="text-sm text-gray-400">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">23</div>
                <div className="text-sm text-gray-400">Seconds</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Club Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-white mb-3">About This Club</h4>
              <p className="text-gray-300 text-lg">
                {activeClub.description || `Join thousands of fans for the premiere of ${activeClub.title}. Enjoy independent playback with shared community chat and reactions.`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <div className="flex items-center space-x-4">
                  <Users className="h-8 w-8 text-cyan-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {(activeClub.members || activeClub.memberCount)?.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Total Members</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gray-800/50 border-gray-700">
                <div className="flex items-center space-x-4">
                  <Globe className="h-8 w-8 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">Public</div>
                    <div className="text-sm text-gray-400">Open Event</div>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Club Rules</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Be respectful to all members</li>
                <li>• No spoilers for upcoming content</li>
                <li>• Use the flag feature to report inappropriate messages</li>
                <li>• 15+ flags result in automatic chat ban</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Event Schedule</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-cyan-400" />
                  <div>
                    <div className="text-white font-medium">{activeClub.startTime}</div>
                    <div className="text-sm text-gray-400">Event Start</div>
                  </div>
                </div>
              </div>
            </Card>

            <Button 
              onClick={handleJoinEvent}
              className="w-full bg-cyan-600 hover:bg-cyan-700 py-3 text-lg"
            >
              <Play className="h-5 w-5 mr-2" />
              Join Event Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Clubs</h2>
          <p className="text-gray-400 text-lg">Join public premiere events and watch parties</p>
        </div>
        <div className="flex space-x-3">
          <Input 
            placeholder="Search clubs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 bg-gray-700 border-gray-600 text-white"
          />
          <Button variant="outline" className="border-gray-600 text-gray-300">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending
          </Button>
        </div>
      </div>

      {/* My Clubs Section */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">My Clubs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trendingClubs.filter(club => club.isJoined).map((club) => (
            <Card key={club.id} className="p-6 bg-gray-800/70 border-gray-700 hover:bg-gray-800/90 transition-all duration-300 cursor-pointer hover:scale-105" onClick={() => onJoinClub(club)}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-white flex items-center text-lg">
                    {club.name}
                    <Star className="h-4 w-4 text-yellow-400 ml-2" />
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">{club.description}</p>
                </div>
                <span className="px-2 py-1 bg-cyan-600 text-white text-xs rounded-full">
                  {club.category}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Next: {club.nextEvent}</span>
                  <span className="text-green-400">{club.startTime}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{club.members.toLocaleString()}</span>
                  </div>
                  <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                    Enter Club
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Discover Clubs */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Discover Clubs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingClubs.filter(club => !club.isJoined).map((club) => (
            <Card key={club.id} className="p-6 bg-gray-800/70 border-gray-700 hover:bg-gray-800/90 transition-all duration-300 cursor-pointer hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-white text-lg">{club.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">{club.description}</p>
                </div>
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                  {club.category}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm text-gray-300">
                  <div>Next: {club.nextEvent}</div>
                  <div className="text-green-400">{club.startTime}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{club.members.toLocaleString()}</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-cyan-500 text-cyan-400 hover:bg-cyan-600 hover:text-white"
                    onClick={() => onJoinClub(club)}
                  >
                    Join Club
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubView;
