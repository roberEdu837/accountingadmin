import { useState } from "react";

export function useModal<T>() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

 const openModal = (item?: T) => {
  if (item) setData(item);
  setOpen(true);
};


  const closeModal = () => {
    setData(undefined);
    setOpen(false);
  };

  return { open, data, openModal, closeModal,setData};
}
