const _ = require('lodash');
const moment = require('moment');
const cmsTitle = require('../config').cmsTitle;
const {
  formatDate,
  translateLanguage, 
  hasSuperAdminRole
} = require("@lib");

let localFunctionLoader = {};

localFunctionLoader.init =  (app) => {

  app.locals._ = _;
  app.locals.cmsTitle = cmsTitle;
  app.locals.translateLanguage = (variable, translationData, translationWord = null, dynamicValues = []) => {
    return translateLanguage(variable, translationData, translationWord, dynamicValues);
  };


  app.locals.getDuration = (date) => {
    let newDate = date.split('/');
    let m1 = moment().format('YYYY-MM');
    let m2 = moment(newDate[1] + '-' + newDate[0]).format('YYYY-MM');
    let diff = moment.preciseDiff(m1, m2);
    return diff;
  };

  app.locals.formatDate = (date, format) => {
    try{
      return formatDate(date, format);
    }catch(error){
      console.log(error);
    }
  };

  app.locals.getCmsConfig = (configData, configName) =>{
    let obj = configData.find(o => o.name === configName);
    return obj.value;
  };

  app.locals.getRemainingAttempts = (configData,configName,count) =>{
    let obj = configData.find(o => o.name === configName);
    return (obj.value - count);
  };
    
  app.locals.checkPermissions = (user, permission) => {
    if (user !== null) {
      if(hasSuperAdminRole(user)){ 
        return true;
      } else {
        if (user !== null && user.role && _.includes(user.role.permission, permission)) {
          return true;
        } 
        else if(user !== null && user.userPermissions && _.includes(user.userPermissions, permission)){
          return true;
        }
        else {
          return false;
        }
      }
    }
    return false;
  };


  app.locals.currentDate = () =>{
    try{
      return formatDate(new Date(), 'YYYY-MM-DD');
    }catch(error){
      console.log(error);
    }
  };

  app.locals.convertToJapanTimeZone = (date, format) => {
    try{
      return formatDate(date, format);
    }catch(error){
      console.log(error);
    }
  };



  app.locals.getSn = (perPage, currentPage, key) => {
    return (perPage * (currentPage-1))+(key+1);
  };

  app.locals.getUserIds = (data) => {
    let userIds = [];
    data.map(user => {
      userIds.push(user.user_id);
    });
    return userIds; 
  };
    
  app.locals.getConfiguration =(configData,configName,deflt=null)=>{
    let obj = configData.find(o => o.name === configName);
    if(obj){
      return obj.value;
    }
    return deflt;
  };

  app.locals.pad =  (num, places=8) =>{return String(num).padStart(places, '0');};

  app.locals.pageAndPerPage = (query) => {
    let page = 1;
    let perPage = 10;
    if(query.page !== undefined){page = query.page;}
    if(query.perPage !== undefined){perPage = query.perPage;}
    return `page=${page}&perPage=${perPage}`;
  };

  app.locals.defaultOrderAndSort = (query, orderBy = undefined, sort='DESC', perPage = 10) => {
    if(typeof query.order === 'undefined' && orderBy){
      query.order = orderBy;
      query.sort =  sort;
    }
    if(typeof query.perPage === 'undefined'){
      query.perPage =  perPage;
    }
    return query;
  };
    
  app.locals.orderAndSort = (url, orderBy, query) => {
    let queryString = `${url}?order=${orderBy}`;
    const queryKeys = Object.keys(query);
    let arrayQueryString = "";

    const salesStatus = query.salesStatus;
    const accountingStatus = query.accountingStatus;

    const propertyDateFilter = query.dateFilter;

    if(queryKeys.length > 0){
      queryKeys.forEach((x) => {
        if(['page', 'perPage', 'order', 'sort'].includes(x)){
          return false;
        }
        if(typeof(query[x]) === 'object'){
          //only for property filter
          const propertyFilter = ['dateFilter', 'accountingStatus', 'salesStatus'];
          if(propertyDateFilter && x === 'dateFilter'){
            arrayQueryString += buildPropertyDateFilter(propertyDateFilter);
          }
          if(salesStatus && (x === 'salesStatus')){
            salesStatus.forEach((item) => {
              arrayQueryString += `&${x}[]=${item}`;
            });
          }
          if(accountingStatus && (x === 'accountingStatus')){
            accountingStatus.forEach((item) => {
              arrayQueryString += `&${x}[]=${encodeURIComponent(item)}`;
            });
          }
          if(!propertyFilter.includes(x)){
            query[x].forEach((item) => {
              arrayQueryString += `&${x}[]=${encodeURIComponent(item)}`;
            });
          }
        }else{
          queryString += `&${x}=${encodeURIComponent(query[x])}`;
        }
      });
    }
    let page = 1;
    let perPage = 10;
    if(query.page !== undefined){page = query.page;}
    if(query.perPage !== undefined){perPage = query.perPage;}

    if(arrayQueryString !== ""){
      queryString += arrayQueryString;
    }
    queryString += `&page=${page}&perPage=${perPage}`;

    let buildedAnchor = `<a href="${queryString+"&sort=ASC"}" class="sort__up"><i class="fas fa-sort-up"></i></a>
                             <a href="${queryString+"&sort=DESC"}" class="sort__down"><i class="fas fa-sort-down"></i></a>`;
        
    if(queryKeys.length > 0 && query.order === orderBy){
      if(queryKeys.includes('sort') && query.sort == "ASC"){
        buildedAnchor = `<a href="${queryString+"&sort=DESC"}" class="sort__up"><i class="fas fa-sort-up"></i></a>`;
      }
      if(queryKeys.includes('sort') && query.sort == "DESC"){
        buildedAnchor =  `<a href="${queryString+"&sort=ASC"}" class="sort__down" style="margin-left:0px"><i class="fas fa-sort-down"></i></a>`;
      }
    }  
    return buildedAnchor;
  };

  app.locals.buildDivisionMasterOptions = (optionsData, selectedId) => {
    let options = `<option value="">選択する</option>`;
    optionsData.forEach((value) => {
      let displayNone = "";
      let selected = "";

      if(!value.status){
        displayNone = `style="display:none"`;
      }
      if (selectedId && (parseInt(selectedId) == parseInt(value.code))) {
        selected = "selected";
      }
      options += `<option value="${value.code}" ${selected} ${displayNone}>${value.text}</option>`;
    });
    return options;
  };

  app.locals.buildOptions = (payload) => {
    let options = `<option value="">${payload?.defaultText ? payload.defaultText : '選択する'}</option>`;
    payload.optionsData.forEach((item) => {
      let hidden = "";
      let selected = "";
      let title = "";
      if(!item[payload.checkActive] || item[payload.checkActive] !== 'active'){
        hidden = `hidden`;
      }
      if (payload.selectedId && (parseInt(payload.selectedId) == parseInt(item[payload.key]))) {
        selected = "selected";
      }
      if(payload.title && item[payload.title]){
        title = `title=${item[payload.title]}`;
      }
      options += `<option value="${item[payload.key]}" ${selected} ${hidden} ${title}>${item[payload.value]}</option>`;
    });
    return options;
  };

  app.locals.buildPropertyDateFilter = (propertyDateFilter) => {
    return buildPropertyDateFilter(propertyDateFilter);
  };

  app.locals.cmsTitleSeperator = '-';

  app.locals.convertToCommaNumber=(value)=> {
    if(value && value!='' && typeof(value)!=='undefined'){
      return "￥ " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "￥ ";
  };
};

const buildPropertyDateFilter = (propertyDateFilter) => {
  let arrayQueryString = "";
  Object.keys(propertyDateFilter).forEach((x) => {
    arrayQueryString += `&dateFilter[${x}][from]=${encodeURIComponent(propertyDateFilter[x]['from'])}&dateFilter[${x}][to]=${encodeURIComponent(propertyDateFilter[x]['to'])}`;
  });
  return arrayQueryString;
};

module.exports = localFunctionLoader;