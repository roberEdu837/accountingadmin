import { Formik } from "formik";
import { patchPasswordById, postPasswordByCustomer } from "../../../services";
import ToastNotification from "../../utils/ToastNotification";
import {
  DialogActions,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ButtonSubmit from "../../utils/Button";
import { Icons } from "../../utils/Icons";
import type { PasswordDTO } from "../../../@types/passwors";
import type { Customer } from "../../../@types/customer";
import { getInitialValuesPwd, validationSchemaPwd } from "../../../formConfig";
interface Props {
  onClose: () => void;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
  customer?: Customer | undefined;
  isEdit: boolean;
  password?: PasswordDTO;
}

export default function PasswordForm({
  customer,
  password,
  isEdit,
  onClose,
  flag,
  setFlag,
}: Props) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));

  return (
    <Formik
      initialValues={getInitialValuesPwd(customer, password)}
      validationSchema={validationSchemaPwd}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          if (isEdit && password?.id) {
            await patchPasswordById(password?.id, values);
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
              ? `La contraseña para el cliente "${
                  customer?.socialReason || password?.customer.socialReason
                }" se actualizó correctamente`
              : `La contraseña para el cliente "${
                  customer?.socialReason || password?.customer.socialReason
                }" se creó correctamente`,
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
            <Grid size={12}>
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
          </Grid>
          <DialogActions sx={{ px: 0, pt: 2 }}>
            <ButtonSubmit
              text={isEdit ? "Actualizar" : "Agregar"}
              icon={Icons.addWhite}
            />
          </DialogActions>
        </form>
      )}
    </Formik>
  );
}
