import { Options } from 'sequelize';

import 'dotenv/config.js';

import { databaseLogger } from '../utils/logger.util.js';

const { MYSQLHOST, MYSQLUSER, MYSQLDATABASE, MYSQLPASSWORD, MYSQLPORT } =
    process.env;

const dbConfig: Options = {
    dialect: 'mysql',
    username: MYSQLUSER,
    password: MYSQLPASSWORD,
    database: MYSQLDATABASE,
    host: MYSQLHOST,
    port: Number(MYSQLPORT),
    timezone: '+00:00',
    logging: (msg: string) => databaseLogger.info(msg),
    define: {
        timestamps: false,
        freezeTableName: true,
    },
} as const;

export default dbConfig;
