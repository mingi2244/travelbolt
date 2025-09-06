import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import TamilNadu from "./pages/TamilNadu";
import Kerala from "./pages/Kerala";
import Bangalore from "./pages/Bangalore";
import Discover from "./pages/Discover";
import Dashboard from "./pages/Dashboard";
import DestinationDetail from "./pages/DestinationDetail";
import NotFound from "./pages/NotFound";
import { PlanProvider } from "./contexts/PlanContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <PlanProvider>
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/tamil-nadu" element={<TamilNadu />} />
              <Route path="/kerala" element={<Kerala />} />
              <Route path="/bangalore" element={<Bangalore />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/destination/:country/:name" element={<DestinationDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PlanProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
