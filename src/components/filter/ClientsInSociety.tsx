import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { months, years } from "../../constants/month";
import {
  getClientInSociety,
  GetDebtsAssociated,
} from "../../services/clientInSociety.service";
import CheckDebts from "../../utils/CheckDebts";
import { useModal } from "../../hooks";

interface Props {
  setCustomers: any;
  flag: boolean;
}

export default function ClientsInSociety({ setCustomers, flag }: Props) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // 1-12
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const year =
    currentMonth === 1 ? today.getFullYear() - 1 : today.getFullYear();
  const checkModal = useModal();

  const [filter, setFilter] = useState({
    search: "",
    year: year,
    month: previousMonth,
    monthlyPaymentCompleted: undefined as boolean | undefined, // equivalente a monthlyPaymentCompleted
  });

  const getAccounting = async () => {
    try {
      const { month, search, year, monthlyPaymentCompleted } = filter;
      const { data } = await getClientInSociety({
        month,
        search,
        year,
        monthlyPaymentCompleted,
      });
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAccounting();
  }, [
    filter.year,
    filter.month,
    filter.search,
    filter.monthlyPaymentCompleted,
    flag,
  ]);

  const getDebtsAssociated = async () => {
    const { data } = await GetDebtsAssociated();
    if (data) {
      checkModal.openModal(true)
    }
  };

  useEffect(() => {
    getDebtsAssociated();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid size={isMobile ? 12 : 3}>
          <TextField
            fullWidth
            label="Buscar por razón social"
            variant="outlined"
            value={filter.search}
            onChange={(e) => {
              setFilter({ ...filter, search: e.target.value });
            }}
            sx={{ mt: isMobile ? 2 : 2 }}
          />
        </Grid>
        <Grid size={isMobile ? 12 : 2}>
          <FormControl fullWidth sx={{ mt: isMobile ? 0 : 2 }}>
            <InputLabel id="month-select-label">Mes</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              value={filter.month}
              label="Mes"
              onChange={(e) => {
                setFilter({ ...filter, month: e.target.value });
              }}
            >
              {months.map((item) => {
                return <MenuItem value={item.value}>{item.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={isMobile ? 12 : 2} sx={{ mt: isMobile ? 0 : 2 }}>
          <FormControl fullWidth>
            <InputLabel id="year-select-label">Año</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={filter.year}
              label="Año"
              onChange={(e) => {
                setFilter({ ...filter, year: e.target.value });
              }}
            >
              {years.map((item) => {
                return <MenuItem value={item.value}>{item.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={isMobile ? 12 : 2} sx={{ mt: isMobile ? 0 : 2 }}>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Estado de pago</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={
                filter.monthlyPaymentCompleted === undefined
                  ? "undefined"
                  : filter.monthlyPaymentCompleted.toString()
              }
              label="Estado de pago"
              onChange={(e) => {
                const raw = e.target.value;

                let value;
                if (raw === "undefined") {
                  value = undefined;
                } else if (raw === "false") {
                  value = false;
                } else if (raw === "true") {
                  value = true;
                }

                setFilter({ ...filter, monthlyPaymentCompleted: value });
              }}
            >
              <MenuItem value={"undefined"}>Todos</MenuItem>
              <MenuItem value="false">Por Pagar</MenuItem>
              <MenuItem value="true">Pagado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <CheckDebts
        open={checkModal.open}
        handleClose={checkModal.closeModal}
        type={1}
        setFilter={setFilter}
      />
    </Box>
  );
}
