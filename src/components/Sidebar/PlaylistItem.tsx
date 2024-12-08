
interface PlaylistItemProps {
  name: string;
}

export function PlaylistItem({ name }: PlaylistItemProps) {
  return (
    <a href="#" className="block text-gray-400 hover:text-white transition-colors py-1">
      {name}
    </a>
  );
}