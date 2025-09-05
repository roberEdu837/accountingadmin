import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import DialogClientsInSociety from "./DialogDlientsInSociety";
import PaymentIcon from "@mui/icons-material/Payment";
import { formatFullDate, getMonthLabel } from "../../utils/formatDate";
import ClientsInSociety from "../filter/ClientsInSociety";

export default function ClientsInSocietyTable() {
  const [flag, setFlag] = useState<boolean>(false);
  const [customers, setCustomers] = useState<any[]>();
  const [total, setTotal] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (customers) {
      const totalValue = customers.reduce((acc, row) => {
        const associatePayment = (row.amount / 100) * 30;
        if (row.status === true) {
          return acc;
        }
        return acc + associatePayment;
      }, 0);
      setTotal(totalValue);
    }
  }, [customers]);

  return (
    <>
      <ClientsInSociety flag={flag} setCustomers={setCustomers} />
      <Box sx={{ padding: 2 }}>
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 650,
              "& th, & td": {
                color: "#5d5a5aff",
                padding: "15px 9px", // menos espacio en celdas
                fontSize: "0.85rem", // letra más chica
              },
              "& th": {
                fontWeight: 300,
                fontSize: "0.80rem", // menos grueso el encabezado
              },
            }}
            size="small"
            aria-label="caption table"
          >
            <thead>
              <tr>
                <th colSpan={9}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "space-between",
                      //margin: 2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.5rem",
                      }}
                    >
                      Clientes en Sociedad
                    </span>
                    <span
                      style={{
                        fontSize: "1.5rem",
                      }}
                    >
                      Adeudo: ${total.toFixed(2)}
                    </span>
                  </Box>
                </th>
              </tr>
            </thead>
            <TableHead>
              <TableRow>
                <TableCell>Razón social</TableCell>
                <TableCell align="left">Mes</TableCell>
                <TableCell align="left">Periodicidad</TableCell>
                <TableCell align="left">Estado</TableCell>
                <TableCell align="left">Pago asociados</TableCell>
                <TableCell align="left">Pago total</TableCell>
                <TableCell align="left">F. de pago</TableCell>
                <TableCell align="left">Opciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {customers &&
                customers.map((row) => {
                  const associatePayment = (row.amount / 100) * 30;
                  return (
                    <TableRow key={row.id}>
                      <TableCell>
                        {row.monthlyAccounting.customer.socialReason.toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {getMonthLabel(
                          row.monthlyAccounting.month,
                          row.monthlyAccounting.periodicity === "BIMESTRAL"
                        ).toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        {row.monthlyAccounting.periodicity}
                      </TableCell>
                      <TableCell align="left">
                        <Chip
                          label={row.status ? "PAGADO" : "POR PAGAR"}
                          color={row.status ? "success" : "warning"}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="left">
                        ${associatePayment.toFixed(2)}
                      </TableCell>
                      <TableCell align="left">${row.amount}</TableCell>
                      <TableCell align="left">
                        {formatFullDate(row.paymentDate).toUpperCase()}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          onClick={() => {
                            setOpen(true);
                            setSelectedId(row.id);
                          }}
                        >
                          <PaymentIcon sx={{ color: "#09356f" }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <DialogClientsInSociety
        id={selectedId}
        open={open}
        onClose={() => setOpen(false)}
        flag={flag}
        setFlag={setFlag}
      />
    </>
  );
}
