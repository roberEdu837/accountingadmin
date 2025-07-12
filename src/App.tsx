import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login";
import "./App.css";
import Accounting from "./pages/accounting/Accounting";
import Customers from "./pages/customers";
import ClientsSociety from "./pages/clientsSociety";
import { ProtectedRoute } from "./components/ProtectRouter";
import { initialiceble } from "./redux/slices/userSlice";
import { useLayoutEffect, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "./components/navigation/Menu";
import { Toaster } from "react-hot-toast";
import { debts } from "./services/accounting.service";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { setmonth, setstatus, setyear } from "./redux/slices/filterSlice";
import LoadingScreen from "./components/utils/LoadingScreen";
import DialogMessageBox from "./components/utils/DialogMessageBox";

function DeudasChecker() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { isInitialized, isAuthenticated } = useSelector(
    (state: any) => state.user
  );
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const checkDebts = async () => {
      if (isInitialized && isAuthenticated) {
        try {
          const { data } = await debts();
          if (location.pathname !== "/clientsSociety") {
            if (data) {
              setOpen(true);
              dispatch(setmonth(0));
              dispatch(setyear(0));
              dispatch(setstatus(false));
            }
          }
        } catch (error) {
          console.error("Error al obtener deudas:", error);
          setOpen(false);
        }
      }
    };
    checkDebts();
  }, [location.pathname, isInitialized, isAuthenticated]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogMessageBox
        title="Tienes Deudas con tus Clientes"
        subtitle="Se han detectado pagos pendientes con algunos de tus clientes asociados."
      />

      <DialogContent>
        <DialogContentText>
          Te recomendamos regularizar tus deudas lo antes posible.
          Puedes consultar el detalle y gestionar los pagos a continuación.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
            if (location.pathname !== "/clientsSociety") {
              window.location.href = "/clientsSociety";
            }
          }}
          autoFocus
          sx={{
            bgcolor: "#09356f",
          }}
          variant="contained"
        >
          Ver Deudas
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function App() {
  const dispatch = useDispatch<any>();
  const { isInitialized, isAuthenticated } = useSelector(
    (state: any) => state.user
  );

  useLayoutEffect(() => {
    const init = async () => {
      await dispatch(initialiceble());
    };
    init();
  }, [dispatch]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Toaster containerStyle={{ zIndex: 99999 }} />
      <DeudasChecker />
      {isAuthenticated && <Menu />}
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/accounting"
          element={
            <ProtectedRoute>
              <Accounting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientsSociety"
          element={
            <ProtectedRoute>
              <ClientsSociety />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
