const Boom = require("@hapi/boom");
const BaseService = require('@apiBaseService');
const {staffs} = require('@models');
const sequelize = require('sequelize');
const { Op } = sequelize;
const {bcryptPassword} = require("@lib");
class ApiStaffsService extends BaseService {
  constructor() {
    super(staffs);
    this.filterFields = [
      'serviceName', 'price'
    ];
  }

  getData(req) {
      
    const payload = {
      ...this.buildFilterQuery(req),
      page: req.query.page ?? 1
    };
    return this.getAPIPaginatedData(payload);
  }

  async indexPageData(req) {
    return {
      ...await this.getData(req)
    };
  }

  buildFilterQuery(req) {
    let filter = {};
    let keywordFilter = {};
    const { query } = req;
    if (!query) {
      return filter;
    }
    if (query) {
      if (query.keyword) {
        keywordFilter[Op.or] = this.buildKeywordQuery(query.keyword);
      }
    }
    const finalMappedFilter = {
      ...keywordFilter,
      ...filter
    };
    return { where: finalMappedFilter };
  }

  async register(data) {
    const plainPassword = data['password'];
    data['password'] = bcryptPassword(plainPassword, 10);
    let user = await this.model.create(data);
    return user;
  }

  async findOne(query) {
    let user = await this.model.findOne({
      where: query.where
    });
    if (!user) {
      throw Boom.notFound('Services data not found.');
    }
    return user;
  }
}

module.exports = ApiStaffsService;