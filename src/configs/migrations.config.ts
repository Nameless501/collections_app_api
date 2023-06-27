import { Umzug, SequelizeStorage } from 'umzug';

import sequelize from '../services/Sequelize.service.js';

import { Sequelize } from 'sequelize';

import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const migrator: Umzug<Sequelize> = new Umzug({
    migrations: {
        glob: __dirname + '../migrations/*.{ts, js}',
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
