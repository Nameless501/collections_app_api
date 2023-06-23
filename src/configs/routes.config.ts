const routesConfig = {
    root: '/',
    authentication: {
        root: '/authentication',
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
        root: '/collections',
        newItem: '/:collectionId/new',
    },
} as const;

export default routesConfig;
