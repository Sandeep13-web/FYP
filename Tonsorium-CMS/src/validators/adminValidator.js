const {checkSchema} = require('express-validator');

const {admin} = require('../models');
const {MAINSUPERADMIN} = require("@constant");
const sequelize = require("sequelize");
const {Op} = sequelize;
const {getConfigData} = require("../helpers");
const {checkMaxLength, required, genericError, between, alphaNumeric, onlyNumIncludeDash,  translateLanguage} = require('@lib');
let pageModule;
let transData;

let addAdminValidation = checkSchema({
  'first_name': {
    custom : {
      options: function(value){
        required("First name", value, transData, pageModule);
        checkMaxLength("First Name", value, 50, transData, pageModule);
        return true;
      }
    }
  },
  'last_name': {
    custom : {
      options: function(value){
        required("Last name", value, transData, pageModule);
        checkMaxLength("Last name", value, 50, transData, pageModule);
        return true;
      }
    }
  },

  'image': {
    custom: {
      options: function (value, {req}) {
        return new Promise((resolve, reject) => {
          if (req.files == null) {
            resolve(true);
          } else {
            if(req.files.image.size > 15728640){
              reject(translateLanguage('Image size must not exceed 15 mb.', transData, pageModule));
            }else if (req.files.image.mimetype === "image/jpeg" || req.files.image.mimetype === "image/png" || req.files.image.mimetype === "image/jpg") {
              resolve(true);
            } 
            else {
              reject(translateLanguage('Please upload valid image files', transData, pageModule));
            }
          }
        });
      }
    }
  },
  'username': {
    custom: {
      options: (value, {req}) => {
        required("Username", value, transData, pageModule);

        let isEdit = req.params && req.params.id ? true : false;

        checkMaxLength("Username", value, 30, transData, pageModule);
        return new Promise((resolve, reject) => {
          let whereCondition = {where: {
            'username':sequelize.where(sequelize.fn('lower', sequelize.col('username')), sequelize.fn('lower',value))
          }};
          if (isEdit) {
            whereCondition = {
              where: {
                'username':sequelize.where(sequelize.fn('lower', sequelize.col('username')), sequelize.fn('lower',value)),
                _id: {
                  [Op.ne]: req.params.id
                }
              }
            };
          }
          admin.findOne(whereCondition).then(admin => {
            if (admin === null) {
              resolve(true);
            } else {
              reject(translateLanguage('Username already exists', transData, pageModule));
            }
          });
        });
      }
    }
  },
  'email': {
    isEmail: {
      errorMessage: 'Not a valid email'
    },
    custom: {
      options: (value, {req}) => {
        required("Email", value, transData, pageModule);

        let isEdit = req.params && req.params.id ? true : false;

        checkMaxLength("Email", value, 64, transData, pageModule);
        return new Promise((resolve, reject) => {
          let whereCondition = {where:{
            'email':sequelize.where(sequelize.fn('lower', sequelize.col('email')), sequelize.fn('lower',value))
          }};
          if (isEdit) {
            whereCondition = {
              where: {
                'email':sequelize.where(sequelize.fn('lower', sequelize.col('email')), sequelize.fn('lower',value)),
                _id: {
                  [Op.ne]: req.params.id
                }
              }
            };
          }
          admin.findOne(whereCondition).then(admin => {
            if (admin === null) {
              resolve(true);
            } else {
              reject(translateLanguage('Email already exists', transData, pageModule));
            }
          }).catch(() => {
            resolve(true);
          });
        });
      }
    }
  },
  'password': {
    custom: {
      options: (value, {req}) => {
        if (req.query._method == 'PUT' || req.body.password_method == "is_activation_link") {
          return true;
        }
        required("Password", value, transData, pageModule);
        alphaNumeric("Password", value,transData, pageModule);
        between("Password", value, getConfigData(req,"Minimum Password Length"), 20, transData, pageModule);
        return true;
      }
    }
  },
  'role_id': {
    custom : {
      options: function(value, {req}){
        if(req.params.id !== MAINSUPERADMIN){
          required("Admin role", value, transData, pageModule);
        }
        return true;
      }
    }
  },
  'status': {
    custom : {
      options: function(value){
        required("Status", value, transData, pageModule);
        return true;
      }
    }
  },
  'contact_number': {
    custom:{
      options: (value) => {
        required("Telephone no", value, transData, pageModule);
        between("Telephone no", value, 8, 13,transData, pageModule);
        return true;
      }
    }
  },
  'mobile_num': {
    custom:{
      options: (value) => {
        between("Telephone no", value, 8, 13,transData, pageModule);
        return true;
      }
    }
  },
    
  'fax': {
    custom:{
      options: (value) => {
        onlyNumIncludeDash("Fax", value, transData, pageModule);
        between("Fax", value, 8, 13,transData, pageModule);
        return true;
      }
    }
  },
  'remarks': {
    custom:{
      options: (value) => {
        return checkMaxLength("Remarks", value, 500, transData, pageModule);
      }
    }
  }
});

let changePasswordValidation = checkSchema({
  'password': {
    custom: {
      options: (value, {req}) => {
        required("Password", value, transData, pageModule);
        alphaNumeric("Password", value,transData, pageModule);
        between("Password", value, getConfigData(req,"Minimum Password Length"), 20, transData, pageModule);
        return true;
      }
    }
  },
  'confirm_password': {
    custom: {
      options: (value, {req}) => {
        required("Password", value, transData, pageModule);
        if (value !== req.body.password) {
          genericError('Password do not match', transData, pageModule);
        } 
        return true;
      }
    }
  },
  'show_reset_password':{
    custom: {
      options: (value,{req}) => {
        if (!req.body.password) {
          genericError('Please input the password.', transData, pageModule);
        } 
        return true;
      }
    }
  }
});

let forgotAdminPasswordValidation = checkSchema({
  'email': {
    isEmail: {
      errorMessage: 'Not a valid email'
    },
    custom: {
      options: (value) => {
        required("Email", value, transData, pageModule);
        return true;
      }
    }
  }
});

let resetAdminPasswordValidation = checkSchema({
  'password': {
    custom: {
      options: (value, {req}) => {
        const attrName= "Password";
        required(attrName, value, transData, pageModule);
        alphaNumeric(attrName, value, transData, pageModule);
        between(attrName, value, getConfigData(req,"Minimum Password Length"), 20, transData, pageModule);
        return true;
      }
    }
  },
  'confirm_password': {
    custom: {
      options: (value, {req}) => {
        required("Confirm password", value, transData, pageModule);
        if (value === req.body.password) {
          return true;
        } else {
          genericError('Password do not match', transData, pageModule);
          throw new Error();
        }
      }
    }
  }
});

module.exports = {
  addAdminValidation,
  changePasswordValidation,
  forgotAdminPasswordValidation,
  resetAdminPasswordValidation
};