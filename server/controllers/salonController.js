const { getDetails, editDetails, getTeam, addTeamMember, deleteTeamMember } = require('../db/salonQueries')
const db = require('../db/db');
const router = require('express').Router()

router.get('/details', async(req, res) => {
    const {id} = req.query
    const query = getDetails(id)
    const result = await db.executeQuery(query)

    res.status(200).json({data: result[0]});
})

router.put('/edit-details', async(req, res) => {
    const {id, changedFields} = req.body

    const fields = Object.keys(changedFields);
    const values = Object.values(changedFields);

    if (fields.includes('password')) {
        const passwordIndex = fields.indexOf('password');
        const hashedPassword = await hashedPassword(values[passwordIndex]);
        values[passwordIndex] = hashedPassword;
      }

      const { query, queryParams } = editDetails(id, fields, values);
        
      await db.executeQuery(query, queryParams);

      res.status(200).send({ message: 'Salon data updated successfully' });
})

router.get('/team', async(req, res) => {
    const {id} = req.query
    const query = getTeam(id)
    const result = await db.executeQuery(query)

    res.status(200).json({data: result});
})

router.post('/add-team-member', async(req, res) => {
    const {id, values} = req.body
    const query = addTeamMember(id, values)
    const result = await db.executeQuery(query)

    res.status(200).json({message: `Successfully added ${values.name}!`, data: result});
})

router.delete('/delete-team-member', async(req, res) => {
    const {id} = req.body
    const query = deleteTeamMember(id)
    const result = await db.executeQuery(query)

    res.status(200).json({message: 'Successfully removed team member!', data: result});
})


module.exports = router