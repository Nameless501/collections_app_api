import { DataTypes } from 'sequelize';

import { CollectionSubjects, FieldTypes } from './models.config.js';

import type { TableConfigType } from '../types/common.types.js';

import { IUserModel } from '../types/users.types.js';

import { ICollectionModel } from '../types/collections.type.js';

import { IItemModel } from '../types/items.types.js';

import { IFieldModel } from '../types/fields.type.js';

import { IItemFieldModel } from '../types/itemFields.type.js';

export const usersTableConfig: TableConfigType<IUserModel> = {
    name: 'users',
    attributes: {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
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
    },
};

export const collectionsTableConfig: TableConfigType<ICollectionModel> = {
    name: 'collections',
    attributes: {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subject: {
            type: DataTypes.ENUM(...Object.values(CollectionSubjects)),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
    },
};

export const itemTableConfig: TableConfigType<IItemModel> = {
    name: 'items',
    attributes: {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        collectionId: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        itemFieldId: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
    },
    options: {
        timestamps: true,
        updatedAt: false,
    },
};

export const fieldTableConfig: TableConfigType<IFieldModel> = {
    name: 'fields',
    attributes: {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(...Object.values(FieldTypes)),
            allowNull: false,
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        collectionId: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        itemFieldId: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
    },
};

export const itemsFieldsConfig: TableConfigType<IItemFieldModel> = {
    name: 'itemFields',
    attributes: {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        value: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        fieldId: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        itemId: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
    },
};
