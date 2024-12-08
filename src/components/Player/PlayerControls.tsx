import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Repeat1, Shuffle } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { formatTime } from '../../utils/formatTime';

export function PlayerControls() {
  const { 
    isPlaying, 
    togglePlay, 
    currentTime, 
    duration,
    seek,
    skipNext,
    skipPrevious,
    repeat,
    shuffle,
    toggleRepeat,
    toggleShuffle
  } = usePlayer();

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    seek(time);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-6">
        <button 
          onClick={toggleShuffle}
          className={`${shuffle ? 'text-green-500' : 'text-gray-400'} hover:text-white transition-colors`}
        >
          <Shuffle size={20} />
        </button>
        <button 
          onClick={skipPrevious}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <SkipBack size={20} />
        </button>
        <button 
          onClick={togglePlay}
          className="bg-white text-black rounded-full p-2 hover:scale-105 transition"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} fill="black" />}
        </button>
        <button 
          onClick={skipNext}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <SkipForward size={20} />
        </button>
        <button 
          onClick={toggleRepeat}
          className={`${repeat !== 'off' ? 'text-green-500' : 'text-gray-400'} hover:text-white transition-colors`}
        >
          {repeat === 'one' ? <Repeat1 size={20} /> : <Repeat size={20} />}
        </button>
      </div>
      <div className="w-full mt-2 flex items-center">
        <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="mx-2 flex-1 h-1 bg-gray-600 rounded-full accent-white hover:accent-green-500"
        />
        <span className="text-xs text-gray-400">{formatTime(duration)}</span>
      </div>
    </div>
  );
}