import type { Password } from "./passwors";
import type { Payments } from "./payments";

export type Customer = {
  id?: number;
  socialReason: string;
  rfc: string;
  status?: boolean;
  honorary: number;
  periodicity: string;
  creationDate: string;
  renewalDate: string;
  isInSociety: boolean;
  notificationSent?: boolean;
  passwords:Password[]
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
  paymets: Payments[];
  periodicity: string;
  isInSociety: boolean;
  monthlyPaymentCompleted:boolean
};

export type FilterCustomer = {
  search?: string;
  isInSociety?: boolean;
  status: boolean;
};
