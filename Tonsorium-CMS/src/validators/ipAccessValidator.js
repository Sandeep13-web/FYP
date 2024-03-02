const { checkSchema } = require('express-validator');
const _ = require("lodash");
const {genericError, translateLanguage} = require('@lib');
let transData;
let pageModule;

let ipAccessValidator = checkSchema({
  'ip_values.*': {
    custom: {
      options: function (value, {req}) {
        transData = req.session.translationdata;
        pageModule = req.module;
        let message = "Invalid IP address format.";
        message = translateLanguage(message, transData, pageModule);

        if(_.countBy(value)['/'] === undefined || _.countBy(value)['/'] > 1){
          throw new Error(message);
        }
        const splitted = value.split("/");

        if(!(/^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/.test(splitted[0]))){
          throw new Error(message);
        }
        if(isNaN(splitted[1])){
          throw new Error(message);
        }
        if(1 > splitted[1] || splitted[1] > 32){
          genericError(`The IP range must be between 1 to 32.`, transData, pageModule);
        }
        return true;
      }
    }
  }
});
module.exports = { ipAccessValidator };
