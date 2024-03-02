const { checkSchema } = require('express-validator');
const {emailTemplate} = require('@models');
const { Op } = require("sequelize");
const {checkMaxLength, required, translateLanguage} = require("@lib");

let pageModule;
let transData;

let EmailValidation = checkSchema({
  'title': {
    custom:{
      options: function(value, {req}) {
        transData = req?.session?.translationdata;
        pageModule = req?.module;  
        required("Title", value, transData, pageModule);
        if(typeof(req.body.title) !== "undefined"){
          return checkMaxLength("Title", req.body.title, 50, transData, pageModule);
        }else{
          return true;
        }
      }
    }
  },
  'code': {
    custom : {
      options: function(value, {req}){
        required("Code", value, transData, pageModule);

        if(value){
          checkMaxLength("Code", value, 50, transData, pageModule);
          let isEdit = req.params && req.params.id ? true : false;
          return new Promise((resolve, reject) => {
            let whereCondition = {where: {
              'code': value
            }};
            if (isEdit) {
              whereCondition = {
                where: {
                  'code': value,
                  _id: {
                    [Op.ne]: req.params.id
                  }
                }
              };
            }
            emailTemplate.findOne(whereCondition).then(data => {
              if(data === null){
                resolve(true);
              }else{
                reject(translateLanguage('Code value must be unique!', transData, pageModule));
              }
            });                  
          });
        }else{
          return true;
        }
      }
    }
  },
  'subject': {
    custom : {
      options: function(value){
        required("Subject", value, transData, pageModule);
        return checkMaxLength("Subject", value, 50, transData, pageModule);
      }
    }
  },
    
  'body': {
    custom : {
      options: function(value){
        required("Body", value, transData, pageModule);
        checkMaxLength("Body", value, 2000, transData, pageModule, true);
        return true;
      }
    }
  }
});

module.exports = { EmailValidation };
