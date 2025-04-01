exports.getDetails = (id) => {
    const query = `SELECT * FROM salons WHERE salon_id = ${id}`
    return query
}

exports.getTeam = (id) => {
    const query = `SELECT * FROM team_members WHERE salon_id = ${id}`
    return query
}

exports.editDetails = (id, fields, values) => {
    const query = `UPDATE salons SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE salon_id = ?`;
    const queryParams = [...values, id];

    return { query, queryParams };
}

exports.addTeamMember = (id, values) => {
    const query = `INSERT INTO team_members(salon_id, name, image) VALUES(${id}, '${values.name}', '${values.image}')`;

    return query;
}

exports.deleteTeamMember = (id) => {
    const query = `DELETE FROM team_members WHERE team_member_id = ${id}`;

    return query;
}

exports.getServices = (id) => {
    const query = `SELECT * FROM services WHERE salon_id = ${id}`
    return query
}

exports.addService = (id, values) => {
    const query = `INSERT INTO services(salon_id, name, price, duration, description) VALUES(${id}, '${values.name}', '${values.price}', '${values.duration}', '${values.description}')`
    return query
}

exports.deleteService = (id) => {
    const query = `DELETE FROM services WHERE service_id = ${id}`
    return query
}

exports.editService = (id, fields, values) => {
    const query = `UPDATE services SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE service_id = ?`;
    const queryParams = [...values, id];

    return { query, queryParams };
}