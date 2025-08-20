export interface PaymentAccount {
    id: number;
    name: string;
    type: string;
    number_account: string;
    bank: string;
    card_type: string;
    expiry: string;
    cvv: string;
}

export const Account: PaymentAccount[] = [
    {
        id: 1,
        name: 'María González',
        type: 'Ahorros',
        number_account: '1001-2345-6789-0123',
        bank: 'Bancolombia',
        card_type: 'Crédito',
        expiry: '08/29',
        cvv: '672'
    },
    {
        id: 2,
        name: 'Carlos Rodríguez',
        type: 'Corriente',
        number_account: '2002-3456-7890-1234',
        bank: 'Banco de Bogotá',
        card_type: 'Crédito',
        expiry: '12/26',
        cvv: '123'
    },
    {
        id: 3,
        name: 'Ana Martínez',
        type: 'Ahorros',
        number_account: '3003-4567-8901-2345',
        bank: 'Davivienda',
        card_type: 'Crédito',
        expiry: '03/28',
        cvv: '456'
    },
    {
        id: 4,
        name: 'Luis Fernández',
        type: 'Corriente',
        number_account: '4004-5678-9012-3456',
        bank: 'BBVA',
        card_type: 'Débito',
        expiry: '09/27',
        cvv: '789'
    },
    {
        id: 5,
        name: 'Sofia Herrera',
        type: 'Ahorros',
        number_account: '5005-6789-0123-4567',
        bank: 'Banco Popular',
        card_type: 'Débito',
        expiry: '11/30',
        cvv: '321'
    },
    {
        id: 6,
        name: 'Diego Morales',
        type: 'Corriente',
        number_account: '6006-7890-1234-5678',
        bank: 'Colpatria',
        card_type: 'Débito',
        expiry: '06/29',
        cvv: '654'
    },
    {
        id: 7,
        name: 'Maira Vargas',
        type: 'Corriente',
        number_account: '7007-8901-2345-6789',
        bank: 'Banco de Bogotá',
        card_type: 'Débito',
        expiry: '07/29',
        cvv: '765'
    },
    {
        id: 8,
        name: 'Fabian Perez',
        type: 'Ahorros',
        number_account: '8008-9012-3456-7890',
        bank: 'Bancolombia',
        card_type: 'Débito',
        expiry: '07/29',
        cvv: '765'
    },
    {
        id: 9,
        name: 'Geraldin Andrade',
        type: 'Corriente',
        number_account: '9009-0123-4567-8901',
        bank: 'Bancolombia',
        card_type: 'Débito',
        expiry: '07/29',
        cvv: '765'
    },
    {
        id: 10,
        name: 'Frangela Andes',
        type: 'Corriente',
        number_account: '9009-0123-4567-8901',
        bank: 'Bancolombia',
        card_type: 'Débito',
        expiry: '07/29',
        cvv: '765',

    },
    {
        id: 11,
        name: 'Fabian Perez',
        type: 'Ahorros',
        number_account: '8008-9012-3456-7890',
        bank: 'Bancolombia',
        card_type: 'Débito',
        expiry: '07/29',
        cvv: '765'
    },
    {
        id: 12,
        name: 'Geraldin Andrade',
        type: 'Corriente',
        number_account: '9009-0123-4567-8901',
        bank: 'Bancolombia',
        card_type: 'Débito',
        expiry: '07/29',
        cvv: '765'
    },
    {
        id: 13,
        name: 'Frangela Andes',
        type: 'Corriente',
        number_account: '9009-0123-4567-8901',
        bank: 'Bancolombia',
        card_type: 'Débito',
        expiry: '07/29',
        cvv: '765',

    }
]

