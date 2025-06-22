
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerContent = [
    {
      id: 1,
      title: "My Girlfriend Is An Alien",
      description: "Chai Xiao Qi and Fang Leng, two souls destined to be together, are on the cusp of their happily ever after. After all the trials and challenges they've faced, their wedding day has finally arrived.",
      backgroundImage: "src/icon/0.avif",
      logo: "My Girlfriend Is An Alien",
      rating: "IMDb 8.2",
      year: "2025"
    },
    {
      id: 2,
      title: "Attack on Titan",
      description: "The Colossal Titan's sudden appearance shattered humankind's peace and their reveries. Ever since that day, Eren Jaeger has faced endless fighting… Yet, there is no time for Eren or humankind to rest. The next battle already looms near. How will humanity stand up to the horde of Titans approaching Wall Rose?! ©Hajime Isayama, Kodansha/“ATTACK ON TITAN” Production Committee. All Rights Reserved.",
      backgroundImage: "src/icon/Attack-on-Titan-Season-2-new-Poster.avif",
      logo: "Attack on Titan",
      rating: "IMDb 9.1",
      year: "2017"
    },
    {
      id: 3,
      title: "John Wick",
      description: "John Wick (Keanu Reeves) uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
      backgroundImage: "src/icon/jo.webp",
      logo: "John Wick",
      rating: "IMDb 7.6", 
      year: "2023"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerContent.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentContent = bannerContent[currentSlide];

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${currentContent.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-8">
        <div className="max-w-2xl space-y-4">
          {/* Show Logo/Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white tracking-wider">
              {currentContent.logo}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <span className="px-2 py-1 bg-gray-700 rounded text-xs font-medium">
                {currentContent.rating}
              </span>
              <span>{currentContent.year}</span>
              <span>Prime Video Original</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-200 leading-relaxed max-w-xl">
            {currentContent.description}
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold">
              <Play className="h-5 w-5 mr-2 fill-current" />
              Watch Now
            </Button>
            <Button variant="outline" className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold">
              <Info className="h-5 w-5 mr-2" />
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-8 flex space-x-2">
        {bannerContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + bannerContent.length) % bannerContent.length)}
          className="bg-black/50 border-gray-600 text-white hover:bg-black/70"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerContent.length)}
          className="bg-black/50 border-gray-600 text-white hover:bg-black/70"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default HeroBanner;
