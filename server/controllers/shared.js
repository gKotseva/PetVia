const router = require('express').Router()
const { getAllSalons, getAllAppointmentsCount, getAllServicesPerDetails, getSalonsPerData, getSalonReviews, getDetails, getTeam, getServices, getAppointments, getSchedule, getAllSalonsCount, getAllCustomersCount } = require('../db/sharedQueries');
const { generateSlots } = require('../utils/calendar');
const { formatDate } = require('../utils/date');
const { averageRating } = require('../utils/rating');

router.get('/salons', async (req, res) => {
    const results = await getAllSalons()

    res.status(200).send({ result: results })
})

router.get('/count', async (req, res) => {
    const appointments = await getAllAppointmentsCount();
    const salons = await getAllSalonsCount();
    const customers = await getAllCustomersCount();

    res.status(200).send({
        appointments: appointments[0].appointments,
        salons: salons[0].salons,
        customers: customers[0].customers
    });
});

router.get('/services-per-details', async (req, res) => {
    const {city, state} = req.query
    const results = await getAllServicesPerDetails(city, state)

    res.status(200).send({data: results})
})

router.get('/salons-per-data', async(req, res) => {
    const {state, city, service} = req.query;
    const salonDetails = await getSalonsPerData(state, city, service);

    for (const salon of salonDetails) {
        const salonReviews = await getSalonReviews(salon.salon_id);
    
        salon['reviews'] = salonReviews;
        salon['averageRating'] = averageRating(salon);

    }

    res.status(200).json({salonDetails});
})

router.get('/details', async(req, res) => {
    const {id} = req.query
    const salonInfo = await getDetails(id)

    const salonReviews = await getSalonReviews(id);

    const average = averageRating(salonReviews)

    for (const review of salonReviews) {
        const formattedDate = formatDate(review.created_at)
        review.created_at = formattedDate
    }

    const salonTeam = await getTeam(id);

    const salonServices = await getServices(id);

    res.status(200).json({data: {salonDetails: salonInfo[0], reviews: salonReviews, team: salonTeam, services: salonServices, averageRating: average}});
})

router.get('/slots', async(req, res) => {
    const {user_type, id, service_duration, selected_date} = req.query

    const salonSchedule = await getSchedule(id, selected_date)

    if (salonSchedule.length > 0){
        const salonAppointments = await getAppointments(id, selected_date)
    
        const slots = generateSlots(salonSchedule[0], salonAppointments, service_duration, user_type)
    
        res.status(200).json({data: slots});
    } else {
        res.status(500).json({message: 'No schedule for today!'});
    }

})

module.exports = router