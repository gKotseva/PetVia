import * as request from '../lib/request'

export const login = async (accountType, values) => {
    try {
        const response = await request.post('/api/auth/login', { accountType, values });
        return response;
    } catch (error) {
        throw error;
    }
}

export const register = async (accountType, values) => {
    try {
        const response = await request.post('/api/auth/register', { accountType, values });
        return response;
    } catch (error) {
        throw error;
    }
}