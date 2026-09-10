import type { AccountingService } from "./services";

export type createPayment = {
  amount: number;
  monthlyAccountingId: number;
  paymentDate: string;
  paymentMethod: number;
  accountingServiceId?: number;
};

export type Payments = {
  id?: number;
  amount: number;
  monthlyAccountingId: number;
  paymentDate: string;
  paymentMethod: number;
  accountingServiceId?: number;
  accountingService?: AccountingService
};

export interface Props {
  open: boolean;
  handleClose: any;
  monthlyAccountingId?: number;
  setFlag: (flag: boolean) => void;
  flag: boolean;
  monthlyPaymentCompleted?: boolean;
  nameCustomer?: string;
}
