import * as request from '../lib/request'

export const login = async (type, values) => {
    try {
        const response = await request.post('/api/auth/login', {type, values});
        if (response.status !== 200) {
            throw new Error(response.message || 'Login failed');
        }
        return response;
    } catch (error) {
        throw error;
    }
};

export const register = async (type, values) => {
    try {
        const response = await request.post('/api/auth/register', {type, values});
        
        if (!response.success) {
            throw new Error(response.message || 'Registration failed');
        }
        
        return response;
    } catch (error) {
        throw error;
    }
};