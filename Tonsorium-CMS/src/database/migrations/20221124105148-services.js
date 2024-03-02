'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('services', {
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
      serviceName: {
        type: DataTypes.STRING,
        allowNull: true 
      },
      price: {
        type: DataTypes.STRING,
        allowNull: true 
      },
    
      serviceDescription: {
        type: DataTypes.TEXT('long'),
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
    return queryInterface.dropTable('services');
  }
};
