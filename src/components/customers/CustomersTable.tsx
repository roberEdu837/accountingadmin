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
import DialogCustomersEdit from "./DialogCustomersEdit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  getDetsAccounting,
  getPdfAccounting,
} from "../../services/accounting.service";
import KeyIcon from "@mui/icons-material/Key";
import DialogCustomersPasswords from "./DialogCustomersPasswords";
import ModalPasswords from "../public/ModalPasswords";
import { downloadFileFromBlob } from "./helper";
import FilterCustomer from "../filter/FilterCustomer";

export default function CustomersTable() {
  const [customer, setCustomers] = useState<Customer[]>();
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [flag, setFlag] = useState(false);
  const [client, setClient] = useState<Customer>({} as Customer);
  const [openModal, setOpenModal] = useState(false);
  const [openModalPwd, setOpenModalPwd] = useState(false);

  const [currentCustomer, setCurrentCustomer] = useState<any | null>(null);

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
  };

  const handleOpenModalPwd = (customer: Customer) => {
    setCurrentCustomer(customer);
    setOpenModalPwd(true);
  };

  const handleCloseModalPwd = () => {
    setOpenModalPwd(false);
    setCurrentCustomer(null);
  };

  const downloadFile = async (id: number | undefined) => {
    const { data } = await getDetsAccounting(id);
    const response = await getPdfAccounting(data);

    downloadFileFromBlob(response.data, "EstadoCuenta.pdf");
  };

  return (
    <Box>
      <FilterCustomer flag={flag} setCustomers={setCustomers} />
      <Box sx={{ padding: 2 }}>
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 650,
              "& th, & td": {
                color: "#5d5a5aff",
                padding: "12px 9px", // menos espacio en celdas
                fontSize: "0.85rem", // letra más chica
              },
              "& th": {
                fontWeight: 300,
                fontSize: "0.80rem", // menos grueso el encabezado
              },
            }}
            size="small"
            aria-label="caption table"
          >
            <thead>
              <tr>
                <th colSpan={9}>
                  <Box
                    sx={{
                      //margin: 2,
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
                      handleClickOpen={handleClickOpen}
                    />
                  </Box>
                </th>
              </tr>
            </thead>

            <TableHead>
              <TableRow>
                <TableCell>Razón social</TableCell>
                <TableCell align="left">Periodicidad</TableCell>
                <TableCell align="left">Rfc</TableCell>
                <TableCell align="left">Contraseña</TableCell>
                <TableCell align="left">Estado</TableCell>
                <TableCell align="left">Honorario</TableCell>
                <TableCell align="left">En sociedad</TableCell>
                <TableCell align="left">Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customer?.map((row) => {
                return (
                  <TableRow key={row.id}>
                    <Tooltip title="Contraseñas">
                      <TableCell onClick={() => handleOpenModalPwd(row)}>
                        {row.socialReason.toUpperCase()}
                      </TableCell>
                    </Tooltip>
                    <TableCell>{row.periodicity}</TableCell>
                    <TableCell align="left">{row.rfc}</TableCell>
                    <TableCell align="left">{row.password}</TableCell>
                    <TableCell align="left">
                      <Chip
                        label={row.status ? "ACTIVO" : "INACTIVO"}
                        color={row.status ? "success" : "default"}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="left">${row.honorary}</TableCell>
                    <TableCell align="left">
                      {row.isInSociety ? "SI" : "NO"}
                    </TableCell>

                    <TableCell align="left">
                      <Tooltip title="Actualizar">
                        <IconButton
                          onClick={() => {
                            setOpenEdit(true);
                            setClient(row);
                          }}
                          size="small"
                        >
                          <EditIcon sx={{ color: "#09356f" }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Estado de cuenta">
                        <IconButton
                          onClick={() => downloadFile(row.id)}
                          size="small"
                        >
                          <PictureAsPdfIcon sx={{ color: "#09356f" }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Contraseñas">
                        <IconButton
                          onClick={() => {
                            handleOpenModal();
                            setClient(row);
                          }}
                          size="small"
                        >
                          <KeyIcon sx={{ color: "#09356f" }} />
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
        onClose={handleClose}
        open={open}
        flag={flag}
        setFlag={setFlag}
      />

      <DialogCustomersEdit
        onClose={handleClose}
        open={openEdit}
        flag={flag}
        setFlag={setFlag}
        client={client}
      />
      <DialogCustomersPasswords
        onClose={handleCloseModal}
        open={openModal}
        customer={client}
        isEdit={false}
      />

      <ModalPasswords
        customer={currentCustomer}
        handleClose={handleCloseModalPwd}
        open={openModalPwd}
      />
    </Box>
  );
}
