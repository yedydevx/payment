const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'your-fallback-key-here';

export const useEncryption = () => {
  const encrypt = (data: any): string => {
    try {
      // Convertir los datos a string si no lo son
      const stringData = typeof data === 'string' ? data : JSON.stringify(data);
      // Crear el buffer de datos
      const textToChars = stringData.split('').map(c => c.charCodeAt(0));   
      // Aplicar la encriptación XOR con la key
      const encrypted = textToChars.map((char, index) => {
        const keyChar = ENCRYPTION_KEY.charCodeAt(index % ENCRYPTION_KEY.length);
        return String.fromCharCode(char ^ keyChar);
      }).join(''); 
      // Convertir a base64 para almacenamiento seguro
      const result = btoa(encrypted);
      return result;
    } catch (error) {
      return '';
    }
  };

  const decrypt = (encryptedData: string): any => {
    try {
      if (!encryptedData) return null;
      // Decodificar el base64
      const decoded = atob(encryptedData);
      
      // Revertir la encriptación XOR
      const decrypted = decoded.split('').map((char, index) => {
        const keyChar = ENCRYPTION_KEY.charCodeAt(index % ENCRYPTION_KEY.length);
        return String.fromCharCode(char.charCodeAt(0) ^ keyChar);
      }).join('');
      
      // Intentar parsear como JSON si es posible
      try {
        const result = JSON.parse(decrypted);
        return result;
      } catch {
        return decrypted;
      }
    } catch (error) {
      return null;
    }
  };

  return {
    encrypt,
    decrypt
  };
}; 