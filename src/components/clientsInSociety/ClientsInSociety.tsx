import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Box, Button, Chip } from "@mui/material";
import { getClientInSociety } from "../../services/clientInSociety.service";
import DialogClientsInSociety from "./DialogDlientsInSociety";
import PaymentIcon from "@mui/icons-material/Payment";
import { formatFullDate, getMonthLabel } from "../../utils/formatDate";
import FilterclientsInSociety from "../filter/FilterclientsInSociety";
import { useSelector } from "react-redux";

export default function ClientsInSocietyTable() {
  const [flag, setFlag] = useState<boolean>(false);
  const [customers, setCustomers] = useState<any[] | undefined>();
  const [total, setTotal] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const { month, search, year, status } = useSelector(
    (state: any) => state.filter
  );

  const getAccounting = async () => {
    try {
      console.log(status, "status");
      const { data } = await getClientInSociety({
        month,
        search,
        year,
        status
      });
      setCustomers(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAccounting();
  }, [year, month, search, flag,status]);

  useEffect(() => {
    if (customers) {
      const totalValue = customers.reduce((acc, row) => {
        const associatePayment = (row.monthlyAccounting.honorary / 100) * 30;
        if (row.status === true) {
          return acc;
        }
        return acc + associatePayment;
      }, 0);
      setTotal(totalValue);
    }
  }, [customers]);
console.log(total)

  return (
    <Box>
      <FilterclientsInSociety flag={flag} setFlag={setFlag} />
      <Box sx={{ padding: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <thead>
              <tr>
                <th colSpan={9}>Clientes en Sociedad</th>
              </tr>
            </thead>
            <TableHead>
              <TableRow>
                <TableCell>Razón Social</TableCell>
                <TableCell align="center">Mes</TableCell>
                <TableCell align="center">Periodicidad</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Pago Asociados</TableCell>
                <TableCell align="center">F. de Pago</TableCell>
                <TableCell align="center">Opciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {customers &&
                customers.map((row) => {
                  const associatePayment =
                    (row.monthlyAccounting.honorary / 100) * 30;
                  return (
                    <TableRow key={row.id}>
                      <TableCell>
                        {row.monthlyAccounting.customer.socialReason}
                      </TableCell>
                      <TableCell align="center">
                        {getMonthLabel(
                          row.monthlyAccounting.month,
                          row.monthlyAccounting.periodicity === "BIMESTRAL"
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.monthlyAccounting.periodicity}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={row.status ? "Pagado" : "Por Pagar"}
                          color={row.status ? "success" : "warning"}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        ${associatePayment.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        {formatFullDate(row.paymentDate)}
                      </TableCell>
                      <TableCell align="center">
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

        <Box
          sx={{
            marginTop: 2,
            textAlign: "right",
            fontSize: "1.2em",
            color: "#09356f",
            width: "100%",
          }}
        >
          Adeudo: ${total.toFixed(2)}
        </Box>
      </Box>
      <DialogClientsInSociety
        id={selectedId}
        open={open}
        onClose={() => setOpen(false)}
        flag={flag}
        setFlag={setFlag}
      />
    </Box>
  );
}
