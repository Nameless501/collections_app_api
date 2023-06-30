import { Sequelize } from 'sequelize';

import { MigrationParams } from 'umzug';

import { Migration } from '../types/common.types.js';

import {
    handleMigrationsAddConstraints,
    handleMigrationsRemoveConstraints,
} from '../utils/migrations.util.js';

import { collectionItemAssociation } from '../configs/associations.config.js';

export const up: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await handleMigrationsAddConstraints(
        sequelize,
        collectionItemAssociation
    );
};

export const down: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await handleMigrationsRemoveConstraints(
        sequelize,
        collectionItemAssociation
    );
};
