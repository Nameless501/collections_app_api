import { Umzug, SequelizeStorage } from 'umzug';

import { fileURLToPath } from 'node:url';

import sequelize from './db.config.js';

import { Sequelize } from 'sequelize';

export const migrator: Umzug<Sequelize> = new Umzug({
    migrations: {
        glob:
            fileURLToPath(new URL('.', import.meta.url)) +
            '../migrations/*.{ts,js}',
        resolve: (params) => {
            return {
                name: params.name,
                path: params.path,
                up: async (upParams) =>
                    import(params.path as string).then((migrations) =>
                        migrations.up(upParams)
                    ),
                down: async (downParams) =>
                    import(params.path as string).then((migrations) =>
                        migrations.down(downParams)
                    ),
            };
        },
    },
    context: sequelize,
    storage: new SequelizeStorage({
        sequelize,
    }),
    logger: console,
});
