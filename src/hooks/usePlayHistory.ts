import { useState, useEffect } from 'react';
import { Song } from '../types';

export function usePlayHistory() {
  const [history, setHistory] = useState<Song[]>(() => {
    const saved = localStorage.getItem('playHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('playHistory', JSON.stringify(history));
  }, [history]);

  const addToHistory = (song: Song) => {
    setHistory(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [song, ...filtered].slice(0, 50);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addToHistory,
    clearHistory
  };
}