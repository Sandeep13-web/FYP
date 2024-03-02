const Controller = require('@apiBaseController');

class ApiBookingsController extends Controller {
    constructor(opts){
        super(opts);
        this.service = opts.apiBookingsService;
        this.transformer = opts.bookingsTransformer;
    }
    async save(req, res){
        let bookingData = await this.service.saveBooking(req.body);
        return this.respondWithItem(res, await this.transformer.transformBooking(bookingData));
    }
}

module.exports = ApiBookingsController;
