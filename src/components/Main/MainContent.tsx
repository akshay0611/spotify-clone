import { PlayCircle, Heart } from 'lucide-react';

export function MainContent() {
  const playlists = [
    {
      title: "Today's Top Hits",
      description: "The biggest hits right now",
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop"
    },
    {
      title: "Peaceful Piano",
      description: "Relax and indulge with beautiful piano pieces",
      imageUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop"
    },
    {
      title: "Deep Focus",
      description: "Keep calm and focus with this music",
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop"
    },
    {
      title: "Indie Mix",
      description: "The best indie tracks you need to hear",
      imageUrl: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=300&h=300&fit=crop"
    }
  ];

  return (
    <main className="flex-1 bg-gradient-to-b from-blue-900 to-black text-white p-8 overflow-auto">
      <div className="flex items-center mb-8">
        <img 
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop"
          alt="Featured Playlist"
          className="w-60 h-60 shadow-lg"
        />
        <div className="ml-6">
          <p className="text-sm font-bold uppercase">Playlist</p>
          <h1 className="text-8xl font-bold mt-2 mb-6">Daily Mix</h1>
          <p className="text-gray-300">Your personal mixtape of fresh music. Enjoy new music and deep cuts picked for you. Updates daily.</p>
          <div className="mt-6 flex items-center space-x-4">
            <button className="bg-green-500 text-black rounded-full px-8 py-3 font-bold hover:bg-green-400 flex items-center">
              <PlayCircle className="mr-2" />
              Play
            </button>
            <button className="text-white hover:text-green-400">
              <Heart size={32} />
            </button>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Made for You</h2>
        <div className="grid grid-cols-4 gap-6">
          {playlists.map((playlist, index) => (
            <div key={index} className="bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors">
              <img 
                src={playlist.imageUrl}
                alt={playlist.title}
                className="w-full aspect-square object-cover rounded-md mb-4"
              />
              <h3 className="font-bold mb-2">{playlist.title}</h3>
              <p className="text-gray-400 text-sm">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}