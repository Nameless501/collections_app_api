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
    collectionFieldsAssociation,
    fieldsItemAssociation,
    userCollectionAssociation,
    itemFieldAssociation,
    userItemAssociation,
} from '../configs/associations.config.js';

import { itemsFieldsTableConfig } from '../configs/tables.config.js';

export const up: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await handleMigrationsTablesCreate(
        sequelize,
        itemsFieldsTableConfig
    );
    await handleMigrationsAddConstraints(
        sequelize,
        collectionFieldsAssociation,
        itemFieldAssociation,
        userItemAssociation,
        userCollectionAssociation,
        fieldsItemAssociation,
    );
};

export const down: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await handleMigrationsDropTables(
        sequelize,
        itemsFieldsTableConfig
    );
    await handleMigrationsRemoveConstraints(
        sequelize,
        collectionFieldsAssociation,
        fieldsItemAssociation,
        itemFieldAssociation,
        userCollectionAssociation,
        userItemAssociation
    );
};
