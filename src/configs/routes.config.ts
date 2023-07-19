import { RoutesConfigType } from '../types/common.types.js';

const routesConfig: RoutesConfigType = {
    root: {
        main: '/',
        authentication: '/authentication',
        collections: '/collections',
        fields: '/fields',
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
        newCollection: '/new',
        userCollections: '/my',
        collectionData: '/:collectionId',
        updateCollection: '/:collectionId',
        deleteCollection: '/',
        allCollections: '/',
        topCollections: '/top',
        newCollectionFields: '/:collectionId/fields',
        updateCollectionFields: '/:collectionId/fields',
    },
    fields: {
        updateField: '/:fieldId',
        deleteField: '/',
    },
    items: {
        newItem: '/new',
    },
    users: {
        allUsers: '/',
        updateUser: '/:userId',
        updateRole: '/role',
        deleteUsers: '/',
        currentUser: '/me',
        userData: '/:userId',
        userCollections: '/:userId/collections',
    },
    tags: {
        allTags: '/',
    },
} as const;

export default routesConfig;
