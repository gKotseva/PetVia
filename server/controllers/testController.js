const db = require('../db/db');
const router = require('express').Router()

router.post('/delete-user', async (req, res) => {
    const { email, accountType } = req.body;
    try {
        const table = accountType === 'customer' ? 'users' : 'salons';
        await db.executeQuery(`DELETE FROM ${table} WHERE email = ?`, [email]);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ error: 'Could not delete test user' });
    }
});

router.post('/delete-service', async (req, res) => {
    const { serviceName } = req.body;
    try {
        await db.executeQuery(`DELETE FROM services WHERE name = ?`, [serviceName]);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ error: 'Could not delete test service' });
    }
});

module.exports = router