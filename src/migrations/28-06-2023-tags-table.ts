import { Sequelize } from 'sequelize';

import { MigrationParams } from 'umzug';

import type { Migration } from '../types/common.types.js';

import { tagItemAssociation } from '../configs/associations.config.js';

import { tagTableConfig } from '../configs/tables.config.js';

export const up: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await sequelize
        .getQueryInterface()
        .createTable(tagTableConfig.name, tagTableConfig.attributes);
    await sequelize
        .getQueryInterface()
        .addConstraint(tagItemAssociation.name, tagItemAssociation.options);
};

export const down: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await sequelize.getQueryInterface().dropTable(tagTableConfig.name);
};
