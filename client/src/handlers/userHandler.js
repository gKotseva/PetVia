import * as request from '../lib/request'

export const login = async (values) => {
    const response = await request.post('/api/users/login', values);
    if (!response.success) {
        throw new Error(response.message || 'Login failed');
    }

    return response
};

export const register = async (values) => {
    const response = await request.post('/api/users/register', values);
    if (!response.success) {
        throw new Error(response.message || 'Registration failed');
    }

    return response
};