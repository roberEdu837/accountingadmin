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
import { getMonthLabel } from "../../utils/formatDate";

export default function AccountingTable() {
  const [Customers, setCustomers] = useState<MonthlyAccounting[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [flag, setFlag] = useState<boolean>(false);
  const [dataReady, setDataReady] = useState(false);
  const [honorary, setHonorary] = useState(0);
  const [startOfRelationship, setStartOfRelationship] = useState<any>("");

  const [filter, setFilter] = useState<FilterAccounting>({
    month: new Date().getMonth() + 1,
    search: "",
    year: new Date().getFullYear(),
  });

  const CreateAccounting = async () => await createAccounting();

  const init = async () => {
    if (dataReady == false) {
      console.log("si entra");
      await CreateAccounting();
      setDataReady(true);
    } else {
      console.log("no entra");
    }
  };

  useEffect(() => {
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
            <thead>
              <tr>
                <th colSpan={9}>Contabilidad Mensual</th>
              </tr>
            </thead>

            <TableHead>
              <TableRow>
                <TableCell >Razón Social</TableCell>
                <TableCell align="center">Periodicidad</TableCell>
                <TableCell align="center"> {"Mes"}</TableCell>
                <TableCell align="center">Obligaciones</TableCell>
                <TableCell align="center">F. Cumplimiento</TableCell>
                <TableCell align="center">Monto</TableCell>
                <TableCell align="center">Abonado</TableCell>
                <TableCell align="center">Adeudo</TableCell>
                <TableCell align="center">Pago</TableCell>
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
                      <TableCell align="center">
                        {row.customer.periodicity}
                      </TableCell>
                      <TableCell align="center">
                        {getMonthLabel(
                          row.month,
                          row.customer.periodicity === "BIMESTRAL"
                        )}
                      </TableCell>

                      {/* <TableCell align="center">{row.customer.rfc}</TableCell>
                      <TableCell align="center">
                        {row.customer.password}
                      </TableCell> */}
                      <TableCell align="center">
                        <SelectStatus
                          valorInicial={row.stateObligation}
                          setLoading={setLoading}
                          loading={loading}
                          id={row.id}
                        />
                      </TableCell>
                      <TableCell align="center">{formattedDate}</TableCell>
                      <TableCell align="center">${row.honorary}</TableCell>
                      <TableCell align="center">${totalCollected}</TableCell>
                      <TableCell align="center">${pending}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => {
                            setOpen(true);
                            setSelectedId(row.id);
                            setHonorary(pending);
                            setStartOfRelationship(
                              row.customer.startOfRelationship
                            );
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
        honorary={honorary}
        startOfRelationship={startOfRelationship}
      />
    </Box>
  );
}
