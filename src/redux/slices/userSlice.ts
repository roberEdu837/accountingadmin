import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { isValidToken } from "../../utils/jwt";
import type { UserState } from "../../@types/user";
const initialState: UserState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  loadingFull: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    login(state: UserState, action: any) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },
    initialize: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.isInitialized = action.payload.isInitialized;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
    },
    setLoadingFull: (state, action: PayloadAction<boolean>) => {
      state.loadingFull = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { login, initialize, logout, setLoadingFull } = userSlice.actions;

export const logIn = (userData: any, callback: any) => (dispatch: any) => {
  const { user, token } = userData;
  window.localStorage.setItem("accounting_tkn", token);
  window.localStorage.setItem("accounting_user", JSON.stringify(user));
  dispatch(login(user));
  callback();
};

export const logOut = (callback: any) => async (dispatch: any) => {
  // Limpiamos el localStorage para eliminar los datos del usuario
  window.localStorage.removeItem("accounting_user");
  window.localStorage.removeItem("accounting_tkn");
  // Despachamos la acción 'logout' para actualizar el estado
  dispatch(logout());

  callback();
};

export const initialiceble = () => (dispatch: any) => {
  try {
    // Obtenemos los datos del usuario desde el localStorage
    let user = window.localStorage.getItem("accounting_user");
    let accessToken = window.localStorage.getItem("accounting_tkn");

    if (user != null || user != undefined) {
      user = JSON.parse(user);
    }

    if (accessToken && isValidToken(accessToken) && user) {
      dispatch(
        initialize({ user: user, isAuthenticated: true, isInitialized: true })
      );
      console.log("si");
    } else {
      console.log("no");
      dispatch(
        initialize({ isAuthenticated: false, user: null, isInitialized: true })
      );
    }
  } catch (error) {
    console.error(error);
  }
};
