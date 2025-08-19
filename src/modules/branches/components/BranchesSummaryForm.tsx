import { Button } from "@/components/ui/button";
import { Building2, User, Info, Shield, Key, MapPin, Mail, CreditCard } from "lucide-react";
import { BranchesSummaryFormProps } from "../types/branches.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Componente del contenido del modal
export const BranchesSummaryForm: React.FC<BranchesSummaryFormProps> = ({
    formData,
    onConfirm,
    onCancel,
    isLoading,
    accountData
}) => {
    return (
        <div className="space-y-6 md:space-y-8">
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
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                            <span className="text-xs md:text-sm text-gray-500 font-medium">Nombre</span>
                            <p className="font-semibold text-gray-900 text-sm md:text-base">{formData.name}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs md:text-sm text-gray-500 font-medium flex items-center gap-2">

                                Código
                            </span>
                            <p className="font-semibold text-gray-900 text-sm md:text-base">{formData.code}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Información de Contacto */}
            <Card className="border-gray-200 hover:border-[#b9f09e]/30 transition-colors">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg text-[#2d524d]">
                        <div className="p-2 bg-[#2d524d] rounded-lg">
                            <Mail className="h-4 w-4 md:h-5 md:w-5 text-[#b9f09e]" />
                        </div>
                        Información de Contacto
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                            <span className="text-xs md:text-sm text-gray-500 font-medium">Email</span>
                            <p className="font-semibold text-gray-900 text-sm md:text-base">{formData.email || '-'}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs md:text-sm text-gray-500 font-medium">Teléfono</span>
                            <p className="font-semibold text-gray-900 text-sm md:text-base">{formData.phone || '-'}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Información de Ubicación */}
            <Card className="border-gray-200 hover:border-[#b9f09e]/30 transition-colors">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg text-[#2d524d]">
                        <div className="p-2 bg-[#2d524d] rounded-lg">
                            <MapPin className="h-4 w-4 md:h-5 md:w-5 text-[#b9f09e]" />
                        </div>
                        Información de Ubicación
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            <div className="space-y-2">
                                <span className="text-xs md:text-sm text-gray-500 font-medium">Ciudad</span>
                                <p className="font-semibold text-gray-900 text-sm md:text-base">{formData.city}</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs md:text-sm text-gray-500 font-medium">Departamento</span>
                                <p className="font-semibold text-gray-900 text-sm md:text-base">{formData.state}</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs md:text-sm text-gray-500 font-medium">País</span>
                                <p className="font-semibold text-gray-900 text-sm md:text-base">{formData.country}</p>
                            </div>
                            {formData.postalCode && (
                                <div className="space-y-2">
                                    <span className="text-xs md:text-sm text-gray-500 font-medium">Código Postal</span>
                                    <p className="font-semibold text-gray-900 text-sm md:text-base">{formData.postalCode}</p>
                                </div>
                            )}
                        </div>
                        {formData.address && (
                            <div className="space-y-2">
                                <span className="text-xs md:text-sm text-gray-500 font-medium">Dirección</span>
                                <p className="font-semibold text-gray-900 text-sm md:text-base">{formData.address}</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Cuenta de Cobro */}
            {accountData && (
                <Card className="border-gray-200 hover:border-[#b9f09e]/30 transition-colors">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-base md:text-lg text-[#2d524d]">
                            <div className="p-2 bg-[#2d524d] rounded-lg">
                                <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-[#b9f09e]" />
                            </div>
                            Cuenta de Cobro
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <span className="text-xs md:text-sm text-gray-500 font-medium">Nombre de la cuenta</span>
                                        <p className="font-semibold text-gray-900 text-sm md:text-base">{accountData.name}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-xs md:text-sm text-gray-500 font-medium">Número/Referencia</span>
                                        <p className="font-semibold text-gray-900 text-sm md:text-base">{accountData.accountNumber}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <span className="text-xs md:text-sm text-gray-500 font-medium">Tipo de cuenta</span>
                                        <p className="font-semibold text-gray-900 text-sm md:text-base">
                                            {accountData.type === 'SAVINGS' ? 'Ahorros' : 'Corriente'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-xs md:text-sm text-gray-500 font-medium">Categoría</span>
                                        <p className="font-semibold text-gray-900 text-sm md:text-base">{accountData.categoryName}</p>
                                    </div>
                                </div>
                            </div>
                            {accountData.description && (
                                <div className="md:col-span-2 space-y-2">
                                    <span className="text-xs md:text-sm text-gray-500 font-medium">Descripción</span>
                                    <p className="font-semibold text-gray-900 text-sm md:text-base">{accountData.description}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Usuario Administrador */}
            <Card className="border-[#b9f09e]/30 bg-[#b9f09e]/5">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg text-[#2d524d]">
                        <div className="p-2 bg-[#2d524d] rounded-lg">
                            <User className="h-4 w-4 md:h-5 md:w-5 text-[#b9f09e]" />
                        </div>
                        Usuario Administrador (Automático)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-3">
                            <div className="space-y-2">
                                <span className="text-xs md:text-sm text-[#2d524d] font-medium">Nombre</span>
                                <p className="font-semibold text-[#2d524d] text-sm md:text-base">{formData.name}</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs md:text-sm text-[#2d524d] font-medium">Email de acceso</span>
                                <p className="font-semibold text-[#2d524d] text-sm md:text-base">{formData.email || 'Se asignará automáticamente'}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="space-y-2">
                                <span className="text-xs md:text-sm text-[#2d524d] font-medium">Rol</span>
                                <p className="font-semibold text-[#2d524d] text-sm md:text-base">Administrador de Sucursal</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs md:text-sm text-[#2d524d] font-medium">Contraseña temporal</span>
                                <p className="font-semibold text-[#2d524d] text-sm md:text-base">Branch123!</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Información Importante */}
            <Card className="border-[#b9f09e]/30 bg-[#b9f09e]/10">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 text-[#2d524d]">
                        <div className="p-2 bg-[#2d524d] rounded-lg">
                            <Info className="h-4 w-4 md:h-5 md:w-5 text-[#b9f09e]" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold">Información Importante</h3>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-xs md:text-sm text-[#2d524d] space-y-3">
                        <div className="flex items-start gap-2">
                            <div className="p-1.5 bg-[#2d524d] rounded-md">
                                <Shield className="h-3 w-3 md:h-4 md:w-4 text-[#b9f09e] mt-0.5 flex-shrink-0" />
                            </div>
                            <p>
                                Al confirmar se creará la sucursal y automáticamente un usuario administrador
                                con las credenciales mostradas arriba.
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <div className="p-1.5 bg-[#2d524d] rounded-md">
                                <Key className="h-3 w-3 md:h-4 md:w-4 text-[#b9f09e] mt-0.5 flex-shrink-0" />
                            </div>
                            <p>
                                Se recomienda que el administrador cambie la contraseña en el primer acceso.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 md:gap-4 pt-4 md:pt-6 border-t border-gray-200">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 text-sm md:text-base"
                >
                    Cancelar
                </Button>
                <Button
                    type="button"
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="bg-[#2d524d] hover:bg-[#2d524d]/90 text-white min-w-[120px] text-sm md:text-base"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creando...
                        </div>
                    ) : (
                        'Confirmar y Crear'
                    )}
                </Button>
            </div>
        </div>
    );
};

