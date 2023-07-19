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
    fieldValueAssociation,
} from '../configs/associations.config.js';

import { fieldValueTableConfig } from '../configs/tables.config.js';

export const up: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await handleMigrationsTablesCreate(sequelize, fieldValueTableConfig);
    await handleMigrationsAddConstraints(
        sequelize,
        collectionFieldsAssociation,
        fieldValueAssociation,
        userCollectionAssociation,
        fieldsItemAssociation
    );
};

export const down: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await handleMigrationsDropTables(sequelize, fieldValueTableConfig);
    await handleMigrationsRemoveConstraints(
        sequelize,
        collectionFieldsAssociation,
        fieldsItemAssociation,
        fieldValueAssociation,
        userCollectionAssociation
    );
};
