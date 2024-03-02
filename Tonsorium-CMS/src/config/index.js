const dotenv = require('dotenv');
dotenv.config();

let config = {
  cmsTitle : process.env.CMSTITLE || "CMS",
  nodeEnv : process.env.ENV_NODE || 'development',
  port : process.env.PORT || 3000,
  cmsUrl : process.env.CMSURL || 'http://localhost:3000/',
  clientUrl : process.env.CLIENTURL || 'http://localhost:5000/',
  databaseURL: process.env.DBCONFIG || 'postgres://root:root@db_postgres/express_db',
  pageLimit: process.env.PAGELIMIT ? parseInt(process.env.PAGELIMIT) : 20,
  mail: {
    mailSender: process.env.MAIL_SENDER || 'mailgun',
    mailEmail : process.env.MAIL_EMAIL || 'info@tonsorium.com',
    mailApiKey : process.env.MAIL_API_KEY || 'key-1443c655d9e02a4fa75a08974d0125e5',
    mailApiDomain : process.env.MAIL_API_DOMAIN || 'mh.tonsorium.net',
    mailFrom : process.env.MAIL_FROM || 'info@tonsorium.info'
  },
  token: {
    expiry: parseInt(process.env.EXPIRY_TIME) || 36000,
    length: 200
  },
  throttle : {
    freeTries: process.env.FREE_TRIES || 5,
    waitTime : process.env.WAIT_TIME_IN_SEC || 60
  },
  defaultFolder:{
    public:'',
    private:''
  },
  utcOffset:process.env.utcOffset || '+0545',
  redisTTL:process.env.SESSION_TIMEOUT_IN_SEC || 43200,
  cookieMaxAge:process.env.COOKIE_MAXAGE_IN_SEC || 43200
};

module.exports = config;