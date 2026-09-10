import { Dialog } from "@mui/material";
import TableAccontingServices from "./TableAccontingServices";
import type { Props } from "../types/accountingServices.types";

function DialogAccountingServices({ onClose, open, id ,flag,setFlag}: Props) {

  const handleClose = () => {
    onClose();
    setFlag(!flag); 
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <TableAccontingServices id={id} key={id} flag={flag} setFlag={setFlag} />
    </Dialog>
  );
}

export default DialogAccountingServices;