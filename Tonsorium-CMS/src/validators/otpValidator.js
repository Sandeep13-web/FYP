const { checkSchema } = require('express-validator');
const {required} = require('@lib');
let transData;
let pageModule;
let otpValidator = checkSchema({
  'otp_code': {
    custom: {
      options: async (value, {req}) => {
        transData = req.session.translationdata;
        pageModule = req.module;
        required('Otp Code ', value, transData, pageModule);
        return true;
      }
    }
  }
});
module.exports = { otpValidator };