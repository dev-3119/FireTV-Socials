import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import NavigationBar from '@/components/NavigationBar';
import EnhancedSocialNavigation from '@/components/EnhancedSocialNavigation';
import UpcomingEventsRow from '@/components/UpcomingEventsRow';
import RoomView from '@/components/RoomView';
import ClubView from '@/components/ClubView';
import PlaybackView from '@/components/PlaybackView';
import PrivacySettings from '@/components/PrivacySettings';
import ProfileSelector from '@/components/ProfileSelector';
import EnhancedRoomsView from '@/components/EnhancedRoomsView';
import EnhancedClubsView from '@/components/EnhancedClubsView';
import EnhancedMessagesView from '@/components/EnhancedMessagesView';
import EnhancedContactsView from '@/components/EnhancedContactsView';
import EnhancedScheduleView from '@/components/EnhancedScheduleView';
import InstallAppsView from '@/components/InstallAppsView';
import LiveTVView from '@/components/LiveTVView';
import EnhancedSearchView from '@/components/EnhancedSearchView';

const Index = () => {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [socialModeActive, setSocialModeActive] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [activeRoom, setActiveRoom] = useState(null);
  const [activeClub, setActiveClub] = useState(null);
  const [isInPlayback, setIsInPlayback] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);

  const handleProfileSelect = (profile) => {
    console.log('Profile selected:', profile);
    setCurrentProfile(profile);
  };

  const handleToggleSocialMode = () => {
    console.log('Toggling Social Mode:', !socialModeActive);
    const newSocialMode = !socialModeActive;
    setSocialModeActive(newSocialMode);
    
    if (!newSocialMode) {
      // When turning off Social Mode, return to private mode home
      setCurrentView('home');
      setActiveRoom(null);
      setActiveClub(null);
      setIsInPlayback(false);
      setChatVisible(false);
    } else {
      // When activating Social Mode, default to rooms view
      setCurrentView('rooms');
    }
  };

  const handleViewChange = (view) => {
    console.log('Changing view to:', view);
    setCurrentView(view);
    setActiveRoom(null);
    setActiveClub(null);
  };

  const handleJoinRoom = (room) => {
    console.log('Joining room:', room);
    setActiveRoom(room);
    setCurrentView('room');
  };

  const handleJoinClub = (club) => {
    console.log('Joining club:', club);
    setActiveClub(club);
    setCurrentView('club');
  };

  const handleStartPlayback = (content) => {
    console.log('Starting playback:', content);
    setIsInPlayback(true);
    setChatVisible(false);
  };

  const handleBackToHome = () => {
    console.log('Returning to home');
    if (socialModeActive) {
      if (currentView === 'room' || currentView === 'club') {
        // Go back to the appropriate feed
        setCurrentView(currentView === 'room' ? 'rooms' : 'clubs');
      } else {
        setCurrentView('rooms');
      }
    } else {
      setCurrentView('home');
    }
    setActiveRoom(null);
    setActiveClub(null);
    setIsInPlayback(false);
    setChatVisible(false);
  };

  const handleExitPlayback = () => {
    setIsInPlayback(false);
    setChatVisible(false);
  };

  const handleToggleChat = () => {
    setChatVisible(!chatVisible);
  };

  const handleOpenSettings = () => {
    setShowPrivacySettings(true);
  };

  const handleCreateRoom = (name) => {
    handleJoinRoom({ id: Date.now(), name, isOwner: true, members: 1 });
  };

  // Show profile selector if no profile is selected
  if (!currentProfile) {
    return <ProfileSelector onProfileSelect={handleProfileSelect} />;
  }

  if (isInPlayback) {
    return (
      <PlaybackView
        activeRoom={activeRoom}
        activeClub={activeClub}
        chatVisible={chatVisible}
        onToggleChat={handleToggleChat}
        onExitPlayback={handleExitPlayback}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Banner - Only show in Private Mode */}
      {!socialModeActive && <HeroBanner />}
      
      {/* Navigation - Different based on Social Mode */}
      {socialModeActive ? (
        <EnhancedSocialNavigation 
          currentView={currentView}
          onViewChange={handleViewChange}
          onOpenSettings={handleOpenSettings}
          onToggleSocialMode={handleToggleSocialMode}
        />
      ) : (
        <NavigationBar 
          socialModeActive={socialModeActive}
          onToggleSocialMode={handleToggleSocialMode}
          currentView={currentView}
          onViewChange={handleViewChange}
        />
      )}

      {/* Back Button for Deep Views */}
      {(currentView === 'room' || currentView === 'club') && currentView !== 'Browse Content' && currentView !== 'Queue Manager' && (
  <div className="fixed top-[7.8rem] left-6 z-40">
    <Button
      onClick={handleBackToHome}
      variant="outline"
      className="bg-black/70 backdrop-blur border-gray-600 hover:bg-gray-800 text-white shadow-md rounded-xl"
    >
      <ArrowLeft className="h-5 w-5 mr-2" />
      Back
    </Button>
  </div>
)}





      {/* Content Area */}
      <div className="px-8 py-6">
        {currentView === 'home' ? (
          <div className="space-y-8">
            {/* Upcoming Events Row - Always visible in Private Mode */}
            <UpcomingEventsRow 
              onJoinRoom={handleJoinRoom}
              onJoinClub={handleJoinClub}
            />

            {/* Standard Fire TV Content Rows */}
            <div className="space-y-6">
              <ContentRow 
                title="Continue Watching"
                items={continueWatchingItems}
              />
              <ContentRow 
                title="Amazon Originals"
                items={amazonOriginalsItems}
              />
              <ContentRow 
                title="Recently Added Movies"
                items={recentMoviesItems}
              />
            </div>
          </div>
        ) : currentView === 'search' ? (
          <EnhancedSearchView />
        ) : currentView === 'live-tv' ? (
          <LiveTVView />
        ) : currentView === 'install-apps' ? (
          <InstallAppsView />
        ) : currentView === 'rooms' ? (
          <EnhancedRoomsView 
            activeRoom={activeRoom}
            onJoinRoom={handleJoinRoom}
            onCreateRoom={handleCreateRoom}
            onStartPlayback={handleStartPlayback}
            onBack={handleBackToHome}
          />
        ) : currentView === 'clubs' ? (
          <EnhancedClubsView 
            activeClub={activeClub}
            onJoinClub={handleJoinClub}
            onStartPlayback={handleStartPlayback}
            onBack={handleBackToHome}
          />
        ) : currentView === 'messages' ? (
          <EnhancedMessagesView 
            onJoinRoom={handleJoinRoom}
            onJoinClub={handleJoinClub}
          />
        ) : currentView === 'contacts' ? (
          <EnhancedContactsView />
        ) : currentView === 'schedule' ? (
          <EnhancedScheduleView 
            onJoinRoom={handleJoinRoom}
            onJoinClub={handleJoinClub}
          />
        ) : currentView === 'room' ? (
          <RoomView 
            activeRoom={activeRoom}
            onJoinRoom={handleJoinRoom}
            onCreateRoom={handleCreateRoom}
            onStartPlayback={handleStartPlayback}
          />
        ) : currentView === 'club' ? (
          <ClubView 
            activeClub={activeClub}
            onJoinClub={handleJoinClub}
            onStartPlayback={handleStartPlayback}
          />
        ) : null}
      </div>

      {/* Privacy Settings Modal */}
      <PrivacySettings 
        isOpen={showPrivacySettings}
        onClose={() => setShowPrivacySettings(false)}
      />
    </div>
  );
};

