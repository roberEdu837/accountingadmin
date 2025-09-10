import type { Customer } from "../@types/customer";
import { addFourYears, getCreationDate, getTodayDate } from "../utils/formatDate";

export const customer = {
  socialReason: "",
  rfc: "",
  password: "",
  honorary: 0,
  periodicity: "",
  creationDate: getTodayDate(),
  renewalDate: addFourYears(getTodayDate()),
  isInSociety: 0,
};

export function customerInitialValues(c?: Customer) {
  if (!c) return customer;

  const {
    id,
    socialReason,
    rfc,
    password,
    honorary,
    periodicity,
    creationDate,
    renewalDate,
    isInSociety,
  } = c;

  return {
    id: id || 0,
    socialReason: socialReason || "",
    rfc: rfc || "",
    password: password || "",
    honorary: honorary || 0,
    periodicity: periodicity || "",
    creationDate: getCreationDate(creationDate || getTodayDate()),
    renewalDate: getCreationDate(renewalDate || getTodayDate()),
    isInSociety: isInSociety === false ? 0 : 1,
  };
}



