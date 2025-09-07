import {
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DialogMessageBox from "../utils/DialogMessageBox";
import Paper from "@mui/material/Paper";
import type { MonthlyAccounting } from "../../@types/customer";
import { formatDate, paymentMethods } from "../../utils";

interface Props {
  open: boolean;
  handleClose: any;
  accounting: MonthlyAccounting | undefined;
  setAccountings?: any;
}

function DialogPaymentsList({ handleClose, open, accounting }: Props) {
  //   const { paymets, customer } = accounting;
  //   const { socialReason } = customer;
  //   const [flag, setFlag] = useState(false);
  //const [payments, setPayments] = useState<Payments[]>([]);

  //   const [openModal, setOpenModal] = useState(false);

  // const handleOpenModal = (row: Payments[]) => {
  //   //setOpenModal(true);
  // };

  //   const handleCloseModal = () => {
  //     setOpenModal(false);
  //   };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogMessageBox
          title="Contraseñas asociadas"
          subtitle={`Cliente: ${accounting?.customer.socialReason}`}
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
                </TableRow>
              </TableHead>
              <TableBody>
                {accounting?.paymets?.map((row) => (
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

                    {/* <TableCell align="center">
                      <Tooltip title="Editar">
                        <Button onClick={() => handleOpenModal(row)}>
                          <EditIcon sx={{ color: "#09356f" }} />
                        </Button>
                      </Tooltip>
                    </TableCell> */}
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
