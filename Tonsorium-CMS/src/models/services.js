'use strict';
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  let modelDefinition = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    _id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    serviceName :{type: DataTypes.STRING, required: true},
    price :{type: DataTypes.STRING, required: true},
    serviceDescription :{type: DataTypes.TEXT, required: true},
    created_at: {type: DataTypes.DATE, defaultValue: sequelize.fn('now')},
    updated_at: {type: DataTypes.DATE, defaultValue: sequelize.fn('now')}
  };
  let modelOptions = {
    tableName: 'services',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  };
  const services = sequelize.define('services', modelDefinition, modelOptions);
  sequelizePaginate.paginate(services);
  return services;
};