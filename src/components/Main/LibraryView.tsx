import { useState } from 'react';
import { Clock, Play, Search, Filter, Heart } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { songs } from '../../data/songs';

export function LibraryView() {
  const [filterView, setFilterView] = useState<'all' | 'playlists' | 'artists' | 'albums'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(10);

  const {
    setCurrentSong,
    addToQueue,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = usePlayer();

  // Filter and search logic
  const getFilteredSongs = () => {
    let filtered = songs;
    if (filterView !== 'all') {
      filtered = songs.filter((song) => song[filterView]?.toLowerCase());
    }
    return filtered.filter(
      (song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.album.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredSongs = getFilteredSongs();
  const paginatedSongs = filteredSongs.slice(
    (currentPage - 1) * songsPerPage,
    currentPage * songsPerPage
  );

  const handlePlay = (song) => setCurrentSong(song);

  const toggleFavorite = (e, song) => {
    e.stopPropagation();
    if (isFavorite(song.id)) {
      removeFromFavorites(song.id);
    } else {
      addToFavorites(song);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Your Library</h1>
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search in Library"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <button className="p-2 hover:bg-gray-800 rounded-full">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-6">
        {['all', 'playlists', 'artists', 'albums'].map((view) => (
          <button
            key={view}
            onClick={() => setFilterView(view as any)}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              filterView === view ? 'bg-white text-black' : 'hover:bg-gray-800'
            }`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      {/* Songs Table */}
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 border-b border-gray-800">
            <th className="text-left pb-3 pl-4">#</th>
            <th className="text-left pb-3">Title</th>
            <th className="text-left pb-3">Album</th>
            <th className="text-left pb-3">Date Added</th>
            <th className="text-right pb-3 pr-4">
              <Clock size={16} />
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedSongs.map((song, index) => (
            <tr
              key={song.id}
              className="group hover:bg-gray-800 cursor-pointer"
              onClick={() => handlePlay(song)}
            >
              <td className="py-4 pl-4 w-12">
                <span className="group-hover:hidden">
                  {(currentPage - 1) * songsPerPage + index + 1}
                </span>
                <Play size={16} className="hidden group-hover:block" />
              </td>
              <td className="py-4">
                <div className="flex items-center">
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-10 h-10 mr-4"
                  />
                  <div>
                    <div className="font-medium">{song.title}</div>
                    <div className="text-sm text-gray-400">{song.artist}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 text-gray-400">{song.album}</td>
              <td className="py-4 text-gray-400">{song.dateAdded}</td>
              <td className="py-4 pr-4 text-gray-400 text-right">
                <div className="flex items-center justify-end space-x-4">
                  <button
                    onClick={(e) => toggleFavorite(e, song)}
                    className={`opacity-0 group-hover:opacity-100 transition-all ${
                      isFavorite(song.id) ? 'text-green-500' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Heart
                      size={16}
                      fill={isFavorite(song.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToQueue(song);
                    }}
                    className="opacity-0 group-hover:opacity-100 hover:text-white"
                  >
                    Add to queue
                  </button>
                  <span>{song.duration}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  {/* Pagination Controls */}
  <div className="flex justify-between items-center mt-6">
     <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    className="px-4 py-2 bg-gray-600 rounded-full text-sm text-white hover:bg-gray-500 disabled:opacity-50"
    >
    Previous
    </button>
    <span className="text-sm text-gray-400">
    Page {currentPage} of {totalPages}
    </span>
    <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    className="px-4 py-2 bg-gray-600 rounded-full text-sm text-white hover:bg-gray-500 disabled:opacity-50"
    >
    Next
    </button>
  </div>

  </div>
  );
}
