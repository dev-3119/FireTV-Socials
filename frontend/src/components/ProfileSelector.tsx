import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Lock } from 'lucide-react';

const ProfileSelector = ({ onProfileSelect }) => {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "John",
      avatar: "src/icon/WOFT_2021_PVProfileImageCircle_256x256_Mat_Red.png",
      hasPin: true
    },
    {
      id: 2,
      name: "Sara",
      avatar: "src/icon/THBY_2022_PVProfileImageCircle_256x256_Starlight_LightBlue._CB1652369063_.png",
      hasPin: true
    },
    {
      id: 3,
      name: "Kids",
      avatar: "src/icon/INVI_2021_PVProfileImageCircle_256x256_Invincible_LightBlue.png",
      hasPin: false
    }
  ]);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [pin, setPin] = useState('');
  const [showPinEntry, setShowPinEntry] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newHasPin, setNewHasPin] = useState(false);

  const DEFAULT_PIN = "1234";

  const handleProfileClick = (profile) => {
    if (profile.hasPin) {
      setSelectedProfile(profile);
      setShowPinEntry(true);
    } else {
      onProfileSelect(profile);
    }
  };

  const handlePinSubmit = () => {
    if (pin === DEFAULT_PIN) {
      setErrorMessage('');
      onProfileSelect(selectedProfile);
    } else {
      setErrorMessage('Invalid PIN. Please try again.');
    }
  };

  const handleAddProfile = () => {
    if (!newProfileName.trim()) return;

    const newProfile = {
      id: Date.now(),
      name: newProfileName,
      avatar: "src/icon/WOFT_2021_PVProfileImageCircle_256x256_Mat_Red.png", // default avatar
      hasPin: newHasPin
    };

    setProfiles([...profiles, newProfile]);
    setNewProfileName('');
    setNewHasPin(false);
    setShowAddForm(false);
  };

  if (showPinEntry) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="p-8 bg-gray-900 border-gray-700 max-w-md w-full">
          <div className="text-center mb-6">
            <img 
              src={selectedProfile.avatar} 
              alt={selectedProfile.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-white mb-2">{selectedProfile.name}</h2>
            <p className="text-gray-400">Enter your PIN to continue</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePinSubmit()}
                className="text-center text-2xl tracking-widest bg-gray-800 border-gray-600 text-white"
                maxLength={6}
              />
              {errorMessage && (
                <p className="text-sm text-red-500 text-center">{errorMessage}</p>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={handlePinSubmit}
                disabled={pin.length < 4}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                <Lock className="h-4 w-4 mr-2" />
                Unlock
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setShowPinEntry(false);
                  setSelectedProfile(null);
                  setPin('');
                  setErrorMessage('');
                }}
                className="flex-1 border-gray-600 text-gray-300"
              >
                Back
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-4xl w-full px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Fire TV</h1>
          <p className="text-xl text-gray-400">Who's watching?</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {profiles.map((profile) => (
            <Card 
              key={profile.id}
              className="p-8 bg-gray-900/50 border-gray-700 hover:bg-gray-900/70 transition-all duration-300 cursor-pointer hover:scale-105 text-center"
              onClick={() => handleProfileClick(profile)}
            >
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">{profile.name}</h3>
              {profile.hasPin && (
                <div className="flex items-center justify-center text-gray-400">
                  <Lock className="h-4 w-4 mr-1" />
                  <span className="text-sm">Protected</span>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Add Profile Section */}
        <div className="text-center mt-8 space-y-4">
          {!showAddForm ? (
            <Button
              variant="outline"
              className="border-gray-600 text-black-300"
              onClick={() => setShowAddForm(true)}
            >
              <User className="h-4 w-4 mr-2" />
              Add Profile
            </Button>
          ) : (
            <Card className="p-6 bg-gray-900 border-gray-700 max-w-lg mx-auto">
              <h2 className="text-xl text-white mb-4">Create New Profile</h2>
              <Input
                placeholder="Profile name"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                className="mb-3 bg-gray-800 border-gray-600 text-white"
              />
              <label className="flex items-center space-x-2 mb-4 text-gray-300">
                <input
                  type="checkbox"
                  checked={newHasPin}
                  onChange={(e) => setNewHasPin(e.target.checked)}
                />
                <span>Require PIN</span>
              </label>
              <div className="flex space-x-3 justify-center">
                <Button onClick={handleAddProfile} className="bg-green-600 hover:bg-green-700">
                  Add
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewProfileName('');
                    setNewHasPin(false);
                  }}
                  className="border-gray-600 text-black-300"
                >
                  Cancel
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSelector;
