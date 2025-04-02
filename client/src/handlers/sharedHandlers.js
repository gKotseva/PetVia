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