import * as request from '../lib/request'

export const getAllSalons = async () => {
    try {
        const response = await request.get('/api/salon/all');
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllCities = async (state) => {
    try {
        const response = await request.get(`/api/salon/cities?state=${state}`);
        return response;
    } catch (error) {
        throw error;
    }
};


export const getAllStates = async () => {
    try {
        const response = await request.get('/api/salon/states');
        return response;
    } catch (error) {
        throw error;
    }
};