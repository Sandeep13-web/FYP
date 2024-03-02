const base = require("../base");
const type = "Validator";
const targetDir = "../../../validators";
const stubDir = "validator/validator.stub";

const init = (arg, scafold = false) => {
  try{
    const {name, subDir} = base.validateNameArgs(arg, type);
    base.checkSubDirExists({targetDir, subDir});
    let filePath = base.filePath({subDir, name});
    filePath = base.checkScafold({filePath, scafold, type});
    base.checkFileExits({targetDir: `${targetDir}/${filePath}.js`, type});    
    const stubData = base.getStubData(stubDir);
    let replacedData = stubData.replace(/%validator%/gi,name);
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