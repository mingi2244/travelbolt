import { CinematicLogin } from "@/components/CinematicLogin";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = (user: any) => {
    console.log('Login successful:', user);
    // Additional logic can be added here
  };

  return <CinematicLogin onLoginSuccess={handleLoginSuccess} />;
};

export default Login;