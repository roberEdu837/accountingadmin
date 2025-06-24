import {jwtDecode} from 'jwt-decode';
/**
 * Verifica si el token JWT es válido y no ha expirado.
 */
export const isValidToken = (accessToken: string): boolean => {
  if (!accessToken || typeof accessToken !== 'string') {
    return false;
  }

  try {
    const decoded = jwtDecode<{ exp: number }>(accessToken);
    const currentTime = Date.now() / 1000; // en segundos

    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Token inválido:", error);
    return false;
  }
};

export const ExpiredToken = () => {
  window.localStorage.clear();
  window.location.reload();
}
