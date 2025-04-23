const { getDetails, editDetails, getTeam, addTeamMember, deleteTeamMember, getServices, addService, deleteService, editService, addSchedule, getReviews, getSchedule, getAppointments, getOpenCloseTime } = require('../db/salonQueries')
const db = require('../db/db');
const { formatDate } = require('../utils/date');
const { generateSlots } = require('../utils/calendar');
const router = require('express').Router()

router.get('/details', async (req, res) => {
    const { id } = req.query
    const query = getDetails(id)
    const result = await db.executeQuery(query)

    res.status(200).json({ data: result[0] });
})

router.put('/edit-details', async (req, res) => {
    const { id, changedFields } = req.body

    const fields = Object.keys(changedFields);
    const values = Object.values(changedFields);

    if (fields.includes('password')) {
        const passwordIndex = fields.indexOf('password');
        const hashedPassword = await hashedPassword(values[passwordIndex]);
        values[passwordIndex] = hashedPassword;
    }

    const { query, queryParams } = editDetails(id, fields, values);

    await db.executeQuery(query, queryParams);

    res.status(200).send({ message: 'Salon data updated successfully' });
})

router.get('/team', async (req, res) => {
    const { id } = req.query
    const query = getTeam(id)
    const result = await db.executeQuery(query)

    res.status(200).json({ data: result });
})

router.post('/add-team-member', async (req, res) => {
    const { id, values } = req.body
    const query = addTeamMember(id, values)
    const result = await db.executeQuery(query)

    res.status(200).json({ message: `Successfully added ${values.name}!`, data: result });
})

router.delete('/delete-team-member', async (req, res) => {
    const { id } = req.body
    const query = deleteTeamMember(id)
    const result = await db.executeQuery(query)

    res.status(200).json({ message: 'Successfully removed team member!', data: result });
})

router.get('/services', async (req, res) => {
    const { id } = req.query
    const query = getServices(id)
    const result = await db.executeQuery(query)

    res.status(200).json({ data: result });
})

router.post('/add-service', async (req, res) => {
    const { id, values } = req.body

    const query = addService(id, values)
    const result = await db.executeQuery(query)

    res.status(200).json({ message: 'Successfully added new service!', data: result });
})

router.put('/edit-service', async (req, res) => {
    const { id, changedFields } = req.body

    const fields = Object.keys(changedFields);
    const values = Object.values(changedFields);

    const { query, queryParams } = editService(id, fields, values);

    await db.executeQuery(query, queryParams);

    res.status(200).send({ message: 'Service updated successfully' });
})

router.delete('/delete-service', async (req, res) => {
    const { id } = req.body

    const query = deleteService(id)
    const result = await db.executeQuery(query)

    res.status(200).json({ data: result });
})

router.post('/add-schedule', async (req, res) => {
    const { id, values, selectedDates } = req.body

    if (Array.isArray(selectedDates) && selectedDates.length > 1) {
        await Promise.all(
          selectedDates.map(async (date) => {
            const { query, insertValues } = addSchedule(id, values, date);
            await db.executeQuery(query, insertValues);
          })
        );
      } else {
        const singleDate = Array.isArray(selectedDates) ? selectedDates[0] : selectedDates;
        const { query, insertValues } = addSchedule(id, values, singleDate);
        await db.executeQuery(query, insertValues);
      }
      
    res.status(200).json({ message: 'Schedule added successfully, please re-load the page!' });
})

router.get('/reviews', async (req, res) => {
    const { id } = req.query
    const query = getReviews(id)
    const result = await db.executeQuery(query)

    res.status(200).json({ data: result });
})

router.get('/appointments', async (req, res) => {
    const id = 3
    const month = 4
    const user_type = 'salon'

    const open_close_time = getOpenCloseTime(id, month)
    const salonScheduleQuery = getSchedule(id, month)
    const salonSchedule = await db.executeQuery(salonScheduleQuery)

    const slots = {}

    if (salonSchedule.length > 0) {
        const salonAppointmentsQuery = getAppointments(id, month)
        const salonAppointments = await db.executeQuery(salonAppointmentsQuery)

        for (const date of salonSchedule) {
            const formattedDate = formatDate(date.work_date)

            const appointmentsForDate = salonAppointments.filter(app => {
              return formatDate(app.appointment_date) === formattedDate
            })

            const daySlot = generateSlots(date, appointmentsForDate, null, user_type)
            slots[formattedDate] = daySlot
        }

        res.status(200).json({ data: slots });
    } else {
        res.status(500).json({ message: 'No schedule for today!' });
    }
})

module.exports = router