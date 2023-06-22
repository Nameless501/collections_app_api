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
} as const;

export default routesConfig;
