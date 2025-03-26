exports.register = (userData, type) => {
    let query;
  
    if (type === 'customer') {
      const { firstName, lastName, email, mobilePhone, password } = userData;
      query = `INSERT INTO users (first_name, last_name, email, phone_number, password) 
               VALUES ('${firstName}', '${lastName}', '${email}', '${mobilePhone}', '${password}')`;
    } else if (type === 'salon') {
      const { name, address, city, email, password } = userData;
      query = `INSERT INTO salons (email, password) 
               VALUES ('${email}', '${password}')`;
    }
  
    return query;
  }

exports.getUserEmail = (userEmail) => {
    return (
        `select * from users where email = '${userEmail}'`
    )
}

exports.getTeam = (id) => {
    return (
        `select * from team_members where salon_id = '${id}'`
    )
}

exports.getSalonEmail = (salonEmail) => {
    return (
        `select * from salons where email = '${salonEmail}'`
    )
}

exports.getSalonDetails = (id) => {
    return (
        `select * from salons where salon_id = '${id}'`
    )
}

exports.getUserDataById = (id) => {
    return (
        `select * from users where user_id = '${id}'`
    )
}

exports.getUserBookings = (id) => {
    return (
        `select a.appointment_id, a.appointment_date, a.start_time, s.name from appointments a
        join salons s on s.salon_id = a.salon_id
        where a.user_id = ${id}`
    )
}

exports.getAllSalons = () => {
    return (
        `
            SELECT * 
            FROM salons 
            WHERE name IS NOT NULL 
            AND address IS NOT NULL 
            AND city IS NOT NULL 
            AND state IS NOT NULL;
        `
    )
}

exports.getAllCities = (state) => {
    return (
        `select distinct city from salons where state="${state}"`
    )
}

exports.getAllStates = () => {
    return (
        `
            select distinct state from salons
            where state != null;
        `
    )
}

exports.getAllServices = (state, city) => {
    return (
        `select service_name from salon_services
        join salons on salon_services.salon_id = salons.salon_id
        where salons.state = '${state}' and salons.city = '${city}'`
    )
}

exports.getSalonsPerData = (state, city, service) => {
    return (
        `
        SELECT 
        s.salon_id, 
        s.name, 
        s.state,
        s.address,
        s.city,
        s.image, 
        ss.service_name, 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'review_id', sr.review_id,
                'salon_id', sr.salon_id,
                'date', sr.date,
                'review', sr.review,
                'stars', sr.stars,
                'user_id', sr.user_id
            )
        ) AS reviews
        FROM salons s
        JOIN salon_services ss ON ss.salon_id = s.salon_id
        JOIN salon_reviews sr ON ss.salon_id = sr.salon_id
        WHERE s.state = '${state}'
        AND s.city = '${city}'
        AND ss.service_name = '${service}'
        GROUP BY s.salon_id, ss.service_name;
        `
    )
}


// exports.getSalonDetails = (id) => {
//     return (
//         `
//        SELECT 
//     s.salon_id, 
//     s.name, 
//     s.state, 
//     s.city, 
//     s.address, 
//     s.salon_description, 
//     s.image, 

//     (SELECT JSON_ARRAYAGG(
//         JSON_OBJECT(
//             'team_member_id', st.team_id,
//             'first_name', st.first_name,
//             'last_name', st.last_name
//         )
//     )
//     FROM salon_team st
//     WHERE st.salon_id = s.salon_id
//     GROUP BY st.salon_id) AS team,

//     (SELECT JSON_ARRAYAGG(
//         JSON_OBJECT(
//             'review_id', sr.review_id,
//             'date', sr.date,
//             'review', sr.review,
//             'stars', sr.stars,
//             'user', JSON_OBJECT(
//                 'id', u1.id,
//                 'first_name', u1.first_name,
//                 'last_name', u1.last_name,
//                 'email', u1.email
//             )
//         )
//     )
//     FROM salon_reviews sr
//     LEFT JOIN users u1 ON sr.user_id = u1.id
//     WHERE sr.salon_id = s.salon_id
//     GROUP BY sr.salon_id) AS reviews,

//     (SELECT JSON_ARRAYAGG(
//         JSON_OBJECT(
//             'service_id', ss.service_id,
//             'service_name', ss.service_name,
//             'duration', ss.duration,
//             'price', ss.price
//         )
//     )
//     FROM salon_services ss
//     WHERE ss.salon_id = s.salon_id
//     GROUP BY ss.salon_id) AS services,

//     (SELECT JSON_ARRAYAGG(
//         JSON_OBJECT(
//             'schedule_id', ssc.schedule_id,
//             'date', ssc.date,
//             'start_time', ssc.start_time,
//             'end_time', ssc.end_time,
//             'break_time_start', ssc.break_time_start,
//             'break_time_end', ssc.break_time_end
//         )
//     )
//     FROM salon_schedule ssc
//     WHERE ssc.salon_id = s.salon_id
//     GROUP BY ssc.salon_id) AS schedule,

//     (SELECT JSON_ARRAYAGG(
//         JSON_OBJECT(
//             'booking_id', sb.booking_id,
//             'service_id', sb.service_id,
//             'date', sb.date,
//             'start_time', sb.start_time,
//             'end_time', sb.end_time,
//             'user', JSON_OBJECT(
//                 'id', u2.id,
//                 'first_name', u2.first_name,
//                 'last_name', u2.last_name,
//                 'email', u2.email
//             )
//         )
//     )
//     FROM bookings sb
//     LEFT JOIN users u2 ON sb.user_id = u2.id
//     WHERE sb.salon_id = s.salon_id
//     GROUP BY sb.salon_id) AS bookings
//     FROM salons s
//     WHERE s.salon_id = ${id};
//         `
//     )
// }

exports.getSalonBookings = (id) => {
    return `
    select *, DATE_FORMAT(date, '%Y-%m-%d') as date from bookings b
    join salon_services ss on ss.service_id = b.service_id
    join users u on b.user_id = u.id
    where b.salon_id = ${id};
`
}

exports.getSalonSchedule = (id) => {
    return `
        select *, DATE_FORMAT(date, '%Y-%m-%d') as date from salon_schedule
        where salon_id = ${id};
`
}

exports.getSingleServiceInfo = (serviceId, salonId) => {
    return `
        select * from salon_services
        where salon_id = ${salonId} and service_id = ${serviceId};
`
}

exports.insertBooking = (appointmentStartTime, serviceId, userId, salonId, selectedDate) => {
    return `
    INSERT INTO bookings (user_id, salon_id, service_id, date, start_time, end_time)
    SELECT 
        ${userId},
        ${salonId},
        ${serviceId},
        '${selectedDate}',
        '${appointmentStartTime}',
        ADDTIME('${appointmentStartTime}', SEC_TO_TIME(duration * 60))
    FROM salon_services
    WHERE service_id = ${serviceId};
    `
}

exports.insertTeamMember = (id, name, image) => {
    return `
    INSERT INTO team_members (salon_id, name, image)
    VALUES (${id}, '${name}', '${image}')
    `
}

exports.getServices = (id) => {
    return (
        `select * from services
        where salon_id = ${id};`
    )
}

exports.insertService = (values, id) => {
    return `
    INSERT INTO services (salon_id, name, price, duration, description)
    VALUES (${id}, '${values.name}', '${values.price}', '${values.durration}', '${values.description}')
    `
}