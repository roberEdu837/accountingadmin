import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import DialogMessageBox from "../utils/DialogMessageBox";
import ButtonSubmit from "../utils/Button";
import { initialValues } from "../../formConfig/clientsInSociety";
import ToastNotification from "../utils/ToastNotification";
import { patchClientInSociety } from "../../services";
import { Icons } from "../utils/Icons";

interface Props {
  open: boolean;
  onClose: () => void;
  id: number;
  setFlag: (flag: boolean) => void;
  flag: boolean;
}
export default function PaymentDateGenerator({
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
        title="Registro de Fecha de Pago"
        subtitle="Indica la fecha en la que se realizó el pago al contador asociado."
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
                <ButtonSubmit text="Agregar" icon={Icons.addWhite} />
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
