import { Sequelize } from 'sequelize';

import { MigrationParams } from 'umzug';

import type { Migration } from '../types/common.types.js';

import {
    itemTagAssociation,
    tagItemAssociation,
} from '../configs/associations.config.js';

import {
    itemTagTableConfig,
    tagTableConfig,
} from '../configs/tables.config.js';

export const up: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await sequelize
        .getQueryInterface()
        .createTable(tagTableConfig.name, tagTableConfig.attributes);
    await sequelize
        .getQueryInterface()
        .createTable(itemTagTableConfig.name, itemTagTableConfig.attributes);
    await sequelize
        .getQueryInterface()
        .addConstraint(tagItemAssociation.name, tagItemAssociation.options);
    await sequelize
        .getQueryInterface()
        .addConstraint(itemTagAssociation.name, itemTagAssociation.options);
};

export const down: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await sequelize.getQueryInterface().dropTable(tagTableConfig.name);
    await sequelize.getQueryInterface().dropTable(itemTagTableConfig.name);
};
