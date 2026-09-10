import type { Customer, TableMonthlyAccounting } from "../../@types/customer";

 export interface TableBodyProps {
  accountings?: TableMonthlyAccounting[];
  openModalPasswords: (customer: Customer) => void;
  openModalEditAccounting: (accounting: TableMonthlyAccounting) => void;
  openModalAccountingServices: (customerId: number) => void;
  handleAddPayment: (accounting: TableMonthlyAccounting, pending: number) => void;
  handleOpenPaymentsList: any;
  setCurrentAccounting: any;
  flag: boolean;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DialogUpdateProps {
  open: boolean;
  handelClose: () => void;
  accounting: TableMonthlyAccounting | undefined;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
}

export interface StatusSelectorProps {
  valorInicial: string;
  id: number;
  setFlag?: (value: boolean) => void;
  flag: boolean;
}