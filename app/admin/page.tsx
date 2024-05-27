import DashboardCard from "@/components/dashboard-card";
import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

const getSalesData = async () => {
  const data = await db.order.aggregate({
    _sum: {
      priceInCents: true,
    },
    _count: true,
  });
  await wait(1000);

  return {
    amount: (data._sum.priceInCents || 0) / 100,
    numberOfSales: data._count,
  };
};

async function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

const getUserData = async () => {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: {
        priceInCents: true,
      },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.priceInCents || 0) / userCount / 100,
  };
};

const getProductData = async () => {
  const [active, inactive] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return {
    active,
    inactive,
  };
};

const AdminPage = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8
        max-container "
    >
      <DashboardCard
        title="Sales"
        subtitle={`${salesData.numberOfSales} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customer"
        subtitle={`${formatCurrency(
          userData.averageValuePerUser
        )} Average Value`}
        body={`${userData.userCount} Users`}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${productData.inactive} Inactive `}
        body={`${productData.active}`}
      />
    </div>
  );
};

export default AdminPage;
