let config = {};
config.modules = {
  "home": "Dashboard",
  // "configs": "Configuration",
  "services": "Services" ,
  "staffs" : "Staffs" ,
  "bookings": "Bookings"
};

config.modulePages = {
  "home": {
    "home": "Dashboard"
  },
  "services": { "services": "services Management" },
  "staffs": { "staffs": "staffs Management" },
  "bookings": { "bookings": "bookings Management" },
  "configs": {
    "configs": "Configuration"
  }
};
config.modulePermissions = {
  "configs": {
    "configs.configs.view": "View Configs",
    "configs.configs.edit": "Edit Config"
  }, 
  "services": {
    "services.services.view": "View services",
    "services.services.edit": "Edit services"
  },
  "staffs": {
    "staffs.staffs.view": "View staffs",
    "staffs.staffs.edit": "Edit staffs"
  },
  "bookings": {
    "bookings.bookings.view": "View bookings",
    "bookings.bookings.edit": "Edit bookings"
  },
  "login-logs": {
    "login-logs.login-logs.view": "View Login Logs"
  }
};

config.moduleIcons = {
  "home": "fa fa-tachometer-alt",
  "email-templates": "fa fa-envelope",
  "master-data": "fa fa-object-group",
  "configs": "fa fa-cog",
  "services": "fa fa-scissors",
  "staffs" : "fa fa-users",
  "bookings": "fa fa-book"
};

module.exports = config;