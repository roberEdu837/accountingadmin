export type createPayment = {
 amount: number;
 monthlyAccountingId: number;
}

export type PaymentFull = {
 id: number,
 amount: number;
 monthlyAccountingId: number;
 paymentDate: string;
}