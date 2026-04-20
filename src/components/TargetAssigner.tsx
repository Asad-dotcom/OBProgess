"use client";

import { useFormStatus } from "react-dom";
import { Target, Calendar, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TargetAssignerProps {
  orderBookers: { id: string; name: string; code: string }[];
  action: (formData: FormData) => void;
}

export default function TargetAssigner({ orderBookers, action }: TargetAssignerProps) {
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear + 1];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="glass-morphism rounded-xl p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Target size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Assign Monthly Target</h2>
          <p className="text-sm text-muted-foreground">Set performance goals for Order Bookers</p>
        </div>
      </div>

      <form action={action} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2 lg:col-span-1">
            <label htmlFor="orderBookerId" className="text-sm font-medium ml-1">
              Booker
            </label>
            <select
              id="orderBookerId"
              name="orderBookerId"
              required
              className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none text-sm"
            >
              <option value="" className="bg-background">Select Booker...</option>
              {orderBookers.map((ob) => (
                <option key={ob.id} value={ob.id} className="bg-background">
                  {ob.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="month" className="text-sm font-medium ml-1">
              Month
            </label>
            <select
              id="month"
              name="month"
              required
              defaultValue={new Date().getMonth() + 1}
              className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none text-sm"
            >
              {months.map((m, i) => (
                <option key={m} value={i + 1} className="bg-background">
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="year" className="text-sm font-medium ml-1">
              Year
            </label>
            <select
              id="year"
              name="year"
              required
              defaultValue={currentYear}
              className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none text-sm"
            >
              {years.map((y) => (
                <option key={y} value={y} className="bg-background">
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium ml-1">
              Target Amount
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                name="amount"
                step="0.01"
                required
                placeholder="50000"
                className="w-full bg-accent/50 border border-border rounded-lg pl-8 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            </div>
          </div>
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "premium-gradient w-full py-3 rounded-lg font-semibold text-white shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2",
        pending ? "opacity-70 cursor-not-allowed" : "hover:shadow-primary/20 hover:opacity-90"
      )}
    >
      {pending ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          <BarChart3 size={20} />
          Set Target
        </>
      )}
    </button>
  );
}
