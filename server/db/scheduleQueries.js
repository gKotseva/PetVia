const { executeQuery } = require("./db");

exports.getSchedule = async (salonId) => {
    const query = `SELECT * FROM salon_schedule WHERE salon_id = ?`;
    return executeQuery(query, [salonId]);
};

exports.getAppointments = async (salonId) => {
    const query = `
        SELECT a.appointment_id, a.appointment_date, a.start_time, s.duration, 
               s.name as service_name, u.first_name, u.last_name, u.email
        FROM appointments a
        JOIN services s ON s.service_id = a.service_id
        JOIN users u ON u.user_id = a.user_id
        WHERE a.salon_id = ?`;
    return executeQuery(query, [salonId]);
};

exports.checkAppointment = async (date, startTime, salonId) => {
    const query = `
        SELECT * FROM appointments
        WHERE appointment_date = ? AND start_time = ? AND salon_id = ?`;
    return executeQuery(query, [`${date}`, `${startTime}:00`, salonId]);
};

exports.addAppointment = async (userID, salonID, serviceID, date, startTime) => {
    const query = `
        INSERT INTO appointments(user_id, salon_id, service_id, appointment_date, start_time)
        VALUES (?, ?, ?, ?, ?)`;
    return executeQuery(query, [userID, salonID, serviceID, date, startTime]);
};

exports.deleteSchedule = async (date, salonId) => {
    const query = `
        DELETE FROM salon_schedule
        WHERE work_date = ? AND salon_id = ?`;
    return executeQuery(query, [date, salonId]);
};