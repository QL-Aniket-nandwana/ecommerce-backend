const responder = require('../../utils/responder');
const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
  try {
    const authHeader = request.header('Authorization');

    if (!authHeader) {
      return responder.responseUnauthorized(response, 'TOKEN_MISSING');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return responder.responseUnauthorized(response, 'INVALID_TOKEN_FORMAT');
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    if (!decodedToken) {
      return responder.responseUnauthorized(response, 'INVALID_TOKEN');
    }

    request.user = {
      id: decodedToken.id,
      role_id: decodedToken.role_id,
      role_name: decodedToken.role_name,
    };

    next();
  } catch (error) {
    return responder.responseUnauthorized(response, 'TOKEN_EXPIRED_OR_INVALID');
  }
};