import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { PostPayment } from "../../services/payments.service";
import ButtonSubmit from "../utils/Button";
import { postClientIsSociety } from "../../services/clientInSociety.service";
import DialogMessageBox from "../utils/DialogMessageBox";
import ToastNotification from "../../utils/toast.notification";
import { patchAccounting } from "../../services/accounting.service";

interface Props {
  open: boolean;
  onClose: () => void;
  id: number;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
  debt: number;
  isInSociety: boolean;
}

export default function DialogPayments({
  onClose,
  open,
  id,
  flag,
  setFlag,
  debt,
  isInSociety,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogMessageBox
        title="Registro de Pago de Cliente"
        subtitle="  Llena los campos para registrar un pago realizado por un cliente."
      />
      <DialogContent>
        <Formik
          initialValues={{
            amount: 0,
            paymentDate: new Date().toISOString().split("T")[0],
          }}
          validationSchema={Yup.object({
            amount: Yup.number()
              .typeError("Debe ser un número")
              .required("El monto es requerido")
              .min(0.01, "Debe ser mayor que 0")
              .max(debt, `El monto debe ser menor o igual a la deuda`),
            paymentDate: Yup.date()
              .required("La fecha de creación es requerida")
              .typeError("Fecha inválida"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const { amount, paymentDate } = values;

              const payment = {
                paymentDate,
                amount,
                monthlyAccountingId: id,
              };

              await PostPayment(payment);
              ToastNotification(`El pago se agregó correctamente`, "success");

              if (debt == amount && isInSociety) {
                await postClientIsSociety(id);
                ToastNotification(`Se agregó un registro en Cliente en Sociedad`, "success");
              }
              if(debt == amount){
               await patchAccounting(id,{
                monthlyPaymentCompleted:true
               })
              }
              if (setFlag) setFlag(!flag);
            } catch (error) {
              console.error("Error al enviar el formulario:", error);
            }
            setSubmitting(false);
            onClose();
          }}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange,
            values,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Monto"
                    name="amount"
                    variant="outlined"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.amount}
                    error={Boolean(touched.amount && errors.amount)}
                    helperText={touched.amount && errors.amount}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Fecha de Pago"
                    name="paymentDate"
                    type="date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.paymentDate}
                    error={Boolean(touched.paymentDate && errors.paymentDate)}
                    helperText={touched.paymentDate && errors.paymentDate}
                  />
                </Grid>
              </Grid>
              <DialogActions sx={{ px: 0, pt: 2 }}>
                <Button onClick={onClose} color="secondary">
                  Cancelar
                </Button>
                <ButtonSubmit text="Agregar Pago" />
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
