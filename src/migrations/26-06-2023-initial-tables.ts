import { Sequelize } from 'sequelize';

import { MigrationParams } from 'umzug';

import type { Migration } from '../types/common.types.js';

import {
    usersTableConfig,
    collectionsTableConfig,
    itemTableConfig,
    fieldTableConfig,
} from '../configs/tables.config.js';

export const up: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await sequelize
        .getQueryInterface()
        .createTable(usersTableConfig.name, usersTableConfig.attributes);
    await sequelize
        .getQueryInterface()
        .createTable(
            collectionsTableConfig.name,
            collectionsTableConfig.attributes
        );
    await sequelize
        .getQueryInterface()
        .createTable(itemTableConfig.name, itemTableConfig.attributes);
    await sequelize
        .getQueryInterface()
        .createTable(fieldTableConfig.name, fieldTableConfig.attributes);
};

export const down: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await sequelize.getQueryInterface().dropTable(usersTableConfig.name);
    await sequelize.getQueryInterface().dropTable(collectionsTableConfig.name);
    await sequelize.getQueryInterface().dropTable(itemTableConfig.name);
    await sequelize.getQueryInterface().dropTable(fieldTableConfig.name);
};
