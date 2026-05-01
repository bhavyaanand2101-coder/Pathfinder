import React, { useState, useEffect } from 'react';
import Navbar from '../components/shared/Navbar';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { LayoutDashboard, Target, BookOpen, Clock, Zap } from 'lucide-react';

ChartJS.register(...registerables);

const Dashboard = () => {
  const user = JSON.parse(sessionStorage.getItem('pathfinder_session') || '{}');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const stats = [
    { label: 'Attendance Rate', value: '85%', trend: '+5.2%', icon: '📊', color: 'primary' },
    { label: 'Current SGPA', value: '8.5', trend: '+2.1%', icon: '🎯', color: 'success' },
    { label: 'Study Hours/Day', value: '3.5h', trend: '-1.5%', icon: '📚', color: 'warning' },
    { label: 'Risk Score', value: '35%', trend: '-5%', icon: '⚡', color: 'danger' },
  ];

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Study Hours',
      data: [2, 3.5, 4, 2.5, 5, 3, 4.5],
      borderColor: '#00d4ff',
      backgroundColor: 'rgba(0, 212, 255, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  if (loading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-dark text-primary">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
      <p className="animate-pulse">Loading Dashboard...</p>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-8">
      <Navbar />
      <div className="starfield"></div>

      <div className="max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="mb-8 p-10 rounded-[32px] border border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden group">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2 tracking-tight">Welcome back, {user.fullName?.split(' ')[0]}! 👋</h1>
            <p className="text-gray-400 text-lg">Your academic performance is currently stable. Check your Roadmap for improvements.</p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/10 to-transparent"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-primary/40 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="text-2xl">{s.icon}</div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${s.trend.includes('+') ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                  {s.trend}
                </span>
              </div>
              <div className="text-3xl font-mono font-bold text-white">{s.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2"><LayoutDashboard className="text-primary w-5 h-5"/> Performance Trends</h3>
                <div className="flex gap-2">
                  {['Week', 'Month', 'Semester'].map(f => (
                    <button key={f} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${f === 'Week' ? 'bg-primary/20 text-white border border-primary/30' : 'text-gray-500'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-[300px]">
                <Line data={chartData} options={{ maintainAspectRatio: false, scales: { y: { grid: { color: '#ffffff08' }, ticks: { color: '#6b7a9a' } }, x: { grid: { display: false }, ticks: { color: '#6b7a9a' } } } }} />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: 'Assess Risk', icon: <Target />, color: 'primary' },
                { name: 'Roadmap', icon: <Clock />, color: 'secondary' },
                { name: 'Resources', icon: <BookOpen />, color: 'success' },
                { name: 'Sync Data', icon: <Zap />, color: 'warning' },
              ].map((act, i) => (
                <button key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-3 hover:bg-white/10 hover:border-primary/40 transition-all">
                  <div className={`text-${act.color}`}>{act.icon}</div>
                  <span className="text-xs font-bold">{act.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
             {/* Risk Meter Card */}
             <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                   <div className="absolute inset-0 rounded-full border-[8px] border-white/5"></div>
                   <div className="absolute inset-0 rounded-full border-[8px] border-primary border-t-transparent animate-spin-slow"></div>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-mono font-bold text-primary">35%</span>
                   </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Medium Risk</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Some attention needed in Math & Physics. Check your roadmap for recovery steps.</p>
                <button className="w-full mt-6 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold hover:shadow-lg transition-all">Improve Now</button>
             </div>

             {/* Recent Activity */}
             <div className="p-8 bg-white/5 border border-white/10 rounded-[32px]">
                <h3 className="font-bold mb-6">Recent Activity</h3>
                <div className="space-y-6">
                   {[
                     { title: 'Risk Updated', time: '2h ago', icon: '📊', color: 'success' },
                     { title: 'Resource Done', time: '5h ago', icon: '📚', color: 'primary' },
                     { title: 'Streak! 7 Days', time: '1d ago', icon: '🔥', color: 'warning' },
                   ].map((act, i) => (
                     <div key={i} className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">{act.icon}</div>
                        <div className="flex-1">
                           <div className="text-sm font-bold">{act.title}</div>
                           <div className="text-[10px] text-gray-500">{act.time}</div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;