import { useEffect, useState } from "react";

import {
  Box,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DialogPayments from "../payments/DialogPayments";
import DialogPaymentsList from "../payments/DialogPaymentsList";
import Filter from "../filter/Filter";
import ModalPasswords from "../public/ModalPasswords";
import DialogAccountingEdit from "./DialogUpdate";
import { columnsAccounting } from "../../constants";
import AccountingTableBody from "./TableBody";
import { useModal } from "../../hooks";
import type { Customer, MonthlyAccounting } from "../../@types/customer";
import type { FilterAccounting } from "../../@types/FilterAccounting";
import CheckDebts from "../utils/CheckDebts";
import { createAccounting, getaccounting, getHasDebtsAccountings } from "../../services";

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

  // --- Fetch de accountings ---
  const getAccounting = async () => {
    try {
      const { data } = await getaccounting(filter);
      const ordered = data.sort(
        (a: MonthlyAccounting, b: MonthlyAccounting) =>
          (a.stateObligation === "REALIZADO" ? 1 : 0) -
          (b.stateObligation === "REALIZADO" ? 1 : 0)
      );
      setAccountings(ordered);
    } catch (err) {
      setAccountings([]);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await createAccounting();
        await getAccounting();
      } catch (err) {
        console.error(err);
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
    const { data } = await getHasDebtsAccountings(); // esta es la importada
    if (data === true) {
      checkModal.openModal(true);
    }
  };

  useEffect(() => {
    checkDebts();
  }, []);

  return (
    <Box>
      {/* Filtro */}
      <Filter
        flag={flag}
        setFlag={setFlag}
        setFilter={setFilter}
        filter={filter}
        type="Accounting"
      />

      {/* Tabla */}
      <Box sx={{ padding: 3 }}>
        {accountings.length > 0 && (
          <TableContainer component={Paper}>
            <Table className="myTable" size="small" aria-label="caption table">
              <thead>
                <tr>
                  <th style={{ fontSize: "1.5rem" }}>Contabilidad Mensual</th>
                </tr>
              </thead>
              <TableHead>
                <TableRow>
                  {columnsAccounting.map((col) => (
                    <TableCell key={col.key} align={col.align as any}>
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
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
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Modal de pago */}
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
      {/* Modal de edición */}
      <DialogAccountingEdit
        accounting={editAccountingModal.data ?? undefined}
        handelClose={editAccountingModal.closeModal}
        flag={flag}
        setFlag={setFlag}
        open={editAccountingModal.open}
      />

      {/* Lista de pagos */}
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
