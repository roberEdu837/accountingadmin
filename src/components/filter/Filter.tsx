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
import type { FilterAccounting } from "../../@types/FilterAccounting";
import { months, years } from "../../constants/month";

interface Props {
  
  setFilter: (filter: FilterAccounting) => void;
  setFlag: (flag: boolean) => void;
  filter: FilterAccounting;
  flag: boolean;
}

export default function Filter({
  filter,
  flag,
  setFilter,
  setFlag}: Props) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
  const { month, search, year } = filter;

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid size={isMobile ? 12 : 3}>
          <TextField
            fullWidth
            label="Buscar por razón social"
            variant="outlined"
            value={search}
            onChange={(e) => {
              setFilter({ ...filter, search: e.target.value });
              setFlag(!flag);
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
              value={month}
              label="Mes"
              onChange={(e) => {
                setFilter({ ...filter, month: e.target.value as number });
                setFlag(!flag);
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
            <InputLabel id="month-select-label">Año</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              value={year}
              label="Año"
              onChange={(e) => {
                setFilter({ ...filter, year: e.target.value as number });
                setFlag(!flag);
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
              value={filter.monthlyPaymentCompleted === undefined ? "undefined" : filter.monthlyPaymentCompleted.toString()}
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
                setFilter({ ...filter, monthlyPaymentCompleted: value  });
                setFlag(!flag);
              }}
            >
              <MenuItem value={"undefined"}>Todos</MenuItem>
              <MenuItem value="false">Por cobrar</MenuItem>
              <MenuItem value="true">Pagado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
