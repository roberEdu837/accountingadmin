export type Payment = {
  paymentDate: string;
  amount: number;
};

export type AccountStatement = {
  customerName: string;
  rfc: string;
  period: string;
  payments: Payment[];
};
