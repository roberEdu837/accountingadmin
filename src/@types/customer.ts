import type { PaymentFull } from "./payments";

// type Payment = {
//   id: number;
//   amount: number;
//   monthlyAccountingId: number;
// };

export type Customer = {
  id?: number;
  socialReason: string;
  rfc: string;
  password: string;
  status?: boolean;
  honorary: number;
  periodicity: string;
  creationDate:string;
  renewalDate:string;
  startOfRelationship:string;
  month?: number
};

export type MonthlyAccounting = {
  id: number;
  month: number;
  year: number;
  stateObligation: string;
  honorary: number;
  customerId: number;
  customer: Customer;
  rfcTaxPaymentDate: Date;
  paymets: PaymentFull[];
};
