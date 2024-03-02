const base = require("../base");
const type = "Middleware";
const targetDir = "../../../middlewares";
const stubDir = "middleware/middleware.stub";

const init = (arg) => {
  try{
    const {name, subDir} = base.validateNameArgs(arg, type);
    base.checkSubDirExists({targetDir, subDir});
    let filePath = base.filePath({subDir, name});
    base.checkFileExits({targetDir: `${targetDir}/${filePath}.js`, type});    
    const stubData = base.getStubData(stubDir);
    let replacedData = stubData.replace(/%middleware%/gi,name);
    base.generate({targetDir: `${targetDir}/${filePath}.js`, replacedData});
    return base.success(type);
  }catch(err){
    if(err.message){
      console.log(err.message);
    }
    base.failed(type);
  }
};

init(process.argv);