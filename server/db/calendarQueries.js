exports.getSchedule = (salonId) => {
    const query = `select * from salon_schedule where salon_id = ${salonId};`
  
    return query;
}

exports.getAppointments = (id) => {
    const query = 
                `SELECT a.appointment_id, a.appointment_date, a.start_time, s.duration, s.name as 'service_name', u.first_name, u.last_name, u.email
                FROM appointments a
                JOIN services s ON s.service_id = a.service_id
                JOIN users u ON u.user_id = a.user_id
                WHERE a.salon_id = ${id};`

    return query;
}

exports.addAppointment = (userID, salonID, serviceID, date, start_time) => {
    const query = `
                INSERT INTO appointments(user_id, salon_id, service_id, appointment_date, start_time)
                VALUES(${userID}, ${salonID}, ${serviceID}, '${date}', '${start_time}');
                `

    return query;
}