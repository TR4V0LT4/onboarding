export interface NavItem {
    name: string;
    href: string;
    icon: any;
    active: boolean;
    color: string;
    shadowColor: string;
    sublinks?: any;
}


export interface User {
    email: string;
    password: string;
    phone: string;
    first_name: string;
    last_name: string;
    ice: string;
    confirmation_password: string;
    type: string;
    terms: boolean;
}

export interface Location {
    pharmacy_name: string;
    // region: number;
    // sector: number;
    city: string;
    fix: string
    lat: number;
    lng: number;
    address: string;
}

export type RoleId = 'pha_holder' | 'pha_substite' | 'pha_technician' | 'laboratory_admin' | 'laboratory_operator' | 'wholesaler_admin' | 'wholesaler_operator' | 'admin' | 'operator' | 'commercial' | 'technician' | 'product_manager' | 'other';
    
export type Sale = {
    id: string;
    waiting: boolean;
    reference: string;
    client: string;
    date: string;
    quantity: number;
    total: number;
    credit: number;
    state: string;
};

export type Client = {
    id: string;
    name: string;
    first_name?: string;
    type: string;
    phone: string;
    email: string;
    credit?: number;
    plafan_credit?: number;
};

export type Product = {
    id: string;
    name: string;
    ppv: number[];
    selected_ppv?: number;
    disp: number;
    quantity?: number;
    pph?: number[];
    zone: string;
    code_bare?: string;
    type_remise?: string;
    remise?: number;
    expirationDate?: string;
    tva?: number;
};

export type Operator = {
    id: string;
    first_name: string;
    last_name: string;
    phone?: string;
    email?: string;
    role?: string;
};

export type Molecule = {
    id: string;
    name: string;
};



