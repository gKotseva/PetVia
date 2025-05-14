const { getSchedule, getAppointments, addAppointment, deleteSchedule } = require('../db/calendarQueries');
const db = require('../db/db');
const { checkDayStatus, generateSlots } = require('../utils/calendar');
const { formatDate } = require('../utils/date');
const router = require('express').Router()

router.get('/schedule', async (req, res) => {
    const { user_type, id, service_duration } = req.query;
    const schedule = {};

    const scheduleQuery = getSchedule(id);
    const salonSchedule = await db.executeQuery(scheduleQuery);

    if (salonSchedule.length > 0) {
        const appointmentsQuery = getAppointments(id);
        const salonAppointments = await db.executeQuery(appointmentsQuery);

        for (const date of salonSchedule) {
            const formattedDate = formatDate(date.work_date);

            const appointmentsForDate = salonAppointments.filter(app => {
                return formatDate(app.appointment_date) === formattedDate
            });

            const daySlots = user_type === 'salon'
                ? generateSlots(date, appointmentsForDate, null, user_type)
                : generateSlots(date, appointmentsForDate, service_duration, user_type);

                schedule[formattedDate] = {working_hours: `${date.open_time.substring(0,5)} - ${date.close_time.substring(0,5)}`, slots: daySlots};
        }

        res.status(200).json({ data: schedule });
    } else {
        res.status(500).json({ message: 'No schedules found!' });
    }
})

router.post('/book-appointment', async (req, res) => {
    const {userID, salonID, serviceID, date, start_time} = req.body;

    const insertAppointmentQuery = addAppointment(userID, salonID, serviceID, date, start_time)
    const result = await db.executeQuery(insertAppointmentQuery);

    res.status(200).json({ message: 'Booking successfull!' });

})

router.delete('/delete-schedule', async (req, res) => {
    const {date, salonId} = req.body;

    const query = deleteSchedule(date, salonId)
    const result = await db.executeQuery(query);

    res.status(200).json({ message: `Schedule for ${date} removed! Please refresh the page!` });

})

module.exports = router