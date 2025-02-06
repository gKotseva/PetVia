const router = require('express').Router()
const db = require('../db');
const { registerUser } = require('../dbQueries');

router.post('/login', async(req, res) => {
    const { email, password } = req.body

})

router.post('/register', async(req, res) => {
    const { firstName, lastName, email, mobilePhone, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send({ success: false, message: 'Passwords should match!' });
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