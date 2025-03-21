const router = require('express').Router()
const db = require('../db');
const { getUserEmail, getSalonEmail, register } = require('../dbQueries');
const { hashPassword, comparePassword } = require('../utils/hash');

router.post('/login', async(req, res) => {
    const { email, password } = req.body.values
    const type = req.body.type

    if(type === 'customer') {
      const query = getUserEmail(email)
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
        const id = results[0].user_id
        return res.status(200).send({message: 'Login successful!', results: {firstName, lastName, id} })
      }
    } else {
      const query = getSalonEmail(email)
      const results = await db.executeQuery(query);
      if (results.length === 0) {
        return res.status(400).send({ message: 'Salon does not exist!' });
      } else {
        const compare = await comparePassword(password, results[0].password)
        if (!compare){
          return res.status(400).send({ message: 'Wrong email or password!' });
        }
        const salonID = results[0].salon_id
        return res.status(200).send({message: 'Login successful!', results: {salonID} })
      }
    }
})

router.post('/register', async (req, res) => {
  const { type, values } = req.body;

  const { password, confirmPassword } = values;
  if (password !== confirmPassword) {
    return res.status(400).send({ message: 'Passwords should match!' });
  }

  let userData = {};
  if (type === 'customer') {
    const { firstName, lastName, email, mobilePhone } = values;
    userData = { firstName, lastName, email, mobilePhone, password };
  } else {
    const { email } = values;
    userData = { email, password };
  }

  const hashedPassword = await hashPassword(password);
  userData.password = hashedPassword;

  try {
    const query = register(userData, type);
    const results = await db.executeQuery(query);
    res.status(200).send({ success: true, message: 'Registration successful!', results });

  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router