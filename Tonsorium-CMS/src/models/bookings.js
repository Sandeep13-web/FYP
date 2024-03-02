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
        userName: {type:DataTypes.STRING, required:false},
        services: {type:DataTypes.JSON , required:true},
        staffId: {type:DataTypes.STRING, required:true},
        day:{type:DataTypes.STRING, required:true},
        startDate:{type:DataTypes.DATE, required:true},
        endDate:{type:DataTypes.DATE, required:true},
        time:{type:DataTypes.STRING , required:true},


        created_at: {type: DataTypes.DATE, defaultValue: sequelize.fn('now')},
        updated_at: {type: DataTypes.DATE, defaultValue: sequelize.fn('now')}
    };
    let modelOptions = {
        tableName: 'bookings',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };
    const bookings = sequelize.define('bookings', modelDefinition, modelOptions);
    bookings.associate = (models) => {
        bookings.belongsTo(models.staffs, {foreignKey: 'staffId' ,'as': 'staffs'});
    };
    sequelizePaginate.paginate(bookings);
    return bookings;
};