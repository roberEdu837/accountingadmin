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
import { useEffect, useState } from "react";
import { getYears } from "../../services/accounting.service";
import { months } from "../../constants/month";

interface Props {
  month: number;
  search: string;
  setFilter: (filter: FilterAccounting) => void;
  setFlag: (flag: boolean) => void;
  filter: FilterAccounting;
  flag: boolean;
  year: number;
}

export default function Filter({
  month,
  search,
  filter,
  flag,
  setFilter,
  setFlag,
  year,
}: Props) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));

  const [years, setYears] = useState([]);

  const getYeArs = async () => {
    const { data } = await getYears();
    setYears(data);
  };

  useEffect(() => {
    getYeArs();
  }, []);

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
            <InputLabel  id="month-select-label">Mes</InputLabel>
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
              onClick={getYeArs}
              onChange={(e) => {
                setFilter({ ...filter, year: e.target.value as number });
                setFlag(!flag);
              }}
            >
              {years.map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
