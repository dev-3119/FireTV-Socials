
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Users, Clock, Calendar, Radio } from 'lucide-react';

const LiveTVView = () => {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const genres = [
    { id: 'all', label: 'All Channels' },
    { id: 'news', label: 'News' },
    { id: 'sports', label: 'Sports' },
    { id: 'events', label: 'Events' },
    { id: 'entertainment', label: 'Entertainment' }
  ];

  const liveChannels = [
    {
      id: 1,
      name: 'CNN Live',
      genre: 'news',
      thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=200&fit=crop',
      isLive: true,
      viewers: '15.2K',
      currentShow: 'Breaking News Update',
      nextShow: 'World Report',
      timeUntilNext: '45 min',
      description: 'Latest breaking news and analysis'
    },
    {
      id: 2,
      name: 'ESPN Sports Center',
      genre: 'sports',
      thumbnail: 'src/icon/Tile-Art-1.78_2.webp',
      isLive: true,
      viewers: '28.5K',
      currentShow: 'NBA Highlights',
      nextShow: 'MLB Tonight',
      timeUntilNext: '1h 20m',
      description: 'Complete sports coverage and highlights'
    },
    {
      id: 3,
      name: 'Music Awards 2024',
      genre: 'events',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
      isLive: true,
      viewers: '89.1K',
      currentShow: 'Live Performances',
      nextShow: 'Award Presentations',
      timeUntilNext: '30 min',
      description: 'Annual music industry celebration'
    },
    {
      id: 4,
      name: 'Comedy Central',
      genre: 'entertainment',
      thumbnail: 'https://images.unsplash.com/photo-1516131206008-dd041a9764fd?w=300&h=200&fit=crop',
      isLive: true,
      viewers: '12.8K',
      currentShow: 'Stand-Up Special',
      nextShow: 'Comedy Series',
      timeUntilNext: '25 min',
      description: 'Non-stop comedy entertainment'
    },
    {
      id: 5,
      name: 'BBC World Service',
      genre: 'news',
      thumbnail: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=300&h=200&fit=crop',
      isLive: true,
      viewers: '22.4K',
      currentShow: 'Global News Hour',
      nextShow: 'Business Report',
      timeUntilNext: '1h 5m',
      description: 'International news and current affairs'
    },
    {
      id: 6,
      name: 'Gaming Championship',
      genre: 'events',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop',
      isLive: true,
      viewers: '45.7K',
      currentShow: 'Finals - Round 3',
      nextShow: 'Victory Ceremony',
      timeUntilNext: '2h 15m',
      description: 'Elite gaming competition'
    }
  ];

  const filteredChannels = liveChannels.filter(channel => 
    selectedGenre === 'all' || channel.genre === selectedGenre
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Live TV</h1>
          <p className="text-gray-400">Watch live channels and events as they happen</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-400 font-medium">LIVE</span>
        </div>
      </div>

      {/* Genre Filters */}
      <div className="flex gap-2 overflow-x-auto">
        {genres.map((genre) => (
          <Button
            key={genre.id}
            variant={selectedGenre === genre.id ? "default" : "outline"}
            onClick={() => setSelectedGenre(genre.id)}
            className={`whitespace-nowrap ${
              selectedGenre === genre.id
                ? 'bg-red-600 hover:bg-red-700'
                : 'border-gray-600 text-black hover:bg-gray-800'
            }`}
          >
            {genre.label}
          </Button>
        ))}
      </div>

      {/* Live Channels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredChannels.map((channel) => (
          <Card key={channel.id} className="bg-gray-900 border-gray-800 overflow-hidden hover:bg-gray-800 transition-all duration-300 group cursor-pointer">
            <div className="relative">
              <img 
                src={channel.thumbnail} 
                alt={channel.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Live Indicator */}
              <div className="absolute top-3 left-3 flex items-center space-x-2">
                <Badge className="bg-red-600 text-white">
                  <Radio className="h-3 w-3 mr-1" />
                  LIVE
                </Badge>
              </div>

              {/* Viewer Count */}
              <div className="absolute top-3 right-3">
                <Badge variant="outline" className="bg-black/70 backdrop-blur border-gray-600 text-white">
                  <Users className="h-3 w-3 mr-1" />
                  {channel.viewers}
                </Badge>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="lg" className="bg-white/20 backdrop-blur hover:bg-white/30 text-white border-white/30">
                  <Play className="h-6 w-6 mr-2" />
                  Watch Live
                </Button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">{channel.name}</h3>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    channel.genre === 'news' ? 'border-blue-500 text-blue-400' :
                    channel.genre === 'sports' ? 'border-green-500 text-green-400' :
                    channel.genre === 'events' ? 'border-purple-500 text-purple-400' :
                    'border-orange-500 text-orange-400'
                  }`}
                >
                  {channel.genre.toUpperCase()}
                </Badge>
              </div>

              <p className="text-gray-400 text-sm mb-3">{channel.description}</p>

              {/* Current & Next Show */}
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-white font-medium">Now: </span>
                  <span className="text-gray-300 ml-1">{channel.currentShow}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-blue-400 mr-2" />
                  <span className="text-white font-medium">Next: </span>
                  <span className="text-gray-300 ml-1">{channel.nextShow}</span>
                  <span className="text-gray-500 ml-2">({channel.timeUntilNext})</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredChannels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No live channels in this category</p>
          <Button 
            onClick={() => setSelectedGenre('all')}
            variant="outline"
            className="mt-4 border-gray-600 text-gray-300"
          >
            View All Channels
          </Button>
        </div>
      )}
    </div>
  );
};

export default LiveTVView;
