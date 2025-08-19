import {
    BranchResponse,
    BranchActionsProps
} from "../types/branches.types";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { getDisplayCity } from "../utils/location";
import { formatDateSpanish } from "@/utils/dateUtils";
import { Eye, Edit, Trash2, MoreHorizontal, Church } from "lucide-react";
// Nota: Los permisos se pasan desde la página para evitar usar hooks aquí


export const getBranchesColumns = (
    actions?: BranchActionsProps
): ColumnDef<BranchResponse>[] => {
    return [
    {
        id: "name",
        header: "Nombre de Sucursal",
        accessorKey: "name",
        size: 180,
        cell: ({ row }) => {
            const branch = row.original;
            return (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                        <Church className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-normal text-sm text-gray-900">{branch.name || "No definido"}</span>
                </div>
            );
        },
    },
    {
        id: "code",
        header: "Código Unico",
        accessorKey: "code",
        size: 150,
        cell: ({ row }) => {
            const code = row.getValue("code") as string;
            return (
                <span className="font-normal text-sm text-gray-900">
                    {code || <span className="text-gray-400">No definido</span>}
                </span>
            );
        },
    },
    {
        id: "email",
        header: "Correo Electrónico",
        accessorKey: "email",
        size: 300,
        cell: ({ row }) => {
            const email = row.getValue("email") as string;
            return (
                <span className="font-normal text-sm text-gray-900">
                    {email || <span className="text-gray-400">No definido</span>}
                </span>
            );
        },
    },
    {
        id: "phone",
        header: "Teléfono",
        accessorKey: "phone",
        size: 200,
        cell: ({ row }) => {
            const phone = row.getValue("phone") as string;
            return (
                <span className="font-normal text-sm text-gray-900">
                    {phone || <span className="text-gray-400">No definido</span>}
                </span>
            );
        },
    },
    {
        id: "address",
        header: "Dirección",
        accessorKey: "address",
        size: 200,
        cell: ({ row }) => {
            const address = row.getValue("address") as string;
            return (
                <span className="font-normal text-sm text-gray-900">
                    {address || <span className="text-gray-400">No definida</span>}
                </span>
            );
        },
    },
    {
        id: "location",
        header: "Ubicación",
        accessorKey: "city",
        size: 200,
        cell: ({ row }) => {
            const branch = row.original;
            const city = getDisplayCity(branch.city, branch.state);
            const state = branch.state || "Estado no definido";
            const country = branch.country || "País no definido";

            return (
                <div className="flex flex-col">
                    <span className="font-normal text-sm text-gray-900">{city}</span>
                    <span className="text-xs text-gray-500">{state}, {country}</span>
                </div>
            );
        },
    },
    {
        id: 'account',
        header: 'Cuenta de Cobro',
        accessorKey: 'paymentAccounts',
        size: 300,
        cell: ({ row }) => {
            const branch = row.original as any;
            const account = Array.isArray(branch.paymentAccounts) ? branch.paymentAccounts[0] : undefined;
            const type = account?.type;
            const typeAccount = type === 'SAVINGS' ? 'Ahorro' : 'Corriente';

            return (
                <div className="flex flex-col">
                    <span className="font-normal text-sm text-gray-900">{account?.name || 'Sin cuenta'}</span>
                    <span className="text-xs text-gray-500">{typeAccount} - {account?.accountNumber || '—'}</span>
                </div>
            );
        }
    },
    {
        id: "createdAt",
        header: "Fecha de Creación",
        accessorKey: "createdAt",
        size: 200,
        cell: ({ row }) => {
            const branch = row.original;
            const formattedDate = formatDateSpanish(branch.createdAt);

            return (
                <span className="font-normal text-sm text-gray-900">{formattedDate}</span>
            );
        },
    },
    ...(actions ? [{
        id: "actions",
        header: "Acciones",
        size: 100,
        cell: ({ row }: { row: any }) => {
            const branch = row.original as BranchResponse;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => actions?.onView(branch)} className="cursor-pointer hover:bg-gray-100">
                            <Eye className="mr-2 h-4 w-4 text-gray-900" /> Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => actions?.onEdit(branch)} className="cursor-pointer hover:bg-gray-100">
                            <Edit className="mr-2 h-4 w-4 text-gray-900" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => actions?.onDelete(branch)} className="cursor-pointer hover:bg-gray-100">
                            <Trash2 className="mr-2 h-4 w-4 text-gray-900" /> Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
            },
        }] : [])
    ]
}
