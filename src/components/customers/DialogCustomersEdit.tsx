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
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { patchCustomer } from "../../services/customer.service";
import { validationSchemaClient } from "../../validation/clientSchema";
import ButtonSubmit from "../utils/Button";
import type { Customer } from "../../@types/customer";
import ToastNotification from "../../utils/toast.notification";

interface Props {
  open: boolean;
  onClose: () => void;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
  client: Customer;
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

  // const renewal = new Date(creationDate);
  today.setFullYear(today.getFullYear() + 4);

  console.log(client, "CLIENTE");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box sx={{ px: 3, pt: 2 }}>
        <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#09356f" }}>
          Actualización de Cliente
        </h2>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#666" }}>
          Actualiza los datos del cliente.{" "}
        </p>
      </Box>
      <DialogContent>
        <Formik
          initialValues={{
            id: client?.id || 0,
            socialReason: client?.socialReason || "",
            rfc: client?.rfc || "",
            password: client?.password || "",
            honorary: client?.honorary || 0,
            periodicity: client?.periodicity || "",
            creationDate: client?.creationDate
              ? new Date(client.creationDate).toISOString().split("T")[0]
              : "",
            renewalDate: client?.renewalDate
              ? new Date(client.renewalDate).toISOString().split("T")[0]
              : "",
            startOfRelationship: client?.startOfRelationship
              ? new Date(client.startOfRelationship).toISOString().split("T")[0]
              : "",
          }}
          validationSchema={validationSchemaClient}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const {
                socialReason,
                rfc,
                password,
                honorary,
                periodicity,
                creationDate,
                renewalDate,
                startOfRelationship,
                id,
              } = values;

              const customerData: Customer = {
                socialReason,
                rfc,
                password,
                honorary: honorary,
                periodicity,
                creationDate: new Date(creationDate).toISOString(),
                renewalDate: new Date(renewalDate).toISOString(),
                startOfRelationship: new Date(
                  startOfRelationship
                ).toISOString(),
              };
              const { data } = await patchCustomer(customerData, id);
              console.log("Cliente agregado:", data);
            } catch (error) {
              console.error("Error al enviar el formulario:", error);
            }
            setSubmitting(false);
            if (setFlag) {
              setFlag(!flag);
            }
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
                    label="Fecha de creación"
                    name="creationDate"
                    variant="outlined"
                    type="date"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const creationDate = e.target.value;
                      handleChange(e); // Actualiza CreationDate normalmente
                      // Calcular fecha 4 años adelante
                      const renewal = new Date(creationDate);
                      renewal.setFullYear(renewal.getFullYear() + 4);
                      const formatted = renewal.toISOString().split("T")[0];

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
                    label="Fecha de Renovación"
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
                  <TextField
                    fullWidth
                    label="Fecha de inicio de relación laboral"
                    name="startOfRelationship"
                    variant="outlined"
                    type="date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.startOfRelationship}
                    error={Boolean(
                      touched.startOfRelationship && errors.startOfRelationship
                    )}
                    helperText={
                      touched.startOfRelationship && errors.startOfRelationship
                    }
                  />
                </Grid>
              </Grid>
              <DialogActions sx={{ px: 0, pt: 2 }}>
                <Button onClick={onClose} color="secondary">
                  Cancelar
                </Button>
                <ButtonSubmit text="Agregar Cliente" />
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
