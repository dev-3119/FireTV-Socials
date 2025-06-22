
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Zap, Shield } from 'lucide-react';

const SocialModeToggle = ({ active, onToggle }) => {
  return (
    <Button
      onClick={onToggle}
      className={`px-6 py-3 h-auto font-semibold transition-all duration-300 ${
        active
          ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/25 scale-105'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600'
      }`}
    >
      {active ? (
        <>
          <Zap className="h-5 w-5 mr-2" />
          Social Mode
          <div className="w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse"></div>
        </>
      ) : (
        <>
          <Shield className="h-5 w-5 mr-2" />
          Go Social
        </>
      )}
    </Button>
  );
};

export default SocialModeToggle;
