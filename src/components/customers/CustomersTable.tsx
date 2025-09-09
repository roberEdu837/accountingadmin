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
import KeyIcon from "@mui/icons-material/Key";
import DialogCustomersPasswords from "./DialogCustomersPasswords";
import ModalPasswords from "../public/ModalPasswords";
import FilterCustomer from "../filter/FilterCustomer";
import DialogPdf from "./DialogPdf";
import AddIcon from "@mui/icons-material/Add";

export default function CustomersTable() {
  const [customer, setCustomers] = useState<Customer[]>();
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [flag, setFlag] = useState(false);
  const [client, setClient] = useState<Customer>({} as Customer);
  const [openModal, setOpenModal] = useState(false);
  const [openModalPwd, setOpenModalPwd] = useState(false);
  const [openDialogPdf, setOpenDialogPdf] = useState(false);

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
                padding: "12px 9px",
                fontSize: "0.85rem",
                whiteSpace: "nowrap",
              },
              "& th": {
                fontWeight: 300,
                fontSize: "0.80rem",
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
                      <TableCell onClick={() => handleOpenModalPwd(row)}>
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
                          onClick={() => {
                            setOpenDialogPdf(true)
                            setCurrentCustomer(row);
                          }}
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
      <DialogPdf
        open={openDialogPdf}
        onClose={() => setOpenDialogPdf(false)}
        customer={currentCustomer}
      />
    </Box>
  );
}
