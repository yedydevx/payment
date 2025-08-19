import React from 'react';
import { Card, CardContent} from '@/components/ui/card';
import { User } from 'lucide-react';

interface ActivityItem {
    id: string;
    userName: string;
    action: string;
    timestamp: string;
    type: 'login' | 'update' | 'download' | 'create' | 'review';
    status?: 'success' | 'pending' | 'failed';
    amount?: string;
}

interface DashboardActivityRecientProps {
    activities?: ActivityItem[];
}

export const DashboardActivityRecient: React.FC<DashboardActivityRecientProps> = ({ activities = [] }) => {
    // Datos mock para demostración (se reemplazarán con datos reales del servicio)
    const mockActivities: ActivityItem[] = [
        {
            id: '1',
            userName: 'Jamie Smith',
            action: 'Actualizó sucursal',
            timestamp: '16:05',
            type: 'update',
            status: 'success'
        },
        {
            id: '2',
            userName: 'Alex Johnson',
            action: 'Inició sesión',
            timestamp: '13:05',
            type: 'login',
            status: 'success'
        },
        {
            id: '3',
            userName: 'Morgan Lee',
            action: 'Creó meta de ahorro',
            timestamp: '02:05',
            type: 'create',
            status: 'success'
        },
        {
            id: '4',
            userName: 'Sarah Wilson',
            action: 'Descargó reporte',
            timestamp: '09:30',
            type: 'download',
            status: 'success'
        }
    ];

    const displayActivities = activities.length > 0 ? activities : mockActivities;

    // Limitar a solo las 4 actividades más recientes
    const recentActivities = displayActivities.slice(0, 4);

    return (
        <Card className="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between p-4">
                <div className="text-base font-semibold text-gray-900">
                    Actividad Reciente
                </div>
            </div>
            <CardContent className="px-3">
                <div className="space-y-2 mt-2">
                    {recentActivities.map((activity, index) => (
                        <div key={activity.id} className="flex items-start gap-3">
                            {/* Timeline y nodo */}
                            <div className="relative flex flex-col items-center">
                                {/* Nodo de actividad */}
                                <div className="w-8 h-8 bg-gray-900 rounded-full flex-shrink-0 flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>

                                {/* Línea conectora (excepto para el último elemento) */}
                                {index < recentActivities.length - 1 && (
                                    <div className="w-0.5 h-6 bg-gray-200 mt-2"></div>
                                )}
                            </div>

                            {/* Contenido de la actividad */}
                            <div className="flex-1 min-w-0">
                                <div className="text-sm text-gray-900">
                                    <span className="font-semibold">{activity.userName}</span>
                                    <span className="ml-1">{activity.action}</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {activity.timestamp}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mensaje si no hay actividades */}
                {recentActivities.length === 0 && (
                    <div className="text-center py-6 text-gray-500 text-sm">
                        No hay actividad reciente para mostrar
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
