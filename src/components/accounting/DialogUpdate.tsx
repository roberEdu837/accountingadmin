import { Dialog, DialogContent } from "@mui/material";
import DialogMessageBox from "../utils/DialogMessageBox";
import AccountingForm from "../Forms/accounting/Accounting";
import CloseButton from "../utils/CloseButton";
import type { DialogUpdateProps } from "../types/accounting.types";

export default function DialogUpdate({
  handelClose,
  open,
  accounting,
  flag,
  setFlag,
}: DialogUpdateProps) {
  return (
    <Dialog open={open} onClose={handelClose} fullWidth maxWidth="xs">
      <DialogMessageBox
        title="ACTUALIZAR CONTABILIDAD"
        subtitle="Modifica la contabilidad mensual."
      />
      <CloseButton onClose={handelClose} />

      <DialogContent>
        <AccountingForm
          accounting={accounting}
          handleClose={handelClose}
          flag={flag}
          setFlag={setFlag}
        />
      </DialogContent>
    </Dialog>
  );
}
