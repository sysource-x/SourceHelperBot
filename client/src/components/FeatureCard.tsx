import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: "blurple" | "green" | "yellow" | "red";
  expanded?: boolean;
}

export default function FeatureCard({ icon, title, description, color, expanded = false }: FeatureCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "blurple":
        return "bg-discord-blurple bg-opacity-20 text-discord-blurple";
      case "green":
        return "bg-discord-green bg-opacity-20 text-discord-green";
      case "yellow":
        return "bg-discord-yellow bg-opacity-20 text-discord-yellow";
      case "red":
        return "bg-discord-red bg-opacity-20 text-discord-red";
      default:
        return "bg-discord-blurple bg-opacity-20 text-discord-blurple";
    }
  };

  return (
    <div className="bg-discord-secondary rounded-lg p-4 border border-github-border">
      <div className="flex items-start mb-3">
        <div className={`${getColorClasses(color)} p-2 rounded mr-3`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className={`${expanded ? 'text-base' : 'text-sm'} text-gray-400`}>{description}</p>
        </div>
      </div>
    </div>
  );
}
