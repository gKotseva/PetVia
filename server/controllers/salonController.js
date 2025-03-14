const router = require('express').Router()
const db = require('../db');
const { getAllSalons, getAllCities, getAllStates, getAllServices, getSalonsPerData, getSalonDetails, getSalonBookings, getSalonSchedule, getSingleServiceInfo, insertBooking } = require('../dbQueries');

router.get('/all', async(req, res) => {
    const query = getAllSalons()
    const results = await db.executeQuery(query);

    res.status(200).json(results);
})

router.get('/cities', async (req, res) => {
    const {state} = req.query

    const query = getAllCities(state)
    const results = await db.executeQuery(query);

    res.status(200).json(results);
});

router.get('/states', async(req, res) => {
    const query = getAllStates()
    const results = await db.executeQuery(query);

    res.status(200).json(results);
})

router.get('/services', async(req, res) => {
    const {state, city} = req.query
    const query = getAllServices(state, city)
    const results = await db.executeQuery(query);

    res.status(200).json(results);
})

router.get('/salonsPerData', async(req, res) => {
    const {state, city, service} = req.query
    const query = getSalonsPerData(state, city, service)
    const results = await db.executeQuery(query);

    res.status(200).json(results);
})

router.get('/id', async(req, res) => {
    const {id} = req.query
    const query = getSalonDetails(id)
    const results = await db.executeQuery(query);

    res.status(200).json(results);
})

router.get('/bookings', async(req, res) => {
    const {id} = req.query
    const query = getSalonBookings(id)
    const results = await db.executeQuery(query);

    res.status(200).json(results);
})

router.get('/schedule', async(req, res) => {
    const {id} = req.query
    const query = getSalonSchedule(id)
    const results = await db.executeQuery(query);

    res.status(200).json(results);
})

router.get('/singleService', async(req, res) => {
    const {serviceId, salonId} = req.query
    const query = getSingleServiceInfo(serviceId, salonId)
    const results = await db.executeQuery(query);

    res.status(200).json(results);
})

router.post('/bookAppointment', async(req, res) => {
    const {appointmentStartTime, serviceId, userId, salonId, selectedDate} = req.body

    const query = insertBooking(appointmentStartTime, serviceId, userId, salonId, selectedDate)
    const results = await db.executeQuery(query);

    return res.status(200).send({success: true, message: 'Appointment Booked!', results})
})


module.exports = router