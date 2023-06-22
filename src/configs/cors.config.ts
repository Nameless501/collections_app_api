type OptionsTypes = {
    origin: string | string[];
    methods: string | string[];
    preflightContinue: boolean;
    optionsSuccessStatus: number;
    allowedHeaders: string[];
    credentials: boolean;
};

const corsConfig: OptionsTypes = {
    origin: 'http://localhost:3001',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
    credentials: true,
};

export default corsConfig;
