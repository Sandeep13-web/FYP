const path = require("path");
const fs = require('fs');

class BaseCommand{
    validateNameArgs = (arg, type) => {
      let name, subDir, error = false, hasSubDir = false;
      const nameArg = arg[2];
      if(!error && nameArg === undefined){
        error = true;
        this.invalidArgs(`Please Provide Name Arguement : name=""`);
      }
    
      if(!error && !nameArg.includes('=')){
        error = true;
        this.invalidArgs();
      }
    
      name = nameArg.split("=");
      name = name?.[1];

      hasSubDir = this.checkSubDir(name);
      if(hasSubDir){
        const splittedDir = name.split("/");
        name = splittedDir[splittedDir.length -1];
        subDir = splittedDir.slice(0, -1).join("/");
      }

      if(!error && name == ""){
        error = true;
        this.invalidArgs(`Please provide ${type} name`);
      }

      if(!error && !hasSubDir && this.containsSpecialChars(name)){
        this.invalidArgs(`${type} name must not include special characters.`);
      }

      return {
        name, subDir
      };
    };

    invalidArgs = (msg = "Invalid Arguements") =>{
      throw new Error(`======= ${msg} ========`);
    };
    
    success = (type) => {
      console.log(`======= ${type} File Created Successfully ========`);
    };
    
    failed = (type) => {
      console.log(`======= Failed to create ${type} File ========`);
    };
    
    containsSpecialChars = (str) => {
      // eslint-disable-next-line
      const specialChars = /[`!@#$%^&*()?~\/]/;
      return specialChars.test(str);
    };

    getStubData = (stubDir) => {
      return fs.readFileSync(path.join(__dirname, `../../../core/commands/${stubDir}`), 'utf8');
    }

    getName = (name,type, scafold) => {
      name = name.replace(/^(.)|\s+(.)|\.+(.)/g, c => c.toUpperCase()).replace(/\s+/g, '').replace(".", "");
      if(scafold){
        name = name+type;
      }
      return name;
    }

    checkFileExits = (payload) => {
      if(fs.existsSync(path.join(__dirname, payload.targetDir))){
        throw new Error(this.invalidArgs(`${payload.type} file already exists.`));
      }
    }

    generate = (payload) => {
      return fs.writeFileSync(path.join(__dirname, payload.targetDir), payload.replacedData);
    }

    checkSubDir = (name) => {
      let check = false;
      if(name.includes("/")){
        check = true;
      }
      return check;
    }

    checkSubDirExists = (payload) => {
      if(payload.subDir){
        const curDir = path.join(__dirname, payload.targetDir+'/'+payload.subDir);
        if(!fs.existsSync(curDir)){
          fs.mkdirSync(curDir);
        }
      }
    }

    filePath = (payload) => {
      let filePath = payload.name;
      if(payload.subDir){
        filePath = payload.subDir+'/'+payload.name;
      }
      return filePath;
    }

    setBaseController = (payload) => {
      let base = "@baseController";
      if(payload.filePath.includes('api')){
        base = "@apiBaseController";
      }
      return payload.replacedData.replace(/%baseController%/gi,base);
    }

    setBaseService = (payload) => {
      let base = "@baseService";
      if(payload.filePath.includes('api')){
        base = "@apiBaseService";
      }
      return payload.replacedData.replace(/%baseService%/gi,base);
    }

    checkScafold = (payload) => {
      if(payload.scafold){
        let name;
        if(payload.filePath.includes("/")){
          const splitted = payload.filePath.split("/");
          name = splitted[splitted.length -1];
          payload.filePath = splitted.slice(0, -1).join("/")+'/'+name+payload.type;
        }else{
          payload.filePath = payload.filePath+payload.type;
        }
      }
      return payload.filePath;
    }
}

module.exports = new BaseCommand;