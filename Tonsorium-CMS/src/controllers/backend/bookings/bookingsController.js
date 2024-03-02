const Controller = require('@baseController');

class BookingsController extends Controller {
  constructor(opts){
    super(opts);
    this.service = opts.bookingsService;
    this.title = 'Bookings';
    this.view = '../bookings';
    this.url = '/bookings';
    this.module = 'bookings.bookings.';
  }
}

module.exports = BookingsController;
