"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SentimentGaugeProps {
  value: number; // 0 to 100
  label?: string;
  className?: string;
}

export default function SentimentGauge({ value, label, className }: SentimentGaugeProps) {
  const [rotation, setRotation] = useState(-90);
  const normalizedValue = Math.min(Math.max(value, 0), 100);

  useEffect(() => {
    // Map 0-100 to -90 to 90 degrees
    const targetRotation = (normalizedValue / 100) * 180 - 90;
    const timer = setTimeout(() => {
      setRotation(targetRotation);
    }, 500);
    return () => clearTimeout(timer);
  }, [normalizedValue]);

  const getSentimentText = (val: number) => {
    if (val < 25) return { text: "Critical", color: "text-rose-500", glow: "shadow-rose-500/50" };
    if (val < 50) return { text: "Below Average", color: "text-orange-500", glow: "shadow-orange-500/50" };
    if (val < 75) return { text: "Good Progress", color: "text-amber-500", glow: "shadow-amber-500/50" };
    if (val < 95) return { text: "Excellent", color: "text-emerald-500", glow: "shadow-emerald-500/50" };
    return { text: "Exceptional", color: "text-cyan-400", glow: "shadow-cyan-400/50" };
  };

  const sentiment = getSentimentText(normalizedValue);

  return (
    <div className={cn("relative flex flex-col items-center justify-center p-6 glass-morphism rounded-3xl overflow-hidden", className)}>
      {/* Background Glow */}
      <div className={cn("absolute inset-0 opacity-10 blur-3xl transition-all duration-1000", 
        normalizedValue < 40 ? "bg-rose-500" : normalizedValue < 70 ? "bg-amber-500" : "bg-emerald-500"
      )} />

      <div className="relative w-64 h-32 overflow-hidden">
        {/* The Gauge Arch */}
        <svg viewBox="0 0 100 50" className="w-full h-full transform translate-y-2">
          {/* Background Track */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-white/5"
            strokeLinecap="round"
          />
          {/* Progress Track */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="url(#gauge-gradient)"
            strokeWidth="8"
            strokeDasharray="125.6"
            strokeDashoffset={125.6 - (normalizedValue / 100) * 125.6}
            className="transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
          
          <defs>
            <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" /> {/* Rose 500 */}
              <stop offset="50%" stopColor="#f59e0b" /> {/* Amber 500 */}
              <stop offset="100%" stopColor="#10b981" /> {/* Emerald 500 */}
            </linearGradient>
          </defs>
        </svg>

        {/* The Needle */}
        <div 
          className="absolute bottom-0 left-1/2 w-1 h-24 bg-white origin-bottom z-10 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{ 
            transform: `translateX(-50%) rotate(${rotation}deg)`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg z-20 border-4 border-background" />
      </div>

      <div className="mt-4 text-center z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-1">Overall Sentiment</p>
        <h3 className={cn("text-2xl font-black tracking-tight transition-colors duration-500", sentiment.color)}>
          {sentiment.text}
        </h3>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-4xl font-black text-foreground">{normalizedValue.toFixed(0)}</span>
          <span className="text-xl font-bold text-muted-foreground/50">%</span>
        </div>
      </div>

      {/* Decorative Marks */}
      <div className="absolute bottom-6 left-10 text-[8px] font-black text-muted-foreground/30">LAGGING</div>
      <div className="absolute bottom-6 right-10 text-[8px] font-black text-muted-foreground/30">PEAKING</div>
    </div>
  );
}
