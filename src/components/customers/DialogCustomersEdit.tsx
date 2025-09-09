import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { patchCustomer } from "../../services/customer.service";
import { validationSchemaClient } from "../../validation/clientSchema";
import ButtonSubmit from "../utils/Button";
import type { Customer } from "../../@types/customer";
import ToastNotification from "../../utils/toast.notification";
import DialogMessageBox from "../utils/DialogMessageBox";
import { addFourYears, getTodayDate } from "../../utils";
import {  getCreationDate } from "../../utils/formatDate";

interface Props {
  open: boolean;
  onClose: () => void;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
  client?: Customer;
}

export default function DialogCustomersEdit({
  onClose,
  open,
  setFlag,
  flag,
  client,
}: Props) {
  const today = new Date();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));

  today.setFullYear(today.getFullYear() + 4);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogMessageBox
        title="Actualización de Cliente"
        subtitle="Actualiza los datos del cliente."
      />
      <DialogContent>
        <Formik
          initialValues={{
            id: client?.id || 0,
            socialReason: client?.socialReason || "",
            rfc: client?.rfc || "",
            password: client?.password || "",
            honorary: client?.honorary || 0,
            periodicity: client?.periodicity || "",
            creationDate: getCreationDate(client?.creationDate || getTodayDate()),
            renewalDate: getCreationDate(client?.renewalDate || getTodayDate()),
            isInSociety: client?.isInSociety === false ? 0 : 1,
          }}
          validationSchema={validationSchemaClient}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const data: Customer = {
                ...values,
                isInSociety: values.isInSociety === 0 ? false : true,
                notificationSent: client?.creationDate !== values.creationDate ? false : client?.notificationSent,
              };

              await patchCustomer(data, values.id);
            } catch (error) {
              console.error("Error al enviar el formulario:", error);
            }
            setSubmitting(false);

            if (setFlag) setFlag(!flag);

            ToastNotification(
              `El cliente ${values.socialReason} se actualizó correctamente`,
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
                <Grid size={isMobile ? 12 : 6}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Razón social"
                    name="socialReason"
                    variant="outlined"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.socialReason}
                    error={Boolean(touched.socialReason && errors.socialReason)}
                    helperText={touched.socialReason && errors.socialReason}
                  />
                </Grid>
                <Grid size={isMobile ? 12 : 6}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="RFC"
                    name="rfc"
                    variant="outlined"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.rfc}
                    error={Boolean(touched.rfc && errors.rfc)}
                    helperText={touched.rfc && errors.rfc}
                  />
                </Grid>
                <Grid size={isMobile ? 12 : 6}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Contraseña"
                    name="password"
                    variant="outlined"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid size={isMobile ? 12 : 6}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Honorarios"
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
                <Grid size={isMobile ? 12 : 6}>
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
                <Grid size={isMobile ? 12 : 6}>
                  <TextField
                    fullWidth
                    label="Fecha de emisión FIEL"
                    name="creationDate"
                    variant="outlined"
                    type="date"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const creationDate = e.target.value;
                      handleChange(e); // Actualiza CreationDate normalmente
                      const formatted = addFourYears(creationDate);

                      // Actualiza RenewalDate manualmente
                      handleChange({
                        target: {
                          name: "renewalDate",
                          value: formatted,
                        },
                      });
                    }}
                    value={values.creationDate}
                    error={Boolean(touched.creationDate && errors.creationDate)}
                    helperText={touched.creationDate && errors.creationDate}
                  />
                </Grid>
                <Grid size={isMobile ? 12 : 6}>
                  <TextField
                    fullWidth
                    label="Fecha de actualización FIEL"
                    name="renewalDate"
                    variant="outlined"
                    type="date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.renewalDate}
                    error={Boolean(touched.renewalDate && errors.renewalDate)}
                    helperText={touched.renewalDate && errors.renewalDate}
                  />
                </Grid>
                <Grid size={isMobile ? 12 : 6}>
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
                <Button onClick={onClose} color="secondary">
                  Cancelar
                </Button>
                <ButtonSubmit text="Actualizar Cliente" />
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
