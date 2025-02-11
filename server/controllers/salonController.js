const router = require('express').Router()
const db = require('../db');
const { getAllSalons, getAllCities, getAllStates, getAllServices } = require('../dbQueries');

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

module.exports = router