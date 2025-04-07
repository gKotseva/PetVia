const { getSchedule } = require('../db/calendarQueries');
const db = require('../db/db');
const { checkDayStatus } = require('../utils/calendar');
const router = require('express').Router()

router.get('/schedule', async(req, res) => {
    const {salonId, month, year} = req.query
    const query = getSchedule(salonId)
    const result = await db.executeQuery(query)

    const schedule = checkDayStatus(result, month, year)

    res.status(200).json({schedule});
})

module.exports = router