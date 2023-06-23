import { Options } from 'sequelize';

import 'dotenv/config.js';

const { MYSQLHOST, MYSQLUSER, MYSQLDATABASE, MYSQLPASSWORD, MYSQLPORT } =
    process.env;

const dbConfig: Options = {
    dialect: 'mysql',
    username: MYSQLUSER,
    password: MYSQLPASSWORD,
    database: MYSQLDATABASE,
    host: MYSQLHOST,
    port: Number(MYSQLPORT),
    define: {
        timestamps: false,
        freezeTableName: true,
    },
} as const;

export default dbConfig;
