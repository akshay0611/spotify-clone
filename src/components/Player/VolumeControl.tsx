import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export function VolumeControl() {
  const { volume, setVolume } = usePlayer();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-24 accent-white"
      />
    </div>
  );
}