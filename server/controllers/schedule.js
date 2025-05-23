const router = require('express').Router()

const { getSchedule, getAppointments, addAppointment, deleteSchedule, checkAppointment } = require('../db/scheduleQueries');
const { generateSlots } = require('../utils/calendar');
const { formatDate } = require('../utils/date');

router.get('/schedule', async (req, res) => {
    const { user_type, id, service_duration } = req.query;
    const schedule = {};

    try {
        const { user_type, id, service_duration } = req.query;
        const schedule = {};

        const salonSchedule = await getSchedule(id);

        if (salonSchedule.length === 0) {
            throw new Error('No schedules found!')
        }

        const salonAppointments = await getAppointments(id);

        for (const date of salonSchedule) {
            const formattedDate = formatDate(date.work_date);

            const appointmentsForDate = salonAppointments.filter(app =>
                formatDate(app.appointment_date) === formattedDate
            );

            const slots = generateSlots(
                date,
                appointmentsForDate,
                user_type === 'salon' ? null : service_duration,
                user_type
            );

            schedule[formattedDate] = {
                working_hours: `${date.open_time.substring(0, 5)} - ${date.close_time.substring(0, 5)}`,
                slots
            };
        }

        res.status(200).json({ data: schedule });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/book-appointment', async (req, res) => {
    try {
        const { userID, salonID, serviceID, date, start_time } = req.body;

        const existing = await checkAppointment(date, start_time, salonID);

        if (existing.length > 0) {
            throw new Error('Appointment has already been booked!')
        }

        await addAppointment(userID, salonID, serviceID, date, start_time);

        res.status(200).json({ message: 'Booking successful!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete-schedule', async (req, res) => {
    try {
        const { date, salonId } = req.body;
        await deleteSchedule(date, salonId);

        res.status(200).json({ message: `Schedule for ${date} removed! Please refresh the page!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router