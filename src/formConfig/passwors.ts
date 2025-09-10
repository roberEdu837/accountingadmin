import * as Yup from "yup";
import type { PasswordDTO } from "../@types/passwors";
import type { Customer } from "../@types/customer";

export const validationSchemaPwd = Yup.object({
  systemName: Yup.string().required("El nombre del sistema es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
  accessKey: Yup.string().required("La clave de acceso es requerida o usuario"),
});

export const getInitialValuesPwd = (
  customer: Customer | undefined,
  password: PasswordDTO | undefined
) => {
  return {
    systemName: password?.systemName || "",
    accessKey: password?.accessKey || "",
    password: password?.password || "",
    customerId: password?.customerId || customer?.id || 0,
  };
};
