import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, GripVertical, Trash2, Lock, Unlock, Play } from 'lucide-react';

const QueueManagerView = ({ onBack, isAdmin = true, onStartQueue }) => {
  const [queueItems, setQueueItems] = useState([
    {
      id: 1,
      title: "The Boys",
      poster: "src/icon/MV5BMWJlN2U5MzItNjU4My00NTM2LWFjOWUtOWFiNjg3ZTMxZDY1XkEyXkFqcGc@._V1_.jpg",
      rating: 8.5,
      addedBy: "Alex",
      locked: false
    },
    {
      id: 2,
      title: "My Girlfriend Is An Alien",
      poster: "src/icon/my-girlfriend-is-an-alien.jpg",
      rating: 7.2,
      addedBy: "Sarah",
      locked: true
    },
    {
      id: 3,
      title: "The Eleven",
      poster: "src/icon/e.jpg",
      rating: 6.8,
      addedBy: "Mike",
      locked: false
    }
  ]);

  const handleRemoveItem = (itemId) => {
    setQueueItems(items => items.filter(item => item.id !== itemId));
  };

  const handleToggleLock = (itemId) => {
    setQueueItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, locked: !item.locked } : item
      )
    );
  };

  const handleStartPlayback = () => {
    if (queueItems.length > 0 && onStartQueue) {
      onStartQueue(queueItems[0]); // Send first movie
      onBack(); // Return to RoomView
    }
  };

  return (
    <div className="space-y-6 bg-black min-h-screen px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-700 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Room
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-white">
              Queue Manager
            </h2>
            <p className="text-gray-500">Organize your watch party playlist</p>
          </div>
        </div>

        {isAdmin && queueItems.length > 0 && (
          <Button
            onClick={handleStartPlayback}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 focus:ring-2 focus:ring-cyan-500"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Queue
          </Button>
        )}
      </div>

      {/* Admin Notice */}
      {!isAdmin && (
        <Card className="p-4 bg-yellow-900/30 border-yellow-600/50">
          <p className="text-yellow-300 text-center">
            Only room admins can modify the queue.
          </p>
        </Card>
      )}

      {/* Queue List */}
      <div className="space-y-4">
        {queueItems.length === 0 ? (
          <Card className="p-12 bg-gray-900/70 border-gray-700 text-center">
            <p className="text-gray-400 text-lg mb-2">Queue is empty</p>
            <p className="text-gray-500">Add movies from Browse Content to get started</p>
          </Card>
        ) : (
          queueItems.map((item, index) => (
            <Card key={item.id} className="p-4 bg-black border border-gray-800 hover:border-cyan-500 transition-all duration-200">
              <div className="flex items-center space-x-4">
                {/* Drag Handle */}
                {isAdmin && !item.locked && (
                  <div className="cursor-grab text-gray-500 hover:text-white">
                    <GripVertical className="h-5 w-5" />
                  </div>
                )}

                {/* Queue Position */}
                <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>

                {/* Poster */}
                <img
                  src={item.poster}
                  alt={item.title}
                  className="w-16 h-24 object-cover rounded border border-gray-600"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-lg">{item.title}</h3>
                  <p className="text-cyan-400 text-sm">Rating: {item.rating}</p>
                  <p className="text-gray-500 text-xs">Added by {item.addedBy}</p>
                </div>

                {/* Lock Icon Always Visible */}
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleLock(item.id)}
                    className={`${
                      item.locked
                        ? 'text-yellow-400 hover:bg-yellow-900/30'
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    {item.locked ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Footer Stats */}
      {queueItems.length > 0 && (
        <Card className="p-4 bg-black border border-gray-800 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>{queueItems.length} movie{queueItems.length !== 1 ? 's' : ''} in queue</span>
            <span>
              {queueItems.filter(item => item.locked).length} locked item{queueItems.filter(item => item.locked).length !== 1 ? 's' : ''}
            </span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default QueueManagerView;
