export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  audioUrl: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  songs: Song[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  imageUrl: string;
}