import * as request from '../lib/request'

export const getUserDetails = async (id) => {
    try {
        const response = await request.get(`/api/user/details?id=${id}`);
        return response;
    } catch (error) {
        // console.log(error)
    }
}

export const getUserBookings = async (id) => {
    try {
        const response = await request.get(`/api/user/bookings?id=${id}`);
        return response;
    } catch (error) {
        // console.log(error)
    }
}

export const updateUserDetails = async (values) => {
    try {
        const response = await request.put(`/api/user/edit-user`, values);
        return response;
    } catch (error) {
        // console.log(error)
    }
}