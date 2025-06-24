import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import type { Customer } from "../../@types/customer";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { getCustomAssociates } from "../../services/customer.service";

export default function ClientsInSocietyTable() {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));

  const [customers, setCustomers] = useState<Customer[] | undefined>();
  const [total, setTotal] = useState<number>(0);

  const getAccounting = async () => {
    try {
      const { data } = await getCustomAssociates();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAccounting();
  }, []);

  useEffect(() => {
    if (customers) {
      const totalValue = customers.reduce((acc, row) => {
        const associatePayment = (row.honorary / 100) * 30;
        return acc + associatePayment;
      }, 0);
      setTotal(totalValue);
    }
  }, [customers]);

  return (
    <Box
      sx={{
        padding: 2,
        width: isMobile ? "100%" : "70%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650}} aria-label="caption table">
          <thead
            style={{
              fontSize: "1.5em",
              color: "#09356f",
              marginLeft: "10px",
            }}
          >
            <tr>
              <th
                colSpan={9}
                style={{
                  fontSize: "1em",
                  color: "#09356f",
                  textAlign: "left",
                  paddingLeft: "10px",
                  fontFamily: "Segoe UI, Roboto, Helvetica Neue, sans-serif",
                  fontWeight: "300",
                }}
              >
                Contribuyentes
              </th>
            </tr>
          </thead>

          <TableHead>
            <TableRow>
              <TableCell>Razón Social</TableCell>
              <TableCell align="right">Periodicidad</TableCell>
              <TableCell align="right">Pago Asociados</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers &&
              customers.map((row) => {
                const associatePayment = (row.honorary / 100) * 30;
                return (
                  <TableRow key={row.id}>
                    <TableCell>{row.socialReason}</TableCell>
                    <TableCell align="right">{row.periodicity}</TableCell>
                    <TableCell align="right">
                      ${associatePayment.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          marginTop: 2,
          textAlign: "right",
          fontSize: "1.2em",
          color: "#09356f",
          width: "100%",
        }}
      >
        Total Pago Asociados: ${total.toFixed(2)}
      </Box>
    </Box>
  );
}
