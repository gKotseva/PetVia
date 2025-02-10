const registerUser = (userData) => {
    return (
        `INSERT INTO users(first_name, last_name, email, phone_number, password) 
        VALUES ('${userData.firstName}', '${userData.lastName}', '${userData.email}', '${userData.mobilePhone}', '${userData.password}')`
    )
}

const getUserData = (userEmail) => {
    return (
        `select * from users where email = '${userEmail}';`
    )
}

module.exports = { registerUser, getUserData }

