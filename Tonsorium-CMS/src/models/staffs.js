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
    staffName :{type: DataTypes.STRING, required: true},
    staffPosition :{type: DataTypes.STRING, required: true},
    staffDescription :{type: DataTypes.TEXT, required: true},
    availableDays :{type: DataTypes.JSON, required: false},
    image: {type: DataTypes.STRING, required:false},
    created_at: {type: DataTypes.DATE, defaultValue: sequelize.fn('now')},
    updated_at: {type: DataTypes.DATE, defaultValue: sequelize.fn('now')}
  };
  let modelOptions = {
    tableName: 'staffs',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  };
  const staffs = sequelize.define('staffs', modelDefinition, modelOptions);
  sequelizePaginate.paginate(staffs);
  return staffs;
};