import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import './App.css'
import Accounting from "./pages/accounting/Accounting";
import Customers from "./pages/customers";
import ClientsSociety from "./pages/clientsSociety";
import { ProtectedRoute } from "./components/ProtectRouter";
import { initialiceble } from "./redux/slices/userSlice";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "./components/navigation/Menu";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch<any>();
  const {isInitialized,isAuthenticated} = useSelector(
    (state: any) => state.user
  );

  useLayoutEffect(() => {
    const init = async () => {
      await dispatch(initialiceble());
    };
    init();
  }, [dispatch]);

  if (!isInitialized) {
    return <h1>Cargando...</h1>; 
  }
  

  return (
    <BrowserRouter>
     <Toaster 
            containerStyle={{zIndex: 99999}} />
    {
      isAuthenticated && <Menu/>
    }
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
