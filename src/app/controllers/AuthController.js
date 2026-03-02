const AuthService = require('../../services/authService');
const responder = require('../../utils/responder');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (request, response, next) => {
  try {
    const userData = request.body;

    const existingUser = await AuthService.getUserByEmail(userData.email);
    if (existingUser) {
      return responder.responseOKIssues(response, 'USER_EXISTS', {});
    }

    const createdUser = await AuthService.createUser(userData);
    console.log('Created user:', createdUser);
    if (!createdUser) {
      return responder.responseOKIssues(response, 'USER_NOT_REGISTERED', {});
    }

    return responder.responseOk(response, 'USER_REGISTERED', {});
  } catch (error) {
    console.log('Registration error:', error);
    return responder.responseServerError(response);
  }
};



exports.login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const user = await AuthService.getUserByEmail(email);
    if (!user) {
      return responder.responseOKIssues(response, 'USER_NOT_EXISTS', {});
    }

    if (!user.is_active) {
      return responder.responseOKIssues(response, 'USER_DISABLED', {});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return responder.responseOKIssues(response, 'INVALID_CREDS', {});
    }

    console.log('User authenticated:', user.role.name);
    const token = jwt.sign(
      {
        id: user.id,
        role_id: user.role_id,
        role_name: user.role.name
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return responder.responseOk(response, 'LOGIN_SUCCESS', { token });
  } catch (error) {
    return responder.responseServerError(response);
  }
};