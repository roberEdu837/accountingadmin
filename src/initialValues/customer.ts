import { currentDate, renewalDate } from "../utils/formatDate";

export const customer = {
  socialReason: "",
  rfc: "",
  password: "",
  honorary: "",
  periodicity: "",
  creationDate: currentDate(),
  renewalDate: renewalDate(),
  isInSociety: 0
};
