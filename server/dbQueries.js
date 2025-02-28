exports.registerUser = (userData) => {
    return (
        `INSERT INTO users(first_name, last_name, email, phone_number, password) 
        VALUES ('${userData.firstName}', '${userData.lastName}', '${userData.email}', '${userData.mobilePhone}', '${userData.password}')`
    )
}

exports.getUserData = (userEmail) => {
    return (
        `select * from users where email = '${userEmail}'`
    )
}

exports.getUserDataById = (id) => {
    return (
        `select * from users where id = '${id}'`
    )
}

exports.getUserBookings = (id) => {
    return (
        `select b.booking_id, b.date, b.start_time, s.name from bookings b
        join salons s on s.salon_id = b.salon_id
        where b.user_id = ${id};`
    )
}

exports.getAllSalons = () => {
    return (
        `select * from salons`
    )
}

exports.getAllCities = (state) => {
    return (
        `select distinct city from salons where state="${state}"`
    )
}

exports.getAllStates = () => {
    return (
        `select distinct state from salons`
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


exports.getSalonDetails = (id) => {
    return (
        `
       SELECT 
    s.salon_id, 
    s.name, 
    s.state, 
    s.city, 
    s.address, 
    s.salon_description, 
    s.image, 

    (SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'team_member_id', st.team_id,
            'first_name', st.first_name,
            'last_name', st.last_name
        )
    )
    FROM salon_team st
    WHERE st.salon_id = s.salon_id
    GROUP BY st.salon_id) AS team,

    (SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'review_id', sr.review_id,
            'date', sr.date,
            'review', sr.review,
            'stars', sr.stars,
            'user', JSON_OBJECT(
                'id', u1.id,
                'first_name', u1.first_name,
                'last_name', u1.last_name,
                'email', u1.email
            )
        )
    )
    FROM salon_reviews sr
    LEFT JOIN users u1 ON sr.user_id = u1.id
    WHERE sr.salon_id = s.salon_id
    GROUP BY sr.salon_id) AS reviews,

    (SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'service_id', ss.service_id,
            'service_name', ss.service_name,
            'duration', ss.duration,
            'price', ss.price
        )
    )
    FROM salon_services ss
    WHERE ss.salon_id = s.salon_id
    GROUP BY ss.salon_id) AS services,

    (SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'schedule_id', ssc.schedule_id,
            'date', ssc.date,
            'start_time', ssc.start_time,
            'end_time', ssc.end_time,
            'break_time_start', ssc.break_time_start,
            'break_time_end', ssc.break_time_end
        )
    )
    FROM salon_schedule ssc
    WHERE ssc.salon_id = s.salon_id
    GROUP BY ssc.salon_id) AS schedule,

    (SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'booking_id', sb.booking_id,
            'service_id', sb.service_id,
            'date', sb.date,
            'start_time', sb.start_time,
            'end_time', sb.end_time,
            'user', JSON_OBJECT(
                'id', u2.id,
                'first_name', u2.first_name,
                'last_name', u2.last_name,
                'email', u2.email
            )
        )
    )
    FROM bookings sb
    LEFT JOIN users u2 ON sb.user_id = u2.id
    WHERE sb.salon_id = s.salon_id
    GROUP BY sb.salon_id) AS bookings
    FROM salons s
    WHERE s.salon_id = ${id};
        `
    )
}

exports.getSalonBookings = (id) => {
    return `
    select * from bookings b
    join salon_services ss on ss.service_id = b.service_id
    where b.salon_id = ${id};
`
}

exports.getSalonSchedule = (id) => {
    return `
    select * from salon_schedule
    where salon_id = ${id};
`
}