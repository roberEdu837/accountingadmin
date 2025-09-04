import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import DialogMessageBox from "../components/utils/DialogMessageBox";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: number;
  setFilter: any;
  // 0: contabilidad terminada pero no pagada, 1: pagos con asociados
}

export default function CheckDebts({ open, setOpen, setFilter, type }: Props) {
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
    setOpen(false);
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
        status: false,
      });
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogMessageBox
        title={dialogInfo.title}
        subtitle={dialogInfo.subtitle}
      />

      <DialogContent>
        <DialogContentText sx={{ textAlign: "justify" }}>
          {dialogInfo.content}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          Cancelar
        </Button>
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
