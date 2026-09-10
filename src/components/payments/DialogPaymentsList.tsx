import {
  Dialog,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import DialogMessageBox from "../utils/DialogMessageBox";
import Paper from "@mui/material/Paper";
import { formatDate, paymentMethods } from "../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import ToastNotification from "../utils/ToastNotification";
import { useEffect, useState } from "react";
import { deletePayment, patchAccounting } from "../../services";
import CloseButton from "../utils/CloseButton";
import type { Payments, Props } from "../../@types/payments";
import { getPaymentsByAccountingId } from "../../services/payments.service";


function DialogPaymentsList({
  handleClose,
  open,
  monthlyAccountingId,
  flag,
  monthlyPaymentCompleted,
  nameCustomer,
  setFlag,
}: Props) {
  const [payments, setPayments] = useState<Payments[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      if (monthlyAccountingId) {
        const response = await getPaymentsByAccountingId(monthlyAccountingId);
        setPayments(response.data || []);
      }
    };

    fetchPayments();
  }, [monthlyAccountingId]);



  const deletePaymentAsync = async (id: number | undefined) => {
    if (!id) return;
    setLoading(true);
    if (monthlyPaymentCompleted === true) {
      await patchAccounting(monthlyAccountingId || 0, {
        monthlyPaymentCompleted: false,
      });
    }

    await deletePayment(id);

    ToastNotification(`El pago se eliminó correctamente`, "success");

    const payment = payments.filter((payment) => {
      return payment.id !== id;
    });
    setPayments(payment);
    setLoading(false);
  };

  const onClose = () => {
    handleClose()
    setFlag(!flag);
  }


  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogMessageBox
          title="PAGOS REGISTRADOS"
          subtitle={`CLIENTE: ${nameCustomer}`}
        />
        <CloseButton onClose={onClose} />

        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>CONCEPTO</TableCell>
                  <TableCell align="center">MONTO</TableCell>
                  <TableCell align="center">FECHA DE PAGO</TableCell>
                  <TableCell align="center">METODO DE PAGO</TableCell>
                  <TableCell align="center">OPCIONES</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.accountingService?.services.name ?? "Honorarios Contables"}</TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell align="center">
                      {formatDate(row.paymentDate)}
                    </TableCell>
                    <TableCell align="center">
                      {paymentMethods[row.paymentMethod].toUpperCase() || "Desconocido"}
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="Eliminar">
                        <IconButton
                          onClick={() => deletePaymentAsync(row.id)}
                          loading={loading}
                        >
                          <DeleteIcon sx={{ color: "#09356f" }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DialogPaymentsList;
