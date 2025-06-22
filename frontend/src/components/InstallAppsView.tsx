
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Star, Users, Zap, Filter } from 'lucide-react';

const InstallAppsView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Apps' },
    { id: 'trending', label: 'Trending' },
    { id: 'new', label: 'New Releases' },
    { id: 'free', label: 'Free to Use' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'games', label: 'Games' },
    { id: 'utilities', label: 'Utilities' }
  ];

  const apps = [
    {
      id: 1,
      name: 'Spotify',
      icon: 'data:image/png;base64,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',
      category: 'entertainment',
      rating: 4.8,
      downloads: '1M+',
      price: 'Free',
      description: 'Music streaming with millions of songs',
      isNew: false,
      isTrending: true,
      isFree: true
    },
    {
      id: 2,
      name: 'Pluto TV',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Ngwvde8a2PW0RwACrzHN7ZTCH4lQ3hCEyA&s',
      category: 'entertainment',
      rating: 4.5,
      downloads: '500K+',
      price: 'Free',
      description: 'Free live TV and on-demand content',
      isNew: true,
      isTrending: true,
      isFree: true
    },
    {
      id: 3,
      name: 'Minecraft',
      icon: 'https://play-lh.googleusercontent.com/27O5tpaYE82W6m30rJ_MX3-UvshlDM6O8oXDxb6GseYW2T7P8UNT19727MGmz-0q3w',
      category: 'games',
      rating: 4.7,
      downloads: '2M+',
      price: '$6.99',
      description: 'Build, explore, and survive in infinite worlds',
      isNew: false,
      isTrending: true,
      isFree: false
    },
    {
      id: 4,
      name: 'VLC Media Player',
      icon: 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBaiFYNNWXsOxGMkFu.UwJRvaEXaHhIX97KLpve1m1vGD8hNv4M3x3O9bn7O_qQS_o.4B5ms5misgxg.6sjzS6Ds-&format=source',
      category: 'utilities',
      rating: 4.9,
      downloads: '800K+',
      price: 'Free',
      description: 'Universal media player supporting all formats',
      isNew: false,
      isTrending: false,
      isFree: true
    },
    {
      id: 5,
      name: 'Twitch',
      icon: 'https://play-lh.googleusercontent.com/Y6epalNGUKPgWyQpDCgVL621EgmOmXBWfQoJdaM8v0irKWEII5bEDvpaWp7Mey2MVg',
      category: 'entertainment',
      rating: 4.6,
      downloads: '1.5M+',
      price: 'Free',
      description: 'Live streaming platform for gamers',
      isNew: true,
      isTrending: true,
      isFree: true
    },
    {
      id: 6,
      name: 'Plex',
      icon: 'https://play-lh.googleusercontent.com/slZYN_wnlAZ4BmyTZZakwfwAGm8JE5btL7u7AifhqCtUuxhtVVxQ1mcgpGOYC7MsAaU',
      category: 'entertainment',
      rating: 4.4,
      downloads: '600K+',
      price: 'Free',
      description: 'Stream your personal media collection',
      isNew: false,
      isTrending: false,
      isFree: true
    }
  ];

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' ||
                           app.category === selectedCategory ||
                           (selectedCategory === 'trending' && app.isTrending) ||
                           (selectedCategory === 'new' && app.isNew) ||
                           (selectedCategory === 'free' && app.isFree);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Install Apps</h1>
          <p className="text-gray-400">Discover new apps optimized for Fire TV</p>
        </div>
        <Badge variant="outline" className="border-purple-500 text-purple-400">
          <Download className="h-4 w-4 mr-2" />
          {filteredApps.length} Apps Available
        </Badge>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search apps by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-600 text-white"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'border-gray-600 text-black hover:bg-gray-800'
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <Card key={app.id} className="bg-gray-900 border-gray-800 overflow-hidden hover:bg-gray-800 transition-colors">
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <img 
                  src={app.icon} 
                  alt={app.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-white truncate">{app.name}</h3>
                    {app.isNew && (
                      <Badge className="bg-green-600 text-white text-xs">NEW</Badge>
                    )}
                    {app.isTrending && (
                      <Badge className="bg-orange-600 text-white text-xs">
                        <Zap className="h-3 w-3 mr-1" />
                        TRENDING
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {app.rating}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {app.downloads}
                    </div>
                    <span className={`font-semibold ${app.isFree ? 'text-green-400' : 'text-purple-400'}`}>
                      {app.price}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{app.description}</p>
              
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                Install
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No apps found matching your criteria</p>
          <Button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            variant="outline"
            className="mt-4 border-gray-600 text-gray-300"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default InstallAppsView;
