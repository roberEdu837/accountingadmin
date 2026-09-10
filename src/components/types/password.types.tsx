import type { Dispatch, SetStateAction } from "react";
import type { Customer } from "../../@types/customer";
import type { PasswordDTO } from "../../@types/passwors";

// export interface Props {
//   open: boolean;
//   onClose: () => void;
//   setFlag?: (flag: boolean) => void;
//   flag?: boolean;
//   customer?: Customer | undefined;
//   isEdit: boolean;
//   password?: PasswordDTO;
//   setPassword?: any;
// }

// export interface ModalPasswordsProps {
//   open: boolean;
//   handleClose: any;
//   customer: Customer | undefined;
//   setFlag?: (flag: boolean) => void;
//   flag?: boolean;
// }


// 1. Interfaz Base con todas las propiedades requeridas para el manejo de contraseñas
export interface BasePasswordProps {
  open: boolean;
  customer?: Customer | undefined;
  flag?: boolean;
  setFlag?: Dispatch<SetStateAction<boolean>> | ((flag: boolean) => void);
}

export interface ModalPasswordsProps extends BasePasswordProps {
  onClose: () => void;
  isEdit?: boolean;
  password?: PasswordDTO;
  setPassword?: any;
}

export type Props = ModalPasswordsProps;