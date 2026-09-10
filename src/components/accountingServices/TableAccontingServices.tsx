import {
  Box,
  Paper,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableCell,
  Tooltip,
  IconButton
} from "@mui/material";
import { useEffect, useState } from "react";
import ButtonAdd from "../utils/ButtonAdd";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "../../hooks";
import { columnsServicesAccounting } from "../../constants/columns";
import type { TableAccountingService } from "../../@types/services";
import { deleteAccountingService, getAccountingServicesById } from "../../services/services.service";
import DialogServiceAcconting from "./DialogAddAccountingService";
import type { BaseAccountingServiceProps } from "../types/accountingServices.types";
import DeleteIcon from "@mui/icons-material/Delete";
import ToastNotification from "../utils/ToastNotification";


export default function TableAccontingServices({ id, flag, setFlag }: BaseAccountingServiceProps) {
  const [accountingServices, setAccountingServicesList] = useState<
    TableAccountingService[]
  >([]);
  const [loading, setLoading] = useState(false);

  const deletePaymentAsync = async (id: number) => {
    if (!id) return;
    setLoading(true);

    await deleteAccountingService(id);


    const payment = accountingServices.filter((payment) => {
      return payment.id !== id;
    });
    setAccountingServicesList(payment);
    setLoading(false);
    ToastNotification(`El pago se eliminó correctamente`, "success");
    

  };


  const formModal = useModal<undefined>();

  const fetchAccountingServices = async () => {
    if (!id) return;

    try {
      const res = await getAccountingServicesById(id);
      setAccountingServicesList(res.data);
    } catch (error) {
      console.error("Error fetching accounting services:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchAccountingServices();
      } catch (error) {
        console.error("Error al cargar los servicios contables:", error);
      }
    };

    loadData();
  }, [id,flag]);


  return (
    <Box>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            m: 2,
          }}
        >
          <ButtonAdd
            text="Nuevo Servicio Adicional"
            handleClickOpen={formModal.openModal}
            icon={<AddIcon />}
          />
        </Box>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table className="myTable" size="small">
            <thead>
              <tr>
                <th colSpan={9}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>
                      Servicios Adicionales
                    </span>
                  </Box>
                </th>
              </tr>
            </thead>

            <TableHead>
              <TableRow>
                {columnsServicesAccounting.map((col) => (
                  <th key={col.key} align={col.align as any}>
                    {col.label}
                  </th>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {accountingServices.length > 0 ? (
                accountingServices.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell >
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No hay servicios adicionales disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <DialogServiceAcconting
        open={formModal.open}
        onClose={formModal.closeModal}
        flag={flag}
        setFlag={setFlag}
        id={id}
      />
    </Box>
  );
}