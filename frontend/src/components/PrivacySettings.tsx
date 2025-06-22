
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Settings, Eye, Users, MessageCircle, Camera, Clock, Shield } from 'lucide-react';

const PrivacySettings = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    onlinePresenceVisible: true,
    activityVisibility: 'everyone', // 'everyone', 'contacts', 'none'
    allowInvitations: 'all', // 'all', 'contacts', 'off'
    moodDetection: 'reactions', // 'camera', 'reactions', 'off'
    chatExpiry: '7d', // '24h', '7d', 'manual'
    syncPermissions: true,
    mobileVideoCam: 'ask' // 'always', 'ask', 'never'
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-gray-900 border-gray-700 p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Privacy & Social Settings</h2>
          </div>
          <Button onClick={onClose} variant="ghost" className="text-gray-400 hover:text-white">
            ✕
          </Button>
        </div>

        <div className="space-y-6">
          {/* Online Presence */}
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Eye className="h-5 w-5 text-green-400" />
              <div>
                <h3 className="text-white font-medium">Online Presence Visibility</h3>
                <p className="text-sm text-gray-400">Show when you're active on Fire TV</p>
              </div>
            </div>
            <Switch 
              checked={settings.onlinePresenceVisible}
              onCheckedChange={(checked) => updateSetting('onlinePresenceVisible', checked)}
            />
          </div>

          {/* Activity Visibility */}
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="h-5 w-5 text-blue-400" />
              <div>
                <h3 className="text-white font-medium">Show Current Room/Club Activity</h3>
                <p className="text-sm text-gray-400">Control who can see what you're watching</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {[
                { value: 'everyone', label: 'Everyone' },
                { value: 'contacts', label: 'Contacts Only' },
                { value: 'none', label: 'No One' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={settings.activityVisibility === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting('activityVisibility', option.value)}
                  className={settings.activityVisibility === option.value ? 
                    'bg-blue-600 text-white' : 'border-gray-600 text-gray-300'}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Invitation Settings */}
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <MessageCircle className="h-5 w-5 text-purple-400" />
              <div>
                <h3 className="text-white font-medium">Allow Invitations</h3>
                <p className="text-sm text-gray-400">Who can invite you to Rooms and Clubs</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {[
                { value: 'all', label: 'All Users' },
                { value: 'contacts', label: 'Contacts Only' },
                { value: 'off', label: 'Off' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={settings.allowInvitations === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting('allowInvitations', option.value)}
                  className={settings.allowInvitations === option.value ? 
                    'bg-purple-600 text-white' : 'border-gray-600 text-gray-300'}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Mood Detection */}
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Camera className="h-5 w-5 text-yellow-400" />
              <div>
                <h3 className="text-white font-medium">Enable Mood Detection</h3>
                <p className="text-sm text-gray-400">How to capture your reactions during content</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {[
                { value: 'camera', label: 'Camera' },
                { value: 'reactions', label: 'Reactions Only' },
                { value: 'off', label: 'Off' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={settings.moodDetection === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting('moodDetection', option.value)}
                  className={settings.moodDetection === option.value ? 
                    'bg-yellow-600 text-white' : 'border-gray-600 text-gray-300'}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Expiry */}
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="h-5 w-5 text-orange-400" />
              <div>
                <h3 className="text-white font-medium">Auto-expire Chat Logs</h3>
                <p className="text-sm text-gray-400">Automatically delete old messages</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {[
                { value: '24h', label: 'After 24h' },
                { value: '7d', label: '7 Days' },
                { value: 'manual', label: 'Manual' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={settings.chatExpiry === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting('chatExpiry', option.value)}
                  className={settings.chatExpiry === option.value ? 
                    'bg-orange-600 text-white' : 'border-gray-600 text-gray-300'}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Sync Permissions */}
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-cyan-400 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded"></div>
              </div>
              <div>
                <h3 className="text-white font-medium">Control Sync Permissions</h3>
                <p className="text-sm text-gray-400">Allow others to sync playback with you</p>
              </div>
            </div>
            <Switch 
              checked={settings.syncPermissions}
              onCheckedChange={(checked) => updateSetting('syncPermissions', checked)}
            />
          </div>

          {/* Mobile Video Cam */}
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Camera className="h-5 w-5 text-red-400" />
              <div>
                <h3 className="text-white font-medium">Enable Mobile Video Cam in Rooms</h3>
                <p className="text-sm text-gray-400">Video sharing during Room sessions</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {[
                { value: 'always', label: 'Always' },
                { value: 'ask', label: 'Ask Each Time' },
                { value: 'never', label: 'Never' }
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={settings.mobileVideoCam === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting('mobileVideoCam', option.value)}
                  className={settings.mobileVideoCam === option.value ? 
                    'bg-red-600 text-white' : 'border-gray-600 text-gray-300'}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-700">
          <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-300">
            Cancel
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PrivacySettings;
