import React, { useState, useEffect } from 'react';
import Navbar from '../components/shared/Navbar';
import { ShieldAlert, TrendingDown, Target, Lightbulb, Zap } from 'lucide-react';

const RiskAssessment = () => {
  const user = JSON.parse(sessionStorage.getItem('pathfinder_session') || '{}');
  
  // State for Form Inputs
  const [inputs, setInputs] = useState({
    attendance: 85,
    studyHours: 3.5,
    sgpa: 8.5,
    assignments: 90,
    failures: 0,
    activities: 'low'
  });

  const [riskScore, setRiskScore] = useState(0);
  const [simulatedExtra, setSimulatedExtra] = useState(0);

  // Logic to calculate Risk Score (Matches your original HTML logic)
  const calculateScore = (data) => {
    let risk = 0;
    risk += (100 - data.attendance) * 0.3;
    risk += Math.max(0, (4 - data.studyHours) * 6);
    risk += Math.max(0, (9 - data.sgpa) * 8);
    risk += (100 - data.assignments) * 0.15;
    risk += data.failures * 10;
    return Math.min(Math.round(risk), 100);
  };

  useEffect(() => {
    setRiskScore(calculateScore(inputs));
  }, [inputs]);

  const projectedRisk = Math.max(5, Math.round(riskScore - (simulatedExtra * 8)));

  const getRiskLevel = (score) => {
    if (score < 30) return { label: 'Low Risk', color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' };
    if (score < 60) return { label: 'Medium Risk', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' };
    return { label: 'High Risk', color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/30' };
  };

  const status = getRiskLevel(riskScore);

  return (
    <div className="min-h-screen pt-24 pb-12 px-8">
      <Navbar />
      <div className="starfield"></div>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">🎯 Risk Assessment</h1>
        <p className="text-gray-500 mb-8">Analyze your academic risk factors and get personalized recommendations.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Gauge & Status */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] text-center">
              <div className="relative w-56 h-56 mx-auto mb-6">
                {/* Custom SVG Gauge (Replicating your original look) */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="112" cy="112" r="100" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                  <circle 
                    cx="112" cy="112" r="100" fill="transparent" stroke={riskScore > 60 ? '#ff4444' : riskScore > 30 ? '#ffaa00' : '#00ff88'} 
                    strokeWidth="12" strokeDasharray="628" strokeDashoffset={628 - (628 * riskScore) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-5xl font-mono font-bold" style={{ color: riskScore > 60 ? '#ff4444' : riskScore > 30 ? '#ffaa00' : '#00ff88' }}>{riskScore}%</span>
                   <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">Risk Score</span>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border ${status.bg} ${status.color} ${status.border}`}>
                <h3 className="font-bold text-lg">{status.label}</h3>
                <p className="text-xs mt-1 opacity-80">
                  {riskScore < 30 ? "You're performing well! Keep up the good work." : "Some improvements needed. Check recommendations."}
                </p>
              </div>
            </div>

            {/* Recommendations Grid */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-[32px]">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Lightbulb className="text-warning w-4 h-4"/> Suggestions</h3>
              <div className="space-y-3">
                {inputs.attendance < 75 && (
                  <div className="p-3 bg-danger/10 border border-danger/20 rounded-xl text-xs text-danger">⚠️ Attendance below 75% threshold</div>
                )}
                {inputs.studyHours < 4 && (
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl text-xs text-primary">💡 Increase study hours to 4h+</div>
                )}
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-400">✅ Assignment completion looks good</div>
              </div>
            </div>
          </div>

          {/* Right Column: Sliders & Simulator */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px]">
              <h3 className="font-bold text-xl mb-8 flex items-center gap-2"><Zap className="text-primary w-5 h-5"/> Input Data</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Attendance Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-400">Attendance Rate</span>
                    <span className="text-primary font-mono font-bold">{inputs.attendance}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" value={inputs.attendance}
                    onChange={(e) => setInputs({...inputs, attendance: parseInt(e.target.value)})}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Study Hours Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-400">Study Hours / Day</span>
                    <span className="text-primary font-mono font-bold">{inputs.studyHours}h</span>
                  </div>
                  <input 
                    type="range" min="0" max="12" step="0.5" value={inputs.studyHours}
                    onChange={(e) => setInputs({...inputs, studyHours: parseFloat(e.target.value)})}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* SGPA Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-400">Previous SGPA</span>
                    <span className="text-primary font-mono font-bold">{inputs.sgpa}</span>
                  </div>
                  <input 
                    type="range" min="0" max="10" step="0.1" value={inputs.sgpa}
                    onChange={(e) => setInputs({...inputs, sgpa: parseFloat(e.target.value)})}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Assignments Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-400">Assignment Completion</span>
                    <span className="text-primary font-mono font-bold">{inputs.assignments}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" value={inputs.assignments}
                    onChange={(e) => setInputs({...inputs, assignments: parseInt(e.target.value)})}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            </div>

            {/* What-If Simulator Section */}
            <div className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-[32px]">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">🔄 What-If Simulator</h3>
              <p className="text-sm text-gray-400 mb-8">See how adding extra study hours reduces your academic risk.</p>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white">Projected Extra Study Hours</span>
                  <span className="px-4 py-1 bg-primary text-dark rounded-full font-bold text-sm">+{simulatedExtra} Hours</span>
                </div>
                <input 
                  type="range" min="0" max="4" step="0.5" value={simulatedExtra}
                  onChange={(e) => setSimulatedExtra(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />

                <div className="flex items-center justify-center gap-12 mt-8 py-6 bg-dark/50 rounded-2xl border border-white/5">
                   <div className="text-center">
                      <div className="text-xs text-gray-500 uppercase mb-1">Current</div>
                      <div className="text-3xl font-mono font-bold text-gray-400">{riskScore}%</div>
                   </div>
                   <TrendingDown className="text-primary w-8 h-8 animate-bounce" />
                   <div className="text-center">
                      <div className="text-xs text-primary uppercase font-bold mb-1">Projected</div>
                      <div className="text-4xl font-mono font-bold text-primary">{projectedRisk}%</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;