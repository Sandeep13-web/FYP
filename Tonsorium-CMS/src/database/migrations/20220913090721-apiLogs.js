'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('api_logs', {
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
      user_agent: {
        type: DataTypes.STRING,
        allowNull: true 
      },
      request_body: {
        type: DataTypes.TEXT('long'),
        allowNull: true 
      },
    
      request_end_point: {
        type: DataTypes.STRING,
        allowNull: true 
      },
      response_code: {
        type: DataTypes.STRING,
        allowNull: true 
      },   
      response_time: {
        type: DataTypes.STRING,
        allowNull: true 
      },
      response_body: {
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
    return queryInterface.dropTable('api_logs');
  }
};
