export enum CollectionSubjects {
    books = 'books',
    coins = 'coins',
    postcards = 'postcards',
    actionFigures = 'actionFigures',
    vinylRecords = 'vinylRecords',
    sportsJerseys = 'sportsJerseys',
    autographs = 'autographs',
    artPrints = 'artPrints',
    antiqueFurniture = 'antiqueFurniture',
    vintageClothing = 'vintageClothing',
    toys = 'toys',
    musicalInstruments = 'musicalInstruments',
    movieProps = 'movieProps',
    wristwatches = 'wristwatches',
    jewelry = 'jewelry',
    videoGames = 'videoGames',
    comicBooks = 'comicBooks',
    boardGames = 'boardGames',
    figurines = 'figurines',
    posters = 'posters',
    tickets = 'tickets',
    magazines = 'magazines',
    musicalRecords = 'musicalRecords',
    maps = 'maps',
    tradingPins = 'tradingPins',
    artifacts = 'artifacts',
    other = 'other',
}

export enum FieldTypes {
    integer = 'integer',
    string = 'string',
    text = 'text',
    boolean = 'boolean',
}

export enum UsersScopes {
    withoutPassword = 'withoutPassword',
    withCollections = 'withCollections',
}

export enum CollectionScopes {
    withUser = 'withUser',
    withItems = 'withItems',
    withFields = 'withFields',
}

export enum ItemScopes {
    withCollection = 'withCollection',
    withLikes = 'withLikes',
    withTags = 'withTags',
    withComments = 'withComments',
    withFieldValues = 'withFieldValues',
}

export enum FieldValueScopes {
    withField = 'withField',
}

export enum TagsScopes {
    withItemTags = 'withItemTags',
}

export enum CommentScopes {
    withUser = 'withUser',
}

export enum SearchIndexes {
    collections = 'collections',
    items = 'items',
    fieldValues = 'fields',
    tags = 'tags',
    comments = 'comments',
}
