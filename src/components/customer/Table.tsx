import { useState } from "react";
import type { Customer } from "../../@types/customer";
import {
  Box,
  Chip,
  Tooltip,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DialogCustomers from "./DialogCustomers";
import ButtonAdd from "../utils/ButtonAdd";
import DialogCustomersPasswords from "../password/CustomersPasswordsCreate";
import ModalPasswords from "../password/CustomersPasswords";
import FilterCustomer from "../filter/FilterCustomer";
import DialogPdf from "./DialogPdf";
import AddIcon from "@mui/icons-material/Add";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { desactivateCustomer } from "../../services/customer.service";
import { useModal } from "../../hooks";
import { columnsClients } from "../../constants";
import ToastNotification from "../utils/ToastNotification";
import { useSelector } from "react-redux";
import LoadingScreen from "../utils/LoadingScreen";
import IconWithBadge from "../utils/IconWithBadge";
import { Icons } from "../utils/Icons";

export default function CustomerTable() {
  const updateModal = useModal<Customer | undefined>();
  const openModalPwd = useModal<Customer | undefined>();
  const openModaCreatePwd = useModal<Customer>();
  const openDialogPdf = useModal<Customer>();
  const [customer, setCustomers] = useState<Customer[]>();
  const [flag, setFlag] = useState(false);
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
  const { loadingFull } = useSelector((state: any) => state.user);

  const handleDesactivate = async (id: number | undefined, status: boolean) => {
    await desactivateCustomer(id, status);
    setCustomers((prev: any) => prev.filter((c: any) => c.id !== id));
    const message = status
      ? "Cliente activado correctamente."
      : "Cliente desactivado correctamente.";

    ToastNotification(message, status ? "success" : "success");
  };
  console.log(loadingFull);

  return (
    <Box>
      <FilterCustomer flag={flag} setCustomers={setCustomers} />
      {loadingFull && <LoadingScreen />}

      <Box sx={{ mt: isMobile ? 35 : 15, p: 3 }}>
        {customer && customer.length > 0 ? (
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
                      <span style={{ fontSize: "1.5rem" }}>Clientes</span>
                    </Box>
                  </th>
                </tr>
              </thead>

              <TableHead>
                <TableRow>
                  {columnsClients?.map((col) => (
                    <TableCell key={col.key} align={col.align as any}>
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {customer.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.socialReason.toUpperCase()}</TableCell>
                    <TableCell>{row.periodicity}</TableCell>
                    <TableCell align="center">{row.rfc}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.status ? "ACTIVO" : "INACTIVO"}
                        color={row.status ? "success" : "default"}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">${row.honorary}</TableCell>
                    <TableCell align="center">
                      {row.isInSociety ? "SI" : "NO"}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Actualizar">
                        <IconButton
                          onClick={() => updateModal.openModal(row)}
                          size="small"
                        >
                          {Icons.edit}
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Estado de cuenta">
                        <IconButton
                          onClick={() => openDialogPdf.openModal(row)}
                          size="small"
                        >
                          {Icons.pdfIcon}
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Nueva contraseña">
                        <IconButton
                          onClick={() => openModaCreatePwd.openModal(row)}
                          size="small"
                        >
                          <IconWithBadge
                            parentIcon={Icons.keyIcon}
                            childIcon={Icons.add}
                          />
                        </IconButton>
                      </Tooltip>

                      <Tooltip
                        title={
                          row?.passwords ? "Ver contraseñas" : "Sin contraseñas"
                        }
                      >
                        <IconButton
                          onClick={() => {
                            if (row?.passwords && row.passwords.length > 0) {
                              openModalPwd.openModal(row);
                            }
                          }}
                          size="small"
                        >
                          <IconWithBadge
                            parentIcon={Icons.keyIcon}
                            childIcon={Icons.visibility}
                          />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title={row.status ? "Desactivar" : "Activar"}>
                        <IconButton
                          onClick={() => handleDesactivate(row.id, !row.status)}
                          size="small"
                        >
                          {!row.status ? (
                            <CheckCircleIcon sx={{ color: "#09356f" }} />
                          ) : (
                            <BlockIcon sx={{ color: "#09356f" }} />
                          )}
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              flexDirection: "column",
            }}
          >
            <p>No hay clientes para mostrar.</p>
            <ButtonAdd
              text="Nuevo Cliente"
              handleClickOpen={updateModal.openModal}
              icon={<AddIcon />}
            />
          </Box>
        )}

        {customer && customer.length > 0 && (
          <Box
            sx={{
              position: "fixed",
              bottom: 16,
              right: 20,
              zIndex: 1200,
            }}
          >
            <ButtonAdd
              text="Nuevo Cliente"
              handleClickOpen={updateModal.openModal}
              icon={<AddIcon />}
            />
          </Box>
        )}
      </Box>
      <DialogCustomers
        onClose={updateModal.closeModal}
        open={updateModal.open}
        flag={flag}
        setFlag={setFlag}
        customer={updateModal.data}
      />

      <DialogCustomersPasswords
        onClose={openModaCreatePwd.closeModal}
        open={openModaCreatePwd.open}
        customer={openModaCreatePwd.data}
        isEdit={false}
        flag={flag}
        setFlag={setFlag}
      />

      <ModalPasswords
        customer={openModalPwd.data}
        handleClose={openModalPwd.closeModal}
        open={openModalPwd.open}
        flag={flag}
        setFlag={setFlag}
      />

      <DialogPdf
        open={openDialogPdf.open}
        onClose={openDialogPdf.closeModal}
        customer={openDialogPdf.data}
      />
    </Box>
  );
}
