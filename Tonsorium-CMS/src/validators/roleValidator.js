const {checkSchema} = require('express-validator');

const {role} = require('../models');
const sequelize = require("sequelize");
const {Op} = sequelize;
const { checkMaxLength, required, translateLanguage, genericError} = require("@lib");
let transData;
let pageModule;
let roleValidation = checkSchema({
  'name': {
    custom:{
      options:(value,{req}) => {
        transData = req.session.translationdata;
        pageModule = req.module;
        required("Name", value,transData,pageModule);
        return checkMaxLength("Name", value, 50,transData,pageModule);
      }
    }
  },
  'slug': {
    custom:{
      options: (value, {req}) => {
        required("Slug", value,transData,pageModule);
        let isEdit = req.params && req.params.id ? true : false;
        return new Promise((resolve, reject) => {
          let whereCondition = {
            where: {
              'slug':sequelize.where(sequelize.fn('lower', sequelize.col('slug')), sequelize.fn('lower',value))
            }
          };
          if (isEdit) {
            whereCondition = {
              where: {
                'slug':sequelize.where(sequelize.fn('lower', sequelize.col('slug')), sequelize.fn('lower',value)),
                _id: {
                  [Op.ne]: req.params.id
                }
              }
            };
          }
    
          role.findOne(whereCondition).then(role => {
            if (role === null) {
              resolve(true);
            } else {
              reject(translateLanguage('Role name must be unique', transData, pageModule));
            }
          });            
        });
      }
    }
  },
  'permission': {
    custom:{
      options:(value) => {
        if(value === undefined){
          genericError("Select at least one permission",transData,pageModule);
        }
        return true;
      }
    }

  }
});

module.exports = {roleValidation};