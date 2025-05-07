const router = require('express').Router()
const db = require('../db/db');
const { getUserData, getUserBookings, editUserDetails, deleteUser, deleteAppointment } = require('../db/userQueries');
const { compareDates, checkDateStatus } = require('../utils/date');
const { hashPassword, comparePassword } = require('../utils/hash');

router.get('/details', async (req, res) => {
    const { id } = req.query

    const query = getUserData(id)
    const results = await db.executeQuery(query);

    res.status(200).send({ result: results[0] })

})

router.get('/bookings', async (req, res) => {
    const { id } = req.query

    const query = getUserBookings(id)
    const results = await db.executeQuery(query);
    const formattedArrays = checkDateStatus(results)

    res.status(200).send({ result: formattedArrays })
})

router.put('/edit-user', async (req, res) => {
    try {
        const { id, changedFields } = req.body;

        const fields = Object.keys(changedFields);
        const values = Object.values(changedFields);

        if (fields.includes('password')) {
            const passwordIndex = fields.indexOf('password');
            const hashedPassword = await hashPassword(values[passwordIndex]);
            values[passwordIndex] = hashedPassword;
        }

        const { query, queryParams } = editUserDetails(id, fields, values);
        await db.executeQuery(query, queryParams);

        res.status(200).send({ message: 'User data updated successfully!' });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send({ message: 'An error occurred while updating user data' });
    }
});

router.delete('/delete-user', async (req, res) => {
    const {id} = req.body
    const query = deleteUser(id)
    await db.executeQuery(query);

    res.status(200).send({ message: 'User removed successfully!' });
});

router.delete('/cancel-appointment', async (req, res) => {
    const {id} = req.body
    const query = deleteAppointment(id)
    await db.executeQuery(query);

    res.status(200).send({ message: 'Appointment canceled!' });
});


module.exports = router