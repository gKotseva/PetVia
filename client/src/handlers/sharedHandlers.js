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

export const getAppointments = async (id) => {
    try {
        const response = await request.get(`/api/shared/appointments?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getSlots = async (user_type, id, service_duration, selected_date) => {
    try {
        const response = await request.get(`/api/shared/slots?user_type=${user_type}&id=${id}&service_duration=${service_duration}&selected_date=${selected_date}`);
        return response;
    } catch (error) {
        throw error;
    }
}