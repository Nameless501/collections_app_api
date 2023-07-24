import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import { IItemTagModel } from './itemTags.types.js';

import { ScopeType } from './common.types.js';

import { TagsScopes } from '../configs/enums.config.js';

export interface ITagModel
    extends Model<
        InferAttributes<ITagModel>,
        InferCreationAttributes<ITagModel>
    > {
    id: CreationOptional<number>;
    value: string;
    itemTagId: CreationOptional<number>;
    itemTags?: IItemTagModel | IItemTagModel[];
}

export type FindOrCreateTag = (value: string) => Promise<ITagModel>;

export type FindAllTags = (
    scopes?: ScopeType<TagsScopes>
) => Promise<ITagModel[]>;

export type FindTagById = (
    id: number,
    scopes?: ScopeType<TagsScopes>
) => Promise<ITagModel | null>;
