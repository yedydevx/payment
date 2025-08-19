import { getTransactionColumns } from '../components/TransactionsHeaderTable'
import TableComponent from '@/components/shared/table.component'
import { useTransactions } from '../hooks/useTransactions'
import { useEffect, useState } from 'react'
import { api } from '@/config/axios'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRolePermissions } from '@/hooks/useRolePermissions'
import { LoadingContainer } from '@/components/ui/LoadingSpinner'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export const TransactionsModule = () => {
    const { isOrganizationLevel } = useRolePermissions()
    const [selectedBranchId, setSelectedBranchId] = useState<number | null | undefined>(undefined)
    const { transactions, loading, error } = useTransactions(selectedBranchId)
    const [branches, setBranches] = useState<any[]>([])

    // Estados para filtros personalizados
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedStatus, setSelectedStatus] = useState('all')

    useEffect(() => {
        if (isOrganizationLevel) {
            api.get('/branches')
                .then(res => {
                    const payload = res.data
                    const list = Array.isArray(payload) ? payload : [payload]
                    setBranches(list)
                })
                .catch(() => setBranches([]))
        }
    }, [isOrganizationLevel])

    // Función para filtrar transacciones
    const filteredTransactions = transactions?.filter(transaction => {
        // Filtro por término de búsqueda
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase()
            const matchesSearch =
                transaction.payment?.id?.toString().includes(searchLower) ||
                transaction.payment?.paymentMethod?.toLowerCase().includes(searchLower) ||
                transaction.status?.toLowerCase().includes(searchLower) ||
                transaction.payment?.paymentAccount?.category?.name?.toLowerCase().includes(searchLower) ||
                transaction.amount?.toLowerCase().includes(searchLower)

            if (!matchesSearch) return false
        }

        // Filtro por categoría
        if (selectedCategory !== 'all') {
            if (transaction.payment?.paymentAccount?.category?.name !== selectedCategory) return false
        }

        // Filtro por estado
        if (selectedStatus !== 'all') {
            if (transaction.status !== selectedStatus) return false
        }

        return true
    }) || []

    // Obtener categorías únicas para el filtro
    const uniqueCategories = [...new Set(transactions?.map(t => t.payment?.paymentAccount?.category?.name).filter(Boolean))]

    // Obtener estados únicos para el filtro
    const uniqueStatuses = [...new Set(transactions?.map(t => t.status).filter(Boolean))]


    return (
        <LoadingContainer
            loading={loading}
            error={error || ''}
            loadingText="Cargando transacciones..."
            height="h-96"
        >
            {/* Contenedor principal con altura fija y sin overflow */}
            <div className="w-full h-full rounded-xl shadow-sm border border-gray-200 overflow-hidden p-4 flex flex-col  gap-4">
                <div className="w-full flex flex-col md:flex-row lg:justify-between gap-4">
                    <div className="w-full flex flex-col md:flex-row gap-4">
                        {/* Barra de búsqueda */}
                        <div className="relative w-full md:flex-1 md:max-w-md">
                            <Input
                                placeholder="Buscar transacciones..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 w-full rounded-full bg-[#eff0f0] text-[#2d524d] h-10"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2d524d] w-5 h-5" />
                        </div>

                        {/* Filtro por categoría */}
                        <div className="w-full md:w-auto">
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-full md:w-54 h-10">
                                    <SelectValue placeholder="Todas las categorías" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas las categorías</SelectItem>
                                    {uniqueCategories.map(category => (
                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Filtro por estado */}
                        <div className="w-full md:w-auto">
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-full md:w-54 h-10">
                                    <SelectValue placeholder="Todos los estados"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los estados</SelectItem>
                                    {uniqueStatuses.map(status => {
                                        // Mapear estados en inglés a español
                                        const getStatusText = (status: string) => {
                                            switch (status.toLowerCase()) {
                                                case 'successful':
                                                case 'success':
                                                case 'succesful':
                                                case 'completed':
                                                    return 'Exitoso';
                                                case 'pending':
                                                    return 'Pendiente';
                                                case 'failed':
                                                    return 'Fallido';
                                                case 'cancelled':
                                                    return 'Cancelado';
                                                default:
                                                    return status;
                                            }
                                        };

                                        return (
                                            <SelectItem key={status} value={status}>
                                                {getStatusText(status)}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="w-full md:w-auto">
                                        <Select
                                            value={selectedBranchId !== undefined ? selectedBranchId?.toString() : undefined}
                                            onValueChange={(v) => {
                                                if (v === '__all__') {
                                                    setSelectedBranchId(undefined)
                                                } else {
                                                    setSelectedBranchId(Number(v))
                                                }
                                            }}
                                        >
                            <SelectTrigger className="w-full md:w-54 h-10">
                                                <SelectValue placeholder="Todas las sedes" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="__all__">Todas las sedes</SelectItem>
                                                {branches.map(b => (
                                                    <SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                <div className="w-full h-full overflow-y-auto overflow-x-hidden">
                        <TableComponent
                        data={filteredTransactions}
                            columns={getTransactionColumns()}
                        enableGlobalFilter={false}
                        enableColumnVisibility={false}
                        enableStatusFilter={false}
                            enablePagination={true}
                        />

                </div>
            </div>
        </LoadingContainer>
    )
}
