import { ReactNode } from 'react';

interface NavLinkProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavLink({ icon, text, active, onClick }: NavLinkProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center w-full transition-colors ${
        active ? 'text-white' : 'text-gray-400 hover:text-white'
      }`}
    >
      <span className="mr-4">{icon}</span>
      <span className="font-medium">{text}</span>
    </button>
  );
}