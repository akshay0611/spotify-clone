import { usePlayer } from '../../context/PlayerContext';
import { GripVertical, X } from 'lucide-react';

export function QueueView() {
  const { queue, removeFromQueue } = usePlayer();

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Queue</h3>
      <div className="space-y-2">
        {queue.map((song, index) => (
          <div 
            key={song.id}
            className="flex items-center justify-between p-2 hover:bg-gray-800 rounded group"
          >
            <div className="flex items-center">
              <GripVertical size={16} className="text-gray-500 mr-2" />
              <img 
                src={song.coverUrl} 
                alt={song.title}
                className="w-10 h-10 rounded mr-3"
              />
              <div>
                <p className="font-medium">{song.title}</p>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromQueue(song.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}