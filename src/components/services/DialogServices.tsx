import { Dialog, DialogContent } from "@mui/material";
import DialogMessageBox from "../utils/DialogMessageBox";
import CloseButton from "../utils/CloseButton";
import type { Service } from "../../@types/services";
import FormServices from "../Forms/services/FormServices";

interface Props {
  open: boolean;
  onClose: () => void;
  setFlag?: (flag: boolean) => void;
  flag?: boolean;
  additionalService: Service | undefined;
}
function DialogAdditionalService({onClose, flag,open,setFlag, additionalService}: Props) {

  const handleClose = () => {
    onClose();
    setFlag && setFlag(!flag);
  }

  return (
    
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogMessageBox
        title={additionalService?.id ? "ACTUALIZAR SERVICIO ADICIONAL" : "REGISTRAR SERVICIO ADICIONAL"}
        subtitle={
          additionalService?.id
            ? "Modifica los campos para actualizar el servicio adicional."
            : "Llena los campos para agregar un nuevo servicio adicional."
        }
      />
       <CloseButton onClose={handleClose} />
 
      <DialogContent>
        <FormServices service={additionalService}  onClose={handleClose} flag={flag} setFlag={setFlag} />
      </DialogContent>
    </Dialog>
  )
}

export default DialogAdditionalService
