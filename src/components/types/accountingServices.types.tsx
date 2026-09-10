import type { Dispatch, SetStateAction } from "react";

export interface BaseAccountingServiceProps {
  id: number;
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean>> | ((flag: boolean) => void);
}

export interface AccountingServiceDialogProps extends BaseAccountingServiceProps {
  open: boolean;
  onClose: () => void;
}

export type Props = AccountingServiceDialogProps;

