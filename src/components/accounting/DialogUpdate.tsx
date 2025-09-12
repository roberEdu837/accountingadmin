import { Dialog, DialogContent } from "@mui/material";
import type { MonthlyAccounting } from "../../@types/customer";
import DialogMessageBox from "../utils/DialogMessageBox";
import AccountingForm from "../Forms/accounting/Accounting";
import CloseButton from "../utils/CloseButton";

interface Props {
  open: boolean;
  handelClose: () => void;
  accounting: MonthlyAccounting | undefined;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
}

export default function DialogUpdate({
  handelClose,
  open,
  accounting,
  flag,
  setFlag,
}: Props) {
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
