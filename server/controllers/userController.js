const router = require('express').Router()
const db = require('../db');
const { registerUser, getUserData } = require('../dbQueries');

router.post('/login', async(req, res) => {
    const { email, password } = req.body

    const query = getUserData(email)
    const results = await db.executeQuery(query);
    
    if (results.length === 0) {
      return res.status(400).send({ message: 'User does not exist!' });
    } else if (results[0].password !== password) {
      return res.status(400).send({ message: 'Wrong email or password!' });
    }

    return res.status(200).send({success: true, message: 'Login successful!'})

})

router.post('/register', async(req, res) => {
    const { firstName, lastName, email, mobilePhone, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send({ message: 'Passwords should match!' });
    }

    try {
        const query = registerUser({ firstName, lastName, email, mobilePhone, password, confirmPassword })
        const results = await db.executeQuery(query);
        res.json(results);
      } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})


module.exports = router