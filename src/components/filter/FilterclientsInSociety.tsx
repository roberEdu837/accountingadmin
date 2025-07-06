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
import { months } from "../../constants/month";
import { useDispatch, useSelector } from "react-redux";
import {
  setmonth,
  setsearch,
  setstatus,
  setyear,
} from "../../redux/slices/filterSlice";
import { useEffect } from "react";

interface Props {
  setFlag: (flag: boolean) => void;
  flag: boolean;
}

export default function FilterclientsInSociety({ flag, setFlag }: Props) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));

  useEffect(() => {
    const storedMonth = localStorage.getItem("month");
    const storedYear = localStorage.getItem("year");
    const storedSearch = localStorage.getItem("search");
    const storedStatus = localStorage.getItem("status");

    if (storedMonth) {
      dispatch(setmonth(parseInt(storedMonth)));
    }
    if (storedYear) {
      dispatch(setyear(parseInt(storedYear)));
    }
    if (storedSearch) {
      dispatch(setsearch(storedSearch));
    }

    if (storedStatus === null || storedStatus === undefined || storedStatus === "undefined") {
      dispatch(setstatus(undefined));
    } else {
      dispatch(setstatus(JSON.parse(storedStatus)));
    }
    

  }, []);
  const { month, search, year, status } = useSelector(
    (state: any) => state.filter
  );
  const dispatch = useDispatch<any>();

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid size={isMobile ? 12 : 2}>
          <TextField
            fullWidth
            label="Buscar por razón social"
            variant="outlined"
            value={search}
            onChange={(e) => {
              dispatch(setsearch(e.target.value));
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
                dispatch(setmonth(e.target.value));
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
            <InputLabel id="year-select-label">Año</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={year}
              label="Año"
              onChange={(e) => {
                dispatch(setyear(e.target.value));
                setFlag(!flag);
              }}
            >
              <MenuItem value={0}>Todos</MenuItem>
              <MenuItem value={2025}>2025</MenuItem>
              <MenuItem value={2026}>2026</MenuItem>
              <MenuItem value={2027}>2027</MenuItem>
              <MenuItem value={2028}>2028</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={isMobile ? 12 : 2} sx={{ mt: isMobile ? 0 : 2 }}>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={status === undefined ? "undefined" : status.toString()}
              label="Status"
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

                dispatch(setstatus(value));
                setFlag(!flag);
              }}
            >
              <MenuItem value={"undefined"}>Todos</MenuItem>
              <MenuItem value="false">Por Pagar</MenuItem>
              <MenuItem value="true">Pagado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
