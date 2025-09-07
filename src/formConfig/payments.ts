import * as Yup from "yup";
import { getTodayDate } from "../utils";

export const getPaymentSchema = (debt: number) => {
  return Yup.object({
    amount: Yup.number()
      .typeError("Debe ser un número")
      .required("El monto es requerido")
      .min(0.01, "Debe ser mayor que 0")
      .max(debt, `El monto debe ser menor o igual a la deuda (${debt})`),
    paymentDate: Yup.date()
      .required("La fecha de creación es requerida")
      .typeError("Fecha inválida"),
    paymentMethod: Yup.date()
      .required("El método de pago es requerido")
      .typeError("Fecha inválida"),
  });
};

export const getInitialValues = (id: number) => ({
  amount: 0,
  paymentDate: getTodayDate(),
  paymentMethod: null as string | null,
  monthlyAccountingId: id,
});

export interface Props {
  open: boolean;
  onClose: () => void;
  id: number;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
  debt: number;
  isInSociety: boolean;
}
