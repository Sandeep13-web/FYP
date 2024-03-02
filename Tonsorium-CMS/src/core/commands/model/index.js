const base = require("../base");
const type = "Model";
const targetDir = "../../../models";
const stubDir = "model/model.stub";
const init = arg => {
  try{
    const {name} = base.validateNameArgs(arg, type);
    base.checkFileExits({targetDir: `${targetDir}/${name}.js`, type});    
    const stubData = base.getStubData(stubDir);
    let replacedData = stubData.replace(/%modelName%/gi,name).replace(/%tableName%/gi, name+'s');
    base.generate({targetDir: `${targetDir}/${name}.js`, replacedData});
    return base.success(type);
  }catch(err){
    if(err.message){
      console.log(err.message);
    }
    base.failed(type);
  }
};
init(process.argv);