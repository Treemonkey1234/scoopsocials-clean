import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const FooterNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/events', label: 'Events', icon: '📅' },
    { path: '/search', label: 'Search', icon: '🔍' },
    { path: '/friends', label: 'Friends', icon: '👥' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
      <nav className="flex justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'text-cyan-600 bg-cyan-50'
                : 'text-gray-600 hover:text-cyan-600'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </footer>
  );
};

export default FooterNav; 