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
        <Card className="w-full bg-gradient-to-br from-[#2d524d] to-[#1a3a35] text-white border-0 shadow-xl">
            <CardContent className="p-4">
                {/* Header de la tarjeta */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#b9f09e] rounded-lg flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-[#2d524d]" />
                        </div>
                        <span className="text-sm font-medium text-[#b9f09e]">Balance</span>
                    </div>
                    <Wifi className="h-6 w-6 text-[#b9f09e] rotate-90" />
                </div>

                {/* Monto total */}
                <div className="">
                    <div className="text-xs text-[#b9f09e] mb-1">Monto Total</div>
                    <div className="text-xl font-bold">${totalAmount.toLocaleString()}</div>
                </div>
            </CardContent>
        </Card>
    );
};
