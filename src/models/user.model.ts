import { DataTypes } from 'sequelize';

import sequelize from '../services/Sequelize.service.js';

import { IUserModel } from '../types/users.types.js';

const UserModel = sequelize.define<IUserModel>('Users', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

UserModel.sync();

export default UserModel;
