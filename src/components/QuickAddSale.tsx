"use client";

import { useState, useTransition } from "react";
import { Plus, Check, Loader2 } from "lucide-react";
import { addToExistingSale } from "@/app/actions/sales";
import { cn } from "@/lib/utils";

interface QuickAddSaleProps {
  saleId: string;
}

export default function QuickAddSale({ saleId }: QuickAddSaleProps) {
  const [isPending, startTransition] = useTransition();
  const [amount, setAmount] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAdd = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    startTransition(async () => {
      try {
        await addToExistingSale(saleId, numAmount);
        setAmount("");
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 2000);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <div className="flex items-center gap-1">
      <div className="relative">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Add..."
          className="w-20 bg-accent/30 border border-border/50 rounded-md px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/50 transition-all"
          disabled={isPending}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
        />
      </div>
      <button
        onClick={handleAdd}
        disabled={isPending || !amount}
        className={cn(
          "p-1.5 rounded-md transition-all",
          isSuccess 
            ? "bg-green-500/20 text-green-500" 
            : "bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isPending ? (
          <Loader2 size={14} className="animate-spin" />
        ) : isSuccess ? (
          <Check size={14} />
        ) : (
          <Plus size={14} />
        )}
      </button>
    </div>
  );
}
