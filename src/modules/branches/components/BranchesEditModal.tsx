import { useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useBranchEditForm } from '../hooks/useBranchEditForm';
import { Building, Mail, MapPin, Hash, CreditCard } from 'lucide-react';
import { EditBranchModalProps, UpdateBranchDto } from '../types/branches.types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const BranchesEditModal: React.FC<EditBranchModalProps> = ({
    isOpen,
    onClose,
    branch,
    onConfirm,
    loading = false,
}) => {
    const { formData, setField, loadFromBranch, reset } = useBranchEditForm();

    // Inicializar formulario cuando se abre el modal
    useEffect(() => {
        if (isOpen) loadFromBranch(branch);
        else reset();
    }, [branch, isOpen]);

    const handleInputChange = (field: keyof UpdateBranchDto, value: string | boolean) => setField(field, value);

    const handleSubmit = async () => {
        if (!branch) return;
        await onConfirm(formData);
    };

    if (!branch) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Editar Sucursal"
            mode="edit"
            customSize="max-w-4xl"
        >
            <div className="space-y-6 md:space-y-8">
                {/* Header con información básica */}
                <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4 p-4 md:p-6 bg-[#b9f09e]/20 rounded-xl border border-[#b9f09e]/30">
                    <div className="p-2 md:p-3 bg-[#b9f09e] rounded-xl flex-shrink-0 hidden md:block">
                        <Building className="h-6 w-6 md:h-8 md:w-8 text-[#2d524d]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-[#2d524d] mb-3 md:mb-4">Información de la Sucursal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs md:text-sm font-semibold text-[#2d524d] flex items-center gap-2">
                                    <Hash className="h-3 w-3 md:h-4 md:w-4" />
                                    Nombre de la Sucursal *
                                </Label>
                                <Input
                                    id="name"
                                    value={formData.name || ''}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Ej: Sede Principal"
                                    className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="code" className="text-xs md:text-sm font-semibold text-[#2d524d] flex items-center gap-2">
                                    <Hash className="h-3 w-3 md:h-4 md:w-4" />
                                    Código
                                </Label>
                                <Input
                                    id="code"
                                    value={formData.code || ''}
                                    onChange={(e) => handleInputChange('code', e.target.value)}
                                    placeholder="Ej: SP001"
                                    className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Información de contacto */}
                <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-2 md:gap-3 pb-2 md:pb-3 border-b border-gray-200">
                        <div className="p-1.5 md:p-2 bg-gray-100 rounded-lg">
                            <Mail className="h-4 w-4 md:h-5 md:w-5 text-[#2d524d]" />
                        </div>
                        <h4 className="text-base md:text-lg font-bold text-gray-900">Información de Contacto</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs md:text-sm font-semibold text-gray-700">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email || ''}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="correo@empresa.com"
                                className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-xs md:text-sm font-semibold text-gray-700">Teléfono</Label>
                            <Input
                                id="phone"
                                value={formData.phone || ''}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="Ej: +57 300 123 4567"
                                className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20"
                            />
                        </div>
                    </div>
                </div>

                {/* Cuenta de Cobro */}
                <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-2 md:gap-3 pb-2 md:pb-3 border-b border-gray-200">
                        <div className="p-1.5 md:p-2 bg-gray-100 rounded-lg">
                            <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-[#2d524d]" />
                        </div>
                        <h4 className="text-base md:text-lg font-bold text-gray-900">Cuenta de Cobro</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="accountName" className="text-xs md:text-sm font-semibold text-gray-700">Nombre de la Cuenta</Label>
                            <Input
                                id="accountName"
                                value={formData.accountName || ''}
                                onChange={(e) => handleInputChange('accountName', e.target.value)}
                                placeholder="Ej: Cuenta de DIEZMOS Medellín"
                                className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="accountNumber" className="text-xs md:text-sm font-semibold text-gray-700">Número de Cuenta</Label>
                            <Input
                                id="accountNumber"
                                value={formData.accountNumber || ''}
                                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                                placeholder="Ej: DIEZ-012"
                                className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20"
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <Label htmlFor="accountType" className="text-xs md:text-sm font-semibold text-gray-700">Tipo de Cuenta</Label>
                        <Select
                            value={formData.accountType || ''}
                            onValueChange={(value) => handleInputChange('accountType', value)}
                        >
                            <SelectTrigger className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20">
                                <SelectValue placeholder="Seleccionar tipo de cuenta" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="SAVINGS">Cuenta de Ahorro</SelectItem>
                                <SelectItem value="CURRENT">Cuenta Corriente</SelectItem>
                                <SelectItem value="OTHER">Otro</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Ubicación */}
                <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-2 md:gap-3 pb-2 md:pb-3 border-b border-gray-200">
                        <div className="p-1.5 md:p-2 bg-gray-100 rounded-lg">
                            <MapPin className="h-4 w-4 md:h-5 md:w-5 text-[#2d524d]" />
                        </div>
                        <h4 className="text-base md:text-lg font-bold text-gray-900">Ubicación</h4>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-xs md:text-sm font-semibold text-gray-700">Dirección</Label>
                            <Textarea
                                id="address"
                                value={formData.address || ''}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                placeholder="Dirección completa de la sucursal"
                                rows={2}
                                className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="city" className="text-xs md:text-sm font-semibold text-gray-700">Ciudad</Label>
                                <Input
                                    id="city"
                                    value={formData.city || ''}
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                    placeholder="Ej: Medellín"
                                    className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state" className="text-xs md:text-sm font-semibold text-gray-700">Estado/Departamento</Label>
                                <Select
                                    value={formData.state || ''}
                                    onValueChange={(value) => handleInputChange('state', value)}
                                >
                                    <SelectTrigger className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20">
                                        <SelectValue placeholder="Seleccionar estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Antioquia">Antioquia</SelectItem>
                                        <SelectItem value="Cundinamarca">Cundinamarca</SelectItem>
                                        <SelectItem value="Valle del Cauca">Valle del Cauca</SelectItem>
                                        <SelectItem value="Atlántico">Atlántico</SelectItem>
                                        <SelectItem value="Santander">Santander</SelectItem>
                                        <SelectItem value="Bolívar">Bolívar</SelectItem>
                                        <SelectItem value="Otro">Otro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country" className="text-xs md:text-sm font-semibold text-gray-700">País</Label>
                                <Select
                                    value={formData.country || ''}
                                    onValueChange={(value) => handleInputChange('country', value)}
                                >
                                    <SelectTrigger className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20">
                                        <SelectValue placeholder="Seleccionar país" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Colombia">Colombia</SelectItem>
                                        <SelectItem value="Ecuador">Ecuador</SelectItem>
                                        <SelectItem value="Perú">Perú</SelectItem>
                                        <SelectItem value="Venezuela">Venezuela</SelectItem>
                                        <SelectItem value="Otro">Otro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="w-full md:w-1/3">
                            <Label htmlFor="postalCode" className="text-xs md:text-sm font-semibold text-gray-700">Código Postal</Label>
                            <Input
                                id="postalCode"
                                value={formData.postalCode || ''}
                                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                placeholder="Ej: 050001"
                                className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20"
                            />
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4 pt-4 md:pt-6 border-t border-gray-200">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 text-sm md:text-base"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || !formData.name}
                        className="bg-[#2d524d] hover:bg-[#2d524d]/90 text-white disabled:bg-gray-400 disabled:cursor-not-allowed text-sm md:text-base"
                    >
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
