import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Heart, Plus, Check } from "lucide-react";
import { usePlans } from "@/contexts/PlanContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface DestinationCardProps {
  name: string;
  country: string;
  image: string;
  emotionalMatch: string;
  matchPercentage: number;
  description: string;
  culturalHighlights: string[];
  safetyLevel: "high" | "medium" | "low";
  bestTime: string;
  priceRange: "$" | "$$" | "$$$";
  idealGroupSize?: string;
  groupDescription?: string;
  hideGetGoingPlans?: boolean;
}

export const DestinationCard = ({
  name,
  country,
  image,
  emotionalMatch,
  matchPercentage,
  description,
  culturalHighlights,
  safetyLevel,
  bestTime,
  priceRange,
  idealGroupSize,
  groupDescription,
  hideGetGoingPlans = false,
}: DestinationCardProps) => {
  const { addPlan, selectedPlans, updatePlanStatus } = usePlans();
  const { toast } = useToast();
  const navigate = useNavigate();

  const isSelected = selectedPlans.some(
    (plan) => plan.name === name && plan.region === country
  );

  const handleAddToPlan = () => {
    if (isSelected) {
      toast({
        title: "Already added",
        description: `${name} is already in your travel plans.`,
      });
      return;
    }
    addPlan({
      name,
      country,
      image,
      emotionalMatch,
      matchPercentage,
      description,
      culturalHighlights,
      safetyLevel,
      bestTime,
      priceRange,
      region: country as "Tamil Nadu" | "Kerala" | "Bangalore",
    });
    toast({
      title: "Added to plans!",
      description: `${name} has been added to your travel dashboard.`,
    });
  };

  const handleGetGoingPlans = () => {
    const existing = selectedPlans.find( 
      (plan) => plan.name === name && plan.region === country
    );
    if (!existing) {
      addPlan({
        name,
        country,
        image,
        emotionalMatch,
        matchPercentage,
        description,
        culturalHighlights,
        safetyLevel,
        bestTime,
        priceRange,
        region: country as "Tamil Nadu" | "Kerala" | "Bangalore",
      });
      toast({
        title: "Added to plans",
        description: `${name} added. Opening ongoing plans...`,
      });
      setTimeout(() => {
        const plan = selectedPlans.find(
          (p) => p.name === name && p.region === country
        );
        if (plan) {
          updatePlanStatus(plan.id, "ongoing");
        }
        navigate("/dashboard?tab=ongoing");
      }, 100);
      return;
    }
    updatePlanStatus(existing.id, "ongoing");
    navigate("/dashboard?tab=ongoing");
  };

  const safetyColor = {
    high: "#32ba7c",
    medium: "#f1c232",
    low: "#e65151",
  };

  const getSafetyIcon = () => {
    switch (safetyLevel) {
      case "high":
        return "🟢";
      case "medium":
        return "🟡";
      case "low":
        return "🔴";
      default:
        return "";
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.currentTarget;
    if (target.src !== "/placeholder.svg") target.src = "/placeholder.svg";
  };

  return (
    <Card className="destination-card h-full">
      <div className="destination-img-wrap">
        <img
          src={image || "/placeholder.svg"}
          alt={`${name}, ${country}`}
          className="destination-img"
          onError={handleImageError}
        />
        <div className="destination-badge">
          <Heart style={{ height: 16, width: 16 }} />
          {matchPercentage}% Match
        </div>
      </div>

      <div className="destination-body">
        <div className="destination-content">
          <h2 className="destination-title">{name}</h2>

          {/* state name under the title with pin */}
          <div className="destination-location">
            <MapPin />
            <span>{country}</span>
          </div>

          <div className="destination-description">{description}</div>
        </div>

        <div className="destination-bottom">
          <div className="destination-info-row">
            <div className="meta-left">
              <span className="meta-item">
                <Clock style={{ width: 16, height: 16 }} />
                {bestTime}
              </span>
              <span className="meta-item">💰 {priceRange}</span>
            </div>

            <div
              className="safety"
              style={{ color: safetyColor[safetyLevel] }}
              aria-label={`${safetyLevel} safety`}
            >
              <span
                className="safety-dot"
                style={{ backgroundColor: safetyColor[safetyLevel] }}
              />
              {safetyLevel} Safety
            </div>
          </div>

          <div className="destination-buttons">
            <Button
              className="destination-btn"
              onClick={() =>
                navigate(
                  `/destination/${encodeURIComponent(
                    country
                  )}/${encodeURIComponent(name)}`
                )
              }
            >
              View Details
            </Button>

            {!hideGetGoingPlans && (
              <Button className="destination-btn" onClick={handleGetGoingPlans}>
                Get Going
              </Button>
            )}

            <Button
              className="destination-btn"
              onClick={handleAddToPlan}
              disabled={isSelected}
            >
              {isSelected ? (
                <>
                  <Check style={{ width: 16, height: 16, marginRight: 6 }} />
                  Added
                </>
              ) : (
                <>
                  <Plus style={{ width: 16, height: 16, marginRight: 6 }} />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
