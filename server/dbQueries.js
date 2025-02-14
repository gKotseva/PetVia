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
        join salons on salon_services.salon_id = salons.id
        where salons.state = '${state}' and salons.city = '${city}'`
    )
}

exports.getSalonsPerData = (state, city, service) => {
    return (
        `SELECT 
    s.id AS salon_id,
    s.name AS salon_name,
    s.state,
    s.city,
    s.address,
    ss.id AS service_id,
    ss.service_name,
    si.image,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'name', r.name,
            'stars', r.stars,
            'review', r.review
        )
    ) AS reviews
FROM salons s
JOIN salon_services ss ON ss.salon_id = s.id
JOIN salon_images si ON si.salon_id = s.id
LEFT JOIN salon_reviews r ON r.salon_id = s.id
WHERE s.state = '${state}'
  AND s.city = '${city}'
  AND ss.service_name = '${service}'
GROUP BY s.id, s.name, s.state, s.city, ss.id, ss.service_name, si.image;`
    )
}


exports.getSalonDetails = (id) => {
    return (
       `SELECT 
    s.name,
    s.state,
    s.city,
    s.address,
    s.salon_description,
    si.image,
    (SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'firstName', t.firstName,
            'lastName', t.lastName
        )
    ) 
    FROM (
        SELECT DISTINCT st.first_name AS firstName, st.last_name AS lastName
        FROM salon_team st 
        WHERE st.salon_id = s.id
    ) t) AS team,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', ss.id,
            'name', ss.service_name,
            'price', ss.price,  -- Added price
            'duration', ss.duration  -- Added duration
        )
    ) AS services,
    (SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'name', sr.name,
            'stars', sr.stars,
            'review', sr.review,
            'review_date', sr.review_date
        )
    ) 
    FROM salon_reviews sr
    WHERE sr.salon_id = s.id
    GROUP BY sr.salon_id) AS reviews
FROM salons s
LEFT JOIN salon_images si ON si.salon_id = s.id
LEFT JOIN salon_services ss ON ss.salon_id = s.id
WHERE s.id = ${id}
GROUP BY s.name, s.state, s.city, s.address, s.salon_description, si.image;
`
    )
}