const BaseService = require('@baseService');
const { services } = require('@models');


class ServicesService extends BaseService {
  constructor() {
    super(services);
  }
}

module.exports = ServicesService;