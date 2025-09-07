import { addFourYears, getTodayDate } from "../utils/formatDate";

export const customer = {
  socialReason: "",
  rfc: "",
  password: "",
  honorary: 0,
  periodicity: "",
  creationDate: getTodayDate(),
  renewalDate: addFourYears(getTodayDate()),
  isInSociety: 0
};
