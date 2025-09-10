import { useState } from "react";

export function useModal<T>() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const openModal = (item?: T) => {
    if (item) setData(item);
    setOpen(true);
  };

const closeModal = () => {
  setOpen(false);
  setTimeout(() => {
    setData(undefined);
  }, 300); // 300ms coincide con la animación de cierre de MUI Dialog
};


  return { open, data, openModal, closeModal, setData };
}
