import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { PasswordDTO } from "../../@types/passwors";
import type { Customer } from "../../@types/customer";
import { getPasswordsById } from "../../services";
import { useModal } from "../../hooks";
import EditIcon from "@mui/icons-material/Edit";
import CustomersPasswordsCreate from "./CustomersPasswordsCreate";

interface Props {
  customer: Customer | undefined;
}
export default function TablePassword({ customer }: Props) {
  const [passwords, setPasswords] = useState<PasswordDTO[]>([]);
  const openModal = useModal<PasswordDTO>();
  const [flag, setFlag] = useState(false);

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
                  <Button onClick={() => openModal.openModal(row)}>
                    <EditIcon sx={{ color: "#09356f" }} />
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomersPasswordsCreate
        onClose={openModal.closeModal}
        open={openModal.open}
        isEdit={openModal.data ? true : false}
        password={openModal.data}
        setFlag={setFlag}
        flag={flag}
      />
    </TableContainer>
  );
}
