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
import { totalPaid, formatDate, getMonthLabel } from "../../utils";
import type { Customer, MonthlyAccounting } from "../../@types/customer";
import { Icons } from "../utils/Icons";
interface Props {
  accountings?: MonthlyAccounting[];
  openModalPasswords: (customer: Customer) => void;
  openModalEditAccounting: (accounting: MonthlyAccounting) => void;
  handleAddPayment: (accounting: MonthlyAccounting, pending: number) => void;
  handleOpenPaymentsList: any;
  setCurrentAccounting: any;
  flag: boolean;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountingTableBody({
  accountings,
  openModalPasswords,
  openModalEditAccounting,
  handleAddPayment,
  handleOpenPaymentsList,
  setCurrentAccounting,
  flag,
  setFlag,
}: Props) {
  return (
    <TableBody>
      {accountings?.map((row: MonthlyAccounting) => {
        const {
          honorary,
          id,
          year,
          stateObligation,
          customer,
          month,
          periodicity,
          rfcTaxPaymentDate,
          isInSociety,
          paymets,
        } = row;
        const pending = honorary - totalPaid(row);

        return (
          <TableRow key={id}>
            <Tooltip title="Contraseñas">
              <TableCell
                onClick={() => openModalPasswords(customer)}
                sx={{
                  whiteSpace: "normal", // permite saltos
                  wordBreak: "break-word", // corta palabras largas
                  overflowWrap: "break-word", // refuerzo para navegadores modernos
                }}
              >
                <Box
                  component="span"
                  sx={{ display: "block", whiteSpace: "normal", width: 150 }}
                >
                  {customer?.socialReason.toUpperCase()}
                </Box>
              </TableCell>
            </Tooltip>
            <TableCell align="center">{periodicity}</TableCell>
            <TableCell align="center">{year}</TableCell>
            <TableCell align="center">
              {getMonthLabel(month, periodicity === "BIMESTRAL").toUpperCase()}
            </TableCell>
            <TableCell align="center">
              <SelectStatus
                valorInicial={stateObligation}
                setFlag={setFlag}
                flag={flag}
                id={id}
              />
            </TableCell>
            <TableCell align="center">
              {formatDate(rfcTaxPaymentDate)}
            </TableCell>
            <TableCell align="center">${honorary}</TableCell>
            <TableCell align="center">${totalPaid(row)}</TableCell>
            <TableCell align="center">
              {pending === 0 ? (
                <Chip
                  label="Pagado"
                  color="success"
                  size="small"
                  variant="outlined"
                />
              ) : (
                `$${pending}`
              )}
            </TableCell>
            <TableCell align="center">{isInSociety ? "SI" : "NO"}</TableCell>
            <TableCell align="left">
              <Tooltip title="Actualizar">
                <IconButton onClick={() => openModalEditAccounting(row)}>
                  {Icons.edit}
                </IconButton>
              </Tooltip>
              <Tooltip title="Agregar pago">
                <IconButton onClick={() => handleAddPayment(row, pending)}>
                  <IconWithBadge
                    parentIcon={Icons.payment}
                    childIcon={Icons.add}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title={paymets?.length?"Ver Pagos":'Sin pagos'}>
                <IconButton
                  onClick={() => {
                    if (paymets?.length) {
                      handleOpenPaymentsList(true);
                      setCurrentAccounting(row);
                    }
                  }}
                >
                  <IconWithBadge
                    parentIcon={Icons.payment}
                    childIcon={Icons.visibility}
                  />
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
                      openModalPasswords(customer);
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
  );
}
