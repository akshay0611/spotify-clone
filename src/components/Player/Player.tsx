import { PlayerControls } from './PlayerControls';
import { VolumeControl } from './VolumeControl';
import { usePlayer } from '../../context/PlayerContext';

export function Player() {
  const { currentSong } = usePlayer();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-95 text-white p-4 border-t border-gray-800">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center w-1/3">
          {currentSong ? (
            <>
              <img 
                src={currentSong.coverUrl}
                alt={`${currentSong.title} cover`}
                className="w-14 h-14 rounded"
              />
              <div className="ml-4">
                <h4 className="text-sm font-medium">{currentSong.title}</h4>
                <p className="text-xs text-gray-400">{currentSong.artist}</p>
              </div>
            </>
          ) : (
            <div className="text-gray-400 text-sm">No track selected</div>
          )}
        </div>

        <div className="w-1/3">
          <PlayerControls />
        </div>

        <div className="w-1/3 flex justify-end">
          <VolumeControl />
        </div>
      </div>
    </div>
  );
}