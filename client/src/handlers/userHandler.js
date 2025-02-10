import * as request from '../lib/request'

export const login = async (values) => {
    try {
        const response = await request.post('/api/users/login', values);
        
        if (!response.success) {
            throw new Error(response.message || 'Login failed');
        }

        return response;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

export const register = async (values) => {
    try {
        const response = await request.post('/api/users/register', values);
        
        if (!response.success) {
            throw new Error(response.message || 'Registration failed');
        }

        return response;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};