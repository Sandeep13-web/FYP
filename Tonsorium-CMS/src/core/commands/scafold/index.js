const base = require("../base");
const {SCAFOLD_KEYS, ROUTE, MODEL, 
  CONTROLLER, SERVICE} = require("../constants");

let type = "Scafolds";
const init = arg => {
  try{
    base.validateNameArgs(arg, type);
    const scafoldFlags = process.argv[3];
    if(scafoldFlags === undefined){
      base.invalidArgs("Please provide scafold flag.");
    }
    const scafoldKeys = SCAFOLD_KEYS;

    if(!scafoldKeys.includes(scafoldFlags)){
      base.invalidArgs("Please provide valid scafold flags, in order of rmsc or just single flags.");
    }

    for (let i = 0; i < scafoldFlags.length; i++) {
      if(scafoldFlags.charAt(i) === ROUTE){
        require("../route/generate").init(process.argv, true);
      }
      if(scafoldFlags.charAt(i) === MODEL){
        require("../model");
      }
      if(scafoldFlags.charAt(i) === CONTROLLER){
        require("../controller/generate").init(process.argv, true);
      }
      if(scafoldFlags.charAt(i) === SERVICE){
        require("../service/generate").init(process.argv, true);
      }
     
    }
  }catch(err){
    if(err.message){
      console.log(err.message);
    }
    base.failed(type);
  }
};
init(process.argv);