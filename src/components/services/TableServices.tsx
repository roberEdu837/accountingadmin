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
  IconButton,
} from "@mui/material";
import { columnsServices } from "../../constants/columns";
import { useEffect, useState } from "react";
import ButtonAdd from "../utils/ButtonAdd";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "../../hooks";
import { Icons } from "../utils/Icons";
import { getServices } from "../../services/services.service";
import type { Service } from "../../@types/services";
import DialogAdditionalService from "./DialogServices";

export default function TableServices() {
  const [additionalServices, setAdditionalServices] = useState<
    Service[] | undefined
  >();
  const updateModal = useModal<Service | undefined>();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchAdditionalServices = async () => {
      try {
        const { data } = await getServices();
        setAdditionalServices(data);
      } catch (error) {
        console.error("Error fetching additional services:", error);
      }
    };

    fetchAdditionalServices();
  }, [flag]);

  return (
    <Box>
      <Box sx={{ p: 3 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table className="myTable" size="small" aria-label="caption table">
            <thead>
              <tr>
                <th colSpan={9}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>
                      Servicios
                    </span>
                  </Box>
                </th>
              </tr>
            </thead>
            <TableHead>
              <TableRow>
                {columnsServices?.map((col) => (
                  <th key={col.key} align={col.align as any}>
                    {col.label}
                  </th>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {additionalServices && additionalServices.length > 0 ? (
                additionalServices.map((row: any) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                      <TableCell>{row.description}</TableCell>
                    <TableCell>
                      {" "}
                      <Tooltip title="Actualizar">
                        <IconButton
                          onClick={() => updateModal.openModal(row)}
                          size="small"
                        >
                          {Icons.edit}
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
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 20,
            zIndex: 1200,
          }}
        >
          <ButtonAdd
            text="Nuevo servicio"
            handleClickOpen={updateModal.openModal}
            icon={<AddIcon />}
          />
        </Box>
      </Box>
      <DialogAdditionalService
        onClose={updateModal.closeModal}
        open={updateModal.open}
        flag={flag}
        setFlag={setFlag}
        additionalService={
          additionalServices
            ? additionalServices.find(
                (service) => service.id === updateModal.data?.id,
              )
            : undefined
        }
      />
    </Box>
  );
}
