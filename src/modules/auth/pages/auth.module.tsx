import useAuth from '@/modules/auth/hooks/useAuth';
import { useFormLogin } from '@/modules/auth/hooks/useFormLogin';
import { FormLogin } from '@/modules/auth/components/FormLogin';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { RiShieldCheckLine, RiMoneyDollarCircleLine, RiBarChartLine } from "react-icons/ri";

const LoginPage = () => {
    const {
        isLoading,
        process,
        setProcess,
        formLoginData,
        setFormLoginData,
        handleProcess
    } = useAuth();

    const {
        validateForm,
        showPassword,
        setShowPassword,
        showErrors,
        emailError,
        handleInputChange
    } = useFormLogin(formLoginData, setFormLoginData);

    const handleLoginClick = () => {
        if (validateForm(formLoginData)) {
            handleProcess();
        }
    };

    return (
        <div className="w-full h-screen flex">
            {/* Columna izquierda - Fondo negro degradado */}
            <div className="hidden md:flex md:w-2/3 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
                {/* Líneas decorativas */}
                <div className="absolute top-1/4 right-1/4 w-32 h-0.5 bg-gray-600/20 transform rotate-45"></div>
                <div className="absolute bottom-1/3 left-1/4 w-24 h-0.5 bg-gray-600/20 transform -rotate-45"></div>

                {/* Contenido de la columna izquierda  */}
                <div className="relative z-10 flex flex-col justify-center items-start px-16 text-white w-full">
                    <div className="max-w-xl">
                        {/* Logo/Título  */}
                        <div className="mb-8">
                            <h1 className="text-5xl font-black text-white">
                                ZetaPay
                            </h1>
                        </div>

                        {/* Descripción mejorada */}
                        <div className="mb-10">
                            <p className="text-xl text-white/95 leading-relaxed font-light">
                                La pasarela de pagos más <span className="font-bold text-gray-300">innovadora</span> para tus
                                <span className="font-bold text-gray-300"> ingresos digitales</span> y transferencias seguras!
                            </p>
                        </div>

                        {/* Características mejoradas con cards interactivas */}
                        <div className="space-y-4 mb-10">
                            <div className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-600/20 hover:bg-gray-600/10 transition-all duration-300">
                                <div className="p-2 rounded-lg bg-gray-700">
                                    <RiMoneyDollarCircleLine className="text-white text-xl" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-white mb-1">Transferencias instantáneas</h3>
                                    <p className="text-white/70 text-xs">Envío de dinero en tiempo real con máxima seguridad</p>
                                </div>
                            </div>

                            <div className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-600/20 hover:bg-gray-600/10 transition-all duration-300">
                                <div className="p-2 rounded-lg bg-gray-700">
                                    <RiShieldCheckLine className="text-white text-xl" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-white mb-1">Seguimiento de ingresos</h3>
                                    <p className="text-white/70 text-xs">Control total y detallado de tus finanzas</p>
                                </div>
                            </div>

                            <div className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-600/20 hover:bg-gray-600/10 transition-all duration-300">
                                <div className="p-2 rounded-lg bg-gray-700">
                                    <RiBarChartLine className="text-white text-xl" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-white mb-1">Análisis de gastos</h3>
                                    <p className="text-white/70 text-xs">Insights inteligentes para optimizar tus gastos</p>
                                </div>
                            </div>
                        </div>

                        {/* Estadísticas o números destacados */}
                        <div className="w-full flex justify-between items-center">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-gray-300 mb-1">2M+</div>
                                <div className="text-white/80 text-sm">Usuarios activos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-gray-300 mb-1">$500M</div>
                                <div className="text-white/80 text-sm">Transferencias mensuales</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-gray-300 mb-1">99.9%</div>
                                <div className="text-white/80 text-sm">Uptime garantizado</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Elementos flotantes adicionales */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-600 rounded-full animate-ping"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-gray-600 rounded-full animate-ping delay-500"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gray-600 rounded-full animate-ping delay-1000"></div>
            </div>

            {/* Columna derecha - Formulario de login */}
            <div className="w-full md:w-2/5 lg:w-1/3 bg-white flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Bienvenido a ZetaPay!</h2>
                        <p className="text-gray-600 text-base">Inicia sesión para continuar</p>
                    </div>

                    {process === 0 && (
                        <FormLogin
                            formLoginData={formLoginData}
                            isLoading={isLoading}
                            setFormLoginData={setFormLoginData}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            showErrors={showErrors}
                            emailError={emailError}
                            handleInputChange={handleInputChange}
                        />
                    )}

                    <div className='w-full mt-8'>
                        {process === 0 && (
                            <button
                                onClick={handleLoginClick}
                                disabled={isLoading}
                                className="w-full h-12 bg-gray-900 hover:bg-black text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <AiOutlineLoading3Quarters className="animate-spin" size={20} />
                                ) : (
                                    <span className="text-base">Iniciar Sesión</span>
                                )}
                            </button>
                        )}
                        {process !== 0 && (
                            <button
                                onClick={() => setProcess(0)}
                                disabled={isLoading}
                                className="w-full h-12 bg-gray-900 hover:bg-black text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                <span className="text-base">Volver al inicio de sesión</span>
                            </button>
                        )}
                    </div>

                    <div className="text-center mt-6">
                        {process === 0 && (
                            <button
                                onClick={() => setProcess(1)}
                                className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium"
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
