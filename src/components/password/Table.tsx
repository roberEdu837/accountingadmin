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
import type { Password, PasswordDTO } from "../../@types/passwors";
import type { Customer } from "../../@types/customer";
import { useModal } from "../../hooks";
import EditIcon from "@mui/icons-material/Edit";
import CustomersPasswordsCreate from "./CustomersPasswordsCreate";
import { useEffect, useState } from "react";

interface Props {
  customer: Customer | undefined;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
}
export default function TablePassword({ customer,flag,setFlag }: Props) {
  const openModal = useModal<PasswordDTO>();
  const [password, setPassword] = useState<Password[] | undefined>([])

  useEffect(() => {
  setPassword(customer?.passwords)
  },[])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SISTEMA</TableCell>
            <TableCell align="center">USUARIO</TableCell>
            <TableCell align="center">CONTRASEÑA</TableCell>
            <TableCell align="center">OPCIONES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {password?.map((row: any) => (
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
        customer={customer}
        onClose={openModal.closeModal}
        open={openModal.open}
        isEdit={openModal.data ? true : false}
        password={openModal.data}
        setFlag={setFlag}
        flag={flag}
        setPassword={setPassword}
      />
    </TableContainer>
  );
}
