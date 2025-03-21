const router = require('express').Router()
const db = require('../db');
const { getUserDataById, getUserBookings } = require('../dbQueries');
const { hashPassword, comparePassword } = require('../utils/hash');

router.get('/getAllUserData', async (req, res) => {
  const { id } = req.query

  const query = getUserDataById(id)
  const results = await db.executeQuery(query);

  const bookingsQuery = getUserBookings(id)
  const bookings = await db.executeQuery(bookingsQuery)

  res.status(200).send({ userData: results[0], bookings: bookings })

})

router.put('/updateUserData', async (req, res) => {
  try {
    const { userId, changedFields } = req.body;

    const fields = Object.keys(changedFields);
    const values = Object.values(changedFields);

    if (fields.includes('password')) {
      const passwordIndex = fields.indexOf('password');

      const hashedPassword = await hashPassword(values[passwordIndex]);

      values[passwordIndex] = hashedPassword;
    }

    const query = `UPDATE users SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE user_id = ?`;

    const queryParams = [...values, userId];

    await db.executeQuery(query, queryParams);

    res.status(200).send({ message: 'User data updated successfully' });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send({ message: 'An error occurred while updating user data' });
  }
});

module.exports = router