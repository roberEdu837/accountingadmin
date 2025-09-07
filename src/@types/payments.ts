export type createPayment = {
  amount: number;
  monthlyAccountingId: number;
  paymentDate: string;
  paymentMethod: number;
};

export type Payments = {
  id?: number;
  amount: number;
  monthlyAccountingId: number;
  paymentDate: string;
  paymentMethod: number;
};
