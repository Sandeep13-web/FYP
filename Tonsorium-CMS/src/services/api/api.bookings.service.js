const BaseService = require('@apiBaseService');
const {bookings} = require('@models');


class ApiBookingsService extends BaseService {
    constructor() {
        super(bookings);
    }
    async saveBooking(data){
        console.log(data);
        return this.model.create(data)
    }
}

module.exports = ApiBookingsService;