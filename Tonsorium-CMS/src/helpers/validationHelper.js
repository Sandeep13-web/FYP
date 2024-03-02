const moment = require("moment");
const {translateLanguage} = require("../helpers/translationHelper");

function required(attr, value, sessionTrans = null, pageModule = undefined) {
  let error = false;
  if (value == undefined) {
    error = true;
  } else if (typeof value === 'string' && value.trim() === "" ) {
    error = true;
  }else if (typeof value === 'object' && value.length === 0) {
    error = true;
  }
  if (error) {
    const attrName = translateLanguage(attr, sessionTrans, getPageModule(pageModule));
    const message = translateLanguage("is a required field.", sessionTrans, getPageModule(pageModule));
    throw new Error(`${attrName} ` + `${message}`);
  }
}

function checkMaxLength(attr, value, maxLength = 50, sessionTrans = null, pageModule = undefined, removeNewLine) {
  if (value && removeNewLine === true) {
    value = value.replace(/(\r\n|\n|\r)/gm, "");
  }
  if (value && value.trim().length > maxLength) {
    const attrName = translateLanguage(attr, sessionTrans, getPageModule(pageModule));
    const message = translateLanguage("must not exceed {key} characters.", sessionTrans, getPageModule(pageModule), null, [maxLength]);
    throw new Error(`${attrName} ` + `${message}`);
  } else {
    return true;
  }
}

function numeric(attr, value, sessionTrans = null, pageModule = undefined, dynamicValues = []) {
  if (value) {
    if (!new RegExp(/^\d+([.]?\d{0,3})?$/g).test(value) && new RegExp(/\D/g).test(value)) {
      const attrName = translateLanguage(attr, sessionTrans, getPageModule(pageModule));
      let message;
      if (dynamicValues.length > 0) {
        message = translateLanguage("{key}: must be only numeric value.", sessionTrans, getPageModule(pageModule), null, dynamicValues);
      } else {
        message = translateLanguage("must be only numeric value.", sessionTrans, getPageModule(pageModule), null);
      }
      throw new Error(`${attrName}` + `${message}`);
    }
  }
}

function acceptNumeric(attr, value, sessionTrans = null, pageModule = undefined) {
  if (value) {
    if (!new RegExp(/^-?\d+([.]?\d{0,3})?$/g).test(value) && new RegExp(/\D/g).test(value)) {
      const attrName = translateLanguage(attr, sessionTrans, getPageModule(pageModule));
      const message = translateLanguage("must be only numeric value.", sessionTrans, getPageModule(pageModule));
      throw new Error(`${attrName}` + `${message}`);
    }
  }
}

function alphaNumeric(attr, value, sessionTrans = null, pageModule = undefined) {
  if (value && !new RegExp("^[a-zA-Z0-9-#@*&]*$").test(value)) {
    const attrName = translateLanguage(attr, sessionTrans, getPageModule(pageModule));
    const message = translateLanguage("must contain only a-z, A-Z, 0-9, (#@*&).", sessionTrans, getPageModule(pageModule));
    throw new Error(`${attrName}` + `${message}`);
  }
}

function maxLength(attr, value, length = 50, sessionTrans = null, pageModule = undefined, dynamicValues = []) {
  if (value && value.length > length) {
    const attrName = translateLanguage(attr, sessionTrans, getPageModule(pageModule));
    let message;
    if (dynamicValues.length > 0) {
      message = translateLanguage(" {key} : must not exceed {key_1} characters.", sessionTrans, getPageModule(pageModule), null, dynamicValues);
    } else {
      message = translateLanguage("must not exceed {key} characters.", sessionTrans, getPageModule(pageModule), null, [length]);
    }

    throw new Error(`${attrName}` + `${message}`);
  }
}

function between(attr, value, min = 8, max = 12, sessionTrans = null, pageModule = undefined) {
  if (value && value !== "" && value.length < min || value.length > max) {
    const attrName = translateLanguage(attr, sessionTrans, getPageModule(pageModule));
    const message = translateLanguage("length must be between {key} - {key_1}.", sessionTrans, getPageModule(pageModule), null, [min, max]);
    throw new Error(`${attrName}` + `${message}`);
  }
}

function onlyNum(attr, value, sessionTrans = null, pageModule = undefined) {
  if (value && value !== "" && /\D/g.test(value)) {
    const attrName = translateLanguage(attr, sessionTrans, getPageModule(pageModule));
    const message = translateLanguage("must contain only numbers.", sessionTrans, getPageModule(pageModule));
    throw new Error(`${attrName}` + `${message}`);
  }
}

