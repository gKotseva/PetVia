import * as request from '../lib/request'

export const getSchedule = async (salonId, month, year) => {
    try {
        const response = await request.get(`/api/calendar/schedule?salonId=${salonId}&month=${month}&year=${year}`);
        return response;
    } catch (error) {
        // console.log(error)
    }
}