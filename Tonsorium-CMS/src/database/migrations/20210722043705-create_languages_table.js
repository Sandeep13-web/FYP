'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('languages',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        _id: {
          allowNull: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
        },
        name: {type: DataTypes.STRING},
        language_code: {type: DataTypes.STRING},
        group: {type: DataTypes.ENUM('frontend', 'backend') },
        created_at: {type: DataTypes.DATE, defaultValue: DataTypes.fn('now')},
        updated_at: {type: DataTypes.DATE, defaultValue: DataTypes.fn('now')}
      }
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('languages');
  }
};
