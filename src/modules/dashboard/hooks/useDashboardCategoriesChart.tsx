import { useMemo } from 'react';
import { CategoryData } from '../types/dashboard.types';
import { Transaction } from '@/modules/transactions/types/transactions.types';

export const useDashboardCategoriesChart = (transactions: Transaction[]) => {

    // Etiquetas para las categorías de recaudo
    const CATEGORY_LABELS = {
        'Diezmos': 'Diezmos',
        'Donaciones': 'Donaciones',
        'Otros': 'Otras Categorías',
        'N/A': 'Sin Categoría'
    };

    // Calcular distribución de categorías de recaudo y montos
    const categories = useMemo(() => {
        const categoryData = new Map<string, { count: number; totalAmount: number }>();

        transactions.forEach(transaction => {
            const categoryName = transaction.payment?.paymentAccount?.category?.name || 'N/A';
            const amount = parseFloat(transaction.amount) || 0;

            const current = categoryData.get(categoryName) || { count: 0, totalAmount: 0 };
            categoryData.set(categoryName, {
                count: current.count + 1,
                totalAmount: current.totalAmount + amount
            });
        });

        const totalTransactions = transactions.length;

        const categoriesList: CategoryData[] = [];

        categoryData.forEach((data, category) => {
            const percentage = totalTransactions > 0 ? Math.round((data.count / totalTransactions) * 100) : 0;

            // Asignar colores específicos para cada categoría (más flexible)
            let color;

            // Buscar coincidencias parciales (ignorar mayúsculas/minúsculas)
            const categoryLower = category.toLowerCase();
            if (categoryLower.includes('diezmo') || categoryLower.includes('diezmos')) {
                color = '#374151'; // Negro
            } else if (categoryLower.includes('donacion') || categoryLower.includes('donaciones')) {
                color = '#6b7280'; // Gris
            } else if (categoryLower.includes('otro') || categoryLower.includes('otros')) {
                color = '#e5e7eb'; // Gris claro
            } else {
                // Si no hay coincidencia, usar colores por defecto
                const defaultColors = ['#374151', '#6b7280', '#e5e7eb'];
                color = defaultColors[categoriesList.length % defaultColors.length];
            }

            categoriesList.push({
                method: category,
                count: data.count,
                percentage,
                color: color
            });
        });

        // Ordenar por porcentaje descendente
        return categoriesList.sort((a, b) => b.percentage - a.percentage);
    }, [transactions]);

    // Crear el SVG de la gráfica de dona mejorada con colores azules
    const createDonutChart = (size: number = 160) => {
        if (categories.length === 0) return null;

        const radius = size / 2;
        const innerRadius = radius * 0.58; // Agujero central más proporcionado
        const strokeWidth = radius - innerRadius;

        let currentAngle = -90; // Empezar desde arriba
        const paths: React.ReactElement[] = [];

        // Asegurar que siempre tengamos al menos 2 colores elegantes
        const defaultColors = ['#374151', '#6b7280']; // Negro y gris

        categories.forEach((category, index) => {
            const angle = (category.percentage / 100) * 360;
            const endAngle = currentAngle + angle;

            // Usar el color de la categoría o un color por defecto
            const segmentColor = category.color || defaultColors[index % defaultColors.length];

            // Calcular coordenadas del arco
            const x1 = radius + (innerRadius + strokeWidth / 2) * Math.cos((currentAngle * Math.PI) / 180);
            const y1 = radius + (innerRadius + strokeWidth / 2) * Math.sin((currentAngle * Math.PI) / 180);
            const x2 = radius + (innerRadius + strokeWidth / 2) * Math.cos((endAngle * Math.PI) / 180);
            const y2 = radius + (innerRadius + strokeWidth / 2) * Math.sin((endAngle * Math.PI) / 180);

            // Crear el path del arco
            const largeArcFlag = angle > 180 ? 1 : 0;
            const pathData = [
                `M ${x1} ${y1}`,
                `A ${innerRadius + strokeWidth / 2} ${innerRadius + strokeWidth / 2} 0 ${largeArcFlag} 1 ${x2} ${y2}`
            ].join(' ');

            paths.push(
                <path
                    key={index}
                    d={pathData}
                    fill="none"
                    stroke={segmentColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    className="drop-shadow-md"
                    style={{ stroke: segmentColor }} // Forzar el color inline
                />
            );

            currentAngle = endAngle;
        });

        return (
            <svg width={size} height={size} className="mx-auto">
                {paths}
                {/* Círculo central con sombra sutil */}
                <circle
                    cx={radius}
                    cy={radius}
                    r={innerRadius}
                    fill="white"
                    className="drop-shadow-sm"
                />
            </svg>
        );
    };

    return {
        categories,
        createDonutChart,
        categoryLabels: CATEGORY_LABELS
    };
};
