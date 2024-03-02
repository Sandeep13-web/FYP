const BaseService = require('@baseService');
const { staffs } = require('@models');
const { uploadFileToPath, removeFile } = require('@lib');

class StaffsService extends BaseService {
  constructor() {
    super(staffs);
  }
  async create(req) {
    try {
      let newData = {...req.body};
      if (req.files) {
        if(req.files.image){
          newData['image'] = uploadFileToPath({
            file: req.files.image,
            absDir: "/uploads/staffs/",
            rootDir: "public/backend"
          });
        }
      } 
      await this.model.create(newData);  
    } catch (err) {           
      throw new Error(err);
    }
  }

  async findAndUpdate(req) {
    try {
      const userData = await this.findOne({where:{_id:req.params.id}});
      let updateData = {...req.body};
      if (req.files) {
        if(req.files.image){
          updateData['image'] = uploadFileToPath({
            file: req.files.image,
            absDir: "/uploads/staffs/",
            rootDir: "public/backend",
            replacePreviousFile: { fileName: userData.image }
          });
        }
      }
      return this.model.update(updateData, { where: { _id: req.params.id }});
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(id)
 {
    const userData = await this.findOne({where:{_id:id}});
    if(userData.image){
      await removeFile(`public/backend/uploads/staffs/`+userData.image);
    }
    await this.checkExists({ _id: id });
    return this.model.destroy({ where: { _id: id }});
  }
}

module.exports = StaffsService;