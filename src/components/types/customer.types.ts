import type { Customer } from "../../@types/customer";

export interface Props {
    customer: Customer;
    open: boolean;
    onClose: () => void;
    setFlag?: (flag: boolean) => void;
    flag?: boolean;
}