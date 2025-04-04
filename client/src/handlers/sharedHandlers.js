import * as request from '../lib/request'

export const getAllSalons = async () => {
    try {
        const response = await request.get(`/api/shared/salons`);
        return response;
    } catch (error) {
        // console.log(error)
    }
}

export const getAllAppointmentsCount = async () => {
    try {
        const response = await request.get(`/api/shared/appointments-count`);
        return response;
    } catch (error) {
        // console.log(error)
    }
}

export const fetchServicesPerDetails = async (city, state) => {
    try {
        const response = await request.get(`/api/shared/services-per-details?city=${city}&state=${state}`);
        return response;
    } catch (error) {
        // console.log(error)
    }
}

export const getSalonsPerData = async (state, city, service) => {
    try {
        const response = await request.get(`/api/shared/salons-per-data?state=${state}&city=${city}&service=${service}`);
        return response;
    } catch (error) {
       // console.log(error)
    }
};

export const getSalonDetails = async (id) => {
    try {
        const response = await request.get(`/api/shared/details?id=${id}`);
        return response;
    } catch (error) {
        // console.log(error)
    }
}