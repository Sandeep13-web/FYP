"use strict";
const sequelizePaginate = require('../model/pagination');

module.exports = (sequelize, DataTypes) => {
  let modelDefinition = {
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
      defaultValue: sequelize.fn('now')
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now')
    }
  };
  let modelOptions = {
    tableName: "api_logs",
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  };
  const apiLogs = sequelize.define('apiLogs', modelDefinition, modelOptions);
  sequelizePaginate.paginate(apiLogs);
  return apiLogs;
};