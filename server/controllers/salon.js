const { getDetails, editDetails, getTeam, addTeamMember, getImages, addSalonImages, deleteTeamMember, getServices, addService, deleteService, editService, addSchedule, getReviews, getSchedule, editSchedule, getAppointmentsToday } = require('../db/salonQueries')
const { hashPassword } = require('../utils/hash');
const { upload } = require('../multer');
const router = require('express').Router()
const fs = require('fs')

router.get('/details', async (req, res) => {
    const { id } = req.query
    const data = await getDetails(id)

    res.status(200).json({ data: data[0] });
})

router.put('/edit-details', async (req, res) => {
    const { id, data } = req.body

    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.includes('password')) {
        const passwordIndex = fields.indexOf('password');
        const hashedPassword = await hashPassword(values[passwordIndex]);
        values[passwordIndex] = hashedPassword;
    }

    await editDetails(id, fields, values);

    res.status(200).send({ message: 'Salon data updated successfully' });
})

router.get('/team', async (req, res) => {
    const { id } = req.query
    const data = await getTeam(id)

    res.status(200).json({ data: data });
})

router.post('/add-team-member', upload.single('image'), async (req, res) => {
    const {id, name} = req.body
    const imageName = req.file ? req.file.filename : null;

    const data = await addTeamMember(id, name, imageName)

    res.status(200).json({ message: `Successfully added ${name}!`, data: data });
})

router.delete('/delete-team-member', async (req, res) => {
    const { id, image } = req.body
    const imagePath = `../client/public/images/${image}`

    const result = await deleteTeamMember(id)

    fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting file', err);
        }
      });

    res.status(200).json({ message: 'Successfully removed team member!', data: result });
})

router.get('/services', async (req, res) => {
    const { id } = req.query
    const result = await getServices(id)

    res.status(200).json({ data: result });
})

router.post('/add-service', async (req, res) => {
    const { id, values } = req.body

    const result = await addService(id, values)

    res.status(200).json({ message: 'Successfully added new service!', data: result });
})

router.put('/edit-service', async (req, res) => {
    const { id, data } = req.body

    const fields = Object.keys(data);
    const values = Object.values(data);

    await editService(id, fields, values);

    res.status(200).send({ message: 'Service updated successfully' });
})

router.delete('/delete-service', async (req, res) => {
    const { id } = req.body

    const result = await deleteService(id)

    res.status(200).json({ data: result });
})

router.post('/add-schedule', async (req, res) => {
    const { id, values, selectedDates } = req.body

    if (Array.isArray(selectedDates) && selectedDates.length > 1) {
        await Promise.all(
          selectedDates.map(async (date) => {
            await addSchedule(id, values, date);
          })
        );
      } else {
        const singleDate = Array.isArray(selectedDates) ? selectedDates[0] : selectedDates;
        await addSchedule(id, values, singleDate);
      }
      
    res.status(200).json({ message: 'Schedule added successfully, please re-load the page!' });
})

router.get('/reviews', async (req, res) => {
    const { id } = req.query
    const result = await getReviews(id)

    res.status(200).json({ data: result });
})

router.get('/schedule', async (req, res) => {
    const { id } = req.query
    const result = await getSchedule(id)

    res.status(200).json({ data: result });
})

router.put('/edit-schedule', async (req, res) => {
    const { id, date, values } = req.body

    await editSchedule(id, date, values);

    res.status(200).json({ message: 'Schedule updated successfully' });
})

router.get('/today-appointments', async (req, res) => {
    const {id, date} = req.query

    const result = await getAppointmentsToday(id, date)

    res.status(200).json({data: result})
})

router.get('/images', async (req, res) => {
    const {id} = req.query

    const result = await getImages(id)

    res.status(200).json({data: result})
})

router.post('/add-images', upload.array('image', 10), async (req, res) => {
    const {id} = req.body

    req.files.map(async (file) => {
        const imageName = file.filename;
        await addSalonImages(id, imageName)
    })

    res.status(200).json({message: `Successfully added images!`})
})



module.exports = router