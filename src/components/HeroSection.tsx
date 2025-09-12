import { Button } from "@/components/ui/button";
import { Heart, Compass } from "lucide-react";
import { useState } from "react";

export const HeroSection = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Space Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-black to-slate-950 -z-10" />

      {/* Earth Glow in Center */}
      <div className="absolute left-1/2 top-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-600/40 to-green-400/30 blur-3xl animate-pulse" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Tagline */}
        <div
          className="mb-12 inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-blue-400/50 shadow-lg hover:scale-105 transition-transform cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Heart className="w-5 h-5 text-blue-400" />
          <span className="text-white text-sm font-medium tracking-wide">
            Emotional Travel Intelligence • Feel-First Journey
          </span>
          <Compass className="w-4 h-4 text-teal-400 animate-pulse" />
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tight mb-8 relative">
          <style jsx>{`
            @keyframes slideInLeft {
              0% {
                opacity: 0;
                transform: translateX(-100px) rotateY(-30deg);
              }
              100% {
                opacity: 1;
                transform: translateX(0) rotateY(0deg);
              }
            }
            
            @keyframes slideInRight {
              0% {
                opacity: 0;
                transform: translateX(100px) rotateY(30deg);
              }
              100% {
                opacity: 1;
                transform: translateX(0) rotateY(0deg);
              }
            }
            
            @keyframes emotionsReveal {
              0% {
                opacity: 0;
                transform: scale(0.5) rotateX(90deg);
                filter: blur(20px);
              }
              50% {
                opacity: 0.8;
                transform: scale(1.1) rotateX(0deg);
                filter: blur(5px);
              }
              100% {
                opacity: 1;
                transform: scale(1) rotateX(0deg);
                filter: blur(0px);
              }
            }
            
            @keyframes textGlow {
              0%, 100% {
                text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
              }
              50% {
                text-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(20, 184, 166, 0.6);
              }
            }
            
            @keyframes letterFloat {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            
            .journey-word {
              display: inline-block;
              animation: slideInLeft 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
              opacity: 0;
              animation-delay: 0.3s;
            }
            
            .beyond-word {
              display: inline-block;
              animation: slideInRight 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
              opacity: 0;
              animation-delay: 0.6s;
            }
            
            .emotions-word {
              display: inline-block;
              animation: emotionsReveal 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards,
                        textGlow 3s ease-in-out infinite,
                        letterFloat 4s ease-in-out infinite;
              opacity: 0;
              animation-delay: 1.2s;
              background: linear-gradient(45deg, #3b82f6, #14b8a6, #10b981, #06b6d4);
              background-size: 300% 300%;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              position: relative;
            }
            
            .emotions-word::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(45deg, #3b82f6, #14b8a6, #10b981, #06b6d4);
              background-size: 300% 300%;
              animation: gradientShift 4s ease infinite;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              z-index: -1;
            }
            
            @keyframes gradientShift {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
            
            .word-container {
              perspective: 1000px;
              transform-style: preserve-3d;
            }
          `}</style>
          
          <div className="word-container">
            <span className="journey-word">Journey</span>
          </div>
          <br />
          <div className="word-container">
            <span className="beyond-word">Beyond</span>
          </div>
          <br />
          <div className="word-container">
            <span className="emotions-word">Emotions</span>
          </div>
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed mb-12">
          <span className="text-blue-400 font-semibold">Discover your emotional compass</span> and let your feelings
          guide you to <span className="text-teal-400 font-semibold">extraordinary destinations </span>. <br />
          Travel that <span className="text-emerald-400 font-semibold">heals, inspires & transforms</span> your soul.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-6 rounded-full shadow-lg hover:scale-105 transition-transform">
            Start Your Journey
          </Button>
          <Button
            variant="outline"
            className="border-2 border-blue-400/60 bg-white/10 text-white px-10 py-6 rounded-full hover:scale-105 transition-transform"
          >
            Discover Emotions
          </Button>
        </div>
      </div>
    </section>
  );
};    
 