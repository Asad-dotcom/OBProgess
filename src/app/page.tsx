import { getDashboardData } from "../lib/calculations";
import PerformanceTable from "../components/PerformanceTable";
import { getStockPdfs } from "./actions/documents";
import { 
  TrendingUp, Target, Calendar, FileText, ExternalLink, 
  Users, BarChart3, Shield, Zap, ArrowRight, ChevronRight,
  Award, Activity, Clock, Star
} from "lucide-react";
import Link from "next/link";

export default async function PublicDashboard() {
  const [{ performance, currentMonth, currentYear }, stockPdfs] = await Promise.all([
    getDashboardData(),
    getStockPdfs()
  ]);

  const totalSales = performance.reduce((sum: number, p: any) => sum + p.totalSales, 0);
  const totalTarget = performance.reduce((sum: number, p: any) => sum + p.target, 0);
  const overallAchievement = totalTarget > 0 ? (totalSales / totalTarget) * 100 : 0;
  const topPerformer = performance.sort((a: any, b: any) => b.achievement - a.achievement)[0];

  const monthNames = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* NAVBAR */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl premium-gradient flex items-center justify-center text-white text-xs font-black shadow-lg shadow-primary/25">OB</div>
            <span className="font-black text-lg tracking-tight">OB<span className="text-gradient">Progress</span></span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">Stats</a>
            <a href="#leaderboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">Leaderboard</a>
            <a href="#documents" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">Documents</a>
            <Link 
              href="/login" 
              className="px-5 py-2 rounded-full premium-gradient text-white font-bold text-sm transition-all hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-16 min-h-[85vh] flex items-center justify-center hero-glow grid-pattern">
        {/* Decorative orbs */}
        <div className="absolute top-32 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-chart-1/10 rounded-full blur-[120px] animate-float stagger-3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
            <Activity size={14} className="animate-pulse" />
            Live Performance Dashboard
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
            <span className="block">Order Booker</span>
            <span className="text-gradient block mt-2">Performance</span>
            <span className="block text-muted-foreground/40 text-2xl sm:text-3xl md:text-5xl mt-4 font-bold tracking-tight">Tracking System</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6 sm:mt-8 leading-relaxed font-medium px-4">
            Monitor sales achievements, track monthly targets, and analyze 
            performance metrics for your entire team — all in real time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 px-4">
            <a 
              href="#stats" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-full premium-gradient text-white font-bold transition-all hover:shadow-xl hover:shadow-primary/25 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              View Performance <ArrowRight size={18} />
            </a>
            <Link 
              href="/login" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-border bg-card hover:bg-accent font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground text-sm sm:text-base"
            >
              <Shield size={18} /> Admin Panel
            </Link>
          </div>

          {/* Quick stats pill */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10 sm:mt-16 animate-fade-in stagger-4 px-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Users size={14} className="text-primary" />
              <span className="font-bold text-foreground">{performance.length}</span> Active Bookers
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Calendar size={14} className="text-primary" />
              <span className="font-bold text-foreground">{monthNames[currentMonth]}</span> {currentYear}
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <TrendingUp size={14} className="text-emerald-500" />
              <span className="font-bold text-foreground">{overallAchievement.toFixed(0)}%</span> Achievement
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* LIVE STATS SECTION */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="stats" className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-3">Real-Time Data</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Current Month <span className="text-gradient">Overview</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Live statistics for <span className="text-foreground font-bold">{monthNames[currentMonth]} {currentYear}</span>. 
              Updated automatically as new sales are recorded.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Sales Card */}
            <div className="glass-morphism rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 card-shine animate-slide-up stagger-1">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors" />
              <div className="relative">
                <div className="p-3 w-fit rounded-xl bg-emerald-500/10 mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp size={24} className="text-emerald-500" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total Sales</p>
                <h3 className="text-3xl font-black mt-2 text-foreground leading-none font-mono">
                  PKR {totalSales.toLocaleString()}
                </h3>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Current month revenue
                  </p>
                </div>
              </div>
            </div>

            {/* Monthly Target Card */}
            <div className="glass-morphism rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-500 card-shine animate-slide-up stagger-2">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
              <div className="relative">
                <div className="p-3 w-fit rounded-xl bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
                  <Target size={24} className="text-primary" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Monthly Target</p>
                <h3 className="text-3xl font-black mt-2 text-foreground leading-none font-mono">
                  PKR {totalTarget.toLocaleString()}
                </h3>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Combined team goal
                  </p>
                </div>
              </div>
            </div>

            {/* Achievement Card */}
            <div className="glass-morphism rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500 card-shine animate-slide-up stagger-3">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors" />
              <div className="relative">
                <div className="p-3 w-fit rounded-xl bg-amber-500/10 mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 size={24} className="text-amber-500" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Achievement</p>
                <h3 className="text-3xl font-black mt-2 text-foreground leading-none">
                  {overallAchievement.toFixed(1)}<span className="text-lg text-muted-foreground">%</span>
                </h3>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
                    <div 
                      className="h-full premium-gradient rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(overallAchievement, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performer Card */}
            <div className="glass-morphism rounded-2xl p-6 relative overflow-hidden group hover:border-chart-2/30 transition-all duration-500 card-shine animate-slide-up stagger-4">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-chart-2/10 rounded-full blur-2xl group-hover:bg-chart-2/20 transition-colors" />
              <div className="relative">
                <div className="p-3 w-fit rounded-xl bg-chart-2/10 mb-4 group-hover:scale-110 transition-transform">
                  <Award size={24} className="text-chart-2" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Top Performer</p>
                <h3 className="text-2xl font-black mt-2 text-foreground leading-none truncate">
                  {topPerformer?.name || "—"}
                </h3>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    {topPerformer ? `${topPerformer.achievement.toFixed(0)}% achievement` : "No data yet"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PERFORMANCE LEADERBOARD */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="leaderboard" className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <p className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-3">Rankings</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                Performance <span className="text-gradient">Leaderboard</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-lg">
                Real-time comparison of all Order Bookers ranked by their monthly achievement percentage.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground glass-morphism rounded-full px-4 py-2">
              <Clock size={14} />
              Updated in real-time
            </div>
          </div>
          
          <PerformanceTable data={performance} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FEATURES SECTION */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 grid-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-3">Why OBProgress</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Built for <span className="text-gradient">Performance</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            <div className="glass-morphism rounded-2xl p-8 group hover:border-emerald-500/30 transition-all duration-500 card-shine">
              <div className="p-4 w-fit rounded-2xl bg-emerald-500/10 mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp size={32} className="text-emerald-500" />
              </div>
              <h3 className="text-xl font-black mb-3">Sales Tracking</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Log daily sales with precision. Every transaction is tracked, timestamped, and instantly reflected in your performance metrics.
              </p>
            </div>

            <div className="glass-morphism rounded-2xl p-8 group hover:border-primary/30 transition-all duration-500 card-shine">
              <div className="p-4 w-fit rounded-2xl bg-primary/10 mb-6 group-hover:scale-110 transition-transform">
                <Target size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-black mb-3">Target Management</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Set monthly targets for each Order Booker. The system automatically calculates achievement percentages and updates rankings.
              </p>
            </div>

            <div className="glass-morphism rounded-2xl p-8 group hover:border-amber-500/30 transition-all duration-500 card-shine">
              <div className="p-4 w-fit rounded-2xl bg-amber-500/10 mb-6 group-hover:scale-110 transition-transform">
                <Zap size={32} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-black mb-3">Instant Reports</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Generate comprehensive yearly reports with monthly breakdowns. Visualize trends and identify top performers at a glance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* STOCK DOCUMENTS SECTION */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="documents" className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-chart-2/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <p className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-3">Resources</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                Stock <span className="text-gradient">Catalog</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-lg">
                Download the latest stock lists and product catalogs shared by the admin team.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText size={14} className="text-primary" />
              <span className="font-bold text-foreground">{stockPdfs.length}</span> documents available
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {stockPdfs.length === 0 ? (
              <div className="col-span-full glass-morphism rounded-2xl p-16 text-center border-dashed">
                <FileText className="mx-auto text-muted-foreground/20 mb-4" size={64} />
                <p className="text-muted-foreground font-medium">No documents available at this time.</p>
                <p className="text-xs text-muted-foreground/60 mt-2">Documents will appear here once uploaded by the admin.</p>
              </div>
            ) : (
              stockPdfs.map((pdf: any) => (
                <a 
                  key={pdf.id}
                  href={pdf.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-morphism rounded-2xl p-5 group hover:border-primary/30 transition-all duration-300 hover:translate-y-[-2px] card-shine flex items-center gap-4"
                >
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                    <FileText className="text-primary" size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold truncate group-hover:text-primary transition-colors">{pdf.title}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-wider mt-1">
                      {new Date(pdf.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 shrink-0" />
                </a>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CTA SECTION */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
        <div className="max-w-3xl mx-auto text-center relative z-10 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 sm:mb-8">
            <Shield size={14} />
            Admin Access
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6">
            Manage Your <span className="text-gradient">Team</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto">
            Log in to the admin panel to add Order Bookers, record sales, set monthly targets, and upload stock documents.
          </p>
          <Link 
            href="/login" 
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full premium-gradient text-white font-bold text-base sm:text-lg transition-all hover:shadow-2xl hover:shadow-primary/25 hover:scale-105 active:scale-95"
          >
            Go to Admin Panel <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FOOTER */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <footer className="border-t border-border/50 py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center text-white text-[10px] font-black">OB</div>
                <span className="font-black text-lg">OB<span className="text-gradient">Progress</span></span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Order Booker Performance Tracking System. Built for teams that demand excellence.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-8">
              <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Stats</a>
              <a href="#leaderboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Leaderboard</a>
              <a href="#documents" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documents</a>
              <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors font-bold">Admin</Link>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs text-muted-foreground/60 font-medium">
              © {currentYear} OBProgress. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/40">
              Performance data updated in real-time
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
