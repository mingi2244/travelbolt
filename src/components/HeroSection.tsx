import { Button } from "@/components/ui/button";
import { Heart, Compass } from "lucide-react";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const phases = [0, 1, 2, 3];
    let currentPhase = 0;
    
    const interval = setInterval(() => {
      currentPhase = (currentPhase + 1) % phases.length;
      setAnimationPhase(currentPhase);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      <style jsx>{`
        @keyframes float-up {
          0% { transform: translateY(100px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-in-left {
          0% { transform: translateX(-100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slide-in-right {
          0% { transform: translateX(100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes scale-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(20, 184, 166, 0.4); }
        }
        
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { text-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 40px rgba(20, 184, 166, 0.6); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(150px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
        }
        
        @keyframes orbit-reverse {
          0% { transform: rotate(0deg) translateX(200px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(200px) rotate(360deg); }
        }
        
        @keyframes floating-particles {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          33% { transform: translateY(-20px) translateX(10px); opacity: 1; }
          66% { transform: translateY(-10px) translateX(-15px); opacity: 0.8; }
        }
        
        @keyframes wave-motion {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(20px) scaleY(1.1); }
        }
        
        .animate-float-up { animation: float-up 1s ease-out forwards; }
        .animate-slide-in-left { animation: slide-in-left 1s ease-out forwards; }
        .animate-slide-in-right { animation: slide-in-right 1s ease-out forwards; }
        .animate-scale-in { animation: scale-in 1s ease-out forwards; }
        .animate-glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 4s ease-in-out infinite; }
        .animate-orbit { animation: orbit 20s linear infinite; }
        .animate-orbit-reverse { animation: orbit-reverse 25s linear infinite; }
        .animate-floating-particles { animation: floating-particles 6s ease-in-out infinite; }
        .animate-wave-motion { animation: wave-motion 8s ease-in-out infinite; }
        
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-1200 { animation-delay: 1.2s; }
      `}</style>

      {/* Background Space Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-black to-slate-950 -z-10" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-5">
        {/* Floating Particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/60 rounded-full animate-floating-particles"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Orbiting Elements */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-orbit">
            <div className="w-3 h-3 bg-teal-400/80 rounded-full shadow-lg"></div>
          </div>
        </div>
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-orbit-reverse">
            <div className="w-2 h-2 bg-purple-400/80 rounded-full shadow-lg"></div>
          </div>
        </div>
        
        {/* Wave Motion Lines */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-wave-motion"
              style={{
                top: `${20 + i * 15}%`,
                left: '10%',
                right: '10%',
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>
      {/* Earth Glow in Center */}
      <div className="absolute left-1/2 top-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-600/40 to-green-400/30 blur-3xl animate-pulse">
        {/* Additional glow layers for depth */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-teal-500/30 to-purple-400/20 blur-2xl animate-glow-pulse" />
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-400/40 to-green-300/30 blur-xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Tagline */}
        <div
          className="mb-12 inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-blue-400/50 shadow-lg hover:scale-105 transition-transform cursor-pointer animate-scale-in animate-glow-pulse"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Heart className="w-5 h-5 text-blue-400 animate-pulse" />
          <span className="text-white text-sm font-medium tracking-wide">
            Emotional Travel Intelligence • Feel-First Journey
          </span>
          <Compass className="w-4 h-4 text-teal-400 animate-spin" style={{ animationDuration: '8s' }} />
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tight mb-8 opacity-0 animate-float-up delay-200">
          <span className="inline-block animate-slide-in-left delay-400">Journey</span> <br /> 
          <span className="inline-block animate-slide-in-right delay-600">Beyond</span> <br />
          <span className="bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 bg-clip-text text-transparent animate-text-glow inline-block animate-scale-in delay-800">
            Emotions
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed mb-12 opacity-0 animate-float-up delay-1000">
          <span className="text-blue-400 font-semibold">Discover your emotional compass</span> and let your feelings
          guide you to <span className="text-teal-400 font-semibold">extraordinary destinations </span>. <br />
          Travel that <span className="text-emerald-400 font-semibold">heals, inspires & transforms</span> your soul.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 opacity-0 animate-float-up delay-1200">
          <Button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-6 rounded-full shadow-lg hover:scale-105 transition-transform animate-glow-pulse hover:shadow-2xl">
            Start Your Journey
          </Button>
          <Button
            variant="outline"
            className="border-2 border-blue-400/60 bg-white/10 text-white px-10 py-6 rounded-full hover:scale-105 transition-transform hover:bg-white/20 hover:border-blue-400/80"
          >
            Discover Emotions
          </Button>
        </div>
        
        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-float-up delay-1200">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs font-medium tracking-wide">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dynamic Background Shapes */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        {/* Morphing Shapes */}
        <div 
          className={`absolute transition-all duration-4000 ease-in-out ${
            animationPhase === 0 ? 'top-1/4 left-1/4 w-32 h-32' :
            animationPhase === 1 ? 'top-3/4 right-1/4 w-24 h-24' :
            animationPhase === 2 ? 'top-1/2 left-3/4 w-40 h-40' :
            'top-1/3 right-1/3 w-28 h-28'
          }`}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />
        </div>
        
        <div 
          className={`absolute transition-all duration-4000 ease-in-out delay-1000 ${
            animationPhase === 0 ? 'top-3/4 right-1/4 w-20 h-20' :
            animationPhase === 1 ? 'top-1/4 left-1/3 w-36 h-36' :
            animationPhase === 2 ? 'top-2/3 left-1/4 w-24 h-24' :
            'top-1/4 right-1/2 w-32 h-32'
          }`}
        >
          <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
        </div>
        
        {/* Traveling Icons */}
        <div className="absolute top-1/4 left-0 animate-orbit" style={{ animationDuration: '30s' }}>
          <div className="text-2xl opacity-60">✈️</div>
        </div>
        
        <div className="absolute top-1/2 right-0 animate-orbit-reverse" style={{ animationDuration: '35s' }}>
          <div className="text-xl opacity-60">🗺️</div>
        </div>
        
        <div className="absolute bottom-1/4 left-1/4 animate-orbit" style={{ animationDuration: '40s' }}>
          <div className="text-lg opacity-60">🧳</div>
        </div>
        
        {/* Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          
          {/* Animated connecting lines */}
          <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" />
          <line x1="70%" y1="20%" x2="30%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <line x1="10%" y1="60%" x2="90%" y2="40%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Connection nodes */}
          <circle cx="20%" cy="30%" r="3" fill="#3B82F6" className="animate-pulse" />
          <circle cx="80%" cy="70%" r="3" fill="#14B8A6" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="70%" cy="20%" r="3" fill="#10B981" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="30%" cy="80%" r="3" fill="#8B5CF6" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
        </svg>
      </div>
    </section>
  );
};    
 