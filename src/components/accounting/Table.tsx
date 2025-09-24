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
import type { Customer, MonthlyAccounting } from "../../@types/customer";
import type { FilterAccounting } from "../../@types/FilterAccounting";
import CheckDebts from "../utils/CheckDebts";
import {
  createAccounting,
  getaccounting,
  getHasDebtsAccountings,
} from "../../services";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../utils/LoadingScreen";
import { setLoadingFull } from "../../redux/slices/userSlice";

export default function AccountingTable() {
  // --- Modales genéricos ---
  const editAccountingModal = useModal<MonthlyAccounting>();
  const passwordsModal = useModal<Customer>();
  const paymentModal = useModal<{
    id: number;
    debt: number;
    isInSociety: boolean;
  }>();
  const paymentsListModal = useModal<MonthlyAccounting>();
  const checkModal = useModal();

  const [accountings, setAccountings] = useState<MonthlyAccounting[]>([]);
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
  const priority: Record<string, number> = {
    PENDIENTE: 0,
    INCONCLUSO: 1,
    REALIZADO: 2,
  };
  // --- Fetch de accountings ---
  const getAccounting = async () => {
    try {
      const { data } = await getaccounting(filter);
      const ordered = data.sort(
        (a: MonthlyAccounting, b: MonthlyAccounting) =>
          priority[a.stateObligation] - priority[b.stateObligation]
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

  // --- Handlers ---
  const handleAddPayment = (row: MonthlyAccounting, pending: number) => {
    paymentModal.openModal({
      id: row.id,
      debt: pending,
      isInSociety: row.isInSociety,
    });
  };

  const checkDebts = async () => {
    const { data } = await getHasDebtsAccountings();
    if (data === true) {
      checkModal.openModal(data);
    }
  };

  useEffect(() => {
    checkDebts();
  }, []);

  const CalculateTotalDebt = () => {
    let totaldebit = 0;

    accountings.forEach((item) => {
      const payments = item.paymets?.reduce((sum, p) => sum + p.amount, 0) || 0;
      const debt = item.honorary - payments;
      totaldebit += debt;
    });
    setTotal(totaldebit);
  };

  const CalculateHonorary = () => {
    const totalValue = accountings.reduce((acc, row) => {
      const associatePayment = row.honorary;

      return acc + associatePayment;
    }, 0);
    setTotal(totalValue);
  };

  const CalculatePaid = () =>{
     let paid = 0;

    accountings.forEach((item) => {
      const payments = item.paymets?.reduce((sum, p) => sum + p.amount, 0) || 0;
      paid += payments;
    });
    setTotal(paid);
  }

  useEffect(() => {
    if (accountings) {
      if (filter.monthlyPaymentCompleted === false) {
        CalculateTotalDebt();
      }
      if (filter.monthlyPaymentCompleted === undefined) {
        CalculateHonorary();
      }

      if(filter.monthlyPaymentCompleted){
        CalculatePaid()
      }
    }
  }, [accountings]);

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
                      ${total.toFixed(2)}
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
          debt={paymentModal.data.debt}
          isInSociety={paymentModal.data.isInSociety}
          open={paymentModal.open}
          flag={flag}
          setFlag={setFlag}
        />
      )}

      <ModalPasswords
        customer={passwordsModal.data}
        handleClose={passwordsModal.closeModal}
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
        accounting={paymentsListModal.data}
        handleClose={paymentsListModal.closeModal}
        open={paymentsListModal.open}
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