// Sample content data
const continueWatchingItems = [
  {
    id: 1,
    title: "The Boys",
    poster: "src/icon/MV5BMWJlN2U5MzItNjU4My00NTM2LWFjOWUtOWFiNjg3ZTMxZDY1XkEyXkFqcGc@._V1_.jpg",
    progress: 65
  },
  {
    id: 2,
    title: "My Girlfriend Is An Alien",
    poster: "src/icon/my-girlfriend-is-an-alien.jpg",
    progress: 90
  },
  {
    id: 3,
    title: "The Eleven",
    poster: "src/icon/e.jpg",
    progress: 50
  },
  {
    id: 4,
    title: "Farzi",
    poster: "src/icon/farzi-movie-poster.webp",
    progress: 23
  },
  {
    id: 5,
    title: "The Untamed",
    poster: "src/icon/u.webp",
    progress: 60
  },
  {
    id: 6,
    title: "The Boss Baby",
    poster: "src/icon/bo.jpg",
    progress: 99
  },
  {
    id: 7,
    title: "Beast Games",
    poster: "src/icon/b.jpg",
    progress: 85
  },
  {
    id: 8,
    title: "Train To Busan",
    poster: "src/icon/tr.jpg",
    progress: 70
  },
  {
    id: 9,
    title: "Batman v Superman: Dawn Of Justice",
    poster: "src/icon/bat.jpg",
    progress: 20
  }
];

