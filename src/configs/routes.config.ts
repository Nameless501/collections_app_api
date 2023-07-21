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
        userCollections: '/user/:userId',
        collectionData: '/:collectionId',
        updateCollection: '/:collectionId',
        deleteCollection: '/:collectionId',
        allCollections: '/',
        topCollections: '/top',
        newCollectionFields: '/:collectionId/fields',
        updateCollectionFields: '/:collectionId/fields',
    },
    fields: {
        updateField: '/:fieldId',
        deleteField: '/:fieldId',
        collectionFields: '/collection/:collectionId',
    },
    items: {
        newItem: '/collection/:collectionId',
        itemData: '/:itemId',
        updateItem: '/:itemId',
        deleteItem: '/:itemId',
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
        deleteComment: '/:commentId',
    },
} as const;

export default routesConfig;
