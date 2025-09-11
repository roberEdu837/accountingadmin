import { Dialog, DialogContent } from "@mui/material";
import DialogMessageBox from "../utils/DialogMessageBox";
import type { Customer } from "../../@types/customer";
import type { PasswordDTO } from "../../@types/passwors";
import PasswordForm from "../Forms/password/PasswordForm";

interface Props {
  open: boolean;
  onClose: () => void;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
  customer?: Customer | undefined;
  isEdit: boolean;
  password?: PasswordDTO;
  setPassword?:any
}

export default function CustomersPasswordsCreate({
  onClose,
  open,
  setFlag,
  flag,
  customer,
  isEdit,
  password,
  setPassword
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogMessageBox
        title={isEdit ? "Editar Contraseña" : "Registrar Contraseña"}
        subtitle={
          isEdit
            ? `Modifica los datos para la contraseña del cliente ${
                customer?.socialReason 
              }.`
            : `Llena los campos para agregar una nueva contraseña al cliente ${
                customer?.socialReason
              }.`
        }
      />

      <DialogContent>
        <PasswordForm
          onClose={onClose}
          customer={customer}
          flag={flag}
          password={password}
          setFlag={setFlag}
          isEdit={isEdit}
          setPassword={setPassword}
        />
      </DialogContent>
    </Dialog>
  );
}
