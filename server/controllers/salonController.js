const { getDetails, editDetails, getTeam, addTeamMember, deleteTeamMember, getServices, addService, deleteService, editService, addSchedule, getReviews, getSchedule, getAppointments, getOpenCloseTime, editSchedule, getAppointmentsToday } = require('../db/salonQueries')
const db = require('../db/db');
const { formatDate } = require('../utils/date');
const { generateSlots } = require('../utils/calendar');
const { hashPassword } = require('../utils/hash');
const { upload } = require('../multer');
const router = require('express').Router()
const multer  = require('multer')
const fs = require('fs')

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
        const hashedPassword = await hashPassword(values[passwordIndex]);
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

router.post('/add-team-member', upload.single('image'), async (req, res) => {
    const {id, name} = req.body
    const imageName = req.file ? req.file.filename : null;

    const query = addTeamMember(id, name, imageName)
    const result = await db.executeQuery(query)

    res.status(200).json({ message: `Successfully added ${name}!`, data: result });
})

router.delete('/delete-team-member', async (req, res) => {
    const { id, image } = req.body
    const imagePath = `../client/uploads/${image}`

    const query = deleteTeamMember(id)
    const result = await db.executeQuery(query)

    fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting file', err);
        }
      });

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

router.get('/schedule', async (req, res) => {
    const { id } = req.query
    const query = getSchedule(id)
    const result = await db.executeQuery(query)

    res.status(200).json({ data: result });
})

router.put('/edit-schedule', async (req, res) => {
    const { id, date, values } = req.body

    const { query, params } = editSchedule(id, date, values);
    await db.executeQuery(query, params);

    res.status(200).json({ message: 'Schedule updated successfully' });
})

router.get('/today-appointments', async (req, res) => {
    const {id, date} = req.query

    const query = getAppointmentsToday(id, date)
    const result = await db.executeQuery(query)

    res.status(200).json({data: result})
})

module.exports = router