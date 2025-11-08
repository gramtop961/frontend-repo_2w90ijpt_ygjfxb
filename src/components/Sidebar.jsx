import React from 'react';
import { Home, Briefcase, BarChart2, User, LogOut } from 'lucide-react';

const items = [
  { key: 'jobs', label: 'Job Posted', icon: <Briefcase size={18} /> },
  { key: 'profile', label: 'Profile', icon: <User size={18} /> },
  { key: 'analysis', label: 'Customer Analysis', icon: <BarChart2 size={18} /> },
];

export default function Sidebar({ current, onChange, onLogout }) {
  return (
    <aside className="w-64 shrink-0 h-full border-r bg-white/70 backdrop-blur">
      <div className="p-6 flex items-center gap-2 font-semibold text-gray-900">
        <Home className="text-blue-600" size={20} />
        <span>Careers Admin</span>
      </div>
      <nav className="px-3 space-y-1">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
              current === item.key
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="px-3 mt-6">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
