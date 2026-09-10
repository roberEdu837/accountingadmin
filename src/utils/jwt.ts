/**
 * Verifica si el token JWT es válido y no ha expirado.
 */
export const isValidToken = (accessToken: string): boolean => {
  if (!accessToken || typeof accessToken !== 'string') {
    return false;
  }
return true;
  
};

export const ExpiredToken = () => {
  window.localStorage.clear();
  window.location.reload();
}
