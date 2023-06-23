import { RoutesConfigType } from '../types/common.types.js';

const routesConfig: RoutesConfigType = {
    root: {
        main: '/',
        authentication: '/authentication',
        collections: '/collections',
        items: '/collections',
    },
    authentication: {
        signIn: '/sign-in',
        signUp: '/sign-up',
        signOut: '/sign-out',
    },
    collections: {
        root: '/collections',
        newCollection: '/new',
        userCollections: '/my',
    },
    items: {
        newItem: '/:collectionId/new',
    },
} as const;

export default routesConfig;
