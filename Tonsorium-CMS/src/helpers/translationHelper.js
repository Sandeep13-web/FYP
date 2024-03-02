const {translation} = require('@models');
const _ = require("lodash");
const sequelize = require("sequelize");
const memorizablewords = [];
module.exports = {
  translateWord: async function (req, res, next = null) {
    let slug = req.session.languageSlug ? req.session.languageSlug : req.session.user?.selected_language ?? 'ja';
    slug = slug == 'jp' ? 'ja' : slug;
    req.session.selectedLanguage = slug;
    req.session.languageSlug = slug;
    if (slug == 'en') {
      req.session.translationdata = undefined;
      if (next) {
        return next();
      } else {
        return true;
      }
    }

    let wordData = await translation.findAll({where: {language: slug}, 
      attributes:['word', 'language', 'translation', 'page_url'], raw:true});

    req.session.translationdata = wordData;

    if (next) {
      return next();
    } else {
      return true;
    }
  },


  /* eslint-disable no-unused-vars */
  translate(lang, content, data = [], group = "backend") {

    let key = content.toLowerCase().trim();
    return translation.findAll({
      where: {
        language: lang ?? 'ja',
        group: group,
        word: key
      }
    }).then(function (data) {
      if (data.length == 0) {
        let inputData = {};
        inputData.language = lang;
        inputData.word = key;
        inputData.page_url = 'global';
        translation.create(inputData);
        return key;
      } else {
        return data[0].translation ?? key;
      }
    });
  },

  translateLanguage(variable, translationData, translationWord = null, dynamicValues = []) {
    try {
      variable = Array.isArray(variable) ? variable[0] : variable;
      variable = variable ? variable.trim() : variable;
      if (translationData === undefined || translationData === null) {
        translationData = 'en';
      }
      const lang = translationData === 'en' ? 'en' : 'ja';
      if (lang == 'en' || variable === undefined) {
        if (dynamicValues.length > 0) {
          variable = replaceDynamicValues(dynamicValues, variable);
        }
        return variable;
      }
       
      const data = _.find(translationData, item => {
        return item.word.trim().toLowerCase() === variable  || item.word.trim() === variable   ;
      });

            
      if (data === undefined) {
        if(memorizablewords.includes(variable)){
          if (dynamicValues.length > 0) {
            variable = replaceDynamicValues(dynamicValues, variable);
          }
          return variable;
        }else{
          memorizablewords.push(variable);
        }

        translation.findOne({
          where:{
            'word':sequelize.where(sequelize.fn('lower', sequelize.col('word')), sequelize.fn('lower',variable))
          }
        }).then(trans => {
          if (trans == null) {
            let inputData = {};
            inputData.word = variable;
            inputData.language = 'ja';
            inputData.translation = translationWord;
            translation.create(inputData);
          }
        });
      }
      if (dynamicValues.length > 0) {
        let dynamicTrans = data && data.translation ? data.translation : variable;
        dynamicTrans = replaceDynamicValues(dynamicValues, dynamicTrans);
        if (dynamicTrans) {
          return dynamicTrans;
        }
      }
      return data && data.translation ? data.translation : variable;
    } catch (err) {
      return variable;
    }
  }
};

function replaceDynamicValues(dynamicValues, variable) {
  let i = 0;
  dynamicValues.forEach(value => {
    let key = i == 0 ? '{key}' : '{key_' + i + '}';
    variable = variable.replace(key, value);
    i++;
  });
  return variable;
}
