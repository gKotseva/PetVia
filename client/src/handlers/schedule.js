import * as request from '../lib/request'

export const getSchedule = async (userType, id, service_duration) => {
    try {
        const response = await request.get(`/api/schedule/schedule?user_type=${userType}&id=${id}&service_duration=${service_duration}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const bookAppointment = async (userID, salonID, serviceID, date, start_time) => {
    try {
        const response = await request.post(`/api/schedule/book-appointment`, { userID, salonID, serviceID, date, start_time });
        return response;
    } catch (error) {
        throw error.message;
    }
}

export const deleteSchedule = async (date, salonId) => {
    try {
        const response = await request.remove(`/api/schedule/delete-schedule`, { date, salonId });
        return response;
    } catch (error) {
        throw error;
    }
}