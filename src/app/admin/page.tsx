import { getDashboardData } from "../../lib/calculations";
import PerformanceTable from "../../components/PerformanceTable";
import StockPdfUpload from "../../components/StockPdfUpload";
import { uploadStockPdf, getStockPdfs } from "../actions/documents";
import { TrendingUp, Users, Target, Calendar, FileText, ExternalLink } from "lucide-react";

export default async function AdminOverview() {
  const [{ performance, currentMonth, currentYear }, stockPdfs] = await Promise.all([
    getDashboardData(),
    getStockPdfs()
  ]);

  const totalSales = performance.reduce((sum: number, p: any) => sum + p.totalSales, 0);
  const totalTarget = performance.reduce((sum: number, p: any) => sum + p.target, 0);
  const overallAchievement = totalTarget > 0 ? (totalSales / totalTarget) * 100 : 0;

  const monthNames = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const stats = [
    { 
      label: "Total Sales", 
      value: `PKR ${totalSales.toLocaleString()}`, 
      icon: TrendingUp, 
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    { 
      label: "Total Target", 
      value: `PKR ${totalTarget.toLocaleString()}`, 
      icon: Target, 
      color: "text-primary",
      bg: "bg-primary/10"
    },
    { 
      label: "Overall Achievement", 
      value: `${overallAchievement.toFixed(1)}%`, 
      icon: Calendar, 
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    { 
      label: "Active Bookers", 
      value: performance.length.toString(), 
      icon: Users, 
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase italic text-foreground/90">
            Performance <span className="text-primary tracking-widest not-italic font-bold">Overview</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            Live data for <span className="text-foreground font-bold">{monthNames[currentMonth]} {currentYear}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-morphism rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
            <div className={stat.color}>
              <div className={`p-3 w-fit rounded-xl mb-4 ${stat.bg}`}>
                <stat.icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
              <h3 className="text-2xl font-black mt-1 text-foreground leading-none">
                {stat.value}
              </h3>
            </div>
            <div className="absolute -right-2 -bottom-2 opacity-5 scale-150 rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-transform duration-500">
              <stat.icon size={100} />
            </div>
          </div>
        ))}
      </div>

      <PerformanceTable data={performance} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StockPdfUpload action={uploadStockPdf} />
        
        <div className="glass-morphism rounded-2xl p-6 shadow-xl flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <FileText size={24} />
            </div>
            <h2 className="text-xl font-semibold">Available Stock PDFs</h2>
          </div>
          
          <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px] pr-2">
            {stockPdfs.length === 0 ? (
              <p className="text-muted-foreground text-sm italic">No documents uploaded yet.</p>
            ) : (
              stockPdfs.map((pdf: any) => (
                <div key={pdf.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border/50 group hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="text-muted-foreground" size={18} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate">{pdf.title}</p>
                      <p className="text-[10px] text-muted-foreground">{new Date(pdf.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <a 
                    href={pdf.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
