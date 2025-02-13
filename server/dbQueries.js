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

exports.getSalonDetails = (id) => {
    return (
        `select 
s.name,
s.state,
s.city,
s.address,
s.salon_description,
si.image,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'firstName', st.first_name,
            'lastName', st.last_name
        )
    ) AS team,
    JSON_ARRAYAGG(
        JSON_OBJECT(
			'id', ss.id,
            'name', ss.service_name
        )
    ) AS services,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'name', sr.name,
            'stars', sr.stars,
            'review', sr.review
        )
    ) AS reviews
    from salons as s
join salon_images si on si.salon_id = s.id
join salon_reviews sr on sr.salon_id = s.id
join salon_services ss on ss.salon_id = s.id
join salon_team st on st.salon_id = s.id
where s.id = ${id}
group by s.name, s.state, s.city, s.address, s.salon_description, si.image;`
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