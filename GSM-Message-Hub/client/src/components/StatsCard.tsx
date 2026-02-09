import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  gradient?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, trendUp, gradient = "from-blue-500 to-indigo-600" }: StatsCardProps) {
  return (
    <div className="glass-card p-6 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
        <Icon className="w-24 h-24" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-muted-foreground font-medium">{title}</h3>
        </div>
        
        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-white font-display tracking-tight">{value}</span>
          {trend && (
            <span className={`text-sm font-medium mb-1 ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
