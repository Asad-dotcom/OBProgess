"use client";

import { useFormStatus } from "react-dom";
import { TrendingUp, Calendar, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface SaleEntryFormProps {
  orderBookers: { id: string; name: string; code: string }[];
  action: (formData: FormData) => void;
}

export default function SaleEntryForm({ orderBookers, action }: SaleEntryFormProps) {
  return (
    <div id="add-sale-form" className="glass-morphism rounded-xl p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <TrendingUp size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Log New Sale</h2>
          <p className="text-sm text-muted-foreground">Record sales performance for an Order Booker</p>
        </div>
      </div>

      <form action={action} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 col-span-full">
            <label htmlFor="orderBookerId" className="text-sm font-medium ml-1">
              Select Order Booker
            </label>
            <select
              id="orderBookerId"
              name="orderBookerId"
              required
              className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
            >
              <option value="" className="bg-background">Choose a Booker...</option>
              {orderBookers.map((ob) => (
                <option key={ob.id} value={ob.id} className="bg-background text-foreground">
                  {ob.name} ({ob.code})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium ml-1 flex items-center gap-1">
              <DollarSign size={14} className="text-muted-foreground" />
              Sale Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              required
              placeholder="0.00"
              className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium ml-1 flex items-center gap-1">
              <Calendar size={14} className="text-muted-foreground" />
              Sale Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              defaultValue={new Date().toISOString().split('T')[0]}
              className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all scheme-dark"
            />
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
          <TrendingUp size={20} />
          Add Sale
        </>
      )}
    </button>
  );
}
