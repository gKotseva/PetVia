const router = require('express').Router()
const { register, checkEmail } = require('../db/authenticationQueries');
const db = require('../db/db');
const { hashPassword, comparePassword } = require('../utils/hash');

router.post('/login', async (req, res) => {
  const { email, password } = req.body.values
  const accountType = req.body.accountType

  const query = checkEmail(email, accountType)
  const checkEmailResult = await db.executeQuery(query);

  if (checkEmailResult.length === 0) {
    return res.status(400).send({ message: 'User does not exist!' });
  } else {
    const compare = await comparePassword(password, checkEmailResult[0].password)
    if (!compare) {
      return res.status(400).send({ message: 'Wrong email or password!' });
    }
  }

  if (accountType === 'customer') {
    const first_name = checkEmailResult[0].first_name
    const last_name = checkEmailResult[0].last_name
    const id = checkEmailResult[0].user_id
    return res.status(200).send({ message: 'Login successful!', results: { first_name, last_name, id } })

  } else {
    const salon_name = checkEmailResult[0].name
    const salonId = checkEmailResult[0].salon_id
    return res.status(200).send({ message: 'Login successful!', results: { salon_name, salonId } })

  }
})

router.post('/register', async (req, res) => {
  const { accountType, values } = req.body;
  const { password, confirm_password } = values;
  let userData = {};

  if (accountType === 'customer') {
    const { first_name, last_name, email, phone_number } = values;
    userData = { first_name, last_name, email, phone_number };
  } else {
    const { salon_name, email, phone_number, state, city, address } = values;
    userData = { salon_name, email, phone_number, state, city, address };
  }

  const hashedPassword = await hashPassword(password);
  userData.password = hashedPassword;

  try {
    const emailCheckQuery = await checkEmail(userData.email, accountType)
    const emailCheck = await db.executeQuery(emailCheckQuery)

    if (emailCheck.length > 0) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    if (password !== confirm_password) {
      const error = new Error('Passwords must match!');
      error.status = 400;
      throw error;
    }

    const query = register(userData, accountType)
    const result = await db.executeQuery(query)

    res.status(200).send({ message: 'Registration successful!', result });
  } catch (error) {
    res.status(error).json({ error })
  }
});

module.exports = router