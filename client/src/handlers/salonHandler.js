import * as request from '../lib/request'

export const getSalonDetails = async (id) => {
    try {
        const response = await request.get(`/api/salon/details?id=${id}`);
        return response;
    } catch (error) {
        // console.log(error)
    }
}

export const editSalonDetails = async (data) => {
    const id = data.id
    const changedFields = data.changedFields
    try {
        const response = await request.put(`/api/salon/edit-details`, {id, changedFields});
        return response;
    } catch (error) {
        // console.log(error)
    }
}

export const getTeam = async (id) => {
    try {
        const response = await request.get(`/api/salon/team?id=${id}`);
        return response;
    } catch (error) {
        // console.log(error)
    }
}

export const addTeamMember = async (id, values) => {
    try {
        const response = await request.post(`/api/salon/add-team-member`, {id, values});
        return response;
    } catch (error) {
        // console.log(error)
    }
}

export const deleteTeamMember = async (id) => {
    try {
        const response = await request.remove(`/api/salon/delete-team-member`, {id});
        return response;
    } catch (error) {
        // console.log(error)
    }
}

export const getServices = async (id) => {
    try {
        const response = await request.get(`/api/salon/services?id=${id}`);
        return response;
    } catch (error) {
        // console.log(error)
    }
}

export const addService = async (id, values) => {
    try {
        const response = await request.post(`/api/salon/add-service`, {id, values});
        return response;
    } catch (error) {
        // console.log(error)
    }
}

export const deleteService = async (id) => {
    try {
        const response = await request.remove(`/api/salon/delete-service`, {id});
        return response;
    } catch (error) {
        // console.log(error)
    }
}

export const editService = async (data) => {
    try {
        const response = await request.put(`/api/salon/edit-service`, data);
        return response;
    } catch (error) {
        // console.log(error)
    }
}

export const addSchedule = async (id, values, selectedDates) => {
    try {
        const response = await request.post(`/api/salon/add-schedule`, {id, values, selectedDates});
        return response;
    } catch (error) {
        // console.log(error)
    }
}