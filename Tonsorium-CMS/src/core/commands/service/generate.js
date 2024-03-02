const base = require("../base");
const type = "Service";
const targetDir = "../../../services";
const stubDir = "service/service.stub";

const init = (arg, scafold = false) => {
  try{
    const {name, subDir} = base.validateNameArgs(arg, type);
    const className = base.getName(name, type, scafold);
    base.checkSubDirExists({targetDir, subDir});
    let filePath = base.filePath({subDir, name});
    filePath = base.checkScafold({filePath, scafold, type:'.service'});
    base.checkFileExits({targetDir: `${targetDir}/${filePath}.js`, type});    
    const stubData = base.getStubData(stubDir);
    let replacedData = stubData.replace(/%serviceName%/gi,className);
    replacedData = base.setBaseService({filePath, replacedData});
    base.generate({targetDir: `${targetDir}/${filePath}.js`, replacedData});
    return base.success(type);
  }catch(err){
    if(err.message){
      console.log(err.message);
    }
    base.failed(type);
  }
};

module.exports = {init};