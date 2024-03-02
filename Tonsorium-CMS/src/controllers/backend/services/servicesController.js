const Controller = require('@baseController');

class ServicesController extends Controller {
  constructor(opts){
    super(opts);
    this.service = opts.servicesService;
    this.title = 'Services';
    this.view = '../services';
    this.url = '/services';
    this.module = 'services.services.';
  }


  
}

module.exports = ServicesController;
