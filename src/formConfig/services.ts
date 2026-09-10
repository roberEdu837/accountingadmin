import type { Service } from "../@types/services";

export const AddServiceAccountingValues = {
  servicesId: 0,
  amount: 0,
}
export const serviceValues = {
  name: "",
  description: "",
};

export const additionalServicesInitialValues = (
  a?: Service | undefined,
) => {
  if (!a?.id) return serviceValues;
  const { id, name } = a;

  return {
    id: id || 0,
    name: name || "",
    description: a.description || "",
  };
};
