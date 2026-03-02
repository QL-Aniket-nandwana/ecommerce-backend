const responder = require('../../utils/responder');

module.exports = (...allowedRoles) => {
    return (req, res, next) => {
        console.log('req.user.role_name',req.user.role_name)
        console.log('allowedRoles',allowedRoles)
      if (!allowedRoles.includes(req.user.role_name)) {
        return responder.responseForbidden(res);
      }
      next();
    };
  };