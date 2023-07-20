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
    userLikesAssociation,
    itemLikesAssociation
} from '../configs/associations.config.js';

import {
    likesTableConfig
} from '../configs/tables.config.js';

export const up: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await handleMigrationsTablesCreate(
        sequelize,
        likesTableConfig
    );
    await handleMigrationsAddConstraints(
        sequelize,
        userLikesAssociation,
        itemLikesAssociation
    );
};

export const down: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await handleMigrationsDropTables(
        sequelize,
        likesTableConfig
    );
    await handleMigrationsRemoveConstraints(
        sequelize,
        userLikesAssociation,
        itemLikesAssociation
    );
};