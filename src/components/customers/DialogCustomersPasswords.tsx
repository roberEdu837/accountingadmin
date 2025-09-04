import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import ButtonSubmit from "../utils/Button";
import ToastNotification from "../../utils/toast.notification";
import DialogMessageBox from "../utils/DialogMessageBox";
import { validationSchemaPassword } from "../../validation/passwordSchema";
import {
  postPasswordByCustomer,
  putPasswordById,
} from "../../services/passwords.service";
import type { Customer } from "../../@types/customer";
import type { PasswordDTO } from "../../@types/passwors";

interface Props {
  open: boolean;
  onClose: () => void;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
  customer?: Customer | undefined;
  isEdit: boolean;
  password?: PasswordDTO;
}

export default function DialogCustomersPasswords({
  onClose,
  open,
  setFlag,
  flag,
  customer,
  isEdit,
  password,
}: Props) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogMessageBox
        title={isEdit ? "Editar Contraseña" : "Registrar Contraseña"}
        subtitle={
          isEdit
            ? `Modifica los datos para la contraseña del cliente ${
                customer?.socialReason || password?.customer.socialReason
              }.`
            : `Llena los campos para agregar una nueva contraseña al cliente ${
                customer?.socialReason || password?.customer.socialReason
              }.`
        }
      />

      <DialogContent>
        <Formik
          initialValues={{
            systemName: password?.systemName ? password?.systemName : "",
            accessKey: password?.accessKey ? password?.accessKey : "",
            password: password?.password ? password?.password : "",
            description: password?.description ? password?.description : "",
            customerId: password?.customerId
              ? password.customerId
              : customer?.id
              ? customer.id
              : 0,
          }}
          validationSchema={validationSchemaPassword}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (isEdit && password?.id) {
                await putPasswordById(password?.id, values);
              } else {
                await postPasswordByCustomer(values);
              }
            } catch (error) {
              console.error("Error al enviar el formulario:", error);
            } finally {
              setSubmitting(false);
              if (setFlag) setFlag(!flag);
              ToastNotification(
                isEdit
                  ? `La contraseña para el cliente "${customer?.socialReason || password?.customer.socialReason}" se actualizó correctamente`
                  : `La contraseña para el cliente "${customer?.socialReason || password?.customer.socialReason}" se creó correctamente`,
                "success"
              );

              onClose();
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
                    label="Sistema"
                    name="systemName"
                    variant="outlined"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.systemName}
                    error={Boolean(touched.systemName && errors.systemName)}
                    helperText={touched.systemName && errors.systemName}
                  />
                </Grid>
                <Grid size={isMobile ? 12 : 6}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Usuario"
                    name="accessKey"
                    variant="outlined"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.accessKey}
                    error={Boolean(touched.accessKey && errors.accessKey)}
                    helperText={touched.accessKey && errors.accessKey}
                  />
                </Grid>
                <Grid size={12}>
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
                <Grid size={12}>
                  <TextField
                    fullWidth
                    multiline
                    margin="dense"
                    label="Descripción"
                    name="description"
                    variant="outlined"
                    type="text"
                    rows={3}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>
              </Grid>
              <DialogActions sx={{ px: 0, pt: 2 }}>
                <Button onClick={onClose} color="secondary">
                  Cancelar
                </Button>
                <ButtonSubmit text="Guardar" />
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
