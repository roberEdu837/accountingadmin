import { Dialog, DialogContent } from "@mui/material";
import DialogMessageBox from "../utils/DialogMessageBox";
import CloseButton from "../utils/CloseButton";
import FormAccountingServices from "../Forms/accountingServices/FormAccountingServices";
import type { Props } from "../types/accountingServices.types";

function DialogServiceAcconting({onClose,open, flag, setFlag, id }: Props) {

  const handleClose = () => {
    onClose();
    setFlag && setFlag(!flag);
  }
  return (
    
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogMessageBox
        title={"REGISTRAR SERVICIO ADICIONAL"}
        subtitle={
            "Llena los campos para agregar un nuevo servicio adicional."
        }
      />
       <CloseButton onClose={handleClose} />
 
      <DialogContent>
        <FormAccountingServices onClose={handleClose} flag={flag} setFlag={setFlag} id={id}/>
      </DialogContent>
    </Dialog>
  )
}

export default DialogServiceAcconting

