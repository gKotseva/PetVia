import * as request from '../lib/request'

export const getAllSalons = async () => {
    try {
        const response = await request.get(`/api/shared/salons`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAllCounts = async () => {
    try {
        const response = await request.get(`/api/shared/count`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchServicesPerDetails = async (city, state) => {
    try {
        const response = await request.get(`/api/shared/services-per-details?city=${city}&state=${state}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getSalonsPerData = async (state, city, service) => {
    try {
        const response = await request.get(`/api/shared/salons-per-data?state=${state}&city=${city}&service=${service}`);
        return response;
    } catch (error) {
       throw error;
    }
};

export const getSalonDetails = async (id) => {
    try {
        const response = await request.get(`/api/shared/details?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const addReview = async (customerId, review) => {
    try {
        const response = await request.post(`/api/shared/add-review`, {customerId, review});
        return response;
    } catch (error) {
        throw error;
    }
}