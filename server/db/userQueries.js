exports.getUserData = (id) => {
    const query = `SELECT first_name, last_name, email, phone_number FROM users WHERE user_id = ${id}`
    return query
}

exports.getUserBookings = (id) => {
    const query = `SELECT * FROM appointments WHERE user_id = ${id}`
    return query
}

exports.editUserDetails = (id, fields, values) => {
    const query = `UPDATE users SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE user_id = ?`;
    const queryParams = [...values, id];

    return { query, queryParams };
}

exports.deleteUser = (id) => {
    const query = `DELETE FROM users WHERE user_id=${id}`

    return query;
}