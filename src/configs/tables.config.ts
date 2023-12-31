import { DataTypes } from 'sequelize';

import { CollectionSubjects, FieldTypes } from './enums.config.js';

import type { TableConfigType } from '../types/common.types.js';

import { IUserModel } from '../types/users.types.js';

import { ICollectionModel } from '../types/collections.types.js';

import { IItemModel } from '../types/items.types.js';

import { IFieldModel } from '../types/fields.types.js';

import { IFieldValueModel } from '../types/fieldValues.types.js';

import { IItemTagModel } from '../types/itemTags.types.js';

import { ITagModel } from '../types/tags.types.js';
import { ILikeModel } from '../types/likes.types.js';

export const usersTableConfig: TableConfigType<IUserModel> = {
    name: 'users',
    attributes: {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
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
    options: {
        defaultScope: {
            attributes: {
                exclude: ['password'],
            },
        },
        scopes: {
            withoutPassword: {
                attributes: {
                    exclude: ['password'],
                },
            },
            withCollections: {
                include: ['collections'],
            },
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
            unique: true,
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
    options: {
        scopes: {
            withUser: {
                include: ['user'],
            },
            withItems: {
                include: ['items'],
            },
            withFields: {
                include: ['fields'],
            },
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
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        collectionId: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
    },
    options: {
        timestamps: true,
        updatedAt: false,
        scopes: {
            withCollection: {
                include: ['collection'],
            },
            withLikes: {
                include: ['likes'],
            },
            withTags: {
                include: ['tags'],
            },
            withComments: {
                include: ['comments'],
            },
            withFieldValues: {
                include: ['fieldValues'],
            },
        },
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
            unique: true,
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
    },
};

export const fieldValueTableConfig: TableConfigType<IFieldValueModel> = {
    name: 'fieldValues',
    attributes: {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        fieldId: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        itemId: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
    },
    options: {
        scopes: {
            withField: {
                include: ['field'],
            },
        },
    },
};

export const tagTableConfig: TableConfigType<ITagModel> = {
    name: 'tags',
    attributes: {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    options: {
        defaultScope: {
            attributes: { exclude: ['itemTags'] },
        },
        scopes: {
            withItemTags: {
                include: ['itemTags'],
            },
        },
    },
};

export const itemTagTableConfig: TableConfigType<IItemTagModel> = {
    name: 'itemTags',
    attributes: {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        tagId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        itemId: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
    },
};

export const likesTableConfig: TableConfigType<ILikeModel> = {
    name: 'likes',
    attributes: {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        itemId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
};

export const commentTableConfig: TableConfigType<ILikeModel> = {
    name: 'comments',
    attributes: {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        itemId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
    },
    options: {
        timestamps: true,
        updatedAt: false,
        scopes: {
            withUser: {
                include: ['user'],
            },
        },
    },
};
