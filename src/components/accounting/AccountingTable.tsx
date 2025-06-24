import { useEffect, useState } from "react";
import {
  createAccounting,
  getAccounting,
} from "../../services/accounting.service";
import {
  Box,
  Button,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SelectStatus from "./SelectStatus";
import PaymentIcon from "@mui/icons-material/Payment";
import DialogPayments from "../payments/DialogPayments";
import type { FilterAccounting } from "../../@types/FilterAccounting";
import Filter from "../filter/Filter";
import type { MonthlyAccounting } from "../../@types/customer";

export default function AccountingTable() {
  const [Customers, setCustomers] = useState<MonthlyAccounting[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [flag, setFlag] = useState<boolean>(false);
  const [dataReady, setDataReady] = useState(false);

  const [filter, setFilter] = useState<FilterAccounting>({
    month: new Date().getMonth() + 1, // Months are 0-indexed in JavaScript
    search: "",
    year: new Date().getFullYear(),
  });
  
  const CreateAccounting = async () => {
    await createAccounting();
  };

  useEffect(() => {
    const init = async () => {
      await CreateAccounting();
      setDataReady(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (dataReady) getCustomers();
  }, [dataReady, filter, loading, flag]);

  const getCustomers = async () => {
    try {
      const { data } = await getAccounting(filter);

      const ordered = data.sort(
        (a: MonthlyAccounting, b: MonthlyAccounting) => {
          return (
            (a.stateObligation === "REALIZADO" ? 1 : 0) -
            (b.stateObligation === "REALIZADO" ? 1 : 0)
          );
        }
      );

      setCustomers(ordered);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Filter
        year={filter.year}
        filter={filter}
        flag={flag}
        month={filter.month}
        search={filter.search}
        setFilter={setFilter}
        setFlag={setFlag}
      />
      <Box sx={{ padding: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
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
                    fontSize: "1",
                    color: "#09356f",
                    textAlign: "left",
                    paddingLeft: "10px",
                    fontFamily: "Segoe UI, Roboto, Helvetica Neue, sans-serif",
                    fontWeight: "300",
                  }}
                >
                  Contabilidad Mensual
                </th>
              </tr>
            </thead>

            <TableHead>
              <TableRow>
                <TableCell>Razón Social</TableCell>
                <TableCell align="right">Periodicidad</TableCell>
                <TableCell align="right">RFC</TableCell>
                <TableCell align="right">Contraseña</TableCell>
                <TableCell align="right">Obligaciones</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Cobrado</TableCell>
                <TableCell align="right">Por Cobrar</TableCell>
                <TableCell align="right">Fecha de cumplimiento</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Customers &&
                Customers.map((row) => {
                  let totalCollected = 0;

                  if (row.paymets) {
                    totalCollected = row.paymets.reduce(
                      (acc, payment) => acc + payment.amount,
                      0
                    );
                  }
                  let pending = row.honorary - totalCollected;

                  let formattedDate = new Date(
                    row.rfcTaxPaymentDate
                  ).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.customer.socialReason}</TableCell>
                      <TableCell align="right">
                        {row.customer.periodicity}
                      </TableCell>
                      <TableCell align="right">{row.customer.rfc}</TableCell>
                      <TableCell align="right">
                        {row.customer.password}
                      </TableCell>
                      <TableCell align="right">
                        <SelectStatus
                          valorInicial={row.stateObligation}
                          setLoading={setLoading}
                          loading={loading}
                          id={row.id}
                        />
                      </TableCell>
                      <TableCell align="right">${row.honorary}</TableCell>
                      <TableCell align="right">${totalCollected}</TableCell>
                      <TableCell align="right">${pending}</TableCell>
                      <TableCell align="right">{formattedDate}</TableCell>
                      <TableCell align="right">
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
      <DialogPayments
        onClose={() => setOpen(false)}
        id={selectedId}
        open={open}
        flag={flag}
        setFlag={setFlag}
      />
    </Box>
  );
}
