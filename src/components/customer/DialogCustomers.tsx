import { Dialog, DialogContent } from "@mui/material";
import DialogMessageBox from "../utils/DialogMessageBox";
import CustomerForm from "../Forms/customer/Customer";
import CloseButton from "../utils/CloseButton";
import type { Props } from "../types/customer.types";

export default function DialogCustomers({
  onClose,
  open,
  setFlag,
  flag,
  customer,
}: Props) {
  
  return (
    
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogMessageBox
        title={customer?.id ? "ACTUALIZAR CLIENTE" : "REGISTAR CLIENTE"}
        subtitle={
          customer?.id
            ? "Modifica los campos para actualizar al cliente."
            : "Llena los campos para agregar un nuevo cliente."
        }
      />
       <CloseButton onClose={onClose} />
 
      <DialogContent>
        <CustomerForm
          customer={customer}
          onClose={onClose}
          setFlag={setFlag}
          flag={flag}
        />
      </DialogContent>
    </Dialog>
  );
}
