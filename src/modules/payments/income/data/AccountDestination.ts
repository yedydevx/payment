export interface DestinationAccount {
    id: number;
    name: string;
    number: string;
    type: string;
    bank: string;
}

export const AccountDestination: DestinationAccount[] = [
    {
        id: 1,
        name: 'Andres Perez',
        number: '1234-5678-9012-3456',
        type: 'Corriente',
        bank: 'Banco de Bogotá'
    },
    {
        id: 2,
        name: 'Maria Vargas',
        number: '9876-5432-1098-7654',
        type: 'Ahorros',
        bank: 'Bancolombia'
    },
    {
        id: 3,
        name: 'Ana Martinez',
        number: '1111-2222-3333-4444',
        type: 'Corriente',
        bank: 'Davivienda'
    },
    {
        id: 4,
        name: 'Luis Fernandez',
        number: '5555-6666-7777-8888',
        type: 'Ahorros',
        bank: 'BBVA'
    },
    {
        id: 5,
        name: 'Sofia Herrera',
        number: '9999-8888-7777-6666',
        type: 'Corriente',
        bank: 'Banco Popular'
    },
    {
        id: 6,
        name: 'Diego Morales',
        number: '7777-6666-5555-4444',
        type: 'Ahorros',
        bank: 'Colpatria'
    }
];
