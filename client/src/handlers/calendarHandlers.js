import * as request from '../lib/request'

export const getSchedule = async (userType, id, service_duration) => {
    try {
        const response = await request.get(`/api/calendar/schedule?user_type=${userType}&id=${id}&service_duration=${service_duration}`);
        return response;
    } catch (error) {
        // console.log(error)
    }
}

export const bookAppointment = async (userID, salonID, serviceID, date, start_time) => {
    try {
        const response = await request.post(`/api/calendar/book-appointment`, {userID, salonID, serviceID, date, start_time});
        return response;
    } catch (error) {
        // console.log(error)
    }
}