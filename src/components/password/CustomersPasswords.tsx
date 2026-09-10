import { Dialog, DialogContent } from "@mui/material";
import DialogMessageBox from "../utils/DialogMessageBox";
import TablePassword from "./Table";
import CloseButton from "../utils/CloseButton";
import type { Props } from "../types/password.types";


export default function CustomersPasswords({
  onClose,
  open,
  customer,
  flag,
  setFlag
}: Props) {
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogMessageBox
          title="Contraseñas Vinculadas"
          subtitle={`CLIENTE: ${customer?.socialReason.toUpperCase() || ""}`}
        />
        <CloseButton onClose={onClose} />

        <DialogContent>
          <TablePassword customer={customer} setFlag={setFlag} flag={flag}  />
        </DialogContent>
      </Dialog>
    </>
  );
}
