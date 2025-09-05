import type { MonthlyAccounting } from "../@types/customer";

export const totalPaid = (accounting: MonthlyAccounting | undefined) => {
  return (
    accounting?.paymets?.reduce((acc, payment) => acc + payment.amount, 0) || 0
  );
};
