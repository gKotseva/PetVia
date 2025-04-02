const router = require('express').Router()
const db = require('../db/db');
const { getAllSalons, getAllAppointmentsCount, getAllServicesPerDetails } = require('../db/sharedQueries');

router.get('/salons', async (req, res) => {
    const query = getAllSalons()
    const results = await db.executeQuery(query);

    res.status(200).send({ result: results })
})

router.get('/appointments-count', async (req, res) => {
    const query = getAllAppointmentsCount()
    const results = await db.executeQuery(query);

    res.status(200).send(results[0])
})

router.get('/services-per-details', async (req, res) => {
    const {city, state} = req.query

    const query = getAllServicesPerDetails(city, state)
    const results = await db.executeQuery(query);

    res.status(200).send(results[0])
})


module.exports = router