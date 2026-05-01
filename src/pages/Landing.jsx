import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <div className="text-center mb-12 animate-fadeInUp">
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center text-5xl mx-auto mb-6 animate-logo-pulse text-white shadow-lg">
          ◆
        </div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent tracking-tighter mb-4">
          PathFinder Pro
        </h1>
        <p className="text-xl text-gray-400 max-w-lg mx-auto leading-relaxed">
          AI-powered academic risk assessment and personalized learning paths to help you succeed in your academic journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-12 animate-fadeInUp [animation-delay:300ms]">
        {[
          { icon: '🎯', title: 'Risk Assessment', desc: 'AI-powered analysis of your academic risk factors with personalized insights.' },
          { icon: '🗺️', title: 'Learning Roadmap', desc: 'Personalized study plans tailored to your degree program and goals.' },
          { icon: '📊', title: 'Analytics', desc: 'Track your progress with detailed analytics and performance insights.' }
        ].map((feature, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-primary/20 p-6 rounded-2xl text-center hover:-translate-y-2 transition-all">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
            <p className="text-xs text-gray-500">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 animate-fadeInUp [animation-delay:600ms]">
        <button 
          onClick={() => navigate('/login')}
          className="px-10 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center gap-2"
        >
          Get Started →
        </button>
        <button className="px-10 py-4 bg-white/5 border border-white/20 rounded-xl font-bold hover:bg-white/10 transition-all">
          ▶ Watch Demo
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-12 px-8 py-4 bg-dark/90 border border-primary/20 rounded-full backdrop-blur-xl animate-fadeInUp [animation-delay:900ms] hidden md:flex">
        {[
          { val: '5K+', label: 'Students' },
          { val: '92%', label: 'Success' },
          { val: '50+', label: 'Resources' },
          { val: '24/7', label: 'AI Support' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-primary font-bold text-xl">{stat.val}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;