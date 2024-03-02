'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('staffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      _id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      staffName: {
        type: DataTypes.STRING,
        allowNull: true 
      },
      staffPosition: {
        type: DataTypes.STRING,
        allowNull: true 
      },
      staffDescription: {
        type: DataTypes.TEXT('long'),
        allowNull: true 
      },
      availableDays: {
        type: DataTypes.JSON,
        allowNull: true 
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true 
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE, 
        defaultValue: DataTypes.fn("now")
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn('now')
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('staffs');
  }
};
