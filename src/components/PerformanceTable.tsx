import { cn } from "@/lib/utils";
import { TrendingUp, Award, Target as TargetIcon } from "lucide-react";

interface PerformanceTableProps {
  data: {
    id: string;
    name: string;
    code: string;
    totalSales: number;
    target: number;
    achievement: number;
  }[];
}

export default function PerformanceTable({ data }: PerformanceTableProps) {
  return (
    <div className="glass-morphism rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-border flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg text-primary">
            <Award size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Performance Leaderboard</h3>
            <p className="text-xs text-muted-foreground font-medium">Monthly Achievement Tracking</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-white/5 text-[10px] uppercase font-bold tracking-widest text-muted-foreground border-b border-border">
            <tr>
              <th className="px-4 sm:px-6 py-3 sm:py-4">Order Booker</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4">Total Sales</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4">Monthly Target</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4">Achievement</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-right">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground font-medium">
                  No performance data available for this month.
                </td>
              </tr>
            ) : (
              data.sort((a, b) => b.achievement - a.achievement).map((ob) => (
                <tr key={ob.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-6">
                    <div className="font-bold text-foreground group-hover:text-primary transition-colors">{ob.name}</div>
                    <div className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">{ob.code}</div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-emerald-500" />
                      <span className="font-mono font-bold">PKR {ob.totalSales.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TargetIcon size={16} />
                      <span className="font-mono font-medium">PKR {ob.target.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      ob.achievement >= 100 
                        ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30" 
                        : ob.achievement >= 50 
                          ? "bg-amber-500/20 text-amber-500 border border-amber-500/30" 
                          : "bg-destructive/20 text-destructive border border-destructive/30"
                    )}>
                      {ob.achievement.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right w-48">
                    <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full transition-all duration-1000",
                          ob.achievement >= 100 ? "premium-gradient" : "bg-primary"
                        )}
                        style={{ width: `${Math.min(ob.achievement, 100)}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
