import type { MonthlyAccounting } from "../@types/customer";

export const totalPaid = (accounting: MonthlyAccounting | undefined) => {
  const total = accounting?.paymets?.reduce((acc, payment) => acc + payment.amount, 0) || 0;
  console.log("Total paid for accounting ID", accounting?.id, ":", total);  
  return (
    accounting?.paymets?.reduce((acc, payment) => acc + payment.amount, 0) || 0
  );
};
