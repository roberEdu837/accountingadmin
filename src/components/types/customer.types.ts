import type { Customer } from "../../@types/customer";

export interface Props {
    customer: Customer | undefined;
    open: boolean;
    onClose: () => void;
    setFlag?: (flag: boolean) => void;
    flag?: boolean;
}