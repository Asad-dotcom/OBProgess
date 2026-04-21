import { cn } from "@/lib/utils";
import { TrendingUp, Award, Target as TargetIcon, Medal, Trophy, Star } from "lucide-react";

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
  const sortedData = [...data].sort((a, b) => b.achievement - a.achievement);

  const getRankStyle = (index: number) => {
    switch(index) {
      case 0: return { icon: Trophy, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30", shadow: "shadow-amber-400/20" };
      case 1: return { icon: Medal, color: "text-slate-300", bg: "bg-slate-300/10", border: "border-slate-300/30", shadow: "shadow-slate-300/20" };
      case 2: return { icon: Medal, color: "text-amber-700", bg: "bg-amber-700/10", border: "border-amber-700/30", shadow: "shadow-amber-700/20" };
      default: return { icon: Star, color: "text-muted-foreground/30", bg: "bg-white/5", border: "border-white/5", shadow: "" };
    }
  };

  const getStatus = (achievement: number) => {
    if (achievement >= 110) return { label: "Elite", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" };
    if (achievement >= 100) return { label: "Star", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" };
    if (achievement >= 85) return { label: "Strong", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" };
    if (achievement >= 60) return { label: "On Track", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" };
    return { label: "Lagging", color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20" };
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="glass-morphism rounded-3xl overflow-hidden shadow-2xl border border-white/5">
      <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/20 rounded-2xl text-primary shadow-lg shadow-primary/20">
            <Trophy size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black tracking-tight">Top <span className="text-gradient">Performers</span></h3>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-60">Revenue & Target Leaderboard</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Rankings
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-white/[0.03] text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground/60 border-b border-white/5">
            <tr>
              <th className="px-8 py-5">Rank</th>
              <th className="px-6 py-5">Order Booker</th>
              <th className="px-6 py-5">Total Sales</th>
              <th className="px-6 py-5">Monthly Target</th>
              <th className="px-6 py-5">Achievement</th>
              <th className="px-8 py-5 text-right font-black">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-3 opacity-30">
                    <Star size={48} />
                    <p className="text-sm font-bold uppercase tracking-widest">No data available yet</p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((ob, index) => {
                const rank = getRankStyle(index);
                const status = getStatus(ob.achievement);
                const RankIcon = rank.icon;

                return (
                  <tr key={ob.id} className="hover:bg-white/[0.03] transition-all duration-300 group">
                    <td className="px-8 py-6">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500",
                        rank.bg, rank.color, rank.border, "border shadow-sm", rank.shadow
                      )}>
                        {index < 3 ? <RankIcon size={20} /> : <span className="text-sm font-black">{index + 1}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-11 h-11 rounded-full flex items-center justify-center text-xs font-black ring-2 ring-white/5 ring-offset-2 ring-offset-transparent shadow-inner",
                          index === 0 ? "premium-gradient text-white" : "bg-accent text-foreground"
                        )}>
                          {getInitials(ob.name)}
                        </div>
                        <div>
                          <div className="font-black text-foreground group-hover:text-primary transition-colors text-base tracking-tight leading-tight">{ob.name}</div>
                          <div className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-widest mt-0.5">{ob.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 font-mono">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-1 opacity-40">Current Sales</span>
                        <div className="flex items-center gap-2">
                          <TrendingUp size={14} className="text-emerald-500" />
                          <span className="font-bold text-sm">PKR {ob.totalSales.toLocaleString()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 font-mono opacity-60 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1 opacity-40">Monthly Goal</span>
                        <div className="flex items-center gap-2">
                          <TargetIcon size={14} />
                          <span className="font-medium text-xs">PKR {ob.target.toLocaleString()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 min-w-[200px]">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                          <span className={cn("text-lg font-black leading-none tracking-tighter", status.color)}>
                            {ob.achievement.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                          <div 
                            className={cn(
                              "h-full transition-all duration-1000 relative",
                              ob.achievement >= 100 ? "premium-gradient" : "bg-primary"
                            )}
                            style={{ width: `${Math.min(ob.achievement, 100)}%` }}
                          >
                            {ob.achievement >= 90 && (
                              <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className={cn(
                        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm transition-all group-hover:scale-105 duration-500",
                        status.color, status.bg, status.border
                      )}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer / Summary Strip */}
      <div className="p-4 bg-white/[0.01] border-t border-white/5 flex justify-center">
        <p className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.4em] opacity-40">All data synced with central sales database</p>
      </div>
    </div>
  );
}
