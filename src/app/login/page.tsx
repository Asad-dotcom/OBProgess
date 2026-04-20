"use client";

import { useActionState, useEffect, useRef } from "react";
import { authenticate, seedAdmin } from "@/app/actions/auth";
import { Lock, User, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(authenticate, null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (state?.error && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }
  }, [state]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background overflow-hidden relative">
      {/* Hidden Audio */}
      <audio ref={audioRef} src="/sounds/fah.mp3" preload="auto" />

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] animate-pulse" />

      <div className={cn(
        "w-full max-w-md space-y-8 glass-morphism rounded-3xl p-10 shadow-2xl relative z-10 transition-all duration-300",
        state?.error && "animate-shake border-destructive/50"
      )}>
        <div className="text-center">
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-6 ring-1 ring-primary/20">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            OB<span className="text-primary italic">Progress</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Administrator Portal</p>
        </div>

        {state?.error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-3 text-destructive animate-slide-up">
            <AlertCircle size={20} />
            <p className="text-sm font-bold capitalize">{state.error}</p>
          </div>
        )}

        <form action={formAction} className="space-y-6 mt-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
              Username
            </label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="text"
                name="username"
                required
                className="w-full bg-accent/30 border border-border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="password"
                name="password"
                required
                className="w-full bg-accent/30 border border-border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={pending}
            className={cn(
              "premium-gradient w-full py-4 rounded-xl font-bold text-white shadow-xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4",
              pending ? "opacity-70 cursor-not-allowed" : "hover:shadow-primary/30 hover:opacity-90"
            )}
          >
            {pending ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>

        <p className="text-center text-[10px] text-muted-foreground uppercase font-black tracking-widest">
          Secure encrypted access only
        </p>

        <div className="pt-6 border-t border-border/50 text-center">
          <button 
            onClick={async () => {
              const res = await seedAdmin();
              if (res) alert(res.message);
            }}
            className="text-[10px] text-primary/50 hover:text-primary font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <Sparkles size={10} /> Perform Initial Setup
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}
