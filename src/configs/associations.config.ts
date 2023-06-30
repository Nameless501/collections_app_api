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
    name: 'fields',
    options: {
        fields: ['itemFieldId'],
        type: 'foreign key',
        name: 'field_ref_itemFields',
        references: { table: 'itemFields', field: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
};

export const itemFieldAssociation: AssociationConfigType = {
    name: 'items',
    options: {
        fields: ['itemFieldId'],
        type: 'foreign key',
        name: 'item_ref_itemFields',
        references: { table: 'itemFields', field: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
};

export const userItemAssociation: AssociationConfigType = {
    name: 'items',
    options: {
        fields: ['userId'],
        type: 'foreign key',
        name: 'item_ref_user',
        references: { table: 'users', field: 'id' },
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
