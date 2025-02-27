const router = require('express').Router()
const db = require('../db');
const { registerUser, getUserData, getUserDataById, getUserBookings, updateUserData} = require('../dbQueries');
const { hashPassword, comparePassword } = require('../utils/hash');

router.post('/login', async(req, res) => {
    const { email, password } = req.body

    const query = getUserData(email)
    const results = await db.executeQuery(query);

    if (results.length === 0) {
      return res.status(400).send({ message: 'User does not exist!' });
    } else {
      const compare = await comparePassword(password, results[0].password)
      if (!compare){
        return res.status(400).send({ message: 'Wrong email or password!' });
      }
      const firstName = results[0].first_name
      const lastName = results[0].last_name
      const id = results[0].id
      return res.status(200).send({success: true, message: 'Login successful!', results: {firstName, lastName, id} })
    }
})

router.post('/register', async(req, res) => {
    const { firstName, lastName, email, mobilePhone, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send({ message: 'Passwords should match!' });
    }

    const hash = await hashPassword(password)

    try {
      const query = registerUser({ firstName, lastName, email, mobilePhone, password: hash });
      const results = await db.executeQuery(query);
      res.status(200).send({success: true, message: 'Registration successful!', results})
      } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

router.get('/getAllUserData', async(req, res) => {
  const {id} = req.query

  const query = getUserDataById(id)
  const results = await db.executeQuery(query);

  const bookingsQuery = getUserBookings(id)
  const bookings = await db.executeQuery(bookingsQuery)

  res.status(200).send({userData: results[0], bookings: bookings})

})

router.put('/updateUserData', async (req, res) => {
  try {
      const { userId, changedFields } = req.body;

      const fields = Object.keys(changedFields);
      const values = Object.values(changedFields);

      const query = `UPDATE users SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE id = ?`;

      const queryParams = [...values, userId];

      await db.executeQuery(query, queryParams);

      res.status(200).send({ message: 'User data updated successfully' });
  } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send({ message: 'An error occurred while updating user data' });
  }
});

module.exports = router