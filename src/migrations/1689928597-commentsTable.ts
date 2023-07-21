import { Sequelize } from 'sequelize';

import { MigrationParams } from 'umzug';

import { Migration } from '../types/common.types.js';

import {
    handleMigrationsAddConstraints,
    handleMigrationsDropTables,
    handleMigrationsRemoveConstraints,
    handleMigrationsTablesCreate,
} from '../utils/migrations.util.js';

import {
    userCommentsAssociation,
    itemCommentsAssociation,
} from '../configs/associations.config.js';

import { commentTableConfig } from '../configs/tables.config.js';

export const up: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await handleMigrationsTablesCreate(sequelize, commentTableConfig);
    await handleMigrationsAddConstraints(
        sequelize,
        userCommentsAssociation,
        itemCommentsAssociation
    );
};

export const down: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await handleMigrationsDropTables(sequelize, commentTableConfig);
    await handleMigrationsRemoveConstraints(
        sequelize,
        userCommentsAssociation,
        itemCommentsAssociation
    );
};
