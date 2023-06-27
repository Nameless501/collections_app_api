import { Sequelize } from 'sequelize';

import { MigrationParams } from 'umzug';

import type { Migration } from '../types/common.types.js';

import {
    collectionFieldsAssociation,
    fieldsItemAssociation,
    itemFieldAssociation,
    userCollectionAssociation,
    userItemAssociation,
} from '../configs/associations.config.js';

import { itemsFieldsConfig } from '../configs/tables.config.js';

export const up: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await sequelize
        .getQueryInterface()
        .createTable(itemsFieldsConfig.name, itemsFieldsConfig.attributes);
    await sequelize
        .getQueryInterface()
        .addConstraint(
            userCollectionAssociation.name,
            userCollectionAssociation.options
        );
    await sequelize
        .getQueryInterface()
        .addConstraint(
            collectionFieldsAssociation.name,
            collectionFieldsAssociation.options
        );
    await sequelize
        .getQueryInterface()
        .addConstraint(
            fieldsItemAssociation.name,
            fieldsItemAssociation.options
        );
    await sequelize
        .getQueryInterface()
        .addConstraint(itemFieldAssociation.name, itemFieldAssociation.options);
    await sequelize
        .getQueryInterface()
        .addConstraint(userItemAssociation.name, userItemAssociation.options);
};

export const down: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await sequelize.getQueryInterface().dropTable(itemsFieldsConfig.name);
};
