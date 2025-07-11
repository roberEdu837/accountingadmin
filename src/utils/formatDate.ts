//Retorna la fecha con formaro => miércoles, 25 de junio de 2025
export function formatFullDate(fechaISO: string, locale = "es-MX"): string {
  if (!fechaISO) {
    return "Sin fecha de pago";
  }

  const localdate = new Date(fechaISO.replace(/Z$/, ""));
  return localdate.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

//Devuelve la fecha actual
export const currentDate = () => {
  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  return localDate; // "YYYY-MM-DD"
};

//Devuelve la fecha actual mas 4 años
export const renewalDate = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() + 4);
  const renewalDate = today.toISOString().split("T")[0];

  return renewalDate;
};

//Devuel el label para el mes
export const getMonthLabel = (month: number, isBimonthly: boolean) => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  if (isBimonthly) {
    const firstIndex = Math.min(month, 12) - 1;
    const secondIndex = Math.max(month - 1, 1) + 1;
    return `${months[firstIndex]}/${months[secondIndex]}`;
  }

  return months[month - 1] || "Mes inválido";
};