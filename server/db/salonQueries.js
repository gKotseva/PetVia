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

exports.editService = (id, fields, values) => {
    const query = `UPDATE services SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE service_id = ?`;
    const queryParams = [...values, id];

    return { query, queryParams };
}

exports.addSchedule = (id, values, date) => {
    const query = `INSERT INTO salon_schedule (salon_id, work_date, open_time, close_time, break_start, break_end)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    const insertValues = [
        id,
        date,
        values.open_time,
        values.close_time,
        values.break_start || null,
        values.break_end || null
    ];
    return { query, insertValues };
};

exports.getReviews = (id) => {
    const query = `SELECT review_id, rating, comment, r.created_at, first_name, last_name FROM reviews r
                    JOIN users u on r.user_id = u.user_id
                    WHERE salon_id = ${id}; `

    return query;
}

exports.getOpenCloseTime = (id, month) => {
    const paddedMonth = String(month).padStart(2, '0');
    const query = `
    SELECT
    MIN(open_time) AS earliest_open_time,
        MAX(close_time) AS latest_close_time
    FROM
    salon_schedule
    WHERE
    salon_id = ${id}
    AND
            work_date LIKE '%-${paddedMonth}-%'; `;

    return query;
}

exports.getSchedule = (id, month) => {
    let query = `
      SELECT *
      FROM salon_schedule
      WHERE salon_id = ${id}
    `;

    if (month) {
        const paddedMonth = String(month).padStart(2, '0');
        query += ` AND work_date LIKE '%-${paddedMonth}-%'`;
    }

    query += ';';
    return query;
};

exports.editSchedule = (id, date, values) => {
    const query = `
      UPDATE salon_schedule
      SET
        open_time = ?,
        close_time = ?,
        break_start = ?,
        break_end = ?
      WHERE salon_id = ? AND work_date = ?;
    `;

    const params = [
        values.open_time || null,
        values.close_time || null,
        values.break_start || null,
        values.break_end || null,
        id,
        date
    ];

    return { query, params };
};
