const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

const mysql = require('mysql2');
const pool = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


module.exports = pool.promise();