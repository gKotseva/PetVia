import * as request from '../lib/request'

export const getSalonDetails = async (id) => {
    try {
        const response = await request.get(`/api/salon/details?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const editSalonDetails = async (id, data) => {
    try {
        const response = await request.put(`/api/salon/edit-details`, {id, data});
        return response;
    } catch (error) {
        throw error;
    }
}

export const getTodayAppointments = async (id, date) => {
    try {
        const response = await request.get(`/api/salon/today-appointments?id=${id}&date=${date}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getTeam = async (id) => {
    try {
        const response = await request.get(`/api/salon/team?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const addTeamMember = async (id, values) => {
    const {name, image} = values
    try {
        const response = await request.post(`/api/salon/add-team-member`, {id, name, image});
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteTeamMember = async (id, image) => {
    try {
        const response = await request.remove(`/api/salon/delete-team-member`, {id, image});
        return response;
    } catch (error) {
        throw error;
    }
}

export const getServices = async (id) => {
    try {
        const response = await request.get(`/api/salon/services?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const addService = async (id, values) => {
    try {
        const response = await request.post(`/api/salon/add-service`, {id, values});
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteService = async (id) => {
    try {
        const response = await request.remove(`/api/salon/delete-service`, {id});
        return response;
    } catch (error) {
        throw error;
    }
}

export const editService = async (id, data) => {
    try {
        const response = await request.put(`/api/salon/edit-service`, {id, data});
        return response;
    } catch (error) {
        throw error;
    }
}

export const addSchedule = async (id, values, selectedDates) => {
    try {
        const response = await request.post(`/api/salon/add-schedule`, {id, values, selectedDates});
        return response;
    } catch (error) {
        throw error;
    }
}

export const getReviews = async (id) => {
    try {
        const response = await request.get(`/api/salon/reviews?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getSchedule = async (id) => {
    try {
        const response = await request.get(`/api/salon/schedule?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const editSchedule = async (id, date, values) => {
    try {
        const response = await request.put(`/api/salon/edit-schedule`, {id, date, values});
        return response;
    } catch (error) {
        throw error;
    }
}

export const getImages = async (id) => {
    try {
        const response = await request.get(`/api/salon/images?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const addImages = async (id, images) => {
    const {image} = images
    try {
        const response = await request.post(`/api/salon/add-images`, {id, image});
        return response;
    } catch (error) {
        throw error;
    }
}

export const removeImage = async (id, image) => {
    try {
        const response = await request.remove(`/api/salon/delete-image`, {id, image});
        return response;
    } catch (error) {
        throw error;
    }
}

export const makeImagePrimary = async (image) => {
    try {
        const response = await request.put(`/api/salon/make-primary`, {image});
        return response;
    } catch (error) {
        throw error;
    }
}