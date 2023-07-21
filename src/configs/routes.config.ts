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
        likes: '/likes',
        comments: '/comments',
    },
    authentication: {
        signIn: '/sign-in',
        signUp: '/sign-up',
        signOut: '/sign-out',
    },
    collections: {
        newCollection: '/new/:userId',
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
        collectionFields: '/collection/:collectionId',
    },
    items: {
        newItem: '/collection/:collectionId',
        itemData: '/:itemId',
        updateItem: '/:itemId',
        deleteItems: '/',
        collectionItems: '/collection/:collectionId',
        topNewest: '/top',
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
    likes: {
        setLike: '/item/:itemId',
        deleteLike: '/item/:itemId',
    },
    comments: {
        itemComments: '/item/:itemId',
        leaveComment: '/item/:itemId',
        deleteComment: '/',
    },
} as const;

export default routesConfig;
