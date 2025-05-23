const router = require('express').Router()
const { getUserData, getUserBookings, editUserDetails, deleteUser, deleteAppointment } = require('../db/userQueries');
const { checkDateStatus } = require('../utils/date');
const { hashPassword } = require('../utils/hash');

router.get('/details', async (req, res) => {
    const { id } = req.query

    const result = await getUserData(id)

    res.status(200).send({ result: result[0] })
})

router.get('/bookings', async (req, res) => {
    const { id } = req.query

    const results = await getUserBookings(id)
    const formattedArrays = checkDateStatus(results)

    res.status(200).send({ result: formattedArrays })
})

router.put('/edit-user', async (req, res) => {
    const { id, data } = req.body;

    try {
        const fields = Object.keys(data);
        const values = Object.values(data);

        if (fields.includes('password')) {
            const passwordIndex = fields.indexOf('password');
            const hashedPassword = await hashPassword(values[passwordIndex]);
            values[passwordIndex] = hashedPassword;
        }

        await editUserDetails(id, fields, values);

        res.status(200).send({ message: 'User data updated successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'An error occurred while updating user data' });
    }
});

router.delete('/delete-user', async (req, res) => {
    const {id} = req.body
    await deleteUser(id)

    res.status(200).send({ message: 'User removed successfully!' });
});

router.delete('/cancel-appointment', async (req, res) => {
    const {id} = req.body
    await deleteAppointment(id)

    res.status(200).send({ message: 'Appointment canceled!' });
});

module.exports = router