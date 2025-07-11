import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import type { Customer } from "../../@types/customer";
import { Box, Button, Chip } from "@mui/material";
import { getCustomers } from "../../services/customer.service";
import DialogCustomers from "./DialogCustomers";
import ButtonAdd from "../utils/ButtonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DialogCustomersEdit from "./DialogCustomersEdit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  getDetsAccounting,
  getPdfAccounting,
} from "../../services/accounting.service";

export default function CustomersTable() {
  const [Accounting, setCustomers] = useState<Customer[] | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [flag, setFlag] = useState(false);
  const [client, setClient] = useState<any>();

  const getAccounting = async () => {
    try {
      const { data } = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAccounting();
  }, [flag]);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
  };

  return (
    <Box>
      <Box sx={{ padding: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <thead>
              <tr>
                <th colSpan={9}>
                  <Box
                    sx={{
                      margin: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between", // Para que el texto y el botón estén en los extremos
                    }}
                  >
                    <span>Contribuyentes</span>
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
                <TableCell>Razón Social</TableCell>
                <TableCell align="right">Periodicidad</TableCell>
                <TableCell align="right">RFC</TableCell>
                <TableCell align="right">Contraseña</TableCell>
                <TableCell align="right">Estado</TableCell>
                <TableCell align="right">Honorario</TableCell>
                <TableCell align="right">Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Accounting &&
                Accounting.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.socialReason}</TableCell>
                      <TableCell align="right">{row.periodicity}</TableCell>
                      <TableCell align="right">{row.rfc}</TableCell>
                      <TableCell align="right">{row.password}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={row.status ? "Activo" : "Inactivo"}
                          color={row.status ? "success" : "default"}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">${row.honorary}</TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => {
                            setOpenEdit(true);
                            setClient(row);
                          }}
                        >
                          <EditIcon sx={{ color: "#09356f" }} />
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={async () => {
                            const { data } = await getDetsAccounting(row.id);
                            const response = await getPdfAccounting(data);
                            const blob = new Blob([response.data], {
                              type: "application/pdf",
                            });
                            const url = window.URL.createObjectURL(blob);

                            const a = document.createElement("a");
                            a.href = url;
                            a.download = "reporte.pdf";
                            document.body.appendChild(a);
                            a.click();

                            // Limpieza
                            a.remove();
                            window.URL.revokeObjectURL(url);
                          }}
                        >
                          <PictureAsPdfIcon sx={{ color: "#09356f" }} />
                        </Button>
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
    </Box>
  );
}
