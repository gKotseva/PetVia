exports.getUserData = (id) => {
    const query = `SELECT first_name, last_name, email, phone_number FROM users WHERE user_id = ${id}`
    return query
}

exports.getUserBookings = (id) => {
    const query = `
    SELECT a.appointment_id, a.appointment_date, a.start_time, s.salon_id, s.name as salon_name, ss.name as service_name FROM appointments a
        JOIN salons s ON a.salon_id = s.salon_id
        JOIN services ss ON a.service_id = ss.service_id
        WHERE a.user_id = ${id};
`
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

exports.deleteAppointment = (id) => {
    const query = `DELETE FROM appointments WHERE appointment_id=${id}`

    return query;
}