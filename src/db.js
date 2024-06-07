const oracledb = require('oracledb');

async function getConnection() {
    try {
        return await oracledb.getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECTION_STRING
        });
    } catch (err) {
        console.error('Error getting DB connection:', err);
        throw err;
    }
}

module.exports = {
    getConnection
};