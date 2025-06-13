const { executeQuery } = require("./db")

exports.getAllSalons = () => {
    const query = `SELECT salon_id, name, address, city, state, image FROM salons;`
    return executeQuery(query)
}

exports.getAllAppointmentsCount = () => {
    const query = `SELECT COUNT(*) as appointments FROM appointments;`
    return executeQuery(query)
}

exports.getAllCustomersCount = () => {
    const query = `SELECT COUNT(*) as customers FROM users;`
    return executeQuery(query)
}

exports.getAllSalonsCount = () => {
    const query = `SELECT COUNT(*) as salons FROM salons;`
    return executeQuery(query)
}

exports.getAllServicesPerDetails = (city, state) => {
    const query = `select s.name from services s
        join salons on s.salon_id = salons.salon_id
        where salons.state = ? and salons.city = ? `
    return executeQuery(query, [state, city])
}

exports.getSalonsPerData = (state, city, service) => {
    const query = ` SELECT s.salon_id, s.name, s.address, s.city, s.state, s.image FROM salons s
        JOIN services ss on s.salon_id = ss.salon_id
        WHERE state=? AND city=? AND ss.name=?;
        `
    return executeQuery(query, [state, city, service])
}

exports.getSalonReviews = (salon_id) => {
    const query = ` select r.review_id, r.rating, r.comment, r.created_at, u.first_name, u.last_name from reviews r
    join users u on r.user_id = u.user_id
    where salon_id = ?`

    return executeQuery(query, [salon_id])
}

exports.getDetails = (id) => {
    const query = `SELECT email, phone_number, name, address, city, state, description FROM salons WHERE salon_id = ?`
    return executeQuery(query, [id])
}

exports.getTeam = (id) => {
    const query = `SELECT * FROM team_members WHERE salon_id = ?`
    return executeQuery(query, [id])
}

exports.getServices = (id) => {
    const query = `SELECT * FROM services WHERE salon_id = ?`
    return executeQuery(query, [id])
}

exports.getAppointments = (id, date) => {
    const query = `
            SELECT * FROM appointments a
            JOIN services s ON a.service_id = s.service_id
            WHERE a.salon_id = ? and a.appointment_date = ?;
        `
    return executeQuery(query, [id, date])
}

exports.getSchedule = (id, date) => {
    const query = `SELECT * FROM salon_schedule WHERE salon_id = ? and work_date = ?`
    return executeQuery(query, [id, date])
}

exports.addReview = (reviewData) => {
    const {customerId, salonId, rating, text} = reviewData
    const query = `INSERT INTO reviews(user_id, salon_id, rating, comment) VALUES(?, ?, ?, ?)`
    return executeQuery(query, [customerId, salonId, rating, text])
}