function onlyNumIncludeDash(attr, value, sessionTrans = null, pageModule = undefined){
  if (value && value !== "" && !/^[0-9-]*$/.test(value)) {
    const attrName = translateLanguage(attr, sessionTrans, getPageModule(pageModule));
    const message = translateLanguage("must contain only numbers and dash.", sessionTrans, getPageModule(pageModule));
    throw new Error(`${attrName}` + `${message}`);
  }
}

function validateUuidv4(uuid) {
  let uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return uuidRegex.test(uuid);
}

function validateDateTimeFormat(dateTime, format = ["YYYY/MM/DD HH:mm"], text = '', sessionTrans = null, pageModule = undefined) {
  if (dateTime && dateTime !== "" && !moment(dateTime, format, true).isValid()) {
    const proMsg = translateLanguage(text, sessionTrans, getPageModule(pageModule));
    const message = translateLanguage("Invalid date", sessionTrans, getPageModule(pageModule));
    throw new Error(`${proMsg}` + `${message}`);
  }
}

function validateDate(msg, value, sessionTrans = null, pageModule = undefined, dynamicValues = []) {
  if (value && !moment(value, "YYYY/MM/DD", true).isValid() && !moment(value, "YYYY-MM-DD", true).isValid()) {
    if (dynamicValues.length > 0) {
      msg = translateLanguage(msg, sessionTrans, getPageModule(pageModule), null, dynamicValues);
    } else {
      msg = translateLanguage(msg, sessionTrans, getPageModule(pageModule));
    }
    throw new Error(msg);
  }
  return true;
}

function genericError(msg, sessionTrans = null, pageModule = undefined, dynamicValues = []) {
  if (dynamicValues.length > 0) {
    msg = translateLanguage(msg, sessionTrans, getPageModule(pageModule), null, dynamicValues);
  } else {
    msg = translateLanguage(msg, sessionTrans, getPageModule(pageModule));
  }
  throw new Error(msg);
}

function checkHalfWidthKana(value) {
  let halfWidthKana = [
    "ｶﾞ", "ｷﾞ", "ｸﾞ", "ｹﾞ", "ｺﾞ",
    "ｻﾞ", "ｼﾞ", "ｽﾞ", "ｾﾞ", "ｿﾞ",
    "ﾀﾞ", "ﾁﾞ", "ﾂﾞ", "ﾃﾞ", "ﾄﾞ",
    "ﾊﾞ", "ﾋﾞ", "ﾌﾞ", "ﾍﾞ", "ﾎﾞ",
    "ﾊﾟ", "ﾋﾟ", "ﾌﾟ", "ﾍﾟ", "ﾎﾟ",
    "ｳﾞ", "ﾜﾞ", "ｦﾞ",
    "ｱ", "ｲ", "ｳ", "ｴ", "ｵ",
    "ｶ", "ｷ", "ｸ", "ｹ", "ｺ",
    "ｻ", "ｼ", "ｽ", "ｾ", "ｿ",
    "ﾀ", "ﾁ", "ﾂ", "ﾃ", "ﾄ",
    "ﾅ", "ﾆ", "ﾇ", "ﾈ", "ﾉ",
    "ﾊ", "ﾋ", "ﾌ", "ﾍ", "ﾎ",
    "ﾏ", "ﾐ", "ﾑ", "ﾒ", "ﾓ",
    "ﾔ", "ﾕ", "ﾖ",
    "ﾗ", "ﾘ", "ﾙ", "ﾚ", "ﾛ",
    "ﾜ", "ｦ", "ﾝ",
    "ｧ", "ｨ", "ｩ", "ｪ", "ｫ",
    "ｯ", "ｬ", "ｭ", "ｮ",
    "｡", "､", "ｰ", "｢", "｣", "･", " ", "ﾞ", "ﾟ", "(", ")"
  ];
  let status;
  for (let i = 0; i < value.length; i++) {
    if (halfWidthKana.find(v => (value.charAt(i) === v))) {
      status = true;
    } else {
      status = false;
      return status;
    }
  }

  return status;
}

function getPageModule(pageModule) {
  if (pageModule == undefined || pageModule == "") {
    pageModule = "global";
  }
  return pageModule;
}


module.exports = {
  required,
  checkMaxLength,
  numeric,
  alphaNumeric,
  maxLength,
  validateUuidv4,
  validateDateTimeFormat,
  validateDate,
  acceptNumeric,
  checkHalfWidthKana,
  genericError,
  between,
  onlyNum,
  onlyNumIncludeDash
};