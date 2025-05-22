const { executeQuery } = require("./db");

exports.checkEmail = (email, accountType) => {
  const query = accountType === 'customer' 
    ? `SELECT * FROM users WHERE email = ?` 
    : `SELECT * FROM salons WHERE email = ?`;
  
  return executeQuery(query, [email]);
};

exports.registerUser = (userData) => {
  const query = `INSERT INTO users (first_name, last_name, email, phone_number, password) VALUES (?, ?, ?, ?, ?)`;
  const params = [userData.first_name, userData.last_name, userData.email, userData.phone_number, userData.password];
  
  return executeQuery(query, params);
};

exports.registerSalon = (salonData) => {
  const query = `INSERT INTO salons (email, phone_number, password, name, address, city, state) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [salonData.email, salonData.phone_number, salonData.password, salonData.name, salonData.address, salonData.city, salonData.state];
  
  return executeQuery(query, params);
};