export function decodeJWT(token) {
    function decodeBase64(str) {
        const base64String = str.replace(/-/g, '+').replace(/_/g, '/');
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        return JSON.parse(decodeURIComponent(escape(rawData)));
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('El token JWT proporcionado no es válido');
    }

    const payload = parts[1];
    return decodeBase64(payload);
}