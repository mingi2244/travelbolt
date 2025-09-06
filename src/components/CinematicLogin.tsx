import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, User, Mail, Lock, Plane, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface LoginProps {
  onLoginSuccess?: (user: any) => void;
}

export const CinematicLogin: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [animationPhase, setAnimationPhase] = useState('loading');
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize particles and animations
  useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);

    // Animation sequence
    const timer1 = setTimeout(() => setAnimationPhase('sunrise'), 500);
    const timer2 = setTimeout(() => setAnimationPhase('birds'), 1500);
    const timer3 = setTimeout(() => setAnimationPhase('form'), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Check for existing session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/check-session', {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          if (userData.user) {
            toast({
              title: `Welcome back, ${userData.user.name}! 🌍`,
              description: "Ready for your next journey?"
            });
            onLoginSuccess?.(userData.user);
            navigate('/dashboard');
          }
        }
      } catch (error) {
        console.log('No existing session');
      }
    };
    checkSession();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: isLogin ? `Welcome back, ${data.user.name}! 🌍` : `Welcome to Emotion Escapes, ${data.user.name}! ✈️`,
          description: isLogin ? "Ready for your next journey?" : "Your adventure begins now!"
        });
        onLoginSuccess?.(data.user);
        navigate('/dashboard');
      } else {
        // Cinematic shake effect on error
        if (containerRef.current) {
          containerRef.current.classList.add('animate-shake');
          setTimeout(() => {
            containerRef.current?.classList.remove('animate-shake');
          }, 600);
        }
        toast({
          title: "Authentication Failed",
          description: data.message || "Please check your credentials and try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to server. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Sunrise Glow */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-yellow-300/60 via-orange-400/40 to-transparent transition-opacity duration-2000 ${
            animationPhase !== 'loading' ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Mountains Parallax */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3">
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-green-800/60 to-green-600/40 transform translate-y-2 animate-float-slow" 
               style={{ clipPath: 'polygon(0 100%, 20% 60%, 40% 80%, 60% 40%, 80% 70%, 100% 50%, 100% 100%)' }} />
          <div className="absolute bottom-0 w-full h-4/5 bg-gradient-to-t from-green-700/50 to-green-500/30 transform translate-y-1 animate-float-slower" 
               style={{ clipPath: 'polygon(0 100%, 15% 70%, 35% 50%, 55% 75%, 75% 45%, 95% 65%, 100% 100%)' }} />
        </div>

        {/* Animated Birds */}
        {animationPhase !== 'loading' && (
          <>
            <div className="absolute top-1/4 left-0 animate-fly-across">
              <div className="text-2xl">🦅</div>
            </div>
            <div className="absolute top-1/3 left-0 animate-fly-across-delayed">
              <div className="text-xl">🕊️</div>
            </div>
            <div className="absolute top-1/5 left-0 animate-fly-across-slow">
              <div className="text-lg">🦋</div>
            </div>
          </>
        )}

        {/* Floating Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}

        {/* Drifting Leaves */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-drift-leaf"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            >
              <div className="text-green-600/60 text-lg">🍃</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div 
          ref={containerRef}
          className={`w-full max-w-md transition-all duration-1000 ${
            animationPhase === 'form' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Tagline */}
          <div className={`text-center mb-8 transition-all duration-2000 delay-500 ${
            animationPhase === 'form' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif tracking-wide">
              Begin Your Journey Here...
            </h1>
            <div className="flex items-center justify-center gap-2 text-white/80">
              <Plane className="w-5 h-5 animate-pulse" />
              <span className="text-lg">Emotion Escapes</span>
              <MapPin className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          {/* Login Form - Travel Ticket Style */}
          <Card className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            {/* Glowing Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse" />
            
            <div className="relative p-8">
              {/* Form Toggle */}
              <div className="flex mb-6 bg-white/10 rounded-full p-1">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
                    isLogin 
                      ? 'bg-white text-gray-800 shadow-lg' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
                    !isLogin 
                      ? 'bg-white text-gray-800 shadow-lg' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field (Sign Up Only) */}
                {!isLogin && (
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 group-focus-within:text-white transition-colors" />
                    <Input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="pl-12 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                    />
                  </div>
                )}

                {/* Email Field */}
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 group-focus-within:text-white transition-colors" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-12 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                  />
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 group-focus-within:text-white transition-colors" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Plane className="w-5 h-5 mr-2" />
                      {isLogin ? 'Begin Journey' : 'Start Adventure'}
                    </div>
                  )}
                </Button>
              </form>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 text-white/20">
                <div className="text-6xl">✈️</div>
              </div>
              <div className="absolute bottom-4 left-4 text-white/20">
                <div className="text-4xl">🌍</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fly-across {
          0% { transform: translateX(-100px) translateY(0px); }
          50% { transform: translateX(50vw) translateY(-20px); }
          100% { transform: translateX(calc(100vw + 100px)) translateY(0px); }
        }
        
        @keyframes fly-across-delayed {
          0% { transform: translateX(-100px) translateY(0px); }
          50% { transform: translateX(50vw) translateY(-30px); }
          100% { transform: translateX(calc(100vw + 100px)) translateY(-10px); }
        }
        
        @keyframes fly-across-slow {
          0% { transform: translateX(-100px) translateY(0px); }
          50% { transform: translateX(50vw) translateY(-15px); }
          100% { transform: translateX(calc(100vw + 100px)) translateY(5px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        }
        
        @keyframes drift-leaf {
          0% { transform: translateY(-100px) translateX(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) translateX(100px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-fly-across { animation: fly-across 15s linear infinite; }
        .animate-fly-across-delayed { animation: fly-across-delayed 18s linear infinite 2s; }
        .animate-fly-across-slow { animation: fly-across-slow 25s linear infinite 4s; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 8s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 4s ease-in-out infinite; }
        .animate-drift-leaf { animation: drift-leaf linear infinite; }
        .animate-shake { animation: shake 0.6s ease-in-out; }
      `}</style>
    </div>
  );
};