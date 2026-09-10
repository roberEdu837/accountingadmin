export type Service = {
    id?: number;
    name: string;
    description: string;
}

export type AccountingService = {
    id: number;
    amount: number;
    serviceId: number;
    monthlyAccountingId: number;
    services: Service;
    status:string;
}

export type AddAccountingService = {
    amount: number;
    servicesId: number;
    monthlyAccountingId: number;
    status?: string;
}

export type TableAccountingService = {
    id: number;
    name: string;
    amount: number;
    status: string;
    serviceId: number;
    paid: number;
    debt: number;
}