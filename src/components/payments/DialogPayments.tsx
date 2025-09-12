import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Formik } from "formik";
import ButtonSubmit from "../utils/Button";
import DialogMessageBox from "../utils/DialogMessageBox";
import ToastNotification from "../utils/ToastNotification";
import {
  getPaymentSchema,
  getInitialValues,
  type Props,
} from "../../formConfig";
import { Icons } from "../utils/Icons";
import {
  patchAccounting,
  postClientIsSociety,
  postPayment,
} from "../../services";
import { useState } from "react";
import CloseButton from "../utils/CloseButton";

export default function DialogPayments({
  onClose,
  open,
  id,
  flag,
  setFlag,
  debt,
  isInSociety,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handlePostPayment = async (values: any) => {
    ToastNotification(`El pago se agregó correctamente`, "success");
    return await postPayment(values);
  };

  const handlePostClientInSociety = async (
    id: number,
    amount: number,
    paymetId: number
  ) => {
    await postClientIsSociety(id,amount,paymetId);
    ToastNotification(
      `Se agregó un registro en Cliente en Sociedad`,
      "success"
    );
  };

  const handlePatchAccounting = async (id: number) => {
    await patchAccounting(id, {
      monthlyPaymentCompleted: true,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogMessageBox
        title="PAGO DE CLIENTE"
        subtitle="Registra un nuevo pago realizado por el cliente."
      />
      <CloseButton onClose={onClose} />

      <DialogContent>
        <Formik
          initialValues={getInitialValues(id)}
          validationSchema={getPaymentSchema(debt)}
          onSubmit={async (values, { setSubmitting }) => {
            setLoading(true);
            try {
              const { amount } = values;
              const { data } = await handlePostPayment(values); // 1. Guardar pago

              if ( isInSociety) {
                await handlePostClientInSociety(id, amount, data.id); // 2. Cliente en sociedad
              }

              if (debt === amount) {
                await handlePatchAccounting(id); // 3. Contabilidad completada
              }

              if (setFlag) setFlag(!flag); // 4. Actualizar flag
            } catch (error) {
              console.error("Error al enviar el formulario:", error);
            } finally {
              setSubmitting(false);
              onClose();
              setLoading(false);
            }
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
            (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      margin="dense"
                      label="Monto"
                      name="amount"
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
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel id="month-select-label">
                        Método de Pago
                      </InputLabel>
                      <Select
                        labelId="month-select-label"
                        id="month-select"
                        value={values.paymentMethod}
                        label="Método de Pago"
                        name="paymentMethod"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(
                          touched.paymentMethod && errors.paymentMethod
                        )}
                      >
                        <MenuItem value={0}>Efectivo</MenuItem>
                        <MenuItem value={1}>Transferencia</MenuItem>
                        <MenuItem value={2}>Retiro sin tarjeta</MenuItem>
                      </Select>
                      {touched.paymentMethod && errors.paymentMethod && (
                        <FormHelperText sx={{ color: "#d32f2f" }}>
                          {errors.paymentMethod}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <DialogActions sx={{ px: 0, pt: 2 }}>
                  <ButtonSubmit
                    text="Agregar"
                    icon={Icons.addWhite}
                    loading={loading}
                  />
                </DialogActions>
              </form>
            )
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
