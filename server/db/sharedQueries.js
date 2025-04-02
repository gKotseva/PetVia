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