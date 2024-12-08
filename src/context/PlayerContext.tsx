import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Song } from '../types';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { usePlayHistory } from '../hooks/usePlayHistory';
import { useFavorites } from '../hooks/useFavorites';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  queue: Song[];
  repeat: 'off' | 'all' | 'one';
  shuffle: boolean;
  favorites: Song[];
  playHistory: Song[];
  setCurrentSong: (song: Song) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  skipNext: () => void;
  skipPrevious: () => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  addToFavorites: (song: Song) => void;
  removeFromFavorites: (songId: string) => void;
  isFavorite: (songId: string) => boolean;
  clearHistory: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [queue, setQueue] = useState<Song[]>([]);
  const [repeat, setRepeat] = useState<'off' | 'all' | 'one'>('off');
  const [shuffle, setShuffle] = useState(false);
  
  const {
    currentTime,
    duration,
    play,
    pause,
    seek,
    setVolume: setAudioVolume,
  } = useAudioPlayer();

  const { history: playHistory, addToHistory, clearHistory } = usePlayHistory();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleSetCurrentSong = useCallback((song: Song) => {
    setCurrentSong(song);
    addToHistory(song);
    play(song);
    setIsPlaying(true);
  }, [addToHistory, play]);

  const togglePlay = useCallback(() => {
    if (currentSong) {
      if (isPlaying) {
        pause();
      } else {
        play(currentSong);
      }
      setIsPlaying(!isPlaying);
    }
  }, [currentSong, isPlaying, play, pause]);

  const handleSetVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    setAudioVolume(newVolume);
  }, [setAudioVolume]);

  const addToQueue = useCallback((song: Song) => {
    setQueue(prev => [...prev, song]);
  }, []);

  const removeFromQueue = useCallback((songId: string) => {
    setQueue(prev => prev.filter(song => song.id !== songId));
  }, []);

  const getNextSong = useCallback(() => {
    if (queue.length > 0) {
      return queue[0];
    }
    return null;
  }, [queue]);

  const skipNext = useCallback(() => {
    const nextSong = getNextSong();
    if (nextSong) {
      handleSetCurrentSong(nextSong);
      setQueue(prev => prev.slice(1));
    }
  }, [getNextSong, handleSetCurrentSong]);

  const skipPrevious = useCallback(() => {
    if (playHistory.length > 1) {
      handleSetCurrentSong(playHistory[1]);
    }
  }, [playHistory, handleSetCurrentSong]);

  const toggleRepeat = useCallback(() => {
    setRepeat(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  }, []);

  const toggleShuffle = useCallback(() => {
    setShuffle(prev => !prev);
  }, []);

  return (
    <PlayerContext.Provider 
      value={{ 
        currentSong,
        isPlaying,
        volume,
        currentTime,
        duration,
        queue,
        repeat,
        shuffle,
        favorites,
        playHistory,
        setCurrentSong: handleSetCurrentSong,
        togglePlay,
        setVolume: handleSetVolume,
        seek,
        addToQueue,
        removeFromQueue,
        skipNext,
        skipPrevious,
        toggleRepeat,
        toggleShuffle,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearHistory
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}