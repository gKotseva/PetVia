const registerUser = (userData) => {
    return (
        `INSERT INTO users(first_name, last_name, email, phone_number, password) 
        VALUES ('${userData.firstName}', '${userData.lastName}', '${userData.email}', '${userData.mobilePhone}', '${userData.password}')`
    )
}

module.exports = { registerUser }

