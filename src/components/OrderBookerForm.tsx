"use client";

import { useFormStatus } from "react-dom";
import { Plus, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderBookerFormProps {
  action: (formData: FormData) => void;
}

export default function OrderBookerForm({ action }: OrderBookerFormProps) {
  return (
    <div className="glass-morphism rounded-xl p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <UserPlus size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Register Order Booker</h2>
          <p className="text-sm text-muted-foreground">Add a new professional to the tracking system</p>
        </div>
      </div>

      <form action={action} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium ml-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="e.g. John Doe"
              className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium ml-1">
              OB Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              required
              placeholder="e.g. OB001"
              className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all uppercase"
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
          <Plus size={20} />
          Create Order Booker
        </>
      )}
    </button>
  );
}
