import { useEffect, useState } from "react";
import {
  createAccounting,
  getAccounting,
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
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import SelectStatus from "./SelectStatus";
import PaymentIcon from "@mui/icons-material/Payment";
import EditIcon from "@mui/icons-material/Edit";
import DialogPayments from "../payments/DialogPayments";
import type { FilterAccounting } from "../../@types/FilterAccounting";
import Filter from "../filter/Filter";
import type { Customer, MonthlyAccounting } from "../../@types/customer";
import { getMonthLabel } from "../../utils/formatDate";
import ModalPasswords from "../public/ModalPasswords";
import DialogAccountingEdit from "./DialogAccountingEdit";
import CheckDebts from "../../utils/CheckDebts";

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
  const [currentCustomer, setCurrentCustomer] = useState<any | null>(null);
  const [currentAccounting, setCurrentAccounting] = useState<
    MonthlyAccounting | undefined
  >(undefined);

  const [flag, setFlag] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      await fetchCustomers();
    } catch (err) {
      console.error(err);
      setError("Error al inicializar la contabilidad");
    } finally {
    }
  };

  const fetchCustomers = async () => {
    try {
      setError(null);
      const { data } = await getAccounting(filter);
      const ordered = data.sort(
        (a: MonthlyAccounting, b: MonthlyAccounting) =>
          (a.stateObligation === "REALIZADO" ? 1 : 0) -
          (b.stateObligation === "REALIZADO" ? 1 : 0)
      );
      setAccountings(ordered);
    } catch (err) {
      console.error(err);
      setError("Error al cargar clientes");
      setAccountings([]);
    } finally {
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [filter, flag]);

  const handleEditClient = (row: MonthlyAccounting) => {
    setOpenDialogUpdate(true);
    setCurrentAccounting(row);
  };

  const handleCloseDialogUpdate = () => setOpenDialogUpdate(false);

  const HasDebtsAccountings = async () => {
    const { data } = await hasDebtsAccountings();
    if (data == true) {
      setOpenDialogDebts(true);
    }
  };

  useEffect(() => {
    HasDebtsAccountings();
  }, []);

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
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {accountings && (
          <TableContainer component={Paper}>
            <Table
              sx={{
                minWidth: 650,
                "& th, & td": {
                  color: "#5d5a5aff",
                  padding: "11px 9px", // menos espacio en celdas
                  fontSize: "0.85rem", // letra más chica
                },
                "& th": {
                  fontWeight: 300,
                  fontSize:"0.80rem" // menos grueso el encabezado
                },
              }}
              size="small"
              aria-label="caption table"
            >
              <thead>
                <tr>
                  <th
                    colSpan={9}
                    style={{
                      fontSize: "1.5rem",
                    }}
                  >
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
                  const totalCollected =
                    row.paymets?.reduce(
                      (acc, payment) => acc + payment.amount,
                      0
                    ) || 0;
                  const pending = row.honorary - totalCollected;
                  const formattedDate = row.rfcTaxPaymentDate
                    ? new Date(row.rfcTaxPaymentDate).toLocaleDateString(
                        "es-MX",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )
                    : "-";

                  return (
                    <TableRow key={row.id}>
                      <Tooltip title="Contraseñas">
                        <TableCell
                          onClick={() => handleOpenModal(row.customer)}
                        >
                          {row.customer?.socialReason.toUpperCase() || "-"}
                        </TableCell>
                      </Tooltip>
                      <TableCell align="center">
                        {row.periodicity || "-"}
                      </TableCell>
                      <TableCell align="center">
                        {getMonthLabel(
                          row.month,
                          row.periodicity === "BIMESTRAL"
                        ).toUpperCase()}
                      </TableCell>
                      <TableCell align="center">
                        <SelectStatus
                          valorInicial={row.stateObligation}
                          setFlag={setFlag}
                          flag={flag}
                          id={row.id}
                        />
                      </TableCell>
                      <TableCell align="center">{formattedDate.toUpperCase()}</TableCell>
                      <TableCell align="center">${row.honorary}</TableCell>
                      <TableCell align="center">${totalCollected}</TableCell>
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
                      </TableCell>{" "}
                      <TableCell align="center">
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
                            <PaymentIcon sx={{ color: "#09356f" }} />
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
    </Box>
  );
}
