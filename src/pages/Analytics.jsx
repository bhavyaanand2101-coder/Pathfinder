import React from 'react';
import Navbar from '../components/shared/Navbar';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { TrendingUp, Calendar, Target, Clock, Award } from 'lucide-react';

ChartJS.register(...registerables);

const Analytics = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#a0b0d0', font: { size: 10 } } } },
    scales: { 
      y: { grid: { color: '#ffffff08' }, ticks: { color: '#6b7a9a' } },
      x: { grid: { display: false }, ticks: { color: '#6b7a9a' } },
      r: { grid: { color: '#ffffff10' }, angleLines: { color: '#ffffff10' }, ticks: { display: false } }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-8">
      <Navbar />
      <div className="starfield"></div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">📊 Analytics Dashboard</h1>
        <p className="text-gray-500 mb-8 font-medium">Detailed insights into your academic performance and trends.</p>

        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Risk Improvement', val: '15%', trend: '↓ 12% from last month', color: 'text-success' },
            { label: 'Study Consistency', val: '78%', trend: '↑ 8% improvement', color: 'text-primary' },
            { label: 'Average Grade', val: '8.5', trend: '↑ 0.5 points', color: 'text-success' },
            { label: 'Class Rank', val: '#12', trend: '↑ 5 positions', color: 'text-primary' }
          ].map((m, i) => (
            <div key={i} className="glass p-6 text-center group hover:border-primary/30 transition-all">
              <div className={`text-4xl font-mono font-bold mb-1 ${m.color}`}>{m.val}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{m.label}</div>
              <div className="text-[9px] text-success mt-2 font-bold">{m.trend}</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="glass p-8 h-[400px]">
             <h3 className="text-sm font-bold mb-6 flex items-center gap-2"><TrendingUp size={16} className="text-primary"/> Performance Trend</h3>
             <Line options={chartOptions} data={{ labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Current'], datasets: [{ label: 'SGPA', data: [7.2, 7.5, 7.8, 8.1, 8.3, 8.5], borderColor: '#00d4ff', backgroundColor: 'rgba(0, 212, 255, 0.1)', fill: true, tension: 0.4 }] }} />
          </div>

          <div className="glass p-8 h-[400px]">
             <h3 className="text-sm font-bold mb-6 flex items-center gap-2"><Calendar size={16} className="text-success"/> Attendance Analysis</h3>
             <Bar options={chartOptions} data={{ labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], datasets: [{ label: 'Present', data: [100, 100, 85, 100, 90], backgroundColor: '#00ff88' }, { label: 'Absent', data: [0, 0, 15, 0, 10], backgroundColor: '#ff4444' }] }} />
          </div>

          <div className="glass p-8 h-[400px]">
             <h3 className="text-sm font-bold mb-6 flex items-center gap-2"><Target size={16} className="text-warning"/> Risk Factor Breakdown</h3>
             <Doughnut options={{...chartOptions, cutout: '70%'}} data={{ labels: ['Attendance', 'Study', 'Grades', 'Assignments'], datasets: [{ data: [25, 20, 30, 25], backgroundColor: ['#00d4ff', '#00ff88', '#ffaa00', '#ff4444'], borderWidth: 0 }] }} />
          </div>

          <div className="glass p-8 h-[400px]">
             <h3 className="text-sm font-bold mb-6 flex items-center gap-2"><Clock size={16} className="text-secondary"/> Study Hours Distribution</h3>
             <Radar options={chartOptions} data={{ labels: ['Morning', 'Afternoon', 'Evening', 'Night', 'Late'], datasets: [{ label: 'Hours', data: [1, 0.5, 3, 2, 0.5], borderColor: '#00d4ff', backgroundColor: 'rgba(0, 212, 255, 0.2)' }] }} />
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="glass p-8">
           <h3 className="font-bold mb-6">🤖 AI-Powered Performance Insights</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Upward Trend', desc: 'Your SGPA has improved by 0.8 points over the last 3 semesters.', icon: '📈', color: 'border-l-success' },
                { title: 'Attendance Alert', desc: 'Your attendance dropped 5% this month. Set reminders.', icon: '⚠️', color: 'border-l-warning' }
              ].map((ins, i) => (
                <div key={i} className={`p-4 bg-white/5 border-l-4 ${ins.color} rounded-xl flex items-start gap-4`}>
                   <div className="text-2xl mt-1">{ins.icon}</div>
                   <div>
                      <div className="font-bold text-sm">{ins.title}</div>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{ins.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;