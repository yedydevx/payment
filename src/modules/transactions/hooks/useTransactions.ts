import { useState, useEffect } from 'react'
import { Transaction } from '../types/transactions.types'
import { getTransactions } from '../services/transactions.services'
import { useRolePermissions } from '../../../hooks/useRolePermissions'

// Optional branchIdFilter allows organization users to filter by specific branch
export const useTransactions = (branchIdFilter?: number | null) => {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Obtener información de permisos y sucursal del usuario
    const { isOrganizationLevel, getUserBranchId } = useRolePermissions()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)

                // Determinar si debe filtrar por sucursal
                // If branchIdFilter is provided, it takes precedence (for organization users)
                const branchId = typeof branchIdFilter !== 'undefined'
                    ? branchIdFilter
                    : (isOrganizationLevel ? null : getUserBranchId())

                console.log('🔄 useTransactions: Iniciando carga de transacciones...')
                console.log('👤 User context:', {
                    isOrganizationLevel,
                    branchId,
                    willFilter: !isOrganizationLevel && branchId
                })

                const transactionsData = await getTransactions(branchId)

                console.log('✅ useTransactions: Transacciones cargadas:', transactionsData.length)
                setTransactions(transactionsData)
            } catch (error) {
                console.error('❌ useTransactions: Error fetching transactions data:', error)
                setError(error instanceof Error ? error.message : 'Error al cargar transacciones')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [branchIdFilter, isOrganizationLevel])

    // Función para refrescar los datos
    const refresh = async () => {
        try {
            setLoading(true)
            setError(null)

            // Aplicar el mismo filtrado que en el useEffect
            const branchId = typeof branchIdFilter !== 'undefined'
                ? branchIdFilter
                : (isOrganizationLevel ? null : getUserBranchId())
            const transactionsData = await getTransactions(branchId)
            setTransactions(transactionsData)
        } catch (error) {
            console.error('❌ Error refreshing transactions:', error)
            setError(error instanceof Error ? error.message : 'Error al refrescar transacciones')
        } finally {
            setLoading(false)
        }
    }

    return {
        transactions,
        loading,
        error,
        refresh
    }
}
