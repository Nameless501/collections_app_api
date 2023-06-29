import { Sequelize } from 'sequelize';

import { MigrationParams } from 'umzug';

import type { Migration } from '../types/common.types.js';

import { collectionItemAssociation } from '../configs/associations.config.js';

export const up: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await sequelize
        .getQueryInterface()
        .addConstraint(
            collectionItemAssociation.name,
            collectionItemAssociation.options
        );
};

export const down: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await sequelize
        .getQueryInterface()
        .removeConstraint(
            collectionItemAssociation.name,
            collectionItemAssociation.options.name as string
        );
};
