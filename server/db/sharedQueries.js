exports.getAllSalons = () => {
    const query = `SELECT * FROM salons`
    return query
}

exports.getAllAppointmentsCount = () => {
    const query = `SELECT COUNT(*) as appointments FROM appointments;`
    return query
}

exports.getAllServicesPerDetails = (city, state) => {
    const query = `select s.name from services s
        join salons on s.salon_id = salons.salon_id
        where salons.state = '${state}' and salons.city = '${city}'`
    return query
}

exports.getSalonsPerData = (state, city, service) => {
    return (
        `
        SELECT s.salon_id, s.name, s.address, s.city, s.state FROM salons s
        JOIN services ss on s.salon_id = ss.salon_id
        WHERE state='${state}' AND city='${city}' AND ss.name='${service}';
        `
    )
}

exports.getSalonReviews = (salon_id) => {
    return (
        `
            select r.review_id, r.rating, r.comment, r.created_at, u.first_name, u.last_name from reviews r
            join users u on r.user_id = u.user_id
            where salon_id = ${salon_id};
        `
    )
}

exports.getDetails = (id) => {
    const query = `SELECT email, phone_number, name, address, city, state, description FROM salons WHERE salon_id = ${id}`
    return query
}

exports.getTeam = (id) => {
    const query = `SELECT * FROM team_members WHERE salon_id = ${id}`
    return query
}

exports.getServices = (id) => {
    const query = `SELECT * FROM services WHERE salon_id = ${id}`
    return query
}

exports.getAppointments = (id, date) => {
    const query = `
            SELECT * FROM appointments a
            JOIN services s ON a.service_id = s.service_id
            WHERE a.salon_id = 3 and a.appointment_date = '${date}';
        `
    return query
}

exports.getSchedule = (id, date) => {
    const query = `SELECT * FROM salon_schedule WHERE salon_id = ${id} and work_date = '${date}'`
    return query
}