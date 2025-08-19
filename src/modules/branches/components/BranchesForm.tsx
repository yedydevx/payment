import {
    Select,
    SelectItem,
    SelectValue,
    SelectContent,
    SelectTrigger,
} from '@/components/ui/select';
import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useBranchForm } from '../hooks/useBranchForm';
import { BranchesSummaryForm } from './BranchesSummaryForm';
import { BranchesFormProps } from '../types/branches.types';
import { TypeAccount } from '@/modules/payment-accounts/types/payment.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, MapPin, Phone, Mail, User, CheckCircle, ArrowLeft, CreditCard } from 'lucide-react';

export const BranchesForm: React.FC<BranchesFormProps> = ({ onSuccess, onBack }) => {
    const {
        branchData,
        errors,
        isLoading,
        updateBranchField,
        validate,
        generateCode,
        organizationName,
        // cuenta de cobro
        accountName,
        accountNumber,
        accountType,
        accountCategoryId,
        accountDescription,
        categories,
        setAccountName,
        setAccountNumber,
        setAccountType,
        setAccountCategoryId,
        setAccountDescription,
        // funciones de flujo
        handleModalConfirm,
        getAccountData,
    } = useBranchForm();

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        if (validate()) setShowModal(true);
    };

    return (
        <>
            <div className="space-y-6 md:space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 md:p-3 bg-[#2d524d] rounded-lg">
                            <Building2 className="h-5 w-5 md:h-6 md:w-6 text-[#b9f09e]" />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-[#2d524d]">Nueva Sucursal</h1>
                            <p className="text-sm md:text-base text-gray-600">
                                Crear nueva sucursal para <strong className="text-[#2d524d]">{organizationName}</strong>
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={() => onBack()}
                        variant="outline"
                        size="lg"
                        className="hidden md:flex gap-2 border-[#2d524d] text-[#2d524d] hover:bg-[#b9f09e]/20 hover:border-[#2d524d]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Información Básica */}
                    <Card className="border-gray-200 hover:border-[#b9f09e]/30 transition-colors">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-base md:text-lg text-[#2d524d]">
                                <div className="p-2 bg-[#2d524d] rounded-lg">
                                    <Building2 className="h-4 w-4 md:h-5 md:w-5 text-[#b9f09e]" />
                                </div>
                                Información Básica
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Nombre */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs md:text-sm font-semibold text-[#2d524d] flex items-center gap-2">
                                    Nombre de la Sucursal *
                                </Label>
                                <Input
                                    id="name"
                                    value={branchData.name}
                                    onChange={(e) => updateBranchField('name', e.target.value)}
                                    onBlur={() => updateBranchField('code', generateCode(branchData.name))}
                                    placeholder="Ej: Sede Principal"
                                    className={`text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20 ${errors.name ? 'border-red-500' : ''}`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs md:text-sm">{errors.name}</p>
                                )}
                            </div>

                            {/* Código */}
                            <div className="space-y-2">
                                <Label htmlFor="code" className="text-xs md:text-sm font-semibold text-[#2d524d] flex items-center gap-2">
                                    Código de Sucursal *
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="code"
                                        value={branchData.code}
                                        onChange={(e) => updateBranchField('code', e.target.value.toUpperCase())}
                                        placeholder="Ej: SP001"
                                        className={`text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20 ${errors.code ? 'border-red-500' : ''}`}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => updateBranchField('code', generateCode(branchData.name))}
                                        disabled={!branchData.name}
                                        className="border-[#2d524d] text-[#2d524d] hover:bg-[#b9f09e]/20 text-xs md:text-sm px-3 md:px-4"
                                    >
                                        Auto
                                    </Button>
                                </div>
                                {errors.code && (
                                    <p className="text-red-500 text-xs md:text-sm">{errors.code}</p>
                                )}
                                <p className="text-xs text-gray-500">Código único para identificar la sucursal</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Información de Contacto */}
                    <Card className="border-gray-200 hover:border-[#b9f09e]/30 transition-colors">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-base md:text-lg text-[#2d524d]">
                                <div className="p-2 bg-[#2d524d] rounded-lg">
                                    <Phone className="h-4 w-4 md:h-5 md:w-5 text-[#b9f09e]" />
                                </div>
                                Información de Contacto
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs md:text-sm font-semibold text-gray-700">Correo Electrónico *</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={branchData.email}
                                        onChange={(e) => updateBranchField('email', e.target.value)}
                                        placeholder="correo@empresa.com"
                                        className={`pl-10 text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20 ${errors.email ? 'border-red-500' : ''}`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-xs md:text-sm">{errors.email}</p>
                                )}
                            </div>

                            {/* Teléfono */}
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-xs md:text-sm font-semibold text-gray-700">Teléfono</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="phone"
                                        value={branchData.phone}
                                        onChange={(e) => updateBranchField('phone', e.target.value)}
                                        placeholder="Ej: +57 300 123 4567"
                                        className="pl-10 text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Ubicación */}
                <Card className="border-gray-200 hover:border-[#b9f09e]/30 transition-colors">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-base md:text-lg text-[#2d524d]">
                            <div className="p-2 bg-[#2d524d] rounded-lg">
                                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-[#b9f09e]" />
                            </div>
                            Ubicación
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-xs md:text-sm font-semibold text-gray-700">Dirección</Label>
                                <Textarea
                                    id="address"
                                    value={branchData.address}
                                    onChange={(e) => updateBranchField('address', e.target.value)}
                                    placeholder="Dirección completa de la sucursal"
                                    className="resize-none text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20"
                                    rows={2}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-xs md:text-sm font-semibold text-gray-700">Ciudad</Label>
                                    <Input
                                        id="city"
                                        value={branchData.city}
                                        onChange={(e) => updateBranchField('city', e.target.value)}
                                        placeholder="Ej: Medellín"
                                        className={`text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20 ${errors.city ? 'border-red-500' : ''}`}
                                    />
                                    {errors.city && (
                                        <p className="text-red-500 text-xs md:text-sm">{errors.city}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="state" className="text-xs md:text-sm font-semibold text-gray-700">Estado/Departamento</Label>
                                    <Select value={branchData.state} onValueChange={(value) => updateBranchField('state', value)}>
                                        <SelectTrigger className={`text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20 ${errors.state ? 'border-red-500' : ''}`}>
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
                                    {errors.state && (
                                        <p className="text-red-500 text-xs md:text-sm">{errors.state}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="country" className="text-xs md:text-sm font-semibold text-gray-700">País</Label>
                                    <Select value={branchData.country} onValueChange={(value) => updateBranchField('country', value)}>
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
                                    value={branchData.postalCode}
                                    onChange={(e) => updateBranchField('postalCode', e.target.value)}
                                    placeholder="Ej: 050001"
                                    className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Cuenta de Cobro de la Sede */}
                <Card className="border-gray-200 hover:border-[#b9f09e]/30 transition-colors">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-base md:text-lg text-[#2d524d]">
                            <div className="p-2 bg-[#2d524d] rounded-lg">
                                <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-[#b9f09e]" />
                            </div>
                            Cuenta de Cobro de la Sede
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="accName" className="text-xs md:text-sm font-semibold text-gray-700">Nombre de la cuenta</Label>
                                <Input
                                    id="accName"
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                    placeholder="Ej: Recaudo Sede Medellín"
                                    className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="accNumber" className="text-xs md:text-sm font-semibold text-gray-700">Número de cuenta/referencia</Label>
                                <Input
                                    id="accNumber"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    placeholder="Ej: MED-001"
                                    className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs md:text-sm font-semibold text-gray-700">Tipo de cuenta</Label>
                                <Select value={accountType} onValueChange={(v) => setAccountType(v as TypeAccount)}>
                                    <SelectTrigger className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20">
                                        <SelectValue placeholder="Seleccionar tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={TypeAccount.SAVINGS}>Ahorros</SelectItem>
                                        <SelectItem value={TypeAccount.CURRENT}>Corriente</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="accCategory" className="text-xs md:text-sm font-semibold text-gray-700">Categoría</Label>
                                <Select value={accountCategoryId ? String(accountCategoryId) : ''} onValueChange={(v) => setAccountCategoryId(Number(v))}>
                                    <SelectTrigger className="text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20">
                                        <SelectValue placeholder="Seleccionar categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories?.map((c) => (
                                            <SelectItem key={c.id} value={String(c.id)}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="accDesc" className="text-xs md:text-sm font-semibold text-gray-700">Descripción</Label>
                                <Textarea
                                    id="accDesc"
                                    value={accountDescription}
                                    onChange={(e) => setAccountDescription(e.target.value)}
                                    placeholder="Opcional"
                                    rows={2}
                                    className="resize-none h-20 text-sm md:text-base border-gray-200 focus:border-[#2d524d] focus:ring-[#2d524d]/20"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Información sobre Usuario Automático */}
                <Card className="border-[#b9f09e]/30 bg-[#b9f09e]/5">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-[#2d524d] flex items-center gap-2 text-base md:text-lg">
                            <div className="p-2 bg-[#2d524d] rounded-lg">
                                <User className="h-4 w-4 md:h-5 md:w-5 text-[#b9f09e]" />
                            </div>
                            Usuario Administrador Automático
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-xs md:text-sm text-[#2d524d]">
                                    <div className="p-1.5 bg-[#2d524d] rounded-md">
                                        <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-[#b9f09e]" />
                                    </div>
                                    <span>Se creará automáticamente un administrador</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs md:text-sm text-[#2d524d]">
                                    <div className="p-1.5 bg-[#2d524d] rounded-md">
                                        <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-[#b9f09e]" />
                                    </div>
                                    <span>Email: {branchData.email || 'Email de la sucursal'}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-xs md:text-sm text-[#2d524d]">
                                    <div className="p-1.5 bg-[#2d524d] rounded-md">
                                        <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-[#b9f09e]" />
                                    </div>
                                    <span>Rol: Administrador de Sucursal</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs md:text-sm text-[#2d524d]">
                                    <div className="p-1.5 bg-[#2d524d] rounded-md">
                                        <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-[#b9f09e]" />
                                    </div>
                                    <span>Contraseña: <strong>Branch123!</strong> (Temporal se debe cambiar al acceder)</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Botones de Acción */}
                <div className="flex justify-between gap-2">
                <Button
                        onClick={() => onBack()}
                        variant="outline"
                        size="lg"
                        className="flex md:hidden gap-2 border-[#2d524d] text-[#2d524d] hover:bg-[#b9f09e]/20 hover:border-[#2d524d]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver
                    </Button>
                    <Button
                        type="button"
                        onClick={handleShowModal}
                        className="bg-[#2d524d] hover:bg-[#2d524d]/90 text-white cursor-pointer text-sm md:text-base px-6 md:px-8"
                        disabled={isLoading}
                    >
                        Crear Sucursal
                    </Button>
                </div>
            </div>

            {/* Modal de Confirmación */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Confirmar Creación de Sucursal"
                mode="create"
                customSize="max-w-4xl"
            >
                <BranchesSummaryForm
                    formData={branchData}
                    onConfirm={() => handleModalConfirm(onSuccess, () => setShowModal(false))}
                    onCancel={() => setShowModal(false)}
                    isLoading={isLoading}
                    accountData={getAccountData()}
                />
            </Modal>
        </>
    );
};

