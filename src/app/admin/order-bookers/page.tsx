import { getOrderBookers, createOrderBooker } from "../../actions/orderBookers";
import OrderBookerForm from "../../../components/OrderBookerForm";
import { User, ShieldCheck, Calendar } from "lucide-react";

export default async function OrderBookersPage() {
  const orderBookers = await getOrderBookers();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Order Bookers</h1>
        <p className="text-muted-foreground mt-2">Manage and view your professional network</p>
      </div>

      <OrderBookerForm action={createOrderBooker} />

      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShieldCheck className="text-primary" size={24} />
          Registered Bookers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderBookers.length === 0 ? (
            <div className="col-span-full py-12 text-center glass-morphism rounded-xl border-dashed">
              <User className="mx-auto text-muted-foreground mb-4" size={48} />
              <p className="text-muted-foreground font-medium">No order bookers registered yet.</p>
            </div>
          ) : (
            orderBookers.map((ob: any) => (
              <div key={ob.id} className="glass-morphism rounded-xl p-5 hover:border-primary/30 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-accent rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <User size={20} />
                  </div>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded uppercase">
                    {ob.code}
                  </span>
                </div>
                <h3 className="font-bold text-lg">{ob.name}</h3>
                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground font-medium">
                  <Calendar size={14} />
                  Joined {new Date(ob.createdAt).toLocaleDateString()}
                </div>
                <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Sales</p>
                    <p className="text-lg font-bold">{ob._count.sales}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Targets</p>
                    <p className="text-lg font-bold">{ob._count.targets}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
