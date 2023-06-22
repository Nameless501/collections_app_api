import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

import sequelize from '../services/Sequelize.service.js';

export interface IUserModel
    extends Model<
        InferAttributes<IUserModel>,
        InferCreationAttributes<IUserModel>
    > {
    name: string;
    email: string;
    password?: string;
    isAdmin: CreationOptional<boolean>;
    id?: number;
}

const UserModel = sequelize.define<IUserModel>('Users', {
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
