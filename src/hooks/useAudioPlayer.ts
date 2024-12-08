import { useState, useEffect, useRef } from 'react';
import { Song } from '../types';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio();
    
    const audio = audioRef.current;
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsReady(true);
    }
  };

  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const play = (song: Song) => {
    if (audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.play();
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const setVolume = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  return {
    currentTime,
    duration,
    isReady,
    play,
    pause,
    seek,
    setVolume,
  };
}