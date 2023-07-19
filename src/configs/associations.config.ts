import { AssociationConfigType } from '../types/common.types.js';

export const userCollectionAssociation: AssociationConfigType = {
    name: 'collections',
    options: {
        fields: ['userId'],
        type: 'foreign key',
        name: 'collection_ref_users',
        references: { table: 'users', field: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
};

export const collectionFieldsAssociation: AssociationConfigType = {
    name: 'fields',
    options: {
        fields: ['collectionId'],
        type: 'foreign key',
        name: 'field_ref_collections',
        references: { table: 'collections', field: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
};

export const fieldsItemAssociation: AssociationConfigType = {
    name: 'fieldValues',
    options: {
        fields: ['fieldId'],
        type: 'foreign key',
        name: 'fieldValue_ref_fields',
        references: { table: 'fields', field: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
};

export const fieldValueAssociation: AssociationConfigType = {
    name: 'fieldValues',
    options: {
        fields: ['itemId'],
        type: 'foreign key',
        name: 'fieldValue_ref_items',
        references: { table: 'items', field: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
};

export const collectionItemAssociation: AssociationConfigType = {
    name: 'items',
    options: {
        fields: ['collectionId'],
        type: 'foreign key',
        name: 'item_ref_collection',
        references: { table: 'collections', field: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
};

export const tagItemAssociation: AssociationConfigType = {
    name: 'itemTags',
    options: {
        fields: ['itemId'],
        type: 'foreign key',
        name: 'item_ref_tag',
        references: { table: 'items', field: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
};

export const itemTagAssociation: AssociationConfigType = {
    name: 'itemTags',
    options: {
        fields: ['tagId'],
        type: 'foreign key',
        name: 'tag_ref_item',
        references: { table: 'tags', field: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
};
