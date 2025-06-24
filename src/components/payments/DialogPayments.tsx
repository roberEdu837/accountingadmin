import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { PostPayment } from "../../services/payments.service";
import ButtonSubmit from "../utils/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  id: number | null;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
}

export default function DialogPayments({
  onClose,
  open,
  id,
  flag,
  setFlag,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box sx={{ px: 3, pt: 2 }}>
      <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#09356f" }}>
        Registro de Pago de Cliente
      </h2>
      <p style={{ margin: 0, fontSize: "0.875rem", color: "#666" }}>
        Llena los campos para registrar un pago realizado por un cliente.
      </p>
      </Box>

      <DialogContent>
        <Formik
          initialValues={{ amount: 0 }}
          validationSchema={Yup.object({
            amount: Yup.number()
              .typeError("Debe ser un número")
              .required("El monto es requerido")
              .min(0.01, "Debe ser mayor que 0"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            console.log("Form values:", values, "ID:", id);
            try {
              const payment = {
                amount: values.amount,
                monthlyAccountingId: id, // Asegúrate de que 'id' sea el ID correcto
              };
              const data = await PostPayment(payment);
              console.log("Pago enviado:", data);
              if (setFlag) {
                setFlag(!flag); // Alterna el estado del flag
              }
            } catch (error) {
              console.error("Error al enviar el formulario:", error);
            }
            setSubmitting(false);
            onClose(); // Cierra el diálogo después de enviar
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
