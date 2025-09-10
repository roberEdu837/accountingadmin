import {
  Dialog,
  DialogContent,

} from "@mui/material";
import DialogMessageBox from "../utils/DialogMessageBox";
import type { Customer } from "../../@types/customer";
import TablePassword from "./Table";

interface ModalPasswordsProps {
  open: boolean;
  handleClose: any;
  customer: Customer | undefined;
}
export default function CustomersPasswords({
  handleClose,
  open,
  customer,
}: ModalPasswordsProps) {


  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogMessageBox
          title="Contraseñas asociadas"
          subtitle={`Cliente: ${customer?.socialReason || ""}`}
        />
        <DialogContent>
         <TablePassword customer={customer}/>
        </DialogContent>
      </Dialog>
      
    </>
  );
}
