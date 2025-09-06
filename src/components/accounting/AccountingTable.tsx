import { useEffect, useState } from "react";
import {
  createAccounting,
  getaccounting,
  hasDebtsAccountings,
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

export default function AccountingTable() {
  const [accountings, setAccountings] = useState<
    MonthlyAccounting[] | undefined
  >();
  const [openPayment, setOpenPayment] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [debt, setDebt] = useState<number>(0);
  const [isInSociety, setIsInSociety] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [openDialogDebts, setOpenDialogDebts] = useState(false);
  const [openDialogPaymentsList, setOpenDialogPaymentsList] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<any | null>(null);
  const [currentAccounting, setCurrentAccounting] = useState<
    MonthlyAccounting | undefined
  >(undefined);
  const [flag, setFlag] = useState(false);
  const [filter, setFilter] = useState<FilterAccounting>({
    month: new Date().getMonth() + 1,
    search: "",
    year: new Date().getFullYear(),
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
    } catch (err) {
      console.error(err);
    }
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
      console.error(err);
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

  const HasDebtsAccountings = async () => {
    const { data } = await hasDebtsAccountings();
    if (data === true) {
      setOpenDialogDebts(true);
    }
  };

  useEffect(() => {
    HasDebtsAccountings();
  }, []);

  return (
    <Box>
      <Filter
        flag={flag}
        setFlag={setFlag}
        setFilter={setFilter}
        filter={filter}
      />

      <Box sx={{ padding: 2 }}>
        {accountings && (
          <TableContainer component={Paper}>
            <Table
              sx={{
                minWidth: 650,
                "& th, & td": {
                  color: "#5d5a5aff",
                  padding: "11px 9px",
                  fontSize: "0.85rem",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                },
                "& th": {
                  fontWeight: 300,
                  fontSize: "0.90rem",
                },
              }}
              size="small"
              aria-label="caption table"
            >
              <thead>
                <tr>
                  <th colSpan={10} style={{ fontSize: "1.5rem" }}>
                    Contabilidad Mensual
                  </th>
                </tr>
              </thead>
              <TableHead>
                <TableRow>
                  <TableCell>Razón Social</TableCell>
                  <TableCell align="center">Periodicidad</TableCell>
                  <TableCell align="center">Mes</TableCell>
                  <TableCell align="center">Obligaciones</TableCell>
                  <TableCell align="center">F. Cumplimiento</TableCell>
                  <TableCell align="center">Monto</TableCell>
                  <TableCell align="center">Abonado</TableCell>
                  <TableCell align="center">Adeudo</TableCell>
                  <TableCell align="center">En sociedad</TableCell>
                  <TableCell align="center">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accountings.map((row) => {
                  const pending = row.honorary - totalPaid(row);
                  return (
                    <TableRow key={row.id}>
                      <Tooltip title="Contraseñas">
                        <TableCell
                          onClick={() => handleOpenModal(row.customer)}
                          sx={{ maxWidth: 200 }}
                        >
                          {row.customer?.socialReason.toUpperCase()}
                        </TableCell>
                      </Tooltip>
                      <TableCell align="left">{row.periodicity}</TableCell>
                      <TableCell align="center">{getMonthLabel(row)}</TableCell>
                      <TableCell align="left">
                        <SelectStatus
                          valorInicial={row.stateObligation}
                          setFlag={setFlag}
                          flag={flag}
                          id={row.id}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {formatDate(row.rfcTaxPaymentDate)}
                      </TableCell>
                      <TableCell align="left">${row.honorary}</TableCell>
                      <TableCell align="left">${totalPaid(row)}</TableCell>
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
                        {row.isInSociety ? "SI" : "NO"}
                      </TableCell>
                      <TableCell align="left">
                        <Tooltip title="Actualizar">
                          <IconButton onClick={() => handleEditClient(row)}>
                            <EditIcon sx={{ color: "#09356f" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Agregar pago">
                          <IconButton
                            onClick={() => {
                              setSelectedId(row.id);
                              setDebt(pending);
                              setIsInSociety(row.isInSociety);
                              setOpenPayment(true);
                            }}
                          >
                            <IconWithBadge
                              parentIcon={
                                <PaymentIcon
                                  sx={{ color: "#09356f", fontSize: "1.8rem" }}
                                />
                              }
                              childIcon={
                                <AddIcon
                                  sx={{ color: "#09356f", fontSize: "1rem" }}
                                />
                              }
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
                              parentIcon={
                                <PaymentIcon
                                  sx={{ color: "#09356f", fontSize: "1.8rem" }}
                                />
                              }
                              childIcon={
                                <VisibilityIcon
                                  sx={{ color: "#09356f", fontSize: "1rem" }}
                                />
                              }
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

      {selectedId && (
        <DialogPayments
          onClose={() => setOpenPayment(false)}
          id={selectedId}
          open={openPayment}
          flag={flag}
          setFlag={setFlag}
          debt={debt}
          isInSociety={isInSociety}
        />
      )}

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
      <DialogPaymentsList accounting={currentAccounting} setAccountings={setAccountings} handleClose={() => setOpenDialogPaymentsList(false) } open={openDialogPaymentsList}/>
    </Box>
  );
}
