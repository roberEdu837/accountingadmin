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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DialogClientsInSociety from "./PaymentDateGenerator";
import PaymentIcon from "@mui/icons-material/Payment";
import { formatFullDate, getMonthLabel } from "../../utils/formatDate";
import Filter from "../filter/Filter";
import type { FilterAccounting } from "../../@types/FilterAccounting";
import { getClientInSociety } from "../../services";
import { columnsclientsInSociety } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingFull } from "../../redux/slices/userSlice";
import LoadingScreen from "../utils/LoadingScreen";

export default function SocietyClientsTable() {
  const [flag, setFlag] = useState<boolean>(false);
  const [customers, setCustomers] = useState<any[]>();
  const [total, setTotal] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // 1-12
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const year =
    currentMonth === 1 ? today.getFullYear() - 1 : today.getFullYear();
  const [filter, setFilter] = useState<FilterAccounting>({
    search: "",
    year: year,
    month: previousMonth,
    monthlyPaymentCompleted: undefined, // ahora ok, porque FilterAccounting permite boolean | undefined
  });
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
  const dispatch = useDispatch<any>();

  const { loadingFull } = useSelector((state: any) => state.user);

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

  const getAccounting = async () => {
    dispatch(setLoadingFull(true));

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
    } finally {
      dispatch(setLoadingFull(false));
    }
  };

  useEffect(() => {
    getAccounting();
  }, [filter, flag]);

  return (
    <>
      <Filter
        filter={filter}
        setFilter={setFilter}
        setFlag={setFlag}
        flag={flag}
        type=""
      />
      {loadingFull && <LoadingScreen />}

      <Box sx={{ mt: isMobile ? 35 : 15, p: 3 }}>
        <TableContainer component={Paper}>
          <Table className="myTable" size="small" aria-label="caption table">
            <thead>
              <tr>
                <th colSpan={9}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "space-between",
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
                {columnsclientsInSociety?.map((col) => (
                  <TableCell key={col.key} align={col.align as any}>
                    {col.label}
                  </TableCell>
                ))}
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
                      <TableCell align="center">
                        {row.monthlyAccounting.periodicity}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          sx={{ minWidth: 100 }}
                          label={row.status ? "PAGADO" : "POR PAGAR"}
                          color={row.status ? "success" : "warning"}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        ${associatePayment.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">${row.amount}</TableCell>
                      <TableCell align="center">
                        {formatFullDate(row.paymentDate).toUpperCase()}
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
