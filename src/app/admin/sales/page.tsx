import { getSales, createSale, deleteSale } from "../../actions/sales";
import { getOrderBookers } from "../../actions/orderBookers";
import SaleEntryForm from "../../../components/SaleEntryForm";
import { History, TrendingUp, Trash2 } from "lucide-react";

export default async function SalesPage() {
  const [sales, orderBookers] = await Promise.all([
    getSales(20),
    getOrderBookers()
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Sales Tracking</h1>
        <p className="text-muted-foreground mt-2">Log and monitor daywise sales entries</p>
      </div>

      <SaleEntryForm orderBookers={orderBookers} action={createSale} />

      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <History className="text-primary" size={24} />
          Recent Sales History
        </h2>
        
        <div className="glass-morphism rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Booker</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {sales.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground font-medium">
                    No sales entries found.
                  </td>
                </tr>
              ) : (
                sales.map((sale: any) => (
                  <tr key={sale.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{sale.orderBooker.name}</div>
                      <div className="text-[10px] text-muted-foreground font-bold">{sale.orderBooker.code}</div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-primary">
                      PKR {sale.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(sale.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <form action={async () => {
                        "use server";
                        await deleteSale(sale.id);
                      }}>
                        <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
