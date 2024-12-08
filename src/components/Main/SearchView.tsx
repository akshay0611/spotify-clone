import { useState } from 'react';
import { Search } from 'lucide-react';

export function SearchView() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-6">
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white rounded-full text-black focus:outline-none"
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Browse All</h2>
        <div className="grid grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg p-4 relative overflow-hidden cursor-pointer"
              style={{ backgroundColor: category.color }}
            >
              <h3 className="text-2xl font-bold">{category.name}</h3>
              <img
                src={category.imageUrl}
                alt={category.name}
                className="absolute bottom-0 right-0 w-32 h-32 transform rotate-25 translate-x-4 translate-y-4"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const categories = [
  {
    name: 'Pop',
    color: '#FF4632',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300'
  },
  {
    name: 'Hip-Hop',
    color: '#AF2896',
    imageUrl: 'https://images.unsplash.com/photo-1571609803939-54f463c5d629?w=300'
  },
  {
    name: 'Rock',
    color: '#E8115B',
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300'
  },
  {
    name: 'Indie',
    color: '#148A08',
    imageUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=300'
  },
  {
    name: 'Chill',
    color: '#477D95',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300'
  }
];