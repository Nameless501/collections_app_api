import { Sequelize } from 'sequelize';

import {
    AssociationConfigType,
    SeedsConfigType,
    TableConfigType,
} from '../types/common.types.js';

export const handleMigrationsTablesCreate = async (
    sequelize: Sequelize,
    ...configs: TableConfigType[]
): Promise<void> => {
    for (const config of configs) {
        await sequelize.getQueryInterface().createTable(config.name, config.attributes);
    }
};

export const handleMigrationsDropTables = async (
    sequelize: Sequelize,
    ...configs: TableConfigType[]
): Promise<void> => {
    for (const config of configs) {
        await sequelize.getQueryInterface().dropTable(config.name);
    }
};

export const handleMigrationsAddConstraints = async (
    sequelize: Sequelize,
    ...configs: AssociationConfigType[]
): Promise<void> => {
    for (const config of configs) {
        await sequelize.getQueryInterface().addConstraint(config.name, config.options);
    }
};

export const handleMigrationsRemoveConstraints = async (
    sequelize: Sequelize,
    ...configs: AssociationConfigType[]
): Promise<void> => {
    for (const config of configs) {
        await sequelize.getQueryInterface().removeConstraint(
            config.name,
            config.options.name as string
        );
    }
};

export const handleMigrationsInsertSeeds = async (
    sequelize: Sequelize,
    ...configs: SeedsConfigType[]
): Promise<void> => {
    for (const config of configs) {
        await sequelize.getQueryInterface().bulkInsert(config.table, config.seeds);
    }
};

export const handleMigrationsDeleteSeeds = async (
    sequelize: Sequelize,
    ...configs: SeedsConfigType[]
): Promise<void> => {
    for (const config of configs) {
        await sequelize.getQueryInterface().bulkDelete(config.table, {});
    }
};
