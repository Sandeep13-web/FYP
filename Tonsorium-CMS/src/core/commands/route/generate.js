const base = require("../base");
const type = "Route";
const targetDir = "../../../routes";

const init = (arg, scafold = false) => {
  try{
    const {name, subDir} = base.validateNameArgs(arg, type);
    base.checkSubDirExists({targetDir, subDir});
    let filePath = base.filePath({subDir, name});
    filePath = base.checkScafold({filePath, scafold, type});
    base.checkFileExits({targetDir: `${targetDir}/${filePath}.js`, type});    
    let stubData = base.getStubData(getRouteStubDir(scafold));
    let replacedData = stubData.replace(/%controllerName%/gi,name+'Controller');
    base.generate({targetDir: `${targetDir}/${filePath}.js`, replacedData});
    return base.success(type);
  }catch(err){
    if(err.message){
      console.log(err.message);
    }
    base.failed(type);
  }
};

const getRouteStubDir = (scafold) => {
  return {
    true:'route/route-scafold.stub',
    false:'route/route.stub'
  }[scafold];
};

module.exports = {
  init
};