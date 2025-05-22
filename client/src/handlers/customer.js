import * as request from '../lib/request'

export const getUserDetails = async (id) => {
    try {
        const response = await request.get(`/api/customer/details?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getUserBookings = async (id) => {
    try {
        const response = await request.get(`/api/customer/bookings?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateUserDetails = async (id, values) => {
    try {
        const response = await request.put(`/api/customer/edit-user`, {id, data: values});
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await request.remove(`/api/customer/delete-user`, {id});
        return response;
    } catch (error) {
        throw error;
    }
}

export const cancelAppointment = async (id) => {
    try {
        const response = await request.remove(`/api/customer/cancel-appointment`, {id});
        return response;
    } catch (error) {
        throw error;
    }
}