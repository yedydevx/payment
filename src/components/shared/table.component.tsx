import { useEffect, useId, useMemo, useRef, useState } from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    Row,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import {
    ChevronDownIcon,
    ChevronFirstIcon,
    ChevronLastIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    CircleAlertIcon,
    CircleXIcon,
    Columns3Icon,
    EllipsisIcon,
    FilterIcon,
    ListFilterIcon,
    PlusIcon,
    TrashIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export type Item = {
    id: string
    identificacion: string
    nombre: string
    apellido: string
    correo: string
    telefono: string
    avatar: string | null
    isActive: boolean
    createdAt: string
    updatedAt: string
    descripcion: string
    roles: any[]
}

// Interfaces
type BaseColumn<T> = Omit<ColumnDef<T>, 'id' | 'header' | 'accessorKey'> & {
    id: string;
    header: string;
    accessorKey: string;
    size?: number;
    enableHiding?: boolean;
    enableSorting?: boolean;
    enableFiltering?: boolean;
}

interface TableProps<T> {
    data: T[];
    columns: BaseColumn<T>[];
    onDeleteRows?: (rows: Row<T>[]) => void;
    onCreateItem?: () => void;
    onEditItem?: (item: T) => void;
    onDuplicateItem?: (item: T) => void;
    onDeleteItem?: (item: T) => void;
    onEditEstado?: (item: T) => void;
    title?: string;
    createButtonText?: string;
    enableSelection?: boolean;
    enablePagination?: boolean;
    enableColumnVisibility?: boolean;
    enableGlobalFilter?: boolean;
    enableStatusFilter?: boolean;
    statusFilterOptions?: {
        key: string;
        label: string;
        values: { value: any; label: string }[];
    };
}

// Universal global filter for all tables
const globalFilterFn: FilterFn<any> = (row, _columnId, filterValue) => {
    const search = (filterValue ?? "").toString().toLowerCase().trim();
    if (!search) return true;
    return Object.values(row.original).some(
        value =>
            (typeof value === "string" && value.toLowerCase().includes(search)) ||
            (typeof value === "number" && value.toString().includes(search))
    );
};

export default function TableComponent<T>({
    data: initialData = [],
    columns: initialColumns = [],
    onDeleteRows,
    onCreateItem,
    onEditItem,
    onDuplicateItem,
    onDeleteItem,
    createButtonText = "Crear",
    enableSelection = true,
    enablePagination = true,
    enableColumnVisibility = true,
    enableGlobalFilter = true,
    enableStatusFilter = false,
    statusFilterOptions,
}: TableProps<T>) {
    const id = useId()
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const inputRef = useRef<HTMLInputElement>(null)

    const [sorting, setSorting] = useState<SortingState>([])
    const [data, setData] = useState<T[]>(initialData)
    const [globalFilter, setGlobalFilter] = useState("")

    // Transform columns to TanStack Table format
    const columns = useMemo(() => {
        return initialColumns.map(col => ({
            ...col,
            header: col.header,
            accessorKey: col.accessorKey,
            size: col.size,
            enableHiding: col.enableHiding ?? true,
            enableSorting: col.enableSorting ?? true,
            enableFiltering: col.enableFiltering ?? true,
            cell: col.cell ?? (({ row }) => (
                <div className="font-medium">{row.getValue(col.accessorKey)}</div>
            )),
        })) as ColumnDef<T>[]
    }, [initialColumns])

    // Add actions column if needed
    const finalColumns = useMemo(() => {
        if (!onEditItem && !onDuplicateItem && !onDeleteItem) return columns;

        return [
            ...columns,
            {
                id: "actions",
                header: "Acciones",
                accessorKey: "actions",
                cell: ({ row }: { row: Row<T> }) => (
                    <div className="flex justify-end items-end w-full pr-28">
                        <RowActions
                            row={row}
                            onEditItem={onEditItem}
                            onDuplicateItem={onDuplicateItem}
                            onDeleteItem={onDeleteItem}
                        />
                    </div>
                ),
                size: 100,
                enableHiding: false,
            },
        ] as ColumnDef<T>[]
    }, [columns, onEditItem, onDuplicateItem, onDeleteItem])

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const handleDeleteRows = () => {
        const selectedRows = table.getSelectedRowModel().rows
        const updatedData = data.filter(
            (item) => !selectedRows.some((row) => row.original.id === (item as any).id)
        )
        setData(updatedData)
        table.resetRowSelection()

        if (onDeleteRows) {
            onDeleteRows(selectedRows);
        }
    }

    const table = useReactTable({
        data,
        columns: finalColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        enableSortingRemoval: false,
        getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
        onPaginationChange: enablePagination ? setPagination : undefined,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        globalFilterFn,
        state: {
            sorting,
            pagination: enablePagination ? pagination : undefined,
            columnFilters,
            columnVisibility,
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        enableRowSelection: enableSelection,
    })

    return (
        <div className="space-y-2">
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    {/* Global Filter */}
                    {enableGlobalFilter && (
                        <div className="relative">
                            <Input
                                id={`${id}-input`}
                                ref={inputRef}
                                className={cn("peer min-w-60 ps-9 bg-white")}
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder="Buscar..."
                                type="text"
                                aria-label="Buscar"
                            />
                            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                <ListFilterIcon size={16} aria-hidden="true" />
                            </div>
                            {globalFilter && (
                                <button
                                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label="Limpiar filtro"
                                    onClick={() => {
                                        setGlobalFilter("");
                                        if (inputRef.current) {
                                            inputRef.current.focus();
                                        }
                                    }}
                                >
                                    <CircleXIcon size={16} aria-hidden="true" />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Status Filter */}
                    {enableStatusFilter && statusFilterOptions && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">
                                    <FilterIcon
                                        className="-ms-1 opacity-60"
                                        size={16}
                                        aria-hidden="true"
                                    />
                                    {statusFilterOptions.label}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto min-w-36 p-3" align="start">
                                <div className="space-y-3">
                                    <div className="text-muted-foreground text-xs font-medium">
                                        Filtros
                                    </div>
                                    <div className="space-y-3">
                                        {statusFilterOptions.values.map((option, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`${id}-${i}`}
                                                    checked={(table.getColumn(statusFilterOptions.key)?.getFilterValue() as any[] || []).includes(option.value)}
                                                    onCheckedChange={(checked) => {
                                                        const current = table.getColumn(statusFilterOptions.key)?.getFilterValue() as any[] || [];
                                                        if (checked) {
                                                            table.getColumn(statusFilterOptions.key)?.setFilterValue([...current, option.value]);
                                                        } else {
                                                            table.getColumn(statusFilterOptions.key)?.setFilterValue(current.filter(v => v !== option.value));
                                                        }
                                                    }}
                                                />
                                                <Label
                                                    htmlFor={`${id}-${i}`}
                                                    className="flex grow justify-between gap-2 font-normal"
                                                >
                                                    {option.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}

                    {/* Column Visibility */}
                    {enableColumnVisibility && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <Columns3Icon
                                        className="-ms-1 opacity-60"
                                        size={16}
                                        aria-hidden="true"
                                    />
                                    Ver
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                                onSelect={(event) => event.preventDefault()}
                                            >
                                                {typeof column.columnDef.header === "string"
                                                    ? column.columnDef.header
                                                    : column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {/* Delete button */}
                    {enableSelection && table.getSelectedRowModel().rows.length > 0 && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="ml-auto" variant="outline">
                                    <TrashIcon
                                        className="-ms-1 opacity-60"
                                        size={16}
                                        aria-hidden="true"
                                    />
                                    Eliminar
                                    <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                                        {table.getSelectedRowModel().rows.length}
                                    </span>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                                    <div
                                        className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                                        aria-hidden="true"
                                    >
                                        <CircleAlertIcon className="opacity-80" size={16} />
                                    </div>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            ¿Estás seguro?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta acción no se puede deshacer. Se eliminarán{" "}
                                            {table.getSelectedRowModel().rows.length} elementos
                                            seleccionados.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteRows}>
                                        Eliminar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}

                    {/* Create button */}
                    {onCreateItem && (
                        <Button
                            className="ml-auto bg-black text-white hover:opacity-95"
                            onClick={onCreateItem}
                        >
                            <PlusIcon
                                className="-ms-1 opacity-60"
                                size={16}
                                aria-hidden="true"
                            />
                            {createButtonText}
                        </Button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="bg-background overflow-hidden rounded-md border">
                <Table className="w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="whitespace-nowrap"
                                        >
                                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                                <div
                                                    className={cn(
                                                        header.column.getCanSort() &&
                                                        "flex h-full cursor-pointer items-center justify-start gap-2 select-none"
                                                    )}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    onKeyDown={(e) => {
                                                        if (
                                                            header.column.getCanSort() &&
                                                            (e.key === "Enter" || e.key === " ")
                                                        ) {
                                                            e.preventDefault()
                                                            header.column.getToggleSortingHandler()?.(e)
                                                        }
                                                    }}
                                                    tabIndex={header.column.getCanSort() ? 0 : undefined}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: (
                                                            <ChevronUpIcon
                                                                className="shrink-0 opacity-60"
                                                                size={16}
                                                                aria-hidden="true"
                                                            />
                                                        ),
                                                        desc: (
                                                            <ChevronDownIcon
                                                                className="shrink-0 opacity-60"
                                                                size={16}
                                                                aria-hidden="true"
                                                            />
                                                        ),
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            ) : (
                                                flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="last:py-0 whitespace-nowrap">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={finalColumns.length}
                                    className="h-24 text-center"
                                >
                                    No hay resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {enablePagination && (
                <div className="flex flex-col md:flex-row items-center md:justify-between gap-2">
                    {/* Results per page */}
                    <div className="hidden md:flex items-center gap-3">
                        <Label htmlFor={id} className="max-sm:sr-only">
                            Filas por página
                        </Label>
                        <Select
                            value={table.getState().pagination.pageSize.toString()}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger id={id} className="w-fit whitespace-nowrap">
                                <SelectValue placeholder="Seleccionar número de resultados" />
                            </SelectTrigger>
                            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                                {[5, 10, 25, 50, 100, 500, 1000, 5000].map((pageSize) => (
                                    <SelectItem key={pageSize} value={pageSize.toString()}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                                <SelectItem value="99999">
                                    Todos
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Page number information */}
                    <div className="flex flex-row gap-3 items-center">
                        <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
                            <p
                                className="text-muted-foreground text-sm whitespace-nowrap"
                                aria-live="polite"
                            >
                                <span className="text-foreground">
                                    {table.getState().pagination.pageIndex *
                                        table.getState().pagination.pageSize +
                                        1}
                                    -
                                    {Math.min(
                                        Math.max(
                                            table.getState().pagination.pageIndex *
                                            table.getState().pagination.pageSize +
                                            table.getState().pagination.pageSize,
                                            0
                                        ),
                                        table.getRowCount()
                                    )}
                                </span>{" "}
                                de{" "}
                                <span className="text-foreground">
                                    {table.getRowCount().toString()}
                                </span>
                            </p>
                        </div>

                        {/* Pagination buttons */}
                        <div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="disabled:pointer-events-none disabled:opacity-50"
                                            onClick={() => table.firstPage()}
                                            disabled={!table.getCanPreviousPage()}
                                            aria-label="Ir a primera página"
                                        >
                                            <ChevronFirstIcon size={16} aria-hidden="true" />
                                        </Button>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="disabled:pointer-events-none disabled:opacity-50"
                                            onClick={() => table.previousPage()}
                                            disabled={!table.getCanPreviousPage()}
                                            aria-label="Ir a página anterior"
                                        >
                                            <ChevronLeftIcon size={16} aria-hidden="true" />
                                        </Button>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="disabled:pointer-events-none disabled:opacity-50"
                                            onClick={() => table.nextPage()}
                                            disabled={!table.getCanNextPage()}
                                            aria-label="Ir a página siguiente"
                                        >
                                            <ChevronRightIcon size={16} aria-hidden="true" />
                                        </Button>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="disabled:pointer-events-none disabled:opacity-50"
                                            onClick={() => table.lastPage()}
                                            disabled={!table.getCanNextPage()}
                                            aria-label="Ir a última página"
                                        >
                                            <ChevronLastIcon size={16} aria-hidden="true" />
                                        </Button>
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function RowActions<T>({
    row,
    onEditItem,
    onDuplicateItem,
    onDeleteItem
}: {
    row: Row<T>;
    onEditItem?: (item: T) => void;
    onDuplicateItem?: (item: T) => void;
    onDeleteItem?: (item: T) => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex justify-center items-center w-full">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="shadow-none"
                        aria-label="Acciones"
                    >
                        <EllipsisIcon size={16} aria-hidden="true" />
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    {onEditItem && (
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => onEditItem(row.original)}
                        >
                            <span>Editar</span>
                        </DropdownMenuItem>
                    )}
                    {onDuplicateItem && (
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => onDuplicateItem(row.original)}
                        >
                            <span>Duplicar</span>
                        </DropdownMenuItem>
                    )}
                    {onDeleteItem && (
                        <DropdownMenuItem
                            className="cursor-pointer text-red-600"
                            onClick={() => onDeleteItem(row.original)}
                        >
                            <span>Eliminar</span>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
