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