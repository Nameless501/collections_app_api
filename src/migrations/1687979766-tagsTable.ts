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
    await handleMigrationsTablesCreate(
        sequelize,
        tagTableConfig,
        itemTagTableConfig
    );
    await handleMigrationsAddConstraints(
        sequelize,
        tagItemAssociation,
        itemTagAssociation
    );
};

export const down: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await handleMigrationsDropTables(
        sequelize,
        tagTableConfig,
        itemTagTableConfig
    );
    await handleMigrationsRemoveConstraints(
        sequelize,
        tagItemAssociation,
        itemTagAssociation
    );
};
