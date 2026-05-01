import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem('pathfinder_session') || '{}');
  const initials = user.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'ST';

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Risk Assessment', path: '/risk' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Resources', path: '/resources' },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('pathfinder_session');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-8 py-4 flex justify-between items-center bg-[#0a0f1e]/95 backdrop-blur-xl border-b border-primary/20">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/dashboard')}>
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-all">◆</div>
        <span className="text-xl font-bold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">PathFinder Pro</span>
      </div>

      <nav className="hidden md:flex gap-1">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              location.pathname === item.path 
              ? 'bg-primary/20 text-white border border-primary/30' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.name}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full cursor-pointer hover:border-primary/40 transition-all">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-xs font-bold text-white shadow-inner">
            {initials}
          </div>
          <span className="text-sm font-semibold hidden lg:block">{user.fullName?.split(' ')[0]}</span>
        </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-danger/10 border border-danger/30 text-danger rounded-lg text-xs font-bold hover:bg-danger/20 transition-all">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;