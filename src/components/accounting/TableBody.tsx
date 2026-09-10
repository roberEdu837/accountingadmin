import {
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Chip,
  IconButton,
  Box,
} from "@mui/material";
import SelectStatus from "./StatusSelector";
import IconWithBadge from "../utils/IconWithBadge";
import { formatDate, getMonthLabel } from "../../utils";
import type { TableMonthlyAccounting } from "../../@types/customer";
import { Icons } from "../utils/Icons";
import { downloadFileFromBlob } from "../customer/helper";
import { getPdfAccountingPayments } from "../../services";
import ToastNotification from "../utils/ToastNotification";
import type { TableBodyProps } from "../types/accounting.types";


export default function AccountingTableBody({
  accountings,
  openModalPasswords,
  openModalEditAccounting,
  openModalAccountingServices,
  handleAddPayment,
  handleOpenPaymentsList,
  setCurrentAccounting,
  flag,
  setFlag,
}: TableBodyProps) {

  
  const handleDowloadPdt = async (id: number) => {
    try {
      const { data } = await getPdfAccountingPayments(id);
       downloadFileFromBlob(data, "EstadoCuenta.pdf");

    } catch (error) {
      console.error("Error al descargar el estado de cuenta:", error);
      ToastNotification(
        `El cliente no tiene un estado de cuenta disponible`,
        "success"
      );
    }
  };

  return (
    <>

      <TableBody>
        {accountings?.map((row: TableMonthlyAccounting) => {
          return (
            <TableRow key={row.id}>
              <Tooltip title="Contraseñas">
                <TableCell
                  onClick={() => openModalPasswords(row.customer)}
                  sx={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  <Box
                    component="span"
                    sx={{ display: "block", whiteSpace: "normal", width: 150 }}
                  >
                    {row.customer?.socialReason.toUpperCase()}
                  </Box>
                </TableCell>
              </Tooltip>
              <TableCell align="center">{row.periodicity}</TableCell>
              <TableCell align="center">{row.year}</TableCell>
              <TableCell align="center">
                {getMonthLabel(row.month, row.periodicity === "BIMESTRAL").toUpperCase()}
              </TableCell>
              <TableCell align="center">
                <SelectStatus
                  valorInicial={row.stateObligation}
                  setFlag={setFlag}
                  flag={flag}
                  id={row.id}
                />
              </TableCell>
              <TableCell align="center">
                {formatDate(row.rfcTaxPaymentDate)}
              </TableCell>
              <TableCell align="center">${row.totalToPay.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</TableCell>
              <TableCell align="center">${row.paid.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</TableCell>
              <TableCell align="center">
                {row.debt === 0 ? (
                  <Chip
                    label="Pagado"
                    color="success"
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  `$${row.debt.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
                )}
              </TableCell>
              <TableCell align="center">{row.isInSociety ? "SI" : "NO"}</TableCell>
              <TableCell align="left">
                <Tooltip title="Actualizar">
                  <IconButton onClick={() => openModalEditAccounting(row)}>
                    {Icons.edit}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Agregar pago">
                  <IconButton onClick={() => handleAddPayment(row, row.debt)}>
                    <IconWithBadge
                      parentIcon={Icons.payment}
                      childIcon={Icons.add}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Ver pagos">
                  <IconButton
                    onClick={() => {
                      handleOpenPaymentsList(true);
                      setCurrentAccounting(row);
                    }}
                  >
                    <IconWithBadge
                      parentIcon={Icons.payment}
                      childIcon={Icons.visibility}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Servicios adicionales">
                  <IconButton
                    onClick={() => {
                      openModalAccountingServices(row.id);
                    }}
                  >
                    <IconWithBadge
                      parentIcon={Icons.miscellaneousServices}
                      childIcon={Icons.visibility}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Estado de cuenta">
                  <IconButton
                    onClick={() => handleDowloadPdt(row.customer.id!)}
                    size="small"
                  >
                    {Icons.pdfIcon}
                  </IconButton>
                </Tooltip>
                
                <Tooltip
                  title={
                    row?.customer.passwords
                      ? "Ver contraseñas"
                      : "Sin contraseñas"
                  }
                >
                  <IconButton
                    onClick={() => {
                      if (
                        row?.customer.passwords &&
                        row.customer.passwords.length > 0
                      ) {
                        openModalPasswords(row.customer);
                      }
                    }}
                    size="small"
                  >
                    <IconWithBadge
                      parentIcon={Icons.keyIcon}
                      childIcon={Icons.visibility}
                    />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
}
