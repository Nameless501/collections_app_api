import { DataTypes } from 'sequelize';

import sequelize from '../services/Sequelize.service.js';

import { IItemFieldModel } from '../types/itemFields.type.js';

const ItemFieldModel = sequelize.define<IItemFieldModel>('ItemFields', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    FieldId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Fields',
            key: 'id',
        },
    },
    ItemId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Items',
            key: 'id',
        },
    },
    value: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

ItemFieldModel.sync();

export default ItemFieldModel;
