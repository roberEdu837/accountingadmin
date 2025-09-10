export {
  createAccounting,
  getHasDebtsAccountings,
  getPdfAccountingPayments,
  getaccounting,
  patchAccounting,
} from "./accounting.service";
export {
  getClientInSociety,
  patchClientInSociety,
  postClientIsSociety,
} from "./clientInSociety.service";
export {
  postCustomer,
  desactivateCustomer,
  getCustomAssociates,
  getCustomers,
  patchCustomer,
} from "./customer.service";
export {
  getPasswordsById,
  patchPasswordById,
  postPasswordByCustomer,
} from "./passwords.service";

export { postPayment, getPaymentsByAccountingId } from "./payments.service";
export { login,register} from './user.service'