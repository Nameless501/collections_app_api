import { Sequelize } from 'sequelize';

import { MigrationParams } from 'umzug';

import { Migration } from '../types/common.types.js';

import {
    handleMigrationsDropTables,
    handleMigrationsTablesCreate,
} from '../utils/migrations.util.js';

import {
    usersTableConfig,
    collectionsTableConfig,
    itemTableConfig,
    fieldTableConfig,
} from '../configs/tables.config.js';

export const up: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await handleMigrationsTablesCreate(
        sequelize,
        usersTableConfig,
        collectionsTableConfig,
        itemTableConfig,
        fieldTableConfig
    );
};

export const down: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await handleMigrationsDropTables(
        sequelize,
        usersTableConfig,
        collectionsTableConfig,
        itemTableConfig,
        fieldTableConfig
    );
};
