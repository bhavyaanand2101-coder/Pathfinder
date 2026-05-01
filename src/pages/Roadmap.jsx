import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/shared/Navbar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Book, BarChart2, Map, ChevronDown, ChevronUp, Link as LinkIcon, CheckCircle2, PlayCircle, Circle } from 'lucide-react';
import { SUBJECTS_DB } from '../data/subjects'; // We will create this file next

ChartJS.register(...registerables);

const Roadmap = () => {
  const user = JSON.parse(sessionStorage.getItem('pathfinder_session') || '{"degreeType": "btech"}');
  const [activeView, setActiveView] = useState('subjects');
  const [activeSemester, setActiveSemester] = useState(1);
  const [expandedSubject, setExpandedSubject] = useState(null);

  const currentSubjects = SUBJECTS_DB[user.degreeType]?.[activeSemester] || [];
  const availableSemesters = Object.keys(SUBJECTS_DB[user.degreeType] || {}).map(Number);

  // Utility logic for Risk Badges
  const getRisk = (sub) => {
    const score = sub.grade * 0.6 + sub.attendance * 0.4;
    if (score >= 80) return { label: 'Low Risk', cls: 'bg-success/20 text-success border-success/30' };
    if (score >= 70) return { label: 'Medium', cls: 'bg-warning/20 text-warning border-warning/30' };
    return { label: 'High Risk', cls: 'bg-danger/20 text-danger border-danger/30' };
  };

  const getProgressColor = (v) => {
    if (v >= 80) return 'bg-gradient-to-r from-success to-primary';
    if (v >= 70) return 'bg-gradient-to-r from-primary to-secondary';
    return 'bg-gradient-to-r from-warning to-danger';
  };

  // Chart Data for Full Analysis View
  const chartData = {
    labels: currentSubjects.map(s => s.code),
    datasets: [
      {
        label: 'Grade %',
        data: currentSubjects.map(s => s.grade),
        backgroundColor: 'rgba(0, 212, 255, 0.6)',
        borderRadius: 8,
      },
      {
        label: 'Attendance %',
        data: currentSubjects.map(s => s.attendance),
        backgroundColor: 'rgba(112, 0, 255, 0.4)',
        borderRadius: 8,
      }
    ]
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-8">
      <Navbar />
      <div className="starfield"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header & View Switcher */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">🗺️ Learning Roadmap</h1>
            <p className="text-gray-500 mt-1 uppercase text-xs tracking-widest font-bold">
              {user.degreeType.toUpperCase()} • SEMESTER {activeSemester}
            </p>
          </div>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {[
              { id: 'subjects', icon: <Book size={16}/>, label: 'Subjects' },
              { id: 'fullanalysis', icon: <BarChart2 size={16}/>, label: 'Analysis' },
              { id: 'timeline', icon: <Map size={16}/>, label: 'Recovery' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeView === tab.id ? 'bg-primary text-dark shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-white'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Semester Selector */}
        <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-8 flex items-center gap-4 overflow-x-auto">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-2">Semester:</span>
          {availableSemesters.map(sem => (
            <button
              key={sem}
              onClick={() => {setActiveSemester(sem); setExpandedSubject(null);}}
              className={`px-6 py-2 rounded-xl text-sm font-bold border transition-all whitespace-nowrap ${activeSemester === sem ? 'border-primary/50 bg-primary/10 text-primary' : 'border-transparent text-gray-500 hover:text-white'}`}
            >
              Sem {sem}
            </button>
          ))}
        </div>

        {/* --- VIEW: SUBJECTS --- */}
        {activeView === 'subjects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentSubjects.map((sub) => (
              <div 
                key={sub.code} 
                className={`glass p-6 cursor-pointer transition-all border-l-4 ${expandedSubject === sub.code ? 'border-l-primary' : 'border-l-transparent'}`}
                onClick={() => setExpandedSubject(expandedSubject === sub.code ? null : sub.code)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-white">{sub.name}</h3>
                    <p className="text-[10px] font-mono text-gray-500 mt-1">{sub.code} • {sub.credits} Credits</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getRisk(sub).cls}`}>
                    {getRisk(sub).label}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Progress Bars */}
                  <div>
                    <div className="flex justify-between text-[10px] text-gray-500 mb-1.5 uppercase font-bold tracking-wider">
                      <span>Current Grade</span>
                      <span className="text-white">{sub.grade}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-1000 ${getProgressColor(sub.grade)}`} style={{ width: `${sub.grade}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] text-gray-500 mb-1.5 uppercase font-bold tracking-wider">
                      <span>Attendance</span>
                      <span className="text-white">{sub.attendance}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-1000 ${getProgressColor(sub.attendance)}`} style={{ width: `${sub.attendance}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Expanded Section */}
                {expandedSubject === sub.code && (
                  <div className="mt-8 pt-6 border-t border-white/10 space-y-6 animate-fadeInUp">
                    <div>
                      <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4">📋 Recovery Roadmap</h4>
                      <div className="space-y-4">
                        {sub.roadmap.map((step, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="mt-1">
                              {step.status === 'done' ? <CheckCircle2 size={16} className="text-success" /> : step.status === 'active' ? <PlayCircle size={16} className="text-warning" /> : <Circle size={16} className="text-gray-600" />}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white mb-0.5">{step.title} • {step.duration}</p>
                              <p className="text-[10px] text-gray-500 leading-relaxed">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                      <p className="text-[10px] font-bold text-primary uppercase mb-2">🤖 AI Advice</p>
                      <p className="text-[11px] text-gray-300 leading-relaxed italic">"{sub.recommendation}"</p>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between items-center">
                  <span className="text-[10px] text-gray-600 font-bold uppercase">Professor: {sub.professor.split(' ').pop()}</span>
                  <button className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                    {expandedSubject === sub.code ? <ChevronUp size={14}/> : <ChevronDown size={14}/>} {expandedSubject === sub.code ? 'Less' : 'More'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- VIEW: FULL ANALYSIS --- */}
        {activeView === 'fullanalysis' && (
          <div className="space-y-8 animate-fadeInUp">
            <div className="p-8 glass h-[450px]">
              <h3 className="font-bold text-lg mb-8">📈 Semester Performance Overview</h3>
              <div className="h-80">
                <Bar data={chartData} options={{ maintainAspectRatio: false, scales: { y: { grid: { color: '#ffffff08' }, ticks: { color: '#6b7a9a' } }, x: { grid: { display: false }, ticks: { color: '#6b7a9a' } } } }} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 glass text-center">
                <div className="text-3xl font-mono font-bold text-primary mb-1">8.25</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold">Est. SGPA</div>
              </div>
              <div className="p-6 glass text-center">
                <div className="text-3xl font-mono font-bold text-success mb-1">82%</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold">Avg Attendance</div>
              </div>
              <div className="p-6 glass text-center">
                <div className="text-3xl font-mono font-bold text-danger mb-1">1</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold">At-Risk Subjects</div>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW: RECOVERY TIMELINE --- */}
        {activeView === 'timeline' && (
          <div className="glass p-10 max-w-4xl mx-auto animate-fadeInUp">
            <div className="relative border-l-2 border-primary/20 pl-10 ml-4 space-y-12">
              {[
                { title: 'Phase 1: Immediate Intervention', dur: 'Week 1-2', status: 'Active', desc: 'Focus on subjects with < 75% attendance. Meet professors for extra assignments.', color: 'bg-danger' },
                { title: 'Phase 2: Concept Strengthening', dur: 'Week 3-5', status: 'Pending', desc: 'Complete mid-term revision modules and clear backlogs in core theory.', color: 'bg-warning' },
                { title: 'Phase 3: Pre-Exam Intensive', dur: 'Week 6-8', status: 'Pending', desc: 'Solve past 5 year question papers. Participate in group study sessions.', color: 'bg-primary' },
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[51px] top-0 w-5 h-5 rounded-full border-4 border-dark ${step.color} shadow-[0_0_15px_rgba(0,212,255,0.5)]`}></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white">{step.title}</h3>
                    <span className="text-[10px] font-bold text-gray-500">{step.dur}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;