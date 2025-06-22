
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Globe, Users, Calendar, Star, TrendingUp, Search, ArrowLeft, Play } from 'lucide-react';

const EnhancedClubsView = ({ activeClub, onJoinClub, onStartPlayback, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const clubs = [
    {
      id: 1,
      name: "Marvel Universe",
      banner: "src/icon/fbea5f9ae42833153b09c85c49486640.jpg",
      members: 12500,
      category: "Movies",
      trending: true,
      nextSession: "Avengers: Endgame Discussion",
      nextSessionTime: "Tonight 9 PM",
      joined: false
    },
    {
      id: 2,
      name: "Stranger Things Fans",
      banner: "src/icon/Stranger_Things_logo.png",
      members: 8200,
      category: "TV Shows",
      trending: true,
      nextSession: "Season 5 Predictions",
      nextSessionTime: "Friday 8 PM",
      joined: true
    },
    {
      id: 3,
      name: "Anime Central",
      banner: "src/icon/bafkreidvmktxpam5txodzzb4q7q4nrx2usqo7giq5aexnr5vkurq2mowwe.jpg",
      members: 15600,
      category: "Anime",
      trending: false,
      nextSession: "Studio Ghibli Marathon",
      nextSessionTime: "Saturday 2 PM",
      joined: false
    },
    {
      id: 4,
      name: "Horror Movie Society",
      banner: "src/icon/the-15-best-horror-movies-about-cursed-objects.avif",
      members: 3400,
      category: "Movies",
      trending: false,
      nextSession: "Classic Horror Night",
      nextSessionTime: "Sunday 10 PM",
      joined: true
    }
  ];

  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const trendingClubs = filteredClubs.filter(club => club.trending);
  const myClubs = filteredClubs.filter(club => club.joined);
  const discoverClubs = filteredClubs.filter(club => !club.joined && !club.trending);

  if (activeClub) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-black/80 backdrop-blur border-gray-600 hover:bg-gray-800 text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Clubs
          </Button>
        </div>

        {/* Club Content */}
        <div className="space-y-6">
          <div className="relative">
            <img 
              src={activeClub.banner} 
              alt={activeClub.name}
              className="w-full h-64 object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl"></div>
            <div className="absolute bottom-6 left-6">
              <h2 className="text-3xl font-bold text-white mb-2">{activeClub.name}</h2>
              <div className="flex items-center space-x-4 text-gray-300">
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {activeClub.members.toLocaleString()} members
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {activeClub.nextSession}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button 
              onClick={() => onStartPlayback({ title: activeClub.nextSession, type: 'club' })}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Play className="h-4 w-4 mr-2" />
              Join Live Session
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300">
              Browse Club Content
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300">
              Club Schedule
            </Button>
          </div>

          <Card className="aspect-video bg-black border-gray-700 flex items-center justify-center max-w-4xl">
            <div className="text-center">
              <Globe className="h-16 w-16 text-purple-400 mb-4 mx-auto" />
              <p className="text-xl text-white mb-2">Welcome to {activeClub.name}</p>
              <p className="text-gray-400">Join the community discussion and live events</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Clubs
          </h2>
          <p className="text-gray-400 text-lg mt-2">Public communities and fandom spaces</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input 
          placeholder="Search clubs and communities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 py-4 bg-gray-900/50 border-gray-700 text-white text-lg rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
        />
      </div>

      {/* Trending Clubs */}
      {trendingClubs.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-orange-400" />
            Trending Now
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingClubs.map((club) => (
              <Card key={club.id} className="overflow-hidden bg-gray-900/30 border-gray-800/50 hover:bg-gray-900/50 transition-all duration-300 cursor-pointer hover:scale-105 backdrop-blur-sm rounded-xl">
                <div className="relative">
                  <img 
                    src={club.banner} 
                    alt={club.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-bold text-white text-lg">{club.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-300 text-sm">{club.members.toLocaleString()} members</span>
                      <span className="text-purple-400 text-sm">{club.category}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-300 text-sm mb-3">
                    Next: {club.nextSession} • {club.nextSessionTime}
                  </p>
                  <Button 
                    onClick={() => onJoinClub(club)}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                  >
                    Join Club
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* My Clubs */}
      {myClubs.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Star className="h-6 w-6 mr-2 text-yellow-400" />
            My Clubs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myClubs.map((club) => (
              <Card key={club.id} className="overflow-hidden bg-gray-900/30 border-gray-800/50 hover:bg-gray-900/50 transition-all duration-300 cursor-pointer hover:scale-105 backdrop-blur-sm rounded-xl">
                <div className="relative">
                  <img 
                    src={club.banner} 
                    alt={club.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      Joined
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2">{club.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400 text-sm">{club.members.toLocaleString()} members</span>
                    <span className="text-purple-400 text-sm">{club.category}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Next: {club.nextSession} • {club.nextSessionTime}
                  </p>
                  <Button 
                    onClick={() => onJoinClub(club)}
                    variant="outline" 
                    className="w-full border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white"
                  >
                    Enter Club
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Discover Clubs */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Globe className="h-6 w-6 mr-2 text-cyan-400" />
          Discover
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discoverClubs.map((club) => (
            <Card key={club.id} className="overflow-hidden bg-gray-900/30 border-gray-800/50 hover:bg-gray-900/50 transition-all duration-300 cursor-pointer hover:scale-105 backdrop-blur-sm rounded-xl">
              <div className="relative">
                <img 
                  src={club.banner} 
                  alt={club.name}
                  className="w-full h-32 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white mb-2">{club.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-sm">{club.members.toLocaleString()} members</span>
                  <span className="text-cyan-400 text-sm">{club.category}</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Next: {club.nextSession} • {club.nextSessionTime}
                </p>
                <Button 
                  onClick={() => onJoinClub(club)}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                >
                  Join Club
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedClubsView;
