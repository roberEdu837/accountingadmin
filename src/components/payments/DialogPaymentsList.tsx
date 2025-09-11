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
import type { MonthlyAccounting } from "../../@types/customer";
import { formatDate, paymentMethods } from "../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import ToastNotification from "../utils/ToastNotification";
import { useEffect, useState } from "react";
import { getPaymentsByAccountingId, patchAccounting } from "../../services";
interface Props {
  open: boolean;
  handleClose: any;
  accounting: MonthlyAccounting | undefined;
  setFlag: (flag: boolean) => void;
  flag: boolean;
}

function DialogPaymentsList({
  handleClose,
  open,
  accounting,
  flag,
  setFlag,
}: Props) {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPayments(accounting?.paymets || []);
  }, [accounting]);

  const deletePayment = async (id: number | undefined) => {
    if (!id) return;
    setLoading(true);
    if (accounting?.monthlyPaymentCompleted === true) {
      await patchAccounting(accounting?.id || 0, {
        monthlyPaymentCompleted: false,
      });
    }

    //Cambie el estado de pago completado

    await getPaymentsByAccountingId(id);

    ToastNotification(`El pago se eliminó correctamente`, "success");

    // 3. Actualizamos en el padre (setAccountings probablemente tiene la lista de accountings completa)
    const payment = payments.filter((payment) => {
      return payment.id !== id;
    });
    setPayments(payment);
    setFlag(!flag);
    setLoading(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogMessageBox
          title="Pagos asociados"
          subtitle={`Cliente: ${accounting?.customer?.socialReason || ""}`}
        />

        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="center">Monto</TableCell>
                  <TableCell align="center">Fecha de pago</TableCell>
                  <TableCell align="center">Metodo de pago</TableCell>
                  <TableCell align="center">Opciones</TableCell>
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
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell align="center">
                      {formatDate(row.paymentDate)}
                    </TableCell>
                    <TableCell align="center">
                      {paymentMethods[row.paymentMethod] || "Desconocido"}
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="Eliminar">
                        <IconButton
                          onClick={() => deletePayment(row.id)}
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
