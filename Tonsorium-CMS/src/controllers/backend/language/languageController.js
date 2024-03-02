const {ValidationError} = require("sequelize");
const Controller = require('@baseController');
const {translation} = require('@models');
const excel = require('exceljs');
const {logCrmEvents, translate, translateLanguage} = require("@lib");
const _ = require("lodash");
// const config = require('@config/cmsConfig');
class LanguageController extends Controller {
  constructor(opts) {
    super(opts);
    this.service = opts.languageService;
    this.title = 'Language Management';
    this.view = '../language';
    this.url = '/languages';
    this.module = 'languages.languages.';
  }

  async index(req, res, fn) {
    try {
      this.innerPage = this.view + '/' + 'index';
      let data = await this.service.getData(req);
      let languages = await this.service.getLanguages();
      data.breadcrumbs = this.indexBreadCrumb();
      logCrmEvents(req, "Page Visit", "success", {message: this.title});
      return res.render('layout/base-inner', this.viewData({
        ...data,
        languages: languages
      }, 'view'));
    } catch (error) {
      fn(error);
    }
  }

  async defaultLanguageGroups(req) {
    let data = {};
    data['backend'] = await translate(req.session.selectedLanguage, 'Backend');
    data['frontend'] = await translate(req.session.selectedLanguage, 'Frontend');
    return data;

  }

  async downloadSample(req, res, fn) {
    try {
      let translationData = await this.service.findAll({
        order: [['page_url', "ASC"]]
      });
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet('word-translation');
      worksheet.columns = [
        {header: 'English Word Reference', key: 'word'},
        {header: 'Japanese Translation', key: 'translation'},
        {header: 'Page', key: 'page_url'}
      ];
      worksheet.addRows(translationData);

      res.attachment("language-translation.xlsx");
      return workbook.xlsx.write(res).then(function () {
        res.end();
      });
    } catch (e) {
      fn(e);
    }
  }

  async upload(req, res) {
    try {
      if(!req.files){
        req.flash('error_msg', 'Please upload a file');
        return res.redirect('back');
      }

      if(req.session.languageSlug.trim() !='ja'){
        throw new Error('Please set japanese language to uplaod translation excel file');
      }

      let workbook = new excel.Workbook();
      let translationData = {};
      await workbook.xlsx.load(req.files.file.data);
      let translationDataArray = [];
      let error;
      let worksheet = workbook.getWorksheet(1);
      worksheet.eachRow(async function (row, rowNumber) {
        translationData = {
          language: req.session.languageSlug.trim(),
          word: row.values[1] ? row.values[1].toString().trim() : null,
          translation: row.values[2] ? row.values[2].toString().trim() : null
        };
        if (rowNumber === 1 && translationData.word !== 'English Word Reference') {
          error = 'Excel header Mismatch';
        }
        if (rowNumber > 1 && translationData.word != null) {
          translationDataArray.push(translationData);
        }

      });

      if (error) {
        throw new Error(error);
      }

      for (const translationDataElement of translationDataArray) {
        let query = {
          language: translationDataElement.language.toString().trim(),
          word: translationDataElement.word.toString().trim() ?? null
        };
        let checkExists = await translation.count({
          where: query
        });
        if (checkExists > 0) {
          await translation.update(translationDataElement, {where: query});
        } else {
          await translation.create(translationDataElement);
        }

      }

      await this.service.updateWordsData(req);
      req.flash('success_msg', 'Upload successfully.');
      return res.redirect('back');
    } catch (e) {
      if (e instanceof ValidationError) {
        e.message = e.errors[0].message;
        console.error('Captured Sequlize validation error: ', e.errors[0].message);
      }
      req.flash('error_msg', e.message);
      return res.redirect('back');

    }

  }

  async changeLanguage(req, res) {
    req.session.languageSlug = req.query.lang;
    req.session.selectedLanguage = req.query.lang;
    await this.service.updateWordsData(req, req.query.lang);
    return res.redirect('back');
  }

  async updateLanguage(req, res) {
    try {
      let query = {};
      if (req.body._id) {
        query = {
          _id: req.body._id
        };
      } else {
        query = {
          word: req.body.word
        };
      }
      let translationCheck = await translation.findOne({where: query});

      if (!req.body.translation.trim().length) {
        res.status(404);
        return res.json({error: 'Translation must not be empty', status: 404});
      }

      if (!_.isEmpty(translationCheck)) {
        translationCheck.translation = req.body.translation;
        translationCheck.page_url = req.body.page_url;
        await translationCheck.save();
      } else {
        let data = {
          word: req.body.word,
          translation: req.body.translation,
          group: 'backend',
          language: 'ja'
        };
        await translation.create(data);
      }

      await this.service.updateWordsData(req);
      return res.json({success: "Updated Successfully", status: 200});
    } catch (e) {
      return res.json({error: e.message, status: 404});
    }

  }

  ajaxTrans(req, res){
    try {
      const translated = translateLanguage(req.query.word, req.session.translationdata, req?.module || 'global', req.query.defaultTrans, req.query.dynamicValues);
      return res.status(200).json({translated}); 
    } catch (err) {
      return res.status(200).json({translated:req.query.word}); 
    }
  }

}


module.exports = LanguageController;