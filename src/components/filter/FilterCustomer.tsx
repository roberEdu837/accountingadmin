import { useEffect, useState } from "react";
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
import { getCustomers } from "../../services/customer.service";

interface Props {
  flag: boolean;
  setCustomers: any;
}

function FilterCustomer({ flag, setCustomers }: Props) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));

  const [search, setSearch] = useState("");
  const [isInSociety, setisInSociety] = useState<boolean | undefined>(undefined);
  const [status, setStatus] = useState<boolean>(true);

  const getAccounting = async () => {
    try {
      console.log('sie enya')
      const { data } = await getCustomers({
        isInSociety,
        search,
        status,
      });
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAccounting();
  }, [flag, search, isInSociety, status]);

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
              setSearch(e.target.value);
            }}
            sx={{ mt: isMobile ? 2 : 2 }}
          />
        </Grid>

       
         <Grid size={isMobile ? 12 : 2} sx={{ mt: isMobile ? 0 : 2 }}>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Cliente asociado</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={
                isInSociety === undefined
                  ? "undefined"
                  : isInSociety
                  ? "true"
                  : "false"
              }
              label="Cliente asociado"
              onChange={(e) => {
                const raw = e.target.value;
                let value: boolean | undefined;

                switch (raw) {
                  case "true":
                    value = true; // Cliente asociado
                    break;
                  case "false":
                    value = false; // Cliente no asociado
                    break;
                  default:
                    value = undefined; // Todos
                }

                setisInSociety(value);
              }}
            >
              <MenuItem value="undefined">Todos</MenuItem>
              <MenuItem value="true">Sí</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
         <Grid size={isMobile ? 12 : 2} sx={{ mt: isMobile ? 0 : 2 }}>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Cliente asociado</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={
                status === true
                  ? "true"
                  : "false"
              }
              label="Cliente asociado"
              onChange={(e) => {
                const raw = e.target.value;
                setStatus(raw === "true" ? true : false);
              }}
            >
              <MenuItem value="true">Activos</MenuItem>
              <MenuItem value="false">Inactivos</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FilterCustomer;
