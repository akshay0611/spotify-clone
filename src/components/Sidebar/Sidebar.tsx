import { Home, Search, Library, Plus, Heart } from 'lucide-react';
import { NavLink } from './NavLink';
import { PlaylistItem } from './PlaylistItem';

interface SidebarProps {
  onViewChange: (view: 'home' | 'search' | 'library') => void;
  currentView: string;
}

export function Sidebar({ onViewChange, currentView }: SidebarProps) {
  return (
    <aside className="w-64 bg-black h-screen p-6">
      <div className="text-white mb-8">
        <h1 className="text-2xl font-bold mb-8">Spotify</h1>
        <nav className="space-y-4">
          <NavLink 
            icon={<Home size={24} />} 
            text="Home" 
            active={currentView === 'home'}
            onClick={() => onViewChange('home')}
          />
          <NavLink 
            icon={<Search size={24} />} 
            text="Search" 
            active={currentView === 'search'}
            onClick={() => onViewChange('search')}
          />
          <NavLink 
            icon={<Library size={24} />} 
            text="Your Library" 
            active={currentView === 'library'}
            onClick={() => onViewChange('library')}
          />
        </nav>
      </div>
      
      <div className="mt-8">
        <button className="flex items-center text-gray-400 hover:text-white transition-colors">
          <Plus size={20} className="mr-2" />
          Create Playlist
        </button>
        <button className="flex items-center text-gray-400 hover:text-white transition-colors mt-4">
          <Heart size={20} className="mr-2" />
          Liked Songs
        </button>
      </div>

      <div className="mt-8 space-y-2">
        <PlaylistItem name="Chill Vibes" />
        <PlaylistItem name="Workout Mix" />
        <PlaylistItem name="Road Trip" />
        <PlaylistItem name="Study Session" />
      </div>
    </aside>
  );
}