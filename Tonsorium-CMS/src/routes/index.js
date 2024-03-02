const authService = require("../services/auth.service");
const { resetAdminPasswordValidation, forgotAdminPasswordValidation, otpValidator } = require('../validators');
const authenticateUser = require('@middleware/authenticateMiddleware');
const { sessionUserPermissions } = require('@middleware/permissionMiddleware');
const { logCrmEvents, translateWord } = require('../helpers');
const { container } = require("@container");
const authController = container.resolve('authController');
const dashboardController = container.resolve('dashboardController');
const adminRoles = require('./roles');
const admins = require('./admins');
const language = require('./language');
const email = require('./email');
const config = require('./configs');
const ipAccess = require('./ip-access');
const loginLogs = require('./login-logs');
const services = require('./servicesRoute');
const staffs = require('./staffsRoute');
const bookings = require('./bookingsRoute');

const {APIPREFIX} = require("@constant");
const apiRoutes = require('./api/index');
module.exports = (app, passport) => {
    
  app.use(APIPREFIX, apiRoutes);

  if(process.env.EXECUTE_TESTS === undefined || process.env.EXECUTE_TESTS == 0){
    app.get('/', [authenticateUser.guest, translateWord], authController.login);
    app.get('/login', [authenticateUser.guest, translateWord], authController.login);
    app.post('/login', async (req, res, next) => {
      await passport.authenticate('local', async (err, user, info) => {
        if (user) {
          await Promise.all([
            authService.globalizeSelectedLang(req, user),
            authService.storeLoginLogs(req),
            authService.clearResetPasswordData(req)
          ]);
          logCrmEvents(req, "Event", "success", { message: "Login Successful" });
          return res.redirect('/home');
        } else {
          let msg = info && info.message ? info.message : 'Incorrect Email/Password';
          // logCrmEvents(req, "Event", "error", { message: msg }, { error: err });
          req.flash('error_msg', msg);
          return res.redirect('/login');
        }
      })(req, res, next);
    });
    app.get('/otp-verification', [translateWord], authController.optVerificationView);
    app.post('/otp-verification', [otpValidator], authController.optVerification);
    app.get('/resend-otp', authController.resendOtp);
    app.get('/forgot-password', authController.forgotPasswordView);
    app.post('/forgot-password', [forgotAdminPasswordValidation], authController.forgotPassword);
    app.get('/force/reset-password', [translateWord], authController.forceResetPasswordView);
    app.get('/reset-password/:token', [translateWord], authController.resetPasswordView);
    app.post('/reset-password/:token', [resetAdminPasswordValidation], authController.resetPassword);
    app.get('/logout', [authenticateUser.isLoggedIn], authController.logout);
    app.get('/home', [authenticateUser.isLoggedIn, sessionUserPermissions], dashboardController.index);
    app.use('/admin-roles', [authenticateUser.isLoggedIn, sessionUserPermissions], adminRoles);
    app.use('/admins', [authenticateUser.isLoggedIn, sessionUserPermissions], admins);
    app.use('/languages', [authenticateUser.isLoggedIn, sessionUserPermissions], language);
    app.use('/email-templates', [authenticateUser.isLoggedIn, sessionUserPermissions], email);
    app.use('/configs', [authenticateUser.isLoggedIn, sessionUserPermissions], config);
    app.use('/ip-access', [authenticateUser.isLoggedIn, sessionUserPermissions], ipAccess);
    app.use('/login-logs', [authenticateUser.isLoggedIn, sessionUserPermissions], loginLogs);
    app.use('/services', [authenticateUser.isLoggedIn, sessionUserPermissions], services);
    app.use('/staffs', [authenticateUser.isLoggedIn, sessionUserPermissions], staffs);
    app.use('/bookings', [authenticateUser.isLoggedIn, sessionUserPermissions], bookings);

    app.get('*', function (req, res) {
      res.status(404);
      res.render('error/404', {
        layout: false
      });
    });
  }
};