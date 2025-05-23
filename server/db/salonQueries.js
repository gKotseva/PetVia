const { executeQuery } = require("./db");

exports.getDetails = (id) => {
    const query = `SELECT salon_id, email, phone_number, name, address, city, state, description FROM salons WHERE salon_id = ?`;
    return executeQuery(query, [id]);
};

exports.getTeam = (id) => {
    const query = `SELECT * FROM team_members WHERE salon_id = ?`;
    return executeQuery(query, [id]);
};

exports.editDetails = (id, fields, values) => {
    const query = `UPDATE salons SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE salon_id = ?`;
    const queryParams = [...values, id];
    return executeQuery(query, queryParams);
};

exports.getAppointmentsToday = (id, date) => {
    const query = `
        SELECT a.appointment_id, a.appointment_date, a.start_time, s.name, s.duration, u.first_name, u.last_name, u.email 
        FROM appointments a
        JOIN services s ON a.service_id = s.service_id
        JOIN users u ON a.user_id = u.user_id
        WHERE a.salon_id = ? AND appointment_date = ?;
    `;
    return executeQuery(query, [id, date]);
};

exports.addTeamMember = (id, name, image) => {
    const query = `INSERT INTO team_members(salon_id, name, image) VALUES(?, ?, ?)`;
    return executeQuery(query, [id, name, image || null]);
};

exports.deleteTeamMember = (id) => {
    const query = `DELETE FROM team_members WHERE team_member_id = ?`;
    return executeQuery(query, [id]);
};

exports.getServices = (id) => {
    const query = `SELECT * FROM services WHERE salon_id = ?`;
    return executeQuery(query, [id]);
};

exports.addService = (id, values) => {
    const query = `
        INSERT INTO services (salon_id, name, price, duration, description)
        VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
        id,
        values.name || null,
        values.price || null,
        values.duration || null,
        values.description || null
    ];
    return executeQuery(query, params);
};

exports.deleteService = (id) => {
    const query = `DELETE FROM services WHERE service_id = ?`;
    return executeQuery(query, [id]);
};

exports.editService = (id, fields, values) => {
    const query = `UPDATE services SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE service_id = ?`;
    const queryParams = [...values, id];
    return executeQuery(query, queryParams);
};

exports.addSchedule = (id, values, date) => {
    const query = `
        INSERT INTO salon_schedule (salon_id, work_date, open_time, close_time, break_start, break_end)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const insertValues = [
        id,
        date,
        values.open_time,
        values.close_time,
        values.break_start || null,
        values.break_end || null
    ];
    return executeQuery(query, insertValues);
};

exports.getReviews = (id) => {
    const query = `
        SELECT review_id, rating, comment, r.created_at, first_name, last_name 
        FROM reviews r
        JOIN users u ON r.user_id = u.user_id
        WHERE salon_id = ?;
    `;
    return executeQuery(query, [id]);
};

exports.getOpenCloseTime = (id, month) => {
    const paddedMonth = String(month).padStart(2, '0');
    const query = `
        SELECT MIN(open_time) AS earliest_open_time, MAX(close_time) AS latest_close_time
        FROM salon_schedule
        WHERE salon_id = ? AND work_date LIKE ?;
    `;
    return executeQuery(query, [id, `%-${paddedMonth}-%`]);
};

exports.getSchedule = (id, month) => {
    let query = `SELECT * FROM salon_schedule WHERE salon_id = ?`;
    const values = [id];

    if (month) {
        query += ` AND work_date LIKE ?`;
        const paddedMonth = String(month).padStart(2, '0');
        values.push(`%-${paddedMonth}-%`);
    }

    return executeQuery(query, values);
};

exports.editSchedule = (id, date, values) => {
    const query = `
        INSERT INTO salon_schedule (salon_id, work_date, open_time, close_time, break_start, break_end)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            open_time = VALUES(open_time),
            close_time = VALUES(close_time),
            break_start = VALUES(break_start),
            break_end = VALUES(break_end);
    `;

    const params = [
        id,
        date,
        values.open_time || null,
        values.close_time || null,
        values.break_start || null,
        values.break_end || null
    ];

    return executeQuery(query, params);
};
