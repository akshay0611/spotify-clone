import { useState, useEffect } from 'react';
import { Song } from '../types';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Song[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (song: Song) => {
    setFavorites(prev => [...prev, song]);
  };

  const removeFromFavorites = (songId: string) => {
    setFavorites(prev => prev.filter(song => song.id !== songId));
  };

  const isFavorite = (songId: string) => {
    return favorites.some(song => song.id === songId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
}