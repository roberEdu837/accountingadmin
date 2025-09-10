import { useState } from "react";

export function useModal<T>() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const openModal = (item: T) => {
    setData(item);
    setOpen(true);
  };

  const closeModal = () => {
    setData(null);
    setOpen(false);
  };

  return { open, data, openModal, closeModal,setData};
}
