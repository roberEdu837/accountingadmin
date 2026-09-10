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
  Autocomplete,
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
import { useEffect, useState } from "react";
import CloseButton from "../utils/CloseButton";
import type {  TableAccountingService } from "../../@types/services";
import { getAccountingServicesById, patchAccountingServices } from "../../services/services.service";

export default function DialogPayments({
  onClose,
  open,
  id,
  debt,
  isInSociety,
  flag,
  setFlag
}: Props) {

  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<TableAccountingService[]>([]);
  const [currentDebt, setCurrentDebt] = useState<number>(0);
  const defaultOption = { id: '', name: 'Honorarios contables' };

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await getAccountingServicesById(id);

      const result = data.filter((item) => item.debt > 0 || item.status === 'PENDING');
      setServices(result);
    };
    fetchServices();

    setCurrentDebt(debt);
  }, [id]);

  const handlePostPayment = async (values: any) => {
    ToastNotification(`El pago se agregó correctamente`, "success");
    return await postPayment(values);
  };

  const handlePostClientInSociety = async (
    id: number,
    amount: number,
    paymetId: number
  ) => {
    await postClientIsSociety(id, amount, paymetId);
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
          validationSchema={getPaymentSchema(currentDebt)}
          onSubmit={async (values, { setSubmitting }) => {
            setLoading(true);
            try {
              const { amount, accountingServiceId } = values;
              const { data } = await handlePostPayment(values);

              if (isInSociety) { await handlePostClientInSociety(id, amount, data.id); }

              if (debt === amount && accountingServiceId === undefined ) { await handlePatchAccounting(id); }

              if(currentDebt === amount && accountingServiceId){
                await patchAccountingServices(accountingServiceId)
              }

            } catch (error) {
              console.error("Error al enviar el formulario:", error);
            } finally {
              setSubmitting(false);
              onClose();
              setLoading(false);
              if(setFlag)
              setFlag(!flag)
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
            setFieldValue,
          }) => (
            (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid size={12}>


                    <Autocomplete
                      fullWidth
                      id="accountingServiceId"
                      disablePortal
                      options={services.length > 0 ? services : [defaultOption]}

                      getOptionLabel={(option: any) => {
                        if (typeof option === 'string') return option;
                        return option.services?.name || option.name || '';
                      }}

                      value={
                        !values.accountingServiceId
                          ? defaultOption
                          : services.find((service: any) => service.id === values.accountingServiceId) || null
                      }

                      onChange={(_, newValue: any) => {
                        console.log(newValue)
                        setFieldValue('accountingServiceId', newValue ? newValue.id : '');
                        setCurrentDebt(newValue?.debt ?? debt)
                      }}
                      onBlur={handleBlur}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="accountingServiceId"
                          label="Servicio"
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={12}>
                    <InputLabel id="month-select-label">
                        Pago a realizar (Deuda actual: ${currentDebt.toLocaleString('es-MX', { minimumFractionDigits: 2 })})
                      </InputLabel>
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
