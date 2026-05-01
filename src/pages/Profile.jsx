import React, { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import { Radar } from 'react-chartjs-2';
import { User, Settings, Award, History, Edit3, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const user = JSON.parse(sessionStorage.getItem('pathfinder_session') || '{}');

  const skillsData = {
    labels: ['Technical', 'Analytical', 'Communication', 'Leadership', 'Creativity', 'Time Mgmt'],
    datasets: [{
      label: 'Your Skills',
      data: [85, 78, 72, 65, 80, 88],
      borderColor: '#00d4ff',
      backgroundColor: 'rgba(0, 212, 255, 0.2)',
      borderWidth: 2
    }]
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-8">
      <Navbar />
      <div className="starfield"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
           <div className="glass p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center text-5xl font-bold border-4 border-white/10 shadow-2xl relative group">
                 {user.fullName?.[0]}
                 <div className="absolute inset-0 bg-dark/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <Edit3 size={24} />
                 </div>
              </div>
              <h2 className="text-2xl font-bold">{user.fullName}</h2>
              <p className="text-gray-500 text-sm mb-6">{user.email}</p>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">
                <ShieldCheck size={12} /> {user.degreeType} Student
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5">
                 <div className="text-center">
                    <div className="text-xl font-bold font-mono">12d</div>
                    <div className="text-[10px] text-gray-600 uppercase font-bold">Streak</div>
                 </div>
                 <div className="text-center">
                    <div className="text-xl font-bold font-mono">15</div>
                    <div className="text-[10px] text-gray-600 uppercase font-bold">Badges</div>
                 </div>
              </div>
           </div>

           <div className="glass p-6 h-[300px]">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Skill Progress</h4>
              <Radar data={skillsData} options={{ responsive: true, maintainAspectRatio: false, scales: { r: { grid: { color: '#ffffff10' }, angleLines: { color: '#ffffff10' }, pointLabels: { color: '#6b7a9a' }, ticks: { display: false } } } }} />
           </div>
        </div>

        {/* Content Tabs */}
        <div className="lg:col-span-2 space-y-6">
           <div className="glass p-2 flex gap-1">
              {[
                { id: 'overview', icon: <User size={16}/>, label: 'Overview' },
                { id: 'badges', icon: <Award size={16}/>, label: 'Badges' },
                { id: 'activity', icon: <History size={16}/>, label: 'Activity' },
                { id: 'settings', icon: <Settings size={16}/>, label: 'Settings' }
              ].map(t => (
                <button 
                  key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === t.id ? 'bg-primary/20 text-white border border-primary/30' : 'text-gray-500 hover:text-white'}`}
                >
                  {t.icon} <span className="hidden sm:inline">{t.label}</span>
                </button>
              ))}
           </div>

           <div className="glass p-8 min-h-[500px]">
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-fadeInUp">
                   <div className="grid grid-cols-2 gap-8">
                      <div>
                         <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-2">Student ID</label>
                         <p className="text-sm font-semibold">{user.studentId || 'Not Set'}</p>
                      </div>
                      <div>
                         <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-2">Year of Study</label>
                         <p className="text-sm font-semibold">{user.year || '1'}st Year</p>
                      </div>
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block mb-2">Academic Bio</label>
                      <p className="text-sm text-gray-400 leading-relaxed italic">"Enthusiastic {user.degreeType} student focused on improving academic metrics and mastering new skills."</p>
                   </div>
                </div>
              )}
              {activeTab === 'badges' && (
                <div className="grid grid-cols-4 gap-4 animate-fadeInUp">
                   {['🔥', '🏆', '📚', '⭐', '💎', '🚀'].map((b, i) => (
                      <div key={i} className="aspect-square glass bg-white/5 flex flex-col items-center justify-center gap-2 group hover:border-primary/40 transition-all cursor-pointer">
                         <div className="text-3xl group-hover:scale-125 transition-transform">{b}</div>
                         <div className="text-[9px] text-gray-600 font-bold uppercase">Locked</div>
                      </div>
                   ))}
                </div>
              )}
              {activeTab === 'activity' && (
                 <div className="space-y-6 animate-fadeInUp">
                    {[
                      { t: 'Risk Assessment Completed', time: '2h ago', status: 'success' },
                      { t: 'New Badge: Quick Learner', time: '5h ago', status: 'primary' },
                      { t: 'Profile Details Updated', time: '1d ago', status: 'warning' }
                    ].map((a, i) => (
                      <div key={i} className="flex gap-4 items-center p-4 bg-white/5 rounded-2xl border-l-2 border-primary">
                         <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs">✨</div>
                         <div>
                            <div className="text-sm font-bold">{a.t}</div>
                            <div className="text-[10px] text-gray-500 uppercase">{a.time}</div>
                         </div>
                      </div>
                    ))}
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;