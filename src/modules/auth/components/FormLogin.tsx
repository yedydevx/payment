import { GoLock } from "react-icons/go";
import { Input } from "@/components/ui/input";
import { HiOutlineMail } from "react-icons/hi";
import { FormLoginProps } from '../types/auth.types'
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

export const FormLogin = ({ formLoginData, isLoading, showPassword, setShowPassword, showErrors, emailError, handleInputChange }: FormLoginProps) => {
    return (
        <div className="w-full space-y-6">
            {/* Campo de Email */}
            <div className="space-y-2">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <HiOutlineMail size={20} className="text-[#2d524d]" />
                    </div>
                    <Input
                        type="email"
                        autoFocus={true}
                        value={formLoginData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`h-12 pl-12 pr-4 border rounded-lg focus:ring-2 focus:ring-[#2d524d]/20 focus:border-[#2d524d] transition-all duration-200 ${(emailError || (showErrors && !formLoginData.email)) ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 hover:border-[#b9f09e]'}`}
                        placeholder="Email Address"
                        disabled={isLoading}
                    />
                </div>
                {(emailError || (showErrors && !formLoginData.email)) && (
                    <p className="text-red-500 text-sm font-medium">{emailError || 'El correo electrónico es requerido'}</p>
                )}
            </div>

            {/* Campo de Password */}
            <div className="space-y-2">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <GoLock size={20} className="text-[#2d524d]" />
                    </div>
                    <Input
                        type={showPassword ? "text" : "password"}
                        autoFocus={false}
                        value={formLoginData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`h-12 pl-12 pr-12 border rounded-lg focus:ring-2 focus:ring-[#2d524d]/20 focus:border-[#2d524d] transition-all duration-200 ${showErrors && !formLoginData.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 hover:border-[#b9f09e]'}`}
                        placeholder="Password"
                        disabled={isLoading}
                    />
                    <div className="absolute inset-y-0 right-0 px-4 flex items-center">
                        {showPassword ? (
                            <RiEyeLine
                                size={20}
                                className="text-[#2d524d] cursor-pointer hover:text-[#1a3a35] transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            <RiEyeCloseLine
                                size={20}
                                className="text-[#2d524d] cursor-pointer hover:text-[#1a3a35] transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )}
                    </div>
                </div>
                {showErrors && !formLoginData.password && (
                    <p className="text-red-500 text-sm font-medium">La contraseña es requerida</p>
                )}
            </div>
        </div>
    )
}
