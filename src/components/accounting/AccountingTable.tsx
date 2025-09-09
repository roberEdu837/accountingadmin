import { useEffect, useState } from "react";
import {
  createAccounting,
  getaccounting,
  getHasDebtsAccountings,
} from "../../services/accounting.service";
import {
  Box,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Chip,
  IconButton,
} from "@mui/material";
import SelectStatus from "./SelectStatus";
import AddIcon from "@mui/icons-material/Add";
import PaymentIcon from "@mui/icons-material/Payment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DialogPayments from "../payments/DialogPayments";
import type { FilterAccounting } from "../../@types/FilterAccounting";
import Filter from "../filter/Filter";
import type { Customer, MonthlyAccounting } from "../../@types/customer";
import { formatDate, getMonthLabel } from "../../utils/formatDate";
import ModalPasswords from "../public/ModalPasswords";
import DialogAccountingEdit from "./DialogAccountingEdit";
import CheckDebts from "../../utils/CheckDebts";
import IconWithBadge from "../utils/IconWithBadge";
import { totalPaid } from "../../utils";
import DialogPaymentsList from "../payments/DialogPaymentsList";
import {
  columnsAccounting,
  iconLargeStyle,
  iconSmallStyle,
} from "../../constants";

export default function AccountingTable() {
  const [accountings, setAccountings] = useState<
    MonthlyAccounting[] | undefined
  >();
  const [openPayment, setOpenPayment] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [debt, setDebt] = useState<number>(0);
  const [isInSociety, setIsInSociety] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [openDialogDebts, setOpenDialogDebts] = useState(false);
  const [openDialogPaymentsList, setOpenDialogPaymentsList] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [currentAccounting, setCurrentAccounting] = useState<
    MonthlyAccounting | undefined
  >(undefined);

  const [flag, setFlag] = useState(false);
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // 1-12
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const year =
    currentMonth === 1 ? today.getFullYear() - 1 : today.getFullYear();
  const [filter, setFilter] = useState<FilterAccounting>({
    month: previousMonth,
    search: "",
    year: year,
    monthlyPaymentCompleted: undefined,
  });

  const handleOpenModal = (customer: Customer) => {
    setCurrentCustomer(customer);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentCustomer(null);
  };

  const init = async () => {
    try {
      await createAccounting();
      getAccounting();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPayment = (row: MonthlyAccounting, pending: number) => {
    setSelectedId(row.id);
    setDebt(pending);
    setIsInSociety(row.isInSociety);
    setOpenPayment(true);
  };

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
    init();
  }, []);

  useEffect(() => {
    getAccounting();
  }, [filter, flag]);

  const handleEditClient = (row: MonthlyAccounting) => {
    setOpenDialogUpdate(true);
    setCurrentAccounting(row);
  };

  const handleCloseDialogUpdate = () => setOpenDialogUpdate(false);

  const hasDebtsAccountings = async () => {
    const { data } = await getHasDebtsAccountings();
    if (data) {
      setOpenDialogDebts(true);
    }
  };

  useEffect(() => {
    hasDebtsAccountings();
  }, []);

  return (
    <Box>
      <Filter
        flag={flag}
        setFlag={setFlag}
        setFilter={setFilter}
        filter={filter}
      />
      <Box sx={{ padding: 3 }}>
        {accountings && (
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
              <TableBody>
                {accountings.map((row) => {
                  const { honorary, id, year, stateObligation } = row;
                  const { customer, month, periodicity, rfcTaxPaymentDate } =
                    row;
                  const pending = honorary - totalPaid(row);
                  return (
                    <TableRow key={id}>
                      <Tooltip title="Contraseñas">
                        <TableCell onClick={() => handleOpenModal(customer)}>
                          {customer?.socialReason.toUpperCase()}
                        </TableCell>
                      </Tooltip>
                      <TableCell align="center">{periodicity}</TableCell>
                      <TableCell align="center">{year}</TableCell>
                      <TableCell align="center">
                        {getMonthLabel(
                          month,
                          periodicity === "BIMESTRAL"
                        ).toUpperCase()}
                      </TableCell>
                      <TableCell align="center">
                        <SelectStatus
                          valorInicial={stateObligation}
                          setFlag={setFlag}
                          flag={flag}
                          id={id}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {formatDate(rfcTaxPaymentDate)}
                      </TableCell>
                      <TableCell align="center">${honorary}</TableCell>
                      <TableCell align="center">${totalPaid(row)}</TableCell>
                      <TableCell align="center">
                        {pending === 0 ? (
                          <Chip
                            label="Pagado"
                            color="success"
                            size="small"
                            variant="outlined"
                          />
                        ) : (
                          `$${pending}`
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {isInSociety ? "SI" : "NO"}
                      </TableCell>
                      <TableCell align="left">
                        <Tooltip title="Actualizar">
                          <IconButton onClick={() => handleEditClient(row)}>
                            <EditIcon sx={iconLargeStyle} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Agregar pago">
                          <IconButton
                            onClick={() => handleAddPayment(row, pending)}
                          >
                            <IconWithBadge
                              parentIcon={<PaymentIcon sx={iconLargeStyle} />}
                              childIcon={<AddIcon sx={iconSmallStyle} />}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Ver pagos">
                          <IconButton
                            onClick={() => {
                              setOpenDialogPaymentsList(true);
                              setCurrentAccounting(row);
                            }}
                          >
                            <IconWithBadge
                              parentIcon={<PaymentIcon sx={iconLargeStyle} />}
                              childIcon={<VisibilityIcon sx={iconSmallStyle} />}
                            />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <DialogPayments
        onClose={() => setOpenPayment(false)}
        id={selectedId}
        open={openPayment}
        flag={flag}
        setFlag={setFlag}
        debt={debt}
        isInSociety={isInSociety}
      />

      {currentCustomer && (
        <ModalPasswords
          customer={currentCustomer}
          handleClose={handleCloseModal}
          open={openModal}
        />
      )}

      <DialogAccountingEdit
        accounting={currentAccounting ?? undefined}
        handelClose={handleCloseDialogUpdate}
        flag={flag}
        setFlag={setFlag}
        open={openDialogUpdate}
      />

      <CheckDebts
        open={openDialogDebts}
        setOpen={setOpenDialogDebts}
        type={0}
        setFilter={setFilter}
      />
      <DialogPaymentsList
        accounting={currentAccounting}
        setAccountings={setAccountings}
        handleClose={() => setOpenDialogPaymentsList(false)}
        open={openDialogPaymentsList}
        flag={flag}
        setFlag={setFlag}
      />
    </Box>
  );
}
