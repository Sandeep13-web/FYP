'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('bookings', {
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
      userName: {type:DataTypes.STRING, allowNull:true},
      services: {type:DataTypes.JSON , allowNull:true},
      staffId: {type:DataTypes.STRING, allowNull:true},
      day:{type:DataTypes.STRING, allowNull:true},
      startDate:{type:DataTypes.DATE, allowNull:true},
      endDate:{type:DataTypes.DATE, allowNull:true},
      time:{type:DataTypes.STRING , allowNull:true},

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
    return queryInterface.dropTable('bookings');
  }
};
