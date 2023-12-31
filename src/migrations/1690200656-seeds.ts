import { Sequelize } from 'sequelize';

import { MigrationParams } from 'umzug';

import { Migration } from '../types/common.types.js';

import searchService from '../services/Search.service.js';

import {
    handleMigrationsDeleteSeeds,
    handleMigrationsInsertSeeds,
} from '../utils/migrations.util.js';

import {
    usersSeedsConfig,
    collectionsSeedsConfig,
    fieldValueSeedsConfig,
    tagsSeedsConfig,
    itemTagsSeedsConfig,
    fieldsSeedsConfig,
    itemsSeedsConfig,
    seedsSearchIndexes,
} from '../configs/seeds.config.js';

export const up: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await handleMigrationsInsertSeeds(
        sequelize,
        usersSeedsConfig,
        collectionsSeedsConfig,
        fieldsSeedsConfig,
        itemsSeedsConfig,
        fieldValueSeedsConfig,
        tagsSeedsConfig,
        itemTagsSeedsConfig
    );
    await searchService.indexSeedsItems(seedsSearchIndexes);
};

export const down: Migration = async ({
    context: sequelize,
}: MigrationParams<Sequelize>): Promise<void> => {
    await handleMigrationsDeleteSeeds(
        sequelize,
        usersSeedsConfig,
        collectionsSeedsConfig,
        fieldValueSeedsConfig,
        tagsSeedsConfig,
        itemTagsSeedsConfig,
        fieldsSeedsConfig,
        itemsSeedsConfig
    );
};
