import { Dialog, DialogContent } from "@mui/material";
import DialogMessageBox from "../utils/DialogMessageBox";
import type { Customer } from "../../@types/customer";
import TablePassword from "./Table";
import CloseButton from "../utils/CloseButton";

interface ModalPasswordsProps {
  open: boolean;
  handleClose: any;
  customer: Customer | undefined;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
}
export default function CustomersPasswords({
  handleClose,
  open,
  customer,
  flag,
  setFlag
}: ModalPasswordsProps) {
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogMessageBox
          title="Contraseñas Vinculadas"
          subtitle={`CLIENTE: ${customer?.socialReason.toUpperCase() || ""}`}
        />
               <CloseButton onClose={handleClose} />

        <DialogContent>
          <TablePassword customer={customer} setFlag={setFlag} flag={flag}/>
        </DialogContent>
      </Dialog>
    </>
  );
}
