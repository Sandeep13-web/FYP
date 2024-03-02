const sequelize = require("sequelize");

const BaseService = require('@baseService');
const {translation, language} = require('@models');

class LanguageService extends BaseService {
  constructor() {
    super(translation);
    this.filterFields = [
      'language', 'word', 'translation'
    ];
    this.limit = 20;
  }

  getData(req) {
    const payload = {
      ...this.buildFilterQuery(req),
      order: [['word', 'ASC']],
      page: req.query.page ?? 1
    };
    return this.getPaginatedData(payload);
  }

  //
  async getGroupData(req) {

    let query = this.buildFilterQuery(req);
    if (req.query.group) {
      Object.assign(query.where, {group: req.query.group});
    }
    if (req.query.locale) {
      Object.assign(query.where, {language: req.query.locale});
    }

    let data = await this.model.findAll(
      {
        where : query.where ?? {},
        attributes: ['_id', 'word', 'translation', 'page_url'],
        order: [['page_url', 'ASC']]
      });
    return data;
  }

  async getQueryData(req) {
    let data = await this.model.findAll(
      {
        ...this.buildFilterQuery(req),
        attributes: ['page_url', sequelize.fn('count', sequelize.col('word'))],
        group: ["page_url"],
        order: [['page_url', 'ASC']],
        raw: true
      });
    return data;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findOne(query) {
    return await this.model.findOne(query);
  }

  async findAll(query) {
    let data = await this.model.findAll({
      where: query.where
    });
    return data;
  }

  async getLanguages() {
    let  query = {
      attributes: ['name', 'language_code'],
      group: ['name', 'language_code'],
      order: [['name', 'DESC']]
    };
    let data = await language.findAll(query);
    return data;
  }


  async delete(id) {
    return translation.destroy({where: {_id: id}});
  }

  async deleteWhere(query) {
    return this.model.destroy(query);
  }


  async findAndUpdate(id, data) {
    return await translation.update(data, {where: {_id: id}, individualHooks: true});
  }

  async bulkCreate(array) {
    await this.model.bulkCreate(array,
      {
        updateOnDuplicate: ["word"]
      });
  }

  async truncate() {
    await this.model.truncate();
  }

  async updateWordsData(req, lang = 'ja'){
    let wordData = await translation.findAll({where: {language: lang}, 
      attributes:['word', 'language', 'translation', 'page_url'], raw:true});
    let slug = req.session.languageSlug ? req.session.languageSlug : req.session.user?.selected_language ?? 'ja';  
    if(slug == 'ja'){
      req.session.translationdata = wordData;
    }else{
      req.session.translationdata = null;
    }
           
            
  }
}

module.exports = LanguageService;