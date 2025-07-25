import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import DialogMessageBox from "../utils/DialogMessageBox";
import ButtonSubmit from "../utils/Button";
import { initialValues } from "../../initialValues/clientsInSociety";
import { patchClientInSociety } from "../../services/clientInSociety.service";
import ToastNotification from "../../utils/toast.notification";

interface Props {
  open: boolean;
  onClose: () => void;
  id: number;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
}
export default function DialogClientsInSociety({
  open,
  onClose,
  setFlag,
  flag,
  id,
}: Props) {
  const generatePaymentDate = async (value: any) => {
    try {
      await patchClientInSociety(id, value.paymentDate);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogMessageBox
        title="Registro de Pago a Contador Asociado"
        subtitle="Llena los campos para registrar si ya se le ha pagado al contador asociado la parte correspondiente por el cliente."
      />

      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            await generatePaymentDate(values);
            setSubmitting(false);

            if (setFlag) setFlag(!flag);

            ToastNotification(
              "Fecha de pago generada correctamente.",
              "success"
            );
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
