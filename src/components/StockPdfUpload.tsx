"use client";

import { useFormStatus } from "react-dom";
import { FileUp, FileText, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface StockPdfUploadProps {
  action: (formData: FormData) => Promise<{ success: boolean }>;
}

export default function StockPdfUpload({ action }: StockPdfUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      await action(formData);
      setFile(null);
      // Reset form manually since we use state for file UI
      const form = document.getElementById("pdf-upload-form") as HTMLFormElement;
      form?.reset();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Upload failed");
    }
  };

  return (
    <div className="glass-morphism rounded-xl p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <FileUp size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Stock PDF Update</h2>
          <p className="text-sm text-muted-foreground">Upload latest stock lists for the team</p>
        </div>
      </div>

      <form id="pdf-upload-form" action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium ml-1">
            Document Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="e.g. Stock List - May 2026"
            className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div className="relative group">
          <input
            type="file"
            id="file"
            name="file"
            required
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <div className={cn(
            "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-all",
            file ? "border-emerald-500/50 bg-emerald-500/5" : "border-border group-hover:border-primary/50 group-hover:bg-primary/5"
          )}>
            {file ? (
              <>
                <CheckCircle2 size={32} className="text-emerald-500" />
                <div className="text-center">
                  <p className="text-sm font-bold text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </>
            ) : (
              <>
                <FileText size={32} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Click to select PDF</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Maximum size 10MB</p>
                </div>
              </>
            )}
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
          <FileUp size={20} />
          Upload Document
        </>
      )}
    </button>
  );
}
