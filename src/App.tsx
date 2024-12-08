import { useState } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Player } from './components/Player/Player';
import { MainContent } from './components/Main/MainContent';
import { SearchView } from './components/Main/SearchView';
import { LibraryView } from './components/Main/LibraryView';
import { PlayerProvider } from './context/PlayerContext';

type View = 'home' | 'search' | 'library';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const renderView = () => {
    switch (currentView) {
      case 'search':
        return <SearchView />;
      case 'library':
        return <LibraryView />;
      default:
        return <MainContent />;
    }
  };

  return (
    <PlayerProvider>
      <div className="flex h-screen bg-black">
        <Sidebar onViewChange={setCurrentView} currentView={currentView} />
        <div className="flex-1 flex flex-col">
          {renderView()}
          <Player />
        </div>
      </div>
    </PlayerProvider>
  );
}

export default App;