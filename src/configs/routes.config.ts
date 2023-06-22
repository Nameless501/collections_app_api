const routesConfig = {
    root: '/',
    authentication: {
        root: '/authentication',
        signIn: '/sign-in',
        signUp: '/sign-up',
        signOut: '/sign-out',
    },
} as const;

export default routesConfig;
