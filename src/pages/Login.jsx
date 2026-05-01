import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDemoLogin = (name, email, degree) => {
    setLoading(true);
    setTimeout(() => {
      const user = {
        fullName: name,
        email: email,
        studentId: '2024' + Math.floor(Math.random() * 10000),
        degreeType: degree,
        year: '2'
      };
      sessionStorage.setItem('pathfinder_session', JSON.stringify(user));
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0a0f1e]/80 backdrop-blur-2xl border border-primary/20 rounded-[32px] p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 text-white">
            ◆
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            PathFinder Pro
          </h2>
          <p className="text-gray-500 text-sm mt-1">AI-Powered Academic Risk Assessment</p>
        </div>

        <div className="flex gap-2 p-1 bg-white/5 rounded-xl mb-6">
          <button 
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'login' ? 'bg-primary/20 text-white border border-primary/30' : 'text-gray-500'}`}
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </button>
          <button 
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'register' ? 'bg-primary/20 text-white border border-primary/30' : 'text-gray-500'}`}
            onClick={() => setActiveTab('register')}
          >
            Sign Up
          </button>
        </div>

        <form className="space-y-4 mb-8">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Email Address</label>
            <input type="email" placeholder="student@university.edu" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Password</label>
            <input type="password" placeholder="Enter password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all" />
          </div>
          <button type="button" className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-white hover:scale-[1.02] transition-all">
            {loading ? 'Authenticating...' : (activeTab === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">OR</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        <div className="space-y-2 p-4 bg-primary/5 border border-primary/10 rounded-2xl">
          <h4 className="text-[10px] text-primary font-bold uppercase tracking-widest text-center mb-3">Quick Login (Demo)</h4>
          <button onClick={() => handleDemoLogin('Alex Johnson', 'alex@univ.edu', 'btech')} className="w-full text-left p-3 rounded-lg bg-white/5 border border-white/5 text-xs hover:bg-primary/10 transition-all">
            <strong className="text-primary">Alex Johnson</strong> - B.Tech Student
          </button>
          <button onClick={() => handleDemoLogin('Sarah Chen', 'sarah@univ.edu', 'mba')} className="w-full text-left p-3 rounded-lg bg-white/5 border border-white/5 text-xs hover:bg-primary/10 transition-all">
            <strong className="text-primary">Sarah Chen</strong> - MBA Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;