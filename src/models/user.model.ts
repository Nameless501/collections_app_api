import sequelize from '../configs/db.config.js';

import { IUserModel } from '../types/users.types.js';

import { usersTableConfig } from '../configs/tables.config.js';

const UserModel = sequelize.define<IUserModel>(
    usersTableConfig.name,
    usersTableConfig.attributes,
    usersTableConfig.options
);

export default UserModel;
