module.exports = {
  "verbose": true,
  "testEnvironment": "node",
  "coveragePathIgnorePatterns": [
    "/node_modules/"
  ],
  "moduleNameMapper": {
    "@lib": "<rootDir>/src/helpers",
    "@config": "<rootDir>/src/config",
    "@constant": "<rootDir>/src/constants",
    "@models": "<rootDir>/src/models",
    "@errors": "<rootDir>/src/errors",
    "@transformers": "<rootDir>/src/transformers",
    "@routes": "<rootDir>/src/routes",
    "@responseFormat": "<rootDir>/src/responseFormat",
    "@baseController": "<rootDir>/src/controllers/backend/baseController",
    "@baseService": "<rootDir>/src/services/base.service.js",
    "@apiBaseController": "<rootDir>/src/controllers/api/apiBaseController.js",
    "@apiBaseService": "<rootDir>/src/services/api/api.base.service.js",
    "@serviceProvider": "<rootDir>/src/provider/service-provider",
    "@controller": "<rootDir>/src/controllers/backend",
    "@apiController": "<rootDir>/src/controllers/api",
    "@middleware": "<rootDir>/src/middlewares/backend",
    "@validators": "<rootDir>/src/validators",
    "@db": "<rootDir>/src/database/database",
    "@services": "<rootDir>/src/services",
    "@error": "<rootDir>/src/errors",
    "@events": "<rootDir>/src/events",
    "@emitter": "<rootDir>/src/listener",
    "@pagination": "<rootDir>/src/model/pagination",
    "@errorHandler": "<rootDir>/src/handler/error-handler",
    "@wrapNext": "<rootDir>/src/middlewares/backend/wrapNext.js",
    "@container": "<rootDir>/src/loaders/container.js",
    "@utils": "<rootDir>/src/utils"
  }
};