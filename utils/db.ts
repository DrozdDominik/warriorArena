import * as mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'arena',
    namedPlaceholders: true,
});