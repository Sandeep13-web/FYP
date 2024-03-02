const Controller = require('@baseController');

class StaffsController extends Controller {
  constructor(opts){
    super(opts);
    this.service = opts.staffsService;
    this.title = 'Staffs';
    this.view = '../staffs';
    this.url = '/staffs';
    this.module = 'staffs.staffs.';
  }

  async add(req, res) {
    try {
      await this.service.create(req);
      req.flash('success_msg', this.title + ' added successfully.');
      return res.redirect(this.url);
    } catch (error) {
      req.flash('inputData', req.body);
      req.flash('error_msg', error.message);
      return res.redirect('back');
    }
  }

  async edit(req, res) {
    try {
      const updatedData = await this.service.findAndUpdate(req);
      const _id = updatedData?.[1]?.[0]._id;
      req.flash('success_msg', this.title + ' updated successfully');
      return res.redirect(_id ? this.url:this.url);
    } catch (error) {
      req.flash('inputData', req.body);
      req.flash('error_msg', error.message);
      return res.redirect(this.url);
    }
  }
}

module.exports = StaffsController;
