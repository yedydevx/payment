import { CreditCard, Wifi } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface DashboardCreditCardProps {
    totalAmount: number;
    organizationName?: string;
}

export const DashboardCreditCard: React.FC<DashboardCreditCardProps> = ({
    totalAmount,
}) => {
    return (
        <Card className="w-full bg-gradient-to-br from-gray-900 to-black text-white border-0 shadow-xl">
            <CardContent className="p-4">
                {/* Header de la tarjeta */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-300">Balance</span>
                    </div>
                    <Wifi className="h-6 w-6 text-gray-300 rotate-90" />
                </div>

                {/* Monto total */}
                <div className="">
                    <div className="text-xs text-gray-300 mb-1">Monto Total</div>
                    <div className="text-xl font-bold">${totalAmount.toLocaleString()}</div>
                </div>
            </CardContent>
        </Card>
    );
};
