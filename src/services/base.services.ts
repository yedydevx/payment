import { api } from "@/config/axios";
import { ServiceOptions } from "@/types/services/services.type";

export const baseService = {
    // Obtener datos
    async get<T>(url: string, options: ServiceOptions = {}): Promise<T> {
        try {
            const response = await api.get(url);
            if (options.dataPath) {
                return options.dataPath.split('.').reduce((obj, key) => obj[key], response.data);
            }
            return response.data;
        } catch (error: any) {
            if (error.response?.data) throw error.response.data;
            const errorMessage = error.response?.data?.message || "Error al obtener datos";
            throw { message: errorMessage };
        }
    },

    // Crear datos
    async post<T>(url: string, data: any, options: ServiceOptions = {}): Promise<T> {
        try {
            const response = await api.post(url, data);
            if (options.dataPath) {
                return options.dataPath.split('.').reduce((obj, key) => obj[key], response.data);
            }
            return response.data;
        } catch (error: any) {
            if (error.response?.data) throw error.response.data;
            const errorMessage = error.response?.data?.message || "Error al crear recurso";
            throw { message: errorMessage };
        }
    },

    // Actualizar datos
    async put<T>(url: string, data: any, options: ServiceOptions = {}): Promise<T> {
        try {
            const response = await api.put(url, data);
            if (options.dataPath) {
                return options.dataPath.split('.').reduce((obj, key) => obj[key], response.data);
            }
            return response.data;
        } catch (error: any) {
            if (error.response?.data) throw error.response.data;
            const errorMessage = error.response?.data?.message || "Error al actualizar recurso";
            throw { message: errorMessage };
        }
    },

    // Actualizar datos parcialmente
    async patch<T>(url: string, data: any, options: ServiceOptions = {}): Promise<T> {
        try {
            const response = await api.patch(url, data);
            if (options.dataPath) {
                return options.dataPath.split('.').reduce((obj, key) => obj[key], response.data);
            }
            return response.data;
        } catch (error: any) {
            if (error.response?.data) throw error.response.data;
            const errorMessage = error.response?.data?.message || "Error al actualizar recurso";
            throw { message: errorMessage };
        }
    },

    // Eliminar datos
    async delete<T>(url: string, options: ServiceOptions = {}): Promise<T> {
        try {
            const response = await api.delete(url);
            if (options.dataPath) {
                return options.dataPath.split('.').reduce((obj, key) => obj[key], response.data);
            }
            return response.data;
        } catch (error: any) {
            if (error.response?.data) throw error.response.data;
            const errorMessage = error.response?.data?.message || "Error al eliminar recurso";
            throw { message: errorMessage };
        }
    },

    // Eliminar datos con validación de uso (para módulos que pueden estar siendo usados por otros)
    async deleteWithUsageValidation<T>(url: string, options: ServiceOptions = {}): Promise<T> {
        try {
            const response = await api.delete(url);

            // Validar si el backend indica que el recurso está siendo usado
            if (response.data?.status === false) {
                throw new Error(response.data.message || "Este recurso está siendo usado y no puede ser eliminado");
            }

            if (options.dataPath) {
                return options.dataPath.split('.').reduce((obj, key) => obj[key], response.data);
            }
            return response.data;
        } catch (error: any) {
            if (error.response?.data) throw error.response.data;
            const errorMessage = error.response?.data?.message || error.message || "Error al eliminar recurso";
            throw { message: errorMessage };
        }
    },
};
