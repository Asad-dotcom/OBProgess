import { getTargets, upsertTarget } from "../../actions/targets";
import { getOrderBookers } from "../../actions/orderBookers";
import TargetAssigner from "../../../components/TargetAssigner";
import { Target, Flag } from "lucide-react";

const monthNames = [
  "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default async function TargetsPage() {
  const [targets, orderBookers] = await Promise.all([
    getTargets(),
    getOrderBookers()
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Monthly Targets</h1>
        <p className="text-muted-foreground mt-2">Set and manage achievement goals for your team</p>
      </div>

      <TargetAssigner orderBookers={orderBookers} action={upsertTarget} />

      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Flag className="text-primary" size={24} />
          Active & Past Goals
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {targets.length === 0 ? (
            <div className="col-span-full py-12 text-center glass-morphism rounded-xl border-dashed">
              <Target className="mx-auto text-muted-foreground mb-4" size={48} />
              <p className="text-muted-foreground font-medium">No targets assigned yet.</p>
            </div>
          ) : (
            targets.map((target: any) => (
              <div key={target.id} className="glass-morphism rounded-xl p-5 hover:border-primary/20 transition-all">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                    {monthNames[target.month]} {target.year}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                </div>
                <h3 className="font-bold text-base mt-2">{target.orderBooker.name}</h3>
                <div className="mt-4">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Target Amount</p>
                  <p className="text-2xl font-black text-foreground">
                    PKR {target.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
