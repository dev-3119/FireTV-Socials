import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, ArrowLeft, Star } from 'lucide-react';
import axios from 'axios';

const BrowseContentView = ({ onBack, onAddToQueue }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [llmRecommendation, setLlmRecommendation] = useState(null);

  const movies = [
    { id: 1, title: "The Boys", poster: "src/icon/MV5BMWJlN2U5MzItNjU4My00NTM2LWFjOWUtOWFiNjg3ZTMxZDY1XkEyXkFqcGc@._V1_.jpg", rating: 8.5 },
    { id: 2, title: "My Girlfriend Is An Alien", poster: "src/icon/my-girlfriend-is-an-alien.jpg", rating: 7.2 },
    { id: 3, title: "The Eleven", poster: "src/icon/e.jpg", rating: 6.8 },
    { id: 4, title: "Farzi", poster: "src/icon/farzi-movie-poster.webp", rating: 8.0 },
    { id: 5, title: "The Untamed", poster: "src/icon/u.webp", rating: 7.5 },
    { id: 6, title: "The Boss Baby", poster: "src/icon/bo.jpg", rating: 6.3 },
    { id: 7, title: "Beast Games", poster: "src/icon/b.jpg", rating: 7.9 },
    { id: 8, title: "Train To Busan", poster: "src/icon/tr.jpg", rating: 8.1 },
    { id: 9, title: "Batman v Superman: Dawn Of Justice", poster: "src/icon/bat.jpg", rating: 6.5 }
  ];

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchLlmRecommendation = async () => {
    if (!searchQuery.trim()) return;

    try {
      const res = await axios.post('http://localhost:8000/api/recommend', {
        mood: searchQuery.trim()
      });
      setLlmRecommendation(res.data.movie_suggestion);
    } catch (error) {
      console.error('LLM recommendation error:', error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLlmRecommendation(null);
    await fetchLlmRecommendation();
  };

  const handleAdd = (movie) => {
    onAddToQueue(movie);
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-black/80 backdrop-blur border-cyan-600 hover:bg-cyan-900/50 text-white focus:ring-2 focus:ring-cyan-500"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Room
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Browse Movies
            </h2>
            <p className="text-gray-400 text-sm">Choose what to watch together</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search a movie or type your mood (e.g., Excited)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-2 bg-gray-900/70 border-cyan-600 text-white text-base rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </form>

      {/* LLM Recommendation Card (No Poster) */}
      {llmRecommendation && (
        <Card className="bg-gray-800 border border-cyan-600 p-5 space-y-3">
          <h3 className="text-xl font-bold text-white">{llmRecommendation.title}</h3>
          <p className="text-cyan-200 text-sm">{llmRecommendation.description}</p>
          <div className="flex justify-between text-sm text-gray-400">
            <span>⭐ {llmRecommendation.rating}</span>
            <span>📅 {llmRecommendation.year}</span>
          </div>
          <p className="text-green-400 italic">{llmRecommendation.message}</p>
          <div className="pt-2">
            <Button
              onClick={() => handleAdd({ ...llmRecommendation, id: 999 })}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              <Plus className="h-4 w-4 mr-1" /> Add to Queue
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMovies.map(movie => (
          <Card key={movie.id} className="bg-gray-800 overflow-hidden hover:scale-105 transition-all duration-300 group">
            <div className="relative">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  onClick={() => handleAdd(movie)}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
            </div>
            <div className="p-3 text-white">
              <h3 className="text-base font-semibold mb-1 line-clamp-2">{movie.title}</h3>
              <div className="flex justify-between text-sm text-gray-400">
                <span>ID: {movie.id}</span>
                <span className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{movie.rating.toFixed(1)}</span>
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredMovies.length === 0 && !llmRecommendation && (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg">No movies found</p>
          <p className="text-gray-500 text-sm mt-2">Try different keywords</p>
        </div>
      )}
    </div>
  );
};

export default BrowseContentView;
