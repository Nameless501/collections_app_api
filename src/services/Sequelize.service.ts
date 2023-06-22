import { Sequelize } from 'sequelize';

import dbConfig from '../configs/db.config.js';

const sequelize: Sequelize = new Sequelize(dbConfig);

sequelize.sync();

export default sequelize;
