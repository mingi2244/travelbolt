import { Button } from "@/components/ui/button";
import { Heart, Compass, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        .hero-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        /* Enhanced background animations */
        @keyframes floatingOrbs {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          33% { transform: translate(30px, -30px) scale(1.1); opacity: 0.8; }
          66% { transform: translate(-20px, 20px) scale(0.9); opacity: 0.7; }
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(20, 184, 166, 0.2), 0 0 60px rgba(16, 185, 129, 0.1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.5), 0 0 80px rgba(20, 184, 166, 0.4), 0 0 120px rgba(16, 185, 129, 0.3);
          }
        }
        
        /* Tagline animations */
        @keyframes slideInUp {
          0% { 
            transform: translateY(30px); 
            opacity: 0; 
          }
          100% { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        
        @keyframes iconSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Enhanced text animations - REMOVED BLUR FILTERS */
        @keyframes slideInLeft {
          0% { 
            transform: translateX(-100px); 
            opacity: 0;
          }
          100% { 
            transform: translateX(0); 
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          0% { 
            transform: translateX(100px); 
            opacity: 0;
          }
          100% { 
            transform: translateX(0); 
            opacity: 1;
          }
        }
        
        @keyframes slideInBottom {
          0% { 
            transform: translateY(60px); 
            opacity: 0;
          }
          100% { 
            transform: translateY(0); 
            opacity: 1;
          }
        }
        
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes textGlow {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(20, 184, 166, 0.4);
          }
          50% { 
            text-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(20, 184, 166, 0.6), 0 0 90px rgba(16, 185, 129, 0.4);
          }
        }
        
        @keyframes letterFloat {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-12px) rotateZ(1deg); }
        }
        
        @keyframes fadeInScale {
          0% { 
            transform: scale(0.8); 
            opacity: 0; 
          }
          100% { 
            transform: scale(1); 
            opacity: 1; 
          }
        }
        
        @keyframes buttonFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        /* Component classes */
        .tagline {
          animation: slideInUp 0.8s ease-out 0.2s both;
        }
        
        .tagline:hover .compass-icon {
          animation: iconSpin 2s linear infinite;
        }
        
        .word-journey {
          animation: slideInLeft 1s ease-out 0.6s both;
        }
        
        .word-beyond {
          animation: slideInRight 1s ease-out 1s both;
        }
        
        .word-emotions {
          animation: slideInBottom 1.2s ease-out 1.4s both;
          background: linear-gradient(-45deg, #3b82f6, #06b6d4, #10b981, #8b5cf6, #f59e0b, #3b82f6);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          /* Removed blur from gradientFlow and textGlow animations */
          animation: slideInBottom 1.2s ease-out 1.4s both, gradientFlow 4s ease-in-out 2.5s infinite, textGlow 3s ease-in-out 3s infinite;
        }
        
        .word-emotions::before {
          content: '';
          position: absolute;
          inset: -15px;
          background: linear-gradient(-45deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2), rgba(16, 185, 129, 0.2), rgba(139, 92, 246, 0.2));
          background-size: 400% 400%;
          border-radius: 30px;
          filter: blur(15px);
          z-index: -1;
          opacity: 0;
          animation: gradientFlow 4s ease-in-out 3s infinite, fadeInScale 1s ease-out 3s both;
        }
        
        .letter-float {
          display: inline-block;
          animation: letterFloat 3s ease-in-out infinite;
          transition: transform 0.3s ease;
          filter: none !important;
          -webkit-filter: none !important;
        }
        
        .letter-float:hover {
          transform: translateY(-15px) scale(1.1);
          filter: none !important;
          -webkit-filter: none !important;
        }
        
        .letter-float:nth-child(1) { animation-delay: 3.5s; }
        .letter-float:nth-child(2) { animation-delay: 3.6s; }
        .letter-float:nth-child(3) { animation-delay: 3.7s; }
        .letter-float:nth-child(4) { animation-delay: 3.8s; }
        .letter-float:nth-child(5) { animation-delay: 3.9s; }
        .letter-float:nth-child(6) { animation-delay: 4.0s; }
        .letter-float:nth-child(7) { animation-delay: 4.1s; }
        .letter-float:nth-child(8) { animation-delay: 4.2s; }
        
        .description {
          animation: fadeInScale 1s ease-out 2s both;
        }
        
        .buttons {
          animation: fadeInScale 1s ease-out 2.4s both;
        }
        
        .primary-button:hover {
          animation: buttonFloat 0.6s ease-in-out infinite;
        }
        
        .secondary-button:hover {
          animation: buttonFloat 0.6s ease-in-out infinite;
        }
        
        .floating-orb {
          animation: floatingOrbs 8s ease-in-out infinite;
        }
        
        .earth-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }
        
        .parallax-bg {
          transform: translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0);
          transition: transform 0.1s ease-out;
        }
      `}</style>

      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black via-slate-950 to-black -z-20" />
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="floating-orb absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" />
        <div className="floating-orb absolute top-3/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-teal-500/20 to-green-500/20 blur-xl" style={{animationDelay: '2s'}} />
        <div className="floating-orb absolute top-1/2 left-3/4 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl" style={{animationDelay: '4s'}} />
      </div>

      {/* Central Earth Glow */}
      <div className="parallax-bg absolute left-1/2 top-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2">
        <div className="earth-glow w-full h-full rounded-full bg-gradient-to-br from-blue-600/40 via-teal-500/30 to-green-400/30 blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="hero-container relative z-10 text-center px-6 max-w-7xl mx-auto">
        {/* Enhanced Tagline */}
        <div className="tagline mb-16 inline-flex items-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-xl rounded-full border border-blue-400/30 shadow-2xl hover:scale-105 hover:border-blue-400/60 transition-all duration-300 cursor-pointer group">
          <Heart className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
          <span className="text-white text-base font-medium tracking-wide">
            Emotional Travel Intelligence • Feel-First Journey 
          </span>
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <Compass className="compass-icon w-5 h-5 text-teal-400 group-hover:text-teal-300 transition-colors" />
          </div>
        </div>

        {/* Enhanced Heading */}
        <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tight mb-12 relative">
          <div className="word-journey text-white font-extrabold">Journey</div>
          <div className="word-beyond text-white font-extrabold mt-2">Beyond</div>
          <div className="word-emotions mt-2 relative">
            <span className="letter-float">E</span>
            <span className="letter-float">m</span>
            <span className="letter-float">o</span>
            <span className="letter-float">t</span>
            <span className="letter-float">i</span>
            <span className="letter-float">o</span>
            <span className="letter-float">n</span>
            <span className="letter-float">s</span>
          </div>
        </div>

        {/* Enhanced Description */}
        <div className="description max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed mb-16 space-y-2">
          <p>
            <span className="text-blue-400 font-semibold">Discover your emotional compass</span> and let your feelings
            guide you to <span className="text-teal-400 font-semibold">extraordinary destinations</span>.
          </p>
          <p className="text-lg">
            Travel that <span className="text-emerald-400 font-semibold">heals, inspires & transforms</span> your soul.
          </p>
        </div>

        {/* Enhanced Buttons */}
        <div className="buttons flex flex-col sm:flex-row gap-6 justify-center">
          <Button className="primary-button bg-gradient-to-r from-blue-600 via-blue-500 to-teal-600 text-white px-12 py-6 text-lg rounded-full shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 border-0 font-semibold">
            Start Your Journey
          </Button>
          <Button className="secondary-button border-2 border-blue-400/50 bg-white/5 backdrop-blur-sm text-white px-12 py-6 text-lg rounded-full hover:bg-white/10 hover:border-blue-400/80 hover:scale-105 transition-all duration-300 font-semibold">
            Discover Emotions
          </Button>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
};