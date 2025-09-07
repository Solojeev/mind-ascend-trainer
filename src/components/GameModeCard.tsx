import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameModeCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: "primary" | "warning" | "success";
  progress: number;
  onClick?: () => void;
}

const GameModeCard = ({ title, description, icon: Icon, color, progress, onClick }: GameModeCardProps) => {
  const colorClasses = {
    primary: "bg-primary/20 text-primary",
    warning: "bg-warning/20 text-warning", 
    success: "bg-success/20 text-success"
  };

  return (
    <Card className="card-interactive p-6 cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-4 mb-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colorClasses[color])}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-semibold text-lg">{title}</h4>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </Card>
  );
};

export default GameModeCard;