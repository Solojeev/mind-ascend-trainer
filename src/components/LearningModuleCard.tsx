import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LearningModuleCardProps {
  name: string;
  level: number;
  progress: number;
  onClick?: () => void;
}

const LearningModuleCard = ({ name, level, progress, onClick }: LearningModuleCardProps) => {
  return (
    <Card className="card-interactive p-4 cursor-pointer" onClick={onClick}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-muted-foreground text-sm">Level {level}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary">{progress}%</div>
        </div>
      </div>
      <Progress value={progress} className="h-2" />
    </Card>
  );
};

export default LearningModuleCard;