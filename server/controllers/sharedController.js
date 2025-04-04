const router = require('express').Router()
const db = require('../db/db');
const { getAllSalons, getAllAppointmentsCount, getAllServicesPerDetails, getSalonsPerData, getSalonReviews, getDetails, getTeam, getServices } = require('../db/sharedQueries');
const { averageRating } = require('../utils/rating');

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

router.get('/salons-per-data', async(req, res) => {
    const {state, city, service} = req.query;
    const salonDetailsQuery = getSalonsPerData(state, city, service);
    const salonDetails = await db.executeQuery(salonDetailsQuery);

    for (const salon of salonDetails) {
        const salonReviewsQuery = getSalonReviews(salon.salon_id);
        const salonReviews = await db.executeQuery(salonReviewsQuery);
    
        salon['reviews'] = salonReviews;

        averageRating(salon)
    }

    res.status(200).json({salonDetails});
})

router.get('/details', async(req, res) => {
    const {id} = req.query
    const query = getDetails(id)
    const salonInfo = await db.executeQuery(query)

    const salonReviewsQuery = getSalonReviews(id);
    const salonReviews = await db.executeQuery(salonReviewsQuery);

    const average = averageRating(salonReviews)

    const salonTeamQuery = getTeam(id);
    const salonTeam = await db.executeQuery(salonTeamQuery);

    const salonServicesQuery = getServices(id);
    const salonServices = await db.executeQuery(salonServicesQuery);

    res.status(200).json({data: {salonDetails: salonInfo[0], reviews: salonReviews, team: salonTeam, services: salonServices, averageRating: average}});
})


module.exports = router