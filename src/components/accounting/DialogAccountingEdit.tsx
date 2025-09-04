import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import ButtonSubmit from "../utils/Button";
import DialogMessageBox from "../utils/DialogMessageBox";
import ToastNotification from "../../utils/toast.notification";
import type { MonthlyAccounting } from "../../@types/customer";
import InfoIcon from "@mui/icons-material/Info";
import { patchAccounting } from "../../services/accounting.service";

interface Props {
  open: boolean;
  handelClose: () => void;
  accounting: MonthlyAccounting | undefined;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
}

export default function DialogAccountingEdit({
  handelClose,
  open,
  accounting,
  flag,
  setFlag,
}: Props) {
  function getTotalPayments(accounting?: MonthlyAccounting): number {
    if (!accounting || !accounting.paymets) return 0;
    return accounting.paymets.reduce((acc, payment) => acc + payment.amount, 0);
  }

  return (
    <Dialog open={open} onClose={handelClose} fullWidth maxWidth="sm">
      <DialogMessageBox
        title="Actualizar la Contabilidad"
        subtitle="Modifica la contabilidad mensual."
      />
      <DialogContent>
        <Formik
          initialValues={{
            honorary: accounting?.honorary || 0,
            periodicity: accounting?.periodicity,
            isInSociety: accounting?.isInSociety === false ? 0 : 1,
          }}
          validationSchema={Yup.object({
            honorary: Yup.number()
              .typeError("Debe ser un número")
              .required("El honorario es requerido")
              .min(
                getTotalPayments(accounting),
                `Debe ser mayor o igual ${getTotalPayments(accounting)}`
              ),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (!accounting) return null;
              const { honorary, periodicity, isInSociety } = values;
              console.log(honorary)
              console.log(accounting.honorary )

              await patchAccounting(accounting.id, {
                honorary,
                periodicity,
                isInSociety: isInSociety === 0 ? false : true,
                monthlyPaymentCompleted:
                  honorary > accounting.honorary ? false : true, // true si el pago es suficiente
              });

              if (setFlag) setFlag(!flag);
            } catch (error) {
              console.error("Error al enviar el formulario:", error);
            }
            setSubmitting(false);
            handelClose();
            ToastNotification(
              `La contabilidad se actualizó correctamente`,
              "success"
            );
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
                  <Tooltip
                    title={
                      '"No se puede establecer un honorario menor a la cantidad ya pagada"'
                    }
                    color="warning"
                    arrow
                  >
                    <IconButton size="small">
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Honorario"
                    name="honorary"
                    variant="outlined"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.honorary}
                    error={Boolean(touched.honorary && errors.honorary)}
                    helperText={touched.honorary && errors.honorary}
                  />
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Periodicidad
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={values.periodicity}
                      label="Periodicidad"
                      name="periodicity"
                      onChange={handleChange}
                      onAbort={handleBlur}
                      error={Boolean(touched.periodicity && errors.periodicity)}
                    >
                      <MenuItem value={"MENSUAL"}>MENSUAL</MenuItem>
                      <MenuItem value={"BIMESTRAL"}>BIMESTRAL</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth>
                    <InputLabel id="month-select-label">
                      ¿Cliente en sociedad?
                    </InputLabel>
                    <Select
                      labelId="month-select-label"
                      id="month-select"
                      value={values.isInSociety}
                      label="¿Cliente en sociedad?"
                      name="isInSociety"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={0}>No</MenuItem>
                      <MenuItem value={1}>Sí</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <DialogActions sx={{ px: 0, pt: 2 }}>
                <Button onClick={handelClose} color="secondary">
                  Cancelar
                </Button>
                <ButtonSubmit text="Actualizar" />
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
