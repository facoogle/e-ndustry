const apiUrl = import.meta.env.VITE_API_PYTHON_URL;
const cameraId = "0e4e9cfd-9c59-4b92-9c50-316a87534c37"

export const activateDetection = async () => {
    try {
        const response = await fetch(`${apiUrl}/activate_detection/${cameraId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rol: 'operador' }) // Enviar información del rol
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        console.error("Error al activar la detección:", error.message);
    }
};

export const deactivateDetection = async () => {
    try {
        const response = await fetch(`${apiUrl}/deactivate_detection/${cameraId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rol: 'operador' }) // Enviar información del rol
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        console.error("Error al desactivar la detección:", error.message);
    }
};