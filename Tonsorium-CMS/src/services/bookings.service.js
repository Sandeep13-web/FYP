const BaseService = require('@baseService');
const { bookings } = require('@models');


class BookingsService extends BaseService {
  constructor() {
    super(bookings);
  }
  async create(data, sessionUser = null, trx = null) {
    return await this.model.create(data, { transaction: trx });
  }
}

module.exports = BookingsService;