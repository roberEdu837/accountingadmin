import { useEffect, useState } from "react";
import {
  Box,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DialogPayments from "../payments/DialogPayments";
import DialogPaymentsList from "../payments/DialogPaymentsList";
import Filter from "../filter/Filter";
import ModalPasswords from "../password/CustomersPasswords";
import DialogAccountingEdit from "./DialogUpdate";
import { columnsAccounting } from "../../constants";
import AccountingTableBody from "./TableBody";
import { useModal } from "../../hooks";
import type { Customer, MonthlyAccounting, TableMonthlyAccounting } from "../../@types/customer";
import type { FilterAccounting } from "../../@types/FilterAccounting";
import CheckDebts from "../utils/CheckDebts";
import {
  createAccounting,
  getaccounting,
} from "../../services";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../utils/LoadingScreen";
import { setLoadingFull } from "../../redux/slices/userSlice";
import DialogAccountingServices from "../accountingServices/DialogAccountingServices";
import { PRIORITY } from "../../constants/constants";

export default function AccountingTable() {
  const editAccountingModal = useModal<TableMonthlyAccounting>();
  const passwordsModal = useModal<Customer>();
  const paymentModal = useModal<{
    id: number;
    debtAccounting: number;
    isInSociety: boolean;
  }>();
  const paymentsListModal = useModal<TableMonthlyAccounting>();
  const servicesModal = useModal<number>();

  const checkModal = useModal();

  const [accountings, setAccountings] = useState<TableMonthlyAccounting[]>([]);
  const [flag, setFlag] = useState(false);

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const year =
    currentMonth === 1 ? today.getFullYear() - 1 : today.getFullYear();

  const [filter, setFilter] = useState<FilterAccounting>({
    month: previousMonth,
    search: "",
    year: year,
    monthlyPaymentCompleted: undefined,
  });
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
  const dispatch = useDispatch<any>();
  const [total, setTotal] = useState<number>(0);

  const { loadingFull } = useSelector((state: any) => state.user);



  const getAccounting = async () => {
    try {
      const { data } = await getaccounting(filter);
      const ordered = data.sort(
        (a: MonthlyAccounting, b: MonthlyAccounting) =>
          PRIORITY[a.stateObligation] - PRIORITY[b.stateObligation]
      );
      setAccountings(ordered);
    } catch (err) {
      setAccountings([]);
    }
  };

  useEffect(() => {
    dispatch(setLoadingFull(true));

    (async () => {
      try {
        await createAccounting();
        await getAccounting();
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(setLoadingFull(false));
      }
    })();
  }, [filter, flag]);

  const handleAddPayment = (row: TableMonthlyAccounting) => {
    paymentModal.openModal({
      id: row.id,
      debtAccounting: row.debtAccounting,
      isInSociety: row.isInSociety,
    });
  };


  const CalculateTotalDebt = () => {
    let totaldebit = 0;

    accountings.forEach((item) => {
      const payments = item.paymets?.reduce((sum, p) => sum + p.amount, 0) || 0;
      const debt = item.honorary - payments;
      if (item.stateObligation === "REALIZADO") {
        totaldebit += debt;
      }
    });
    setTotal(totaldebit);
  };


  useEffect(() => {
    CalculateTotalDebt();
  }, [accountings, filter]);

  return (
    <Box>
      <Filter
        flag={flag}
        setFlag={setFlag}
        setFilter={setFilter}
        filter={filter}
        type="Accounting"
      />
      {loadingFull && <LoadingScreen />}

      <Box sx={{ mt: isMobile ? 29 : 15, p: 3 }}>
        <TableContainer component={Paper}>
          <Table className="myTable" size="small" stickyHeader>
            <thead>
              <tr>
                <th colSpan={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>
                      Contabilidad Mensual
                    </span>
                    <span style={{ fontSize: "1.5rem" }}>
                      {" "}
                      ${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </span>
                  </Box>
                </th>
              </tr>
            </thead>
            <TableHead>
              <TableRow>
                {columnsAccounting?.map((col) => (
                  <TableCell key={col.key} align={col.align as any}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {accountings && accountings.length > 0 ? (
              <AccountingTableBody
                accountings={accountings}
                openModalPasswords={passwordsModal.openModal}
                openModalEditAccounting={editAccountingModal.openModal}
                openModalAccountingServices={servicesModal.openModal}
                handleAddPayment={handleAddPayment}
                setCurrentAccounting={paymentsListModal.setData}
                handleOpenPaymentsList={paymentsListModal.openModal}
                flag={flag}
                setFlag={setFlag}
              />
            ) : (
              <TableRow>
                <TableCell colSpan={columnsAccounting.length} align="center">
                  No hay registros que coincidan con los filtros.
                </TableCell>
              </TableRow>
            )}
          </Table>
        </TableContainer>
      </Box>

      {/* Modales */}
      {paymentModal.data && (
        <DialogPayments
          onClose={paymentModal.closeModal}
          id={paymentModal.data.id}
          debt={paymentModal.data.debtAccounting}
          isInSociety={paymentModal.data.isInSociety}
          open={paymentModal.open}
          flag={flag}
          setFlag={setFlag}
        />
      )}

      <ModalPasswords
        customer={passwordsModal.data}
        onClose={passwordsModal.closeModal}
        open={passwordsModal.open}
      />

      <DialogAccountingEdit
        accounting={editAccountingModal.data ?? undefined}
        handelClose={editAccountingModal.closeModal}
        flag={flag}
        setFlag={setFlag}
        open={editAccountingModal.open}
      />

      <DialogPaymentsList
        handleClose={paymentsListModal.closeModal}
        open={paymentsListModal.open}
        flag={flag}
        setFlag={setFlag}
        monthlyAccountingId={paymentsListModal.data?.id}
        monthlyPaymentCompleted={paymentsListModal.data?.monthlyPaymentCompleted}
        nameCustomer={paymentsListModal.data?.customer?.socialReason}
      />

      <DialogAccountingServices
        open={servicesModal.open}
        onClose={servicesModal.closeModal}
        id={servicesModal.data ?? 0}
        flag={flag}
        setFlag={setFlag}
      />

      <CheckDebts
        open={checkModal.open}
        handleClose={checkModal.closeModal}
        type={0}
        setFilter={setFilter}
      />
    </Box>
  );
}
