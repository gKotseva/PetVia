const router = require('express').Router()
const db = require('../db');
const { getAllSalons, getTeam, getAllCities, getAllStates, deleteService, getServices, getAllServices, getSalonsPerData, getSalonDetails, getSalonBookings, getSalonSchedule, getSingleServiceInfo, insertBooking, insertTeamMember, insertService } = require('../dbQueries');

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

router.get('/servicesByCondition', async(req, res) => {
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

    res.status(200).json({results});
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


// ==============================================================

router.put('/updateSalonDetails', async (req, res) => {
    try {
        const { id, changedFields } = req.body;
    
        const fields = Object.keys(changedFields);
        const values = Object.values(changedFields);
    
        if (fields.includes('password')) {
          const passwordIndex = fields.indexOf('password');
          const hashedPassword = await hashPassword(values[passwordIndex]);
          values[passwordIndex] = hashedPassword;
        }
    
        const query = `UPDATE salons SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE salon_id = ?`;
    
        const queryParams = [...values, id];
    
        await db.executeQuery(query, queryParams);
    
        res.status(200).send({ message: 'Salon data updated successfully' });
      } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send({ message: 'An error occurred while updating salon data' });
      }
})

router.get('/team', async(req, res) => {
    const {id} = req.query

    const query = getTeam(id)
    const results = await db.executeQuery(query);

    res.status(200).json({team: results});
})

router.post('/addTeamMember', async(req, res) => {
    const {values, id} = req.body

    const query = insertTeamMember(id, values.name, values.image)
    const results = await db.executeQuery(query);

    return res.status(200).send({success: true, message: 'Team member added!', results})
})

router.get('/services', async(req, res) => {
    const {id} = req.query
    const query = getServices(id)
    const results = await db.executeQuery(query);

    res.status(200).json({services: results});
})

router.post('/addService', async (req, res) => {
    const { values, id } = req.body;

    try {
        const insertQuery = `INSERT INTO services (salon_id, name, price, duration, description) VALUES (?, ?, ?, ?, ?)`;
        const insertResult = await db.executeQuery(insertQuery, [id, values.name, values.price, values.duration, values.description]);

        const newServiceId = insertResult.insertId;
        const fetchQuery = `SELECT * FROM services WHERE service_id = ?`;
        const [results] = await db.executeQuery(fetchQuery, [newServiceId]);

        res.status(200).json({ success: true, results, message: 'Service added!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/deleteService', async(req, res) => {
    const {id} = req.body

    const query = deleteService(id)
    const results = await db.executeQuery(query);

    res.status(200).json(results);
})

router.put('/updateService', async (req, res) => {
    try {
        const { id, changedFields } = req.body;
    
        const fields = Object.keys(changedFields);
        const values = Object.values(changedFields);
    
        const query = `UPDATE services SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE service_id = ?`;
        const queryParams = [...values, id];

        await db.executeQuery(query, queryParams);

        const fetchQuery = `SELECT * FROM services WHERE service_id = ?`;
        const [result] = await db.executeQuery(fetchQuery, [id]);

        res.status(200).json({ success: true, results: result });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ message: 'An error occurred while updating the service' });
    }
});



module.exports = router