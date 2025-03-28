exports.checkEmail = (email, accountType) => {
    let query;

    if (accountType === 'customer') {
      query = `SELECT * FROM users WHERE email = '${email}'`
    } else {
        query = `SELECT * FROM salons WHERE email = '${email}'`
    }
  
    return query;
}

exports.register = (userData, accountType) => {
    let query;

    if (accountType === 'customer') {
      const { first_name, last_name, email, phone_number, password } = userData;
      query = `INSERT INTO users (first_name, last_name, email, phone_number, password) 
               VALUES ('${first_name}', '${last_name}', '${email}', '${phone_number}', '${password}')`;
    } else {
      const { email, password, salon_name, phone_number ,state, city, address} = userData;
      query = `INSERT INTO salons (email, phone_number, password, name, address, city, state) 
               VALUES ('${email}', '${phone_number}', '${password}', '${salon_name}', '${address}', '${city}', '${state}')`;
    }
  
    return query;
}