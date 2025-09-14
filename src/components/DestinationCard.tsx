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
      <style>{`
        .destination-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 2px 16px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.18);
          width: 100%;
          height: 100%;
          font-family: 'Inter', Arial, sans-serif;
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        .destination-card:hover {
          transform: translateY(-12px) rotateX(5deg) rotateY(-2deg);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.25),
            0 8px 32px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

        /* Image */
        .destination-img-wrap {
          position: relative;
          height: 200px;
          width: 100%;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
          flex-shrink: 0;
          border-radius: 1.5rem 1.5rem 0 0;
        }
        .destination-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .destination-card:hover .destination-img {
          transform: scale(1.05);
        }

        /* Top-right match pill */
        .destination-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #fff;
          font-weight: 700;
          border-radius: 999px;
          padding: 6px 12px;
          font-size: 0.86rem;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .destination-card:hover .destination-badge {
          transform: scale(1.05);
          background: rgba(0, 0, 0, 0.8);
        }

        /* Body */
        .destination-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }

        /* Title + Location block */
        .destination-title {
          font-size: 1.35rem;
          font-weight: 1500;
          margin: 0;
          color: rgba(255, 255, 255, 0.95);
          letter-spacing: -0.01em;
          line-height: 1.2;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .destination-location {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.92rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 6px;   /* tight under title */
          margin-bottom: 10px; /* space above description */
        }
        .destination-location svg {
          width: 16px;
          height: 16px;
          flex: 0 0 16px;
          vertical-align: middle;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
        }

        /* Description */
        .destination-description {
          font-size: 0.96rem;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 12px 0;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        /* Content wrapper for consistent spacing */
        .destination-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        /* Bottom section */
        .destination-bottom {
          margin-top: auto;
          padding-top: 12px;
        }

        /* Meta row (time, price, safety) */
        .destination-info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.92rem;
          color: rgba(255, 255, 255, 0.75);
          gap: 10px;
          margin-bottom: 16px;
        }
        .meta-left {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          white-space: nowrap;
        }
        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .safety {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
        }
        .safety-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          display: inline-block;
          box-shadow: 0 0 8px currentColor;
        }

        /* Buttons */
        .destination-buttons {
          display: flex;
          gap: 12px;
        }
        .destination-btn {
          flex: 1;
          border-radius: 1rem;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.7rem;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          min-height: 44px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.9);
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        .destination-btn:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.02);
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 1);
        }
        .destination-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>

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
    