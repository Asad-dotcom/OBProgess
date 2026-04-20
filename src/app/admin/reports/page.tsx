import prisma from "../../../lib/prisma";
import { FileText, Calendar, TrendingUp, Target as TargetIcon } from "lucide-react";
import { cn } from "../../../lib/utils";

export default async function ReportsPage() {
  // Aggregate data by month for the current year
  const currentYear = new Date().getFullYear();
  
  const sales = await prisma.sale.findMany({
    where: {
      date: {
        gte: new Date(currentYear, 0, 1),
        lt: new Date(currentYear + 1, 0, 1)
      }
    }
  });

  const targets = await prisma.target.findMany({
    where: { year: currentYear }
  });

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const monthNames = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const reportData = months.map(m => {
    const monthlySales = sales
      .filter((s: any) => new Date(s.date).getMonth() + 1 === m)
      .reduce((sum: number, s: any) => sum + s.amount, 0);
    
    const monthlyTarget = targets
      .filter((t: any) => t.month === m)
      .reduce((sum: number, t: any) => sum + t.amount, 0);
    
    const achievement = monthlyTarget > 0 ? (monthlySales / monthlyTarget) * 100 : 0;

    return {
      month: monthNames[m],
      sales: monthlySales,
      target: monthlyTarget,
      achievement
    };
  }).filter(d => d.sales > 0 || d.target > 0);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Financial Reports</h1>
          <p className="text-muted-foreground mt-2">Yearly performance breakdown for {currentYear}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reportData.length === 0 ? (
          <div className="py-24 text-center glass-morphism rounded-2xl border-dashed">
            <FileText className="mx-auto text-muted-foreground mb-4 opacity-20" size={64} />
            <p className="text-muted-foreground font-medium">No report data generated for {currentYear} yet.</p>
          </div>
        ) : (
          reportData.reverse().map((data: any, i: number) => (
            <div key={i} className="glass-morphism rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 group">
              <div className="flex items-center gap-4 min-w-[200px]">
                <div className="p-3 bg-accent rounded-xl text-primary font-bold">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-foreground">{data.month}</h3>
                  <p className="text-xs font-bold text-muted-foreground uppercase">{currentYear}</p>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
                <div>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1 flex items-center gap-1">
                    <TrendingUp size={10} /> Sales
                  </p>
                  <p className="text-xl font-bold font-mono">PKR {data.sales.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1 flex items-center gap-1">
                    <TargetIcon size={10} /> Target
                  </p>
                  <p className="text-xl font-bold font-mono text-muted-foreground">PKR {data.target.toLocaleString()}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">Achievement</p>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-xl font-black",
                      data.achievement >= 100 ? "text-emerald-500" : "text-primary"
                    )}>
                      {data.achievement.toFixed(1)}%
                    </span>
                    <div className="flex-1 h-2 bg-accent rounded-full overflow-hidden hidden md:block">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${Math.min(data.achievement, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
