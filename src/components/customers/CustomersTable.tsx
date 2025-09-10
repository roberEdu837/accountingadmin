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
} from "@mui/material";
import DialogCustomers from "./DialogCustomers";
import ButtonAdd from "../utils/ButtonAdd";
import EditIcon from "@mui/icons-material/Edit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import KeyIcon from "@mui/icons-material/Key";
import DialogCustomersPasswords from "./DialogCustomersPasswords";
import ModalPasswords from "../public/ModalPasswords";
import FilterCustomer from "../filter/FilterCustomer";
import DialogPdf from "./DialogPdf";
import AddIcon from "@mui/icons-material/Add";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { desactivateCustomer } from "../../services/customer.service";
import { useModal } from "../../hooks";

export default function CustomersTable() {
  const updateModal = useModal<Customer | undefined>();
  const openModalPwd = useModal<Customer | undefined>();
  const openModaCreatePwd = useModal<Customer>();
  const openDialogPdf = useModal<Customer>();
  const [customer, setCustomers] = useState<Customer[]>();
  const [flag, setFlag] = useState(false);

  const handleDesactivate = async (id: number | undefined, status: boolean) => {
    await desactivateCustomer(id, status);
    setCustomers((prev: any) => prev.filter((c: any) => c.id !== id));
  };

  return (
    <Box>
      <FilterCustomer flag={flag} setCustomers={setCustomers} />
      <Box sx={{ padding: 2 }}>
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
                      Clientes
                    </span>
                    <ButtonAdd
                      text="Nuevo Cliente"
                      handleClickOpen={updateModal.openModal}
                      icon={<AddIcon />}
                    />
                  </Box>
                </th>
              </tr>
            </thead>

            <TableHead>
              <TableRow>
                <TableCell>Razón social</TableCell>
                <TableCell align="center">Periodicidad</TableCell>
                <TableCell align="center">RFC</TableCell>
                <TableCell align="center">Contraseña</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Honorario</TableCell>
                <TableCell align="center">En sociedad</TableCell>
                <TableCell align="center">Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customer?.map((row) => {
                return (
                  <TableRow key={row.id}>
                    <Tooltip title="Contraseñas">
                      <TableCell onClick={() => openModalPwd.openModal(row)}>
                        {row.socialReason.toUpperCase()}
                      </TableCell>
                    </Tooltip>
                    <TableCell>{row.periodicity}</TableCell>
                    <TableCell align="center">{row.rfc}</TableCell>
                    <TableCell align="center">{row.password}</TableCell>
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
                          onClick={() => {
                            updateModal.openModal(row);
                          }}
                          size="small"
                        >
                          <EditIcon sx={{ color: "#09356f" }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Estado de cuenta">
                        <IconButton
                          onClick={() => openDialogPdf.openModal(row)}
                          size="small"
                        >
                          <PictureAsPdfIcon sx={{ color: "#09356f" }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Contraseñas">
                        <IconButton
                          onClick={() => {
                            openModaCreatePwd.openModal(row);
                          }}
                          size="small"
                        >
                          <KeyIcon sx={{ color: "#09356f" }} />
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
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
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
      />

      <ModalPasswords
        customer={openModalPwd.data}
        handleClose={openModalPwd.closeModal}
        open={openModalPwd.open}
      />
      <DialogPdf
        open={openDialogPdf.open}
        onClose={openDialogPdf.closeModal}
        customer={openDialogPdf.data}
      />
    </Box>
  );
}
