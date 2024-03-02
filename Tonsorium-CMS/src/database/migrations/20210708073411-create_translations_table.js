'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('translations',
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
        language: {type: DataTypes.STRING},
        word: {type: DataTypes.STRING},
        translation: {type: DataTypes.STRING},
        page_url: {type: DataTypes.STRING },
        group: {type: DataTypes.ENUM('frontend', 'backend'), defaultValue: 'backend'}
      }
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('translations');
  }
};