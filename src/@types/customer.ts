import type { Password } from "./passwors";
import type { Payments } from "./payments";
import type { TableAccountingService } from "./services";

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


export type TableMonthlyAccounting = {
  id: number;
  month: number;
  year: number;
  stateObligation: string;
  honorary: number;
  customerId: number;
  customer: Customer;
  rfcTaxPaymentDate: Date;
  periodicity: string;
  isInSociety: boolean;
  monthlyPaymentCompleted: boolean;
  // Campos calculados por el backend:
  paid: number;
  debt: number;
  totalToPay: number;
  paidAccounting: number;
  paidServices: number;
  debtAccounting: number;
  debtServices: number;
  accountingServices: TableAccountingService[];
  paymets: Payments[];
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
