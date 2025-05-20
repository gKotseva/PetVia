const router = require('express').Router()
const db = require('../db/db');
const { getAllSalons, getAllAppointmentsCount, getAllServicesPerDetails, getSalonsPerData, getSalonReviews, getDetails, getTeam, getServices, getAppointments, getSchedule, getAllSalonsCount, getAllCustomersCount } = require('../db/sharedQueries');
const { generateSlots } = require('../utils/calendar');
const { formatDate } = require('../utils/date');
const { averageRating } = require('../utils/rating');

router.get('/salons', async (req, res) => {
    const query = getAllSalons()
    const results = await db.executeQuery(query);

    res.status(200).send({ result: results })
})

router.get('/count', async (req, res) => {
    const appointmentsQuery = getAllAppointmentsCount();
    const appointments = await db.executeQuery(appointmentsQuery);

    const salonsQuery = getAllSalonsCount();
    const salons = await db.executeQuery(salonsQuery);

    const customersQuery = getAllCustomersCount();
    const customers = await db.executeQuery(customersQuery);

    res.status(200).send({
        appointments: appointments[0].appointments,
        salons: salons[0].salons,
        customers: customers[0].customers
    });
});

router.get('/services-per-details', async (req, res) => {
    const {city, state} = req.query

    const query = getAllServicesPerDetails(city, state)
    const results = await db.executeQuery(query);

    res.status(200).send({data: results})
})

router.get('/salons-per-data', async(req, res) => {
    const {state, city, service} = req.query;
    const salonDetailsQuery = getSalonsPerData(state, city, service);
    const salonDetails = await db.executeQuery(salonDetailsQuery);

    for (const salon of salonDetails) {
        const salonReviewsQuery = getSalonReviews(salon.salon_id);
        const salonReviews = await db.executeQuery(salonReviewsQuery);
    
        salon['reviews'] = salonReviews;
        salon['averageRating'] = averageRating(salon);

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

    for (const review of salonReviews) {
        const formattedDate = formatDate(review.created_at)
        review.created_at = formattedDate
    }

    const salonTeamQuery = getTeam(id);
    const salonTeam = await db.executeQuery(salonTeamQuery);

    const salonServicesQuery = getServices(id);
    const salonServices = await db.executeQuery(salonServicesQuery);

    res.status(200).json({data: {salonDetails: salonInfo[0], reviews: salonReviews, team: salonTeam, services: salonServices, averageRating: average}});
})

router.get('/slots', async(req, res) => {
    const {user_type, id, service_duration, selected_date} = req.query

    const salonScheduleQuery = getSchedule(id, selected_date)
    const salonSchedule = await db.executeQuery(salonScheduleQuery)

    if (salonSchedule.length > 0){
        const salonAppointmentsQuery = getAppointments(id, selected_date)
        const salonAppointments = await db.executeQuery(salonAppointmentsQuery)
    
        const slots = generateSlots(salonSchedule[0], salonAppointments, service_duration, user_type)
    
        res.status(200).json({data: slots});
    } else {
        res.status(500).json({message: 'No schedule for today!'});
    }

})

module.exports = router