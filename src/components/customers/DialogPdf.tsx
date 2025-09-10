import {
  Box,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import DialogMessageBox from "../utils/DialogMessageBox";
import { useEffect, useState } from "react";
import { monthsPdf } from "../../constants/month";
import { downloadFileFromBlob } from "./helper";
import ButtonAdd from "../utils/ButtonAdd";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import type { Customer } from "../../@types/customer";
import ToastNotification from "../utils/Toast.notification";
import { getPdfAccountingPayments } from "../../services";
interface PdfProps {
  open: boolean;
  onClose: () => void;
  customer: Customer | undefined;
}

export default function DialogPdf({ onClose, open, customer }: PdfProps) {
  const today = new Date();

  const currentMonth = today.getMonth();

  const [value, setValue] = useState("current");
  const [monthSelected, setMonth] = useState(0);

  // Función para calcular el mes inicial según periodicidad
  const getInitialMonth = () => {
    if (!customer) return 0;

    if (customer.periodicity === "MENSUAL") {
      return currentMonth;
    }

    if (customer.periodicity === "BIMESTRAL") {
      return currentMonth % 2 === 0 ? currentMonth - 1 : currentMonth;
    }

    return 0; // valor por defecto
  };

 useEffect(() => {
  if (open) {
    // Reinicia la opción al abrir el modal
    setValue("current");
    setMonth(getInitialMonth());
  }
}, [open, customer]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setValue(value);

    if (value === "past") {
      setMonth(0);
    } else {
      setMonth(getInitialMonth());
    }
  };

  const handleChangeMonth = (event: any) => {
    const selectedMonth = event.target.value;

    setMonth(selectedMonth);
  };

  const downloadFile = async () => {
    try {
      const { data } = await getPdfAccountingPayments(
        customer?.id,
        monthSelected
      );
      downloadFileFromBlob(data, "EstadoCuenta.pdf");
      ToastNotification(
        `El estado de cuenta se descargó correctamente`,
        "success"
      );
    } catch (error) {
      ToastNotification(
        `No se encontró el estado de cuenta para el mes seleccionado`,
        "error"
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      sx={{ width: "100%" }}
    >
      <DialogMessageBox
        title={`Estado de cuenta ${customer?.periodicity}`}
        subtitle={`Cliente:  ${customer?.socialReason}`}
      />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <FormControl fullWidth>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                mb={2}
              >
                <FormLabel id="demo-radio-buttons-group-label">
                  Opciones{""}
                </FormLabel>
                <ButtonAdd
                  handleClickOpen={downloadFile}
                  text="Descargar"
                  icon={<ArrowCircleDownIcon />}
                  disabled={monthSelected === 0}
                />
              </Box>

              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={handleChange}
                value={value}
              >
                <FormControlLabel
                  value="current"
                  control={<Radio />}
                  label="Último estado de cuenta"
                />
                <FormControlLabel
                  value="past"
                  control={<Radio />}
                  label="Meses anteriores"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {value === "past" && (
            <Grid size={12}>
              <FormControl fullWidth>
                <InputLabel id="month-select-label">Mes</InputLabel>
                <Select
                  labelId="month-select-label"
                  id="month-select"
                  value={monthSelected}
                  label="Mes"
                  fullWidth
                  onChange={handleChangeMonth}
                >
                  {monthsPdf
                    .filter((item) => item.value !== 0)
                    .map((item) => {
                      if (customer?.periodicity === "BIMESTRAL") {
                        // solo tomar los meses impares como inicio de bimestre
                        if (item.value % 2 !== 0) {
                          const next = monthsPdf.find(
                            (m) => m.value === item.value + 1
                          );
                          const label = `${item.label} - ${next?.label ?? ""}`;
                          return (
                            <MenuItem key={item.value} value={item.value}>
                              {label}
                            </MenuItem>
                          );
                        }
                        return null;
                      }

                      // si no es bimestral, render normal
                      return (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                </Select>{" "}
              </FormControl>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
