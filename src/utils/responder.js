const responses = require('../configs/constants');

const RESPONSE_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
  };
  
  exports.responseOk = (res, message, data = {}) => {
    return res.status(RESPONSE_CODES.SUCCESS).json({
      success: true,
      message: responses[message] || message,
      data,
    });
  };
  
  exports.responseOKIssues = (res, message, data = {}) => {
    return res.status(RESPONSE_CODES.SUCCESS).json({
      success: false,
      message: responses[message] || message,
      data,
    });
  };
  
  exports.responseCreated = (res, message, data = {}) => {
    return res.status(RESPONSE_CODES.CREATED).json({
      success: true,
      message: responses[message] || message,
      data,
    });
  };
  
  exports.responseBadRequest = (res, message, data = {}) => {
    return res.status(RESPONSE_CODES.BAD_REQUEST).json({
      success: false,
      message: responses[message] || message,
      data,
    });
  };
  
  exports.responseUnauthorized = (res, message = 'UNAUTHORIZED') => {
    return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
      success: false,
      message: responses[message] || message,
    });
  };
  
  exports.responseForbidden = (res, message = 'FORBIDDEN') => {
    return res.status(RESPONSE_CODES.FORBIDDEN).json({
      success: false,
      message: responses[message] || message,
    });
  };
  
  exports.responseNotFound = (res, message = 'NOT_FOUND') => {
    return res.status(RESPONSE_CODES.NOT_FOUND).json({
      success: false,
      message: responses[message] || message,
    });
  };
  
  exports.responseConflict = (res, message, data = {}) => {
    return res.status(RESPONSE_CODES.CONFLICT).json({
      success: false,
      message: responses[message] || message,
      data,
    });
  };
  
  exports.responseServerError = (res, error = null) => {
    if (error) {
      console.error(error);
    }
  
    return res.status(RESPONSE_CODES.SERVER_ERROR).json({
      success: false,
      message: 'SERVER_ERROR',
    });
  };