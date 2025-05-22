const router = require('express').Router()

const { hashPassword, comparePassword } = require('../utils/hash');
const { checkEmail, registerSalon, registerUser } = require('../db/authQueries')

router.post('/login', async (req, res) => {
  const { email, password } = req.body.values
  const accountType = req.body.accountType

  try {
    const emailCheck = await checkEmail(email, accountType);

    if (emailCheck.length === 0) {
      throw new Error('User does not exist!')
    } else {
      const compare = await comparePassword(password, emailCheck[0].password)
      if (!compare) {
        throw new Error('Wrong email or password!')
      }
    }

    if (accountType === 'customer') {
      const first_name = emailCheck[0].first_name
      const last_name = emailCheck[0].last_name
      const id = emailCheck[0].user_id

      return res.status(200).send({ message: 'Login successful!', results: { first_name, last_name, id } })
    } else {
      const salon_name = emailCheck[0].name
      const salonId = emailCheck[0].salon_id

      return res.status(200).send({ message: 'Login successful!', results: { salon_name, salonId } })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })

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
    const { name, email, phone_number, state, city, address } = values;
    userData = { name, email, phone_number, state, city, address };
  }

  try {
    const hashedPassword = await hashPassword(password);
    userData.password = hashedPassword;

    const emailCheck = await checkEmail(userData.email, accountType);

    if (emailCheck.length > 0) {
      throw new Error('Email is already in use.');
    }

    if (accountType === 'customer') {
      await registerUser(userData);
    } else {
      await registerSalon(userData);
    }

    res.status(200).send({ message: 'Registration successful!' });

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

});

module.exports = router