const base = require("../base");
const type = "Controller";
const targetDir = "../../../controllers";
const stubDir = "controller/controller.stub";

const init = (arg, scafold = false) => {
  try{
    const {name, subDir} = base.validateNameArgs(arg, type);
    const className = base.getName(name, type, scafold);
    base.checkSubDirExists({targetDir, subDir});
    let filePath = base.filePath({subDir, name});
    filePath = base.checkScafold({filePath, scafold, type});
    base.checkFileExits({targetDir: `${targetDir}/${filePath}.js`, type});    
    const stubData = base.getStubData(stubDir);
    let replacedData = stubData.replace(/%controllerName%/gi,className);
    replacedData = base.setBaseController({filePath, replacedData});
    base.generate({targetDir: `${targetDir}/${filePath}.js`, replacedData});
    return base.success(type);
  }catch(err){
    if(err.message){
      console.log(err.message);
    }
    base.failed(type);
  }
};
module.exports = {
  init
};