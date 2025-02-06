const mysql = require('mysql');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'petvia'
});

function executeQuery(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, function(error, results, fields) {
            if (error) {
                console.error('Error executing query: ' + error.message);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    executeQuery: executeQuery
};