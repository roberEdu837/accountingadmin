import {
  Button,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import DialogMessageBox from "../utils/DialogMessageBox";
import Paper from "@mui/material/Paper";
import type { Customer } from "../../@types/customer";
import { useEffect, useState } from "react";
import { getPasswordsById } from "../../services/passwords.service";
import EditIcon from "@mui/icons-material/Edit";
import DialogCustomersPasswords from "../customers/DialogCustomersPasswords";
import type { PasswordDTO } from "../../@types/passwors";

interface ModalPasswordsProps {
  open: boolean;
  handleClose: any;
  customer: Customer | undefined;
}
function ModalPasswords({ handleClose, open, customer }: ModalPasswordsProps) {
  const [passwords, setPasswords] = useState<PasswordDTO[]>([]);
  const [password, setPassword] = useState<PasswordDTO>();
  const [flag, setFlag] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getPasswords = async () => {
    if (customer?.id) {
      const { data } = await getPasswordsById(customer.id);
      setPasswords(data);
    }
  };

  useEffect(() => {
    getPasswords();
  }, [customer, flag]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogMessageBox
          title="Contraseñas asociadas"
          subtitle={`Cliente: ${customer?.socialReason || ""}`}
        />
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sistema</TableCell>
                  <TableCell align="center">Usuario</TableCell>
                  <TableCell align="center">Contraseña</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {passwords.map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.systemName}
                    </TableCell>
                    <TableCell align="center">{row.accessKey}</TableCell>
                    <TableCell align="center">{row.password}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Editar">
                        <Button
                          onClick={() => {
                            handleOpenModal();
                            setPassword(row);
                          }}
                        >
                          <EditIcon sx={{ color: "#09356f" }} />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
      <DialogCustomersPasswords
        onClose={handleCloseModal}
        open={openModal}
        isEdit={true}
        password={password}
        setFlag={setFlag}
        flag={flag}
      />
    </>
  );
}

export default ModalPasswords;
