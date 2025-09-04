import type { Customer } from "./customer";

export type Password = {
  id?: number;
  systemName: string;
  accessKey: string;
  password: string;
  description?: string;
  customerId: number; 
};

export type PasswordDTO = {
  id?: number;
  systemName: string;
  accessKey: string;
  password: string;
  description?: string;
  customerId: number; 
  customer: Customer
};
