import * as request from '../lib/request'

export const getAllSalons = async () => {
    try {
        const response = await request.get('/api/salon/all');
        return response;
    } catch (error) {
        throw error;
    }
};

export const getSalonsPerData = async (state, city, service) => {
    try {
        const response = await request.get(`/api/salon/salonsPerData?state=${state}&city=${city}&service=${service}`);
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

export const getAllServices = async (state, city) => {
    try {
        const response = await request.get(`/api/salon/servicesByCondition?state=${state}&city=${city}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getBookings = async (id) => {
    try {
        const response = await request.get(`/api/salon/bookings?id=${id}`);
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

export const getSigleServiceInfo = async (serviceId, salonId) => {
    try {
        const response = await request.get(`/api/salon/singleService?serviceId=${serviceId}&salonId=${salonId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const bookSalonAppointment = async (appointmentStartTime, serviceId, userId, salonId, selectedDate) => {
    try {
        const response = await request.post(`/api/salon/bookAppointment`, {appointmentStartTime, serviceId, userId, salonId, selectedDate});
        return response;
    } catch (error) {
        throw error;
    }
}


// ==============================================================


export const getTeam = async (id) => {
    try {
        const response = await request.get(`/api/salon/team?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const addTeamMember = async (values, id) => {
    try {
        const response = await request.post(`/api/salon/addTeamMember`, {values, id});
        return response;
    } catch (error) {
        throw error;
    }
}

export const getSalonDetails = async (id) => {
    try {
        const response = await request.get(`/api/salon/id?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const editSalonDetails = async (data) => {
    const {id, changedFields} = data

    try {
        const response = await request.put(`/api/salon/updateSalonDetails`, {id, changedFields});
        return response;
    } catch (error) {
        throw error;
    }
};

export const getServices = async (id) => {
    try {
        const response = await request.get(`/api/salon/services?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const addService = async (values, id) => {
    try {
        const response = await request.post(`/api/salon/addService`, {values, id});
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteService = async (id) => {
    try {
        const response = await request.remove(`/api/salon/deleteService`, {id});
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateService = async (data) => {
    const {id, changedFields} = data

    try {
        const response = await request.put(`/api/salon/updateService`, {id, changedFields});
        return response;
    } catch (error) {
        throw error;
    }
};
