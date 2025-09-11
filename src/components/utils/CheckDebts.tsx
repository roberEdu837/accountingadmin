import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import DialogMessageBox from "./DialogMessageBox";
import CloseButton from "./CloseButton";

interface Props {
  open: boolean;
  handleClose: () => void;
  type: number;
  setFilter: any;
}

export default function CheckDebts({
  open,
  handleClose,
  setFilter,
  type,
}: Props) {
  const dialogInfo =
    type === 1
      ? {
          title: "Revisa tus Pagos con Asociados",
          subtitle:
            "Tienes clientes en colaboración y es momento de repartir los ingresos.",
          content:
            "Recuerda que cada mes debes pagar a tus asociados su parte correspondiente por los clientes que comparten. Puedes revisar los detalles y gestionar los pagos a continuación.",
          buttonText: "Ver Deudas",
        }
      : {
          title: "Pagos Pendientes de Clientes",
          subtitle:
            "Tu contabilidad está lista, pero algunos clientes no han pagado aún",
          content:
            "Hemos detectado que completaste la contabilidad de algunos clientes, pero todavía no han realizado sus pagos. Revisa los detalles y gestiona los pagos pendientes para mantener todo al día.",
          buttonText: "Revisar Clientes",
        };

  const handleClick = () => {
    handleClose();
    if (type === 0) {
      setFilter({
        month: 0,
        search: "",
        year: 0,
        monthlyPaymentCompleted: false,
      });
    } else {
      setFilter({
        month: 0,
        search: "",
        year: 0,
        monthlyPaymentCompleted: false,
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogMessageBox
        title={dialogInfo.title}
        subtitle={dialogInfo.subtitle}
      />
      <CloseButton onClose={handleClose} />

      <DialogContent>
        <DialogContentText sx={{ textAlign: "justify" }}>
          {dialogInfo.content}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClick}
          autoFocus
          sx={{ bgcolor: "#09356f" }}
          variant="contained"
        >
          {dialogInfo.buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
