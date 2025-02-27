import { toast } from 'react-toastify';
import * as request from '../lib/request'

export const login = async (values) => {
    try {
        const response = await request.post('/api/users/login', values);
        
        if (!response.success) {
            throw new Error(response.message || 'Login failed');
        }

        toast.success(response.message)
        return response;
    } catch (error) {
        toast.error(error.message)
        throw error;
    }
};

export const register = async (values) => {
    try {
        const response = await request.post('/api/users/register', values);
        
        if (!response.success) {
            throw new Error(response.message || 'Registration failed');
        }
        
        toast.success(response.message)
        return response;
    } catch (error) {
        toast.error(error.message)
        throw error;
    }
};

export const getAllUserData = async(id) => {
    try {
        const response = await request.get(`/api/users/getAllUserData?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}