const DEFAULT_API_BASE_URL = 'http://localhost:5000/api';

export const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '');
export const sessionStorageKey = 'lyrcon-hrms-session';

async function request(path, { method = 'GET', body, token } = {}) {
    const response = await fetch(`${apiBaseUrl}${path}`, {
        method,
        headers: {
            ...(body ? { 'Content-Type': 'application/json' } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();
    const payload = text ? JSON.parse(text) : null;

    if (!response.ok) {
        throw new Error(payload?.message || 'Request failed');
    }

    return payload;
}

export const authApi = {
    login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
    signup: (payload) => request('/auth/signup', { method: 'POST', body: payload }),
};

export const employeeApi = {
    list: (token) => request('/employees', { token }),
    create: (payload, token) => request('/employees', { method: 'POST', body: payload, token }),
};

export const assetApi = {
    list: (token) => request('/assets', { token }),
    summary: (token) => request('/assets/summary', { token }),
    create: (payload, token) => request('/assets', { method: 'POST', body: payload, token }),
};
