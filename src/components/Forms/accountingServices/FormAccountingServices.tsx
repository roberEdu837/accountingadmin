import {
  DialogActions,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import ButtonSubmit from "../../utils/Button";
import { Icons } from "../../utils/Icons";
import { useEffect, useState } from "react";
import { validationSchemaAddServiceAccounting } from "../../../validation/services";
import { AddServiceAccountingValues } from "../../../formConfig/services";
import type { AddAccountingService, Service } from "../../../@types/services";
import { getServices, postAddServiceAccounting } from "../../../services/services.service";
import ToastNotification from "../../utils/ToastNotification";


interface Props {
  onClose: () => void;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
  id: number;
}

export default function FormAccountingServices({
  onClose, flag, setFlag, id
}: Props) {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<
    Service[] | undefined
  >();

  useEffect(() => {
    const fetchAccountingServices = async () => {
      try {
        const { data } = await getServices();
        
        setServices(data);
      } catch (error) {
        console.error("Error fetching accounting services:", error);
      }
    };

    fetchAccountingServices();
  }, [flag]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={AddServiceAccountingValues}
      validationSchema={validationSchemaAddServiceAccounting}
      onSubmit={async (values, { setSubmitting }) => {

        setLoading(true);

        const body: AddAccountingService = {
          ...values,
          monthlyAccountingId: id,
          status: "PENDING",
        }
        try {
          await postAddServiceAccounting(body);
          ToastNotification(
            `El servicio adicional asignado correctamente`,
            "success"
          );
        } catch (error) {
        } finally {
          onClose();
          setLoading(false);
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
          <Grid size={12}>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id="demo-simple-select-label">
                Servicio Adicional
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={values.servicesId}
                label="Servicio Adicional"
                name="servicesId"
                onChange={handleChange}
                onAbort={handleBlur}
                error={Boolean(touched.servicesId && errors.servicesId)}
              >
                {
                  services?.map((service) => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={12}>
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
            </Grid>
          </Grid>
          <DialogActions sx={{ px: 0, pt: 2 }}>
            <ButtonSubmit
              text={"Agregar"}
              icon={Icons.addWhite}
              loading={loading}
            />
          </DialogActions>
        </form>
      )}
    </Formik>
  );
}


