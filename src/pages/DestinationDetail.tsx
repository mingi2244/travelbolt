I'll fix the journey progression logic to show one step at a time with detailed information. Here's the updated component:

```tsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Heart, Users, Shield, BedDouble, Camera, Utensils, Activity, Navigation, Lightbulb, CheckCircle, Circle, ArrowRight, Star, Calendar, DollarSign, Info, Sparkles, TrendingUp, Map, ChevronRight, AlertCircle } from "lucide-react";
import { usePlans } from "@/contexts/PlanContext";
import { useToast } from "@/hooks/use-toast";
import { bangaloreDestinations, keralaDestinations, tamilNaduDestinations, type Destination } from "@/data/destinations";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const allDestinations: Destination[] = [
  ...tamilNaduDestinations,
  ...keralaDestinations,
  ...bangaloreDestinations,
];

const DestinationDetail = () => {
  const { country = "", name = "" } = useParams();
  const decodedCountry = decodeURIComponent(country);
  const decodedName = decodeURIComponent(name);
  const location = useLocation() as { state?: { destination?: Destination } };
  const navigate = useNavigate();
  const { addPlan, selectedPlans, updatePlanStatus, updatePlanProgress } = usePlans();
  const { toast } = useToast();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const destination = useMemo(() => {
    return (
      location.state?.destination ||
      allDestinations.find(
        (d) => d.name === decodedName && d.country === decodedCountry
      )
    );
  }, [location.state, decodedName, decodedCountry]);

  const currentPlan = selectedPlans.find(
    (p) => p.name === destination?.name && p.region === destination?.country
  );

  // Sync current step with plan progress
  useEffect(() => {
    if (currentPlan?.currentStep !== undefined) {
      setCurrentStepIndex(currentPlan.currentStep);
    }
  }, [currentPlan]);

  // Scroll to top when component mounts or destination changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [destination]);

  useEffect(() => {
    if (destination) {
      const pageTitle = `${destination.name} - ${destination.country} | Destination Details`;
      document.title = pageTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      const description = `${destination.name} in ${destination.country}: ${destination.description}`.slice(0, 155);
      if (metaDesc) metaDesc.setAttribute("content", description);

      // canonical
      const canonicalHref = `${window.location.origin}/destination/${encodeURIComponent(
        destination.country
      )}/${encodeURIComponent(destination.name)}`;
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", canonicalHref);
    }
  }, [destination]);

  if (!destination) {
    return (
      <div className="min-h-screen bg-background relative pt-16 flex items-center justify-center">
        <ParticleBackground theme="minimal" />
        <p className="text-muted-foreground">Destination not found.</p>
      </div>
    );
  }

  const isSelected = selectedPlans.some(
    (p) => p.name === destination.name && p.region === destination.country
  );

  const rentText = useMemo(() => {
    switch (destination.priceRange) {
      case '$':
        return 'Budget (~₹1,000–₹2,500/night)';
      case '$$':
        return 'Mid-range (~₹2,500–₹6,000/night)';
      case '$$$':
        return 'Premium (₹6,000+/night)';
      default:
        return 'Varies';
    }
  }, [destination.priceRange]);

  const travelSteps = [
    { 
      id: 'research', 
      title: 'Research & Planning', 
      description: 'Gather information about the destination, weather, and local customs',
      icon: Map,
      tips: ['Check weather forecasts', 'Learn basic local phrases', 'Research cultural etiquette'],
      detailedSteps: [
        'Research the best time to visit based on weather and festivals',
        'Learn about local customs and dress codes',
        'Make a list of must-visit places and attractions',
        'Check visa requirements and travel advisories',
        'Read reviews from other travelers'
      ],
      estimatedTime: '2-3 days'
    },
    { 
      id: 'booking', 
      title: 'Accommodation & Transport', 
      description: 'Book hotels, flights, and local transportation',
      icon: Calendar,
      tips: ['Compare prices across platforms', 'Book refundable options', 'Save confirmation emails'],
      detailedSteps: [
        'Compare flight/train/bus options and book tickets',
        'Research and book accommodation in safe areas',
        'Arrange airport/station transfers',
        'Book any guided tours or activities in advance',
        'Consider travel insurance options'
      ],
      estimatedTime: '1-2 days'
    },
    { 
      id: 'preparation', 
      title: 'Travel Preparation', 
      description: 'Pack essentials, check documents, and prepare for the journey',
      icon: Sparkles,
      tips: ['Create packing checklist', 'Check passport validity', 'Get travel insurance'],
      detailedSteps: [
        'Create a packing list based on weather and activities',
        'Check passport/ID validity (6 months for international)',
        'Make copies of important documents',
        'Prepare first-aid kit and medications',
        'Download offline maps and translation apps'
      ],
      estimatedTime: '1-2 days'
    },
    { 
      id: 'arrival', 
      title: 'Arrival & Check-in', 
      description: 'Reach destination, check into accommodation, and get oriented',
      icon: MapPin,
      tips: ['Keep hotel address handy', 'Exchange currency', 'Get local SIM/WiFi'],
      detailedSteps: [
        'Clear immigration/security (if applicable)',
        'Collect luggage and arrange transportation',
        'Check into your accommodation',
        'Get local SIM card or activate roaming',
        'Familiarize yourself with the neighborhood'
      ],
      estimatedTime: '3-4 hours'
    },
    { 
      id: 'exploration', 
      title: 'Explore & Experience', 
      description: 'Visit attractions, try local cuisine, and immerse in culture',
      icon: Camera,
      tips: ['Start early to avoid crowds', 'Try street food', 'Interact with locals'],
      detailedSteps: [
        'Visit major attractions and landmarks',
        'Try local cuisine and street food',
        'Shop for souvenirs and local crafts',
        'Take photos and create memories',
        'Engage with local culture and traditions'
      ],
      estimatedTime: 'Duration of stay'
    },
    { 
      id: 'completion', 
      title: 'Journey Complete', 
      description: 'Reflect on experiences and share memories',
      icon: Star,
      tips: ['Write travel journal', 'Share photos with friends', 'Leave reviews'],
      detailedSteps: [
        'Organize and backup photos/videos',
        'Write about your experiences in a journal',
        'Leave reviews for hotels and attractions',
        'Share experiences on social media',
        'Plan your next adventure!'
      ],
      estimatedTime: '1-2 hours'
    }
  ];

  const getStepProgress = () => {
    if (!currentPlan) return 0;
    const progress = ((currentPlan.currentStep || 0) / travelSteps.length) * 100;
    return Math.round(progress);
  };

  const handleAdd = () => {
    if (currentPlan) {
      toast({ title: "Already added", description: `${destination.name} is already in your travel plans.` });
      return;
    }
    addPlan({
      name: destination.name,
      country: destination.country,
      image: destination.image,
      emotionalMatch: destination.emotionalMatch,
      matchPercentage: destination.matchPercentage,
      description: destination.description,
      culturalHighlights: destination.culturalHighlights,
      safetyLevel: destination.safetyLevel,
      bestTime: destination.bestTime,
      priceRange: destination.priceRange,
      region: destination.country as 'Tamil Nadu' | 'Kerala' | 'Bangalore',
      currentStep: 0
    });
    toast({ title: "Added to plans!", description: `${destination.name} has been added to your travel dashboard.` });
  };

  const handleStartJourney = () => {
    if (currentPlan) {
      updatePlanStatus(currentPlan.id, 'ongoing');
      if (updatePlanProgress) {
        updatePlanProgress(currentPlan.id, 0);
      }
      setCurrentStepIndex(0);
      toast({ title: "Journey started!", description: `Let's begin with ${travelSteps[0].title}` });
    }
  };

  const handleNextStep = () => {
    if (currentPlan && currentStepIndex < travelSteps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      if (updatePlanProgress) {
        updatePlanProgress(currentPlan.id, nextIndex);
      }
      toast({ title: "Step completed!", description: `Moving to: ${travelSteps[nextIndex].title}` });
    }
  };

  const handleCompleteJourney = () => {
    if (currentPlan) {
      updatePlanStatus(currentPlan.id, 'completed');
      if (updatePlanProgress) {
        updatePlanProgress(currentPlan.id, travelSteps.length);
      }
      toast({ title: "Journey completed!", description: `Congratulations on completing your journey to ${destination.name}!` });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'temple': return '🏛️';
      case 'nature': return '🌿';
      case 'adventure': return '🏔️';
      case 'cultural': return '🎭';
      case 'beach': return '🏖️';
      case 'historical': return '📜';
      case 'shopping': return '🛍️';
      case 'food': return '🍽️';
      default: return '📍';
    }
  };

  return (
    <div className="min-h-screen bg-background relative pt-16">
      <ParticleBackground theme="minimal" />

      {/* Hero Section with Overlay Info */}
      <section className="relative">
        <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
          <img
            src={destination.image}
            alt={`${destination.name}, ${destination.country} travel destination`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (target.src !== "/placeholder.svg") target.src = "/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-white">{destination.name}</h1>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-lg">{destination.country}</span>
                    </div>
                    <Separator orientation="vertical" className="h-5 bg-white/30" />
                    <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-1">
                      <Heart className="w-4 h-4 mr-2" />
                      {destination.matchPercentage}% Match
                    </Badge>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-white">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">Safety</span>
                    </div>
                    <p className="text-lg font-semibold capitalize">{destination.safetyLevel}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-white">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">Budget</span>
                    </div>
                    <p className="text-lg font-semibold">{destination.priceRange}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Travel Progress Section - Enhanced Design */}
          {currentPlan && (
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 mb-8 overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <TrendingUp className="w-6 h-6 text-primary" />
                        </div>
                        Your Journey Timeline
                      </h2>
                      <p className="text-muted-foreground mt-2">Track your travel progress step by step</p>
                    </div>
                    <Badge className={`px-4 py-2 text-sm font-semibold ${
                      currentPlan.status === 'selected' ? 'bg-blue-500/20 text-blue-600 border-blue-500/30' :
                      currentPlan