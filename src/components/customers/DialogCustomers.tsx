import {
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
import { patchCustomer, PostCustomer } from "../../services/customer.service";
import { validationSchemaClient } from "../../validation/clientSchema";
import ButtonSubmit from "../utils/Button";
import type { Customer } from "../../@types/customer";
import ToastNotification from "../../utils/toast.notification";
import DialogMessageBox from "../utils/DialogMessageBox";
import { addFourYears } from "../../utils";
import { customerInitialValues } from "../../formConfig";
import { Icons } from "../../constants/Icons";

interface Props {
  open: boolean;
  onClose: () => void;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
  customer: Customer | undefined;
}

export default function DialogCustomers({
  onClose,
  open,
  setFlag,
  flag,
  customer,
}: Props) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));

  const handleCreateCustomer = async (v: any) => {
    const customerData: Customer = {
      ...v,
      isInSociety: v.isInSociety === 0 ? false : true,
    };
    const { data } = await PostCustomer(customerData);
    ToastNotification(
      `El cliente ${data.socialReason} se creó correctamente`,
      "success"
    );
  };

  const handleUpdateCustomer = async (values: any) => {
    const data: Customer = {
      ...values,
      isInSociety: values.isInSociety === 0 ? false : true,
      notificationSent:
        customer?.creationDate !== values.creationDate
          ? false
          : customer?.notificationSent,
    };

    await patchCustomer(data, values.id);
    ToastNotification(
      `El cliente ${values.socialReason} se actualizó correctamente`,
      "success"
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogMessageBox
        title={customer?.id ? "Actualizar Cliente" : "Registro de Cliente"}
        subtitle={
          customer?.id
            ? "Modifica los campos para actualizar al cliente."
            : "Llena los campos para agregar un nuevo cliente."
        }
      />

      <DialogContent>
        <Formik
          enableReinitialize={true}
          initialValues={customerInitialValues(customer)}
          validationSchema={validationSchemaClient}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (customer?.id) {
                await handleUpdateCustomer(values);
              } else {
                await handleCreateCustomer(values);
              }
            } catch (error) {
            } finally {
              onClose();
              setSubmitting(false);
              if (setFlag) setFlag(!flag);
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
                    onChange={(e) => {
                      const rfc = e.target.value.toUpperCase();
                      handleChange({
                        target: {
                          name: "rfc",
                          value: rfc,
                        },
                      });
                    }}
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
                <ButtonSubmit
                  text={customer?.id ? "Actualizar" : "Agregar"}
                  icon={customer?.id ? Icons.editWhite : Icons.addWhite}
                />
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
