import React, { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import { Search, Filter, PlayCircle, Book, Download } from 'lucide-react';

const Resources = () => {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const resources = [
    { id: 1, title: 'MIT 6.006 - Algorithms', type: 'Course', cat: 'courses', diff: 'Advanced', dur: '24h', icon: '🎓', color: 'text-primary' },
    { id: 2, title: 'Data Structures Explained', type: 'Video', cat: 'videos', diff: 'Intermediate', dur: '3h', icon: '🎥', color: 'text-danger' },
    { id: 3, title: 'Big O Cheat Sheet', type: 'Article', cat: 'articles', diff: 'Beginner', dur: '15m', icon: '📄', color: 'text-success' },
    { id: 4, title: 'LeetCode Top 150', type: 'Practice', cat: 'practice', diff: 'Intermediate', dur: '50h+', icon: '💻', color: 'text-warning' },
  ];

  const filtered = resources.filter(r => 
    (category === 'all' || r.cat === category) &&
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-8">
      <Navbar />
      <div className="starfield"></div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">📚 Learning Resources</h1>
            <p className="text-gray-500">Curated study materials tailored for your program.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 text-primary rounded-xl font-bold text-sm hover:bg-primary/20 transition-all">
             <Download size={18} /> Download PDF Guide
          </button>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
           <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" placeholder="Search resources..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:border-primary focus:outline-none transition-all"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {['all', 'courses', 'videos', 'articles', 'practice'].map(t => (
                <button 
                  key={t} onClick={() => setCategory(t)}
                  className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${category === t ? 'bg-primary/20 border-primary/40 text-primary' : 'bg-white/5 border-white/5 text-gray-500'}`}
                >
                  {t}
                </button>
              ))}
           </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {filtered.map(r => (
             <div key={r.id} className="glass p-6 group hover:-translate-y-2 transition-all">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">{r.icon}</div>
                   <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{r.type}</span>
                </div>
                <h4 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">{r.title}</h4>
                <div className="flex gap-2 mb-6">
                   <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-500 font-bold">{r.diff}</span>
                   <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-500 font-bold">{r.dur}</span>
                </div>
                <button className="w-full py-3 bg-primary text-dark font-bold text-xs rounded-lg hover:shadow-lg transition-all">
                  Start Learning →
                </button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;