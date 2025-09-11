import { Dialog, DialogContent } from "@mui/material";
import type { Customer } from "../../@types/customer";
import DialogMessageBox from "../utils/DialogMessageBox";
import CustomerForm from "../Forms/customer/Customer";

interface Props {
  open: boolean;
  onClose: () => void;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
  customer: Customer | undefined;
}

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
        title={customer?.id ? "Actualizar Cliente" : "Registro de Cliente"}
        subtitle={
          customer?.id
            ? "Modifica los campos para actualizar al cliente."
            : "Llena los campos para agregar un nuevo cliente."
        }
      />

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
