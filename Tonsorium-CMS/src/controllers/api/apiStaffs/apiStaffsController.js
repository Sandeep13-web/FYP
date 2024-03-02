const Controller = require('@apiBaseController');
class ApiStaffsController extends Controller {
  constructor(opts) {
    super(opts);
    this.service = opts.apiStaffsService;
    this.transformer = opts.staffsTransformer;
  }
  async register(req, res){
    let user = await this.service.register(req.body);
    return this.respondWithItem(res, await this.transformer.transformStaff(user));
  }

  async updateStaffs(req, res){
    let user = await this.service.findAndUpdate(req.params.id, req.body);
    return this.respondWithItem(res, await this.transformer.transformStaff(user));
  }

  async deleteStaffs(req, res){
    await this.service.delete(req.params.id);
    return this.noContent(res);
  }

  async getAll(req, res){
    let users = await this.service.getData(req);
    return this.respondWithPagination(res, await this.transformer.transformMultiple(users.docs), users.pagination);
  }

  async getbyId(req, res) {
    let user = await this.service.findOne({ where: { _id: req.params.id } });
    return this.respondWithItem(res, await this.transformer.transformStaff(user));
  }
}

module.exports = ApiStaffsController;


