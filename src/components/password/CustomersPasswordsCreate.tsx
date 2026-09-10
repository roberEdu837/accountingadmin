import { Dialog, DialogContent } from "@mui/material";
import DialogMessageBox from "../utils/DialogMessageBox";
import PasswordForm from "../Forms/password/PasswordForm";
import CloseButton from "../utils/CloseButton";
import type { Props } from "../types/password.types";

export default function CustomersPasswordsCreate({
  onClose,
  open,
  setFlag,
  flag,
  customer,
  isEdit,
  password,
  setPassword,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogMessageBox
        title={isEdit ? "EDITAR CONTRASEÑA" : "AGREGAR CONTRASEÑA"}
        subtitle={
          isEdit
            ? `Modifica los datos para la contraseña del cliente ${customer?.socialReason}.`
            : `Llena los campos para agregar una nueva contraseña al cliente ${customer?.socialReason}.`
        }
      />
      <CloseButton onClose={onClose} />

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
