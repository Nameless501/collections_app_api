import { RoutesConfigType } from '../types/common.types.js';

const routesConfig: RoutesConfigType = {
    root: {
        main: '/',
        authentication: '/authentication',
        collections: '/collections',
        items: '/items',
        users: '/users',
        tags: '/tags',
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
        newItem: '/new',
    },
    users: {
        allUsers: '/',
        updateUser: '/:id',
        deleteUsers: '/',
        currentUser: '/me',
    },
    tags: {
        allTags: '/',
    },
} as const;

export default routesConfig;
