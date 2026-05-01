import React from 'react';

const Background = () => {
  return (
    <>
      {/* The animated Starfield */}
      <div className="starfield"></div>

      {/* Floating Particles (Matching your original 30 particles) */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-primary rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 10}s infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

// THIS IS THE MISSING LINE:
export default Background;