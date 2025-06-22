import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles, Search } from 'lucide-react';
import axios from 'axios';

const moods = ['Excited', 'Romantic', 'Relaxed', 'Curious', 'Adventurous', 'Sad', 'Happy'];

const EnhancedSearchView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendation, setRecommendation] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRecommend = async (text: string) => {
    setLoading(true);
    setRecommendation(null);
    try {
      const res = await axios.post('http://localhost:8000/api/recommend', {
        mood: text
      });
      setRecommendation(res.data.movie_suggestion);
    } catch (error) {
      console.error('Error getting recommendation:', error);
    }
    setLoading(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleRecommend(searchQuery.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      {/* Mood Buttons */}
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <Button
            key={mood}
            onClick={() => handleRecommend(mood)}
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            {mood}
          </Button>
        ))}
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyan-400" />
        <Input
          placeholder="Tell me your mood or search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-4 text-base bg-gray-900 text-white border-cyan-700 focus:border-cyan-500"
        />
      </form>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-cyan-300 text-center mt-6">Thinking of a good one for you...</div>
      )}

      {/* Movie Recommendation Card */}
      {recommendation && (
        <div className="bg-gray-900 text-white rounded-xl p-6 shadow-md space-y-3 border border-cyan-800">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-cyan-300">
            <Sparkles className="w-5 h-5" /> FireBuddy Recommends:
          </h2>
          <h3 className="text-2xl font-bold">{recommendation.title}</h3>
          <p className="text-cyan-200">{recommendation.description}</p>
          <div className="text-sm text-cyan-400">
            Rating: {recommendation.rating} ⭐ | Year: {recommendation.year}
          </div>
          <div className="pt-2 text-green-400 italic">
            {recommendation.message}
          </div>
          <div className="pt-4">
            <Button
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={() => window.open(`https://www.google.com/search?q=watch+${encodeURIComponent(recommendation.title)}`, '_blank')}
            >
              🎬 Watch Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchView;
