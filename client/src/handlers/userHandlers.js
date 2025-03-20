import * as request from '../lib/request'

export const login = async (type, values) => {
    try {
        const response = await request.post('/api/users/login', {type, values});
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
        const response = await request.post('/api/users/register', {type, values});
        
        if (!response.success) {
            throw new Error(response.message || 'Registration failed');
        }
        
        return response;
    } catch (error) {
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

export const editUserData = async(data) => {
    const {userId, changedFields} = data

    try {
        const response = await request.put(`/api/users/updateUserData`, {userId, changedFields});
        return response;
    } catch (error) {
        throw error;
    }
}

