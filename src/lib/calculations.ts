import prisma from "./prisma";

export async function getDashboardData() {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // Get all order bookers
  const orderBookers = await prisma.orderBooker.findMany({
    include: {
      sales: {
        where: {
          date: {
            gte: new Date(currentYear, currentMonth - 1, 1),
            lt: new Date(currentYear, currentMonth, 1),
          }
        }
      },
      targets: {
        where: {
          month: currentMonth,
          year: currentYear
        }
      }
    }
  });

  const performance = orderBookers.map((ob: any) => {
    const totalSales = ob.sales.reduce((sum: number, sale: any) => sum + sale.amount, 0);
    const target = ob.targets[0]?.amount || 0;
    const achievement = target > 0 ? (totalSales / target) * 100 : 0;

    return {
      id: ob.id,
      name: ob.name,
      code: ob.code,
      totalSales,
      target,
      achievement
    };
  });

  return {
    performance,
    currentMonth,
    currentYear
  };
}