const amazonOriginalsItems = [
  {
    id: 10,
    title: "The Wheel of Time",
    poster: "src/icon/w.avif"
  },
  {
    id: 11,
    title: "Suzhal - The Vortex",
    poster: "src/icon/v.jpg"
  },
  {
    id: 12,
    title: "Gen V",
    poster: "src/icon/gen.jpg"
  },
  {
    id: 13,
    title: "Maradona, Blessed Dream",
    poster: "src/icon/Maradona-_Blessed_Dream.jpeg"
  },
  {
    id: 14,
    title: "Citadel",
    poster: "src/icon/c.jpg"
  },
  {
    id: 15,
    title: "The Peripheral",
    poster: "src/icon/the.jpg"
  },
  {
    id: 16,
    title: "Fallout",
    poster: "src/icon/Fallout_(2024_TV_series).jpg"
  },
  {
    id: 17,
    title: "Batman: Caped Crusader",
    poster: "src/icon/batman-caped-crusader-poster.jpg"
  },
  {
    id: 18,
    title: "Mr. & Mrs. Smith",
    poster: "src/icon/image_6adc39ff.jpeg"
  }
];

const recentMoviesItems = [
  {
    id: 19,
    title: "The Amazing Spider-Man",
    poster: "src/icon/The_Amazing_Spider-Man_(film)_poster.jpg"
  },
  {
    id: 20,
    title: "Dune",
    poster: "src/icon/Dune_(2021_film).jpg"
  },
  {
    id: 21,
    title: "Spider-Man: No Way Home",
    poster: "src/icon/sp.jpg"
  },
  {
    id: 22,
    title: "MISSION: IMPOSSIBLE",
    poster: "src/icon/mi.jpg"
  },
  {
    id: 23,
    title: "Men in Black",
    poster: "src/icon/mib.jpg"
  },
  {
    id: 24,
    title: "Flight Risk",
    poster: "src/icon/f.jpg"
  },
  {
    id: 25,
    title: "Plane",
    poster: "src/icon/pl.jpg"
  },
  {
    id: 26,
    title: "Parallel",
    poster: "src/icon/p17236750_v_v8_aa.jpg"
  },
  {
    id: 27,
    title: "The Monkey",
    poster: "src/icon/mon.avif"
  }
];

const ContentRow = ({ title, items }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-white">{title}</h2>
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {items.map((item) => (
        <Card key={item.id} className="flex-shrink-0 w-48 bg-gray-900 border-gray-800 overflow-hidden hover:scale-105 transition-transform cursor-pointer">
          <div className="relative">
            <img 
              src={item.poster} 
              alt={item.title}
              className="w-full h-72 object-cover"
            />
            {item.progress && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <div 
                    className="bg-blue-500 h-1 rounded-full" 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-300 mt-1">{item.progress}% watched</p>
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="text-sm font-medium text-white truncate">{item.title}</h3>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export default Index;
