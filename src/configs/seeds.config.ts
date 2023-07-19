import { hashPasswordSync } from '../utils/passwordHash.util.js';

import { CollectionSubjects, FieldTypes } from './enums.config.js';

import { SeedsConfigType } from '../types/common.types.js';

export const usersSeedsConfig: SeedsConfigType = {
    table: 'users',
    seeds: [
        {
            id: 1,
            name: 'Paul',
            email: 'admin1@email.com',
            password: hashPasswordSync('password'),
            isAdmin: true,
        },
        {
            id: 2,
            name: 'John',
            email: 'admin2@email.com',
            password: hashPasswordSync('password'),
            isAdmin: true,
        },
        {
            id: 3,
            name: 'George',
            email: 'admin3@email.com',
            password: hashPasswordSync('password'),
            isAdmin: true,
        },
        {
            id: 4,
            name: 'Ringo',
            email: 'admin4@email.com',
            password: hashPasswordSync('password'),
            isAdmin: true,
        },
    ],
};

export const collectionsSeedsConfig: SeedsConfigType = {
    table: 'collections',
    seeds: [
        {
            id: 1,
            title: 'Albums',
            subject: CollectionSubjects.musicalRecords,
            description: 'Paul albums',
            image: null,
            userId: 1,
        },
        {
            id: 2,
            title: 'Albums',
            subject: CollectionSubjects.musicalRecords,
            description: 'John albums',
            image: null,
            userId: 2,
        },
        {
            id: 3,
            title: 'Albums',
            subject: CollectionSubjects.musicalRecords,
            description: 'George albums',
            image: null,
            userId: 3,
        },
        {
            id: 4,
            title: 'Albums',
            subject: CollectionSubjects.musicalRecords,
            description: 'Ringo albums',
            image: null,
            userId: 4,
        },
    ],
};

export const fieldsSeedsConfig: SeedsConfigType = {
    table: 'fields',
    seeds: [
        {
            id: 1,
            type: FieldTypes.integer,
            label: 'Year',
            collectionId: 1,
        },
        {
            id: 2,
            type: FieldTypes.integer,
            label: 'Year',
            collectionId: 2,
        },
        {
            id: 3,
            type: FieldTypes.integer,
            label: 'Year',
            collectionId: 3,
        },
        {
            id: 4,
            type: FieldTypes.integer,
            label: 'Year',
            collectionId: 4,
        },
    ],
};

export const itemsSeedsConfig: SeedsConfigType = {
    table: 'items',
    seeds: [
        {
            id: 1,
            title: 'McCartney',
            collectionId: 1,
            createdAt: new Date(),
        },
        {
            id: 2,
            title: 'Imagine',
            collectionId: 2,
            createdAt: new Date(),
        },
        {
            id: 3,
            title: 'Wonderwall Music',
            collectionId: 3,
            createdAt: new Date(),
        },
        {
            id: 4,
            title: 'Sentimental Journey ',
            collectionId: 4,
            createdAt: new Date(),
        },
    ],
};

export const fieldValueSeedsConfig: SeedsConfigType = {
    table: 'fieldValues',
    seeds: [
        {
            id: 1,
            value: '1970',
            fieldId: 1,
            itemId: 1,
        },
        {
            id: 2,
            value: '1971',
            fieldId: 2,
            itemId: 2,
        },
        {
            id: 3,
            value: '1968',
            fieldId: 3,
            itemId: 3,
        },
        {
            id: 4,
            value: '1970',
            fieldId: 4,
            itemId: 4,
        },
    ],
};

export const tagsSeedsConfig: SeedsConfigType = {
    table: 'tags',
    seeds: [
        {
            id: 1,
            value: 'music',
        },
    ],
};

export const itemTagsSeedsConfig: SeedsConfigType = {
    table: 'itemTags',
    seeds: [
        {
            id: 1,
            tagId: 1,
            itemId: 1,
        },
        {
            id: 2,
            tagId: 1,
            itemId: 2,
        },
        {
            id: 3,
            tagId: 1,
            itemId: 3,
        },
        {
            id: 4,
            tagId: 1,
            itemId: 4,
        },
    ],
};
