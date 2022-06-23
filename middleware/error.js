
const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  (err.statusCode = err.statusCode || 500),
    (err.message = err.message || "internal server error");

  // mongodb wrong id error
  if (err.name === "CastError") {
    const message = `resource not found invalid:${err.path}`;
    err = new ErrorHandler(message, 404);
  }

  // mongoose duplicate key error
    if(err.code===11000){
      const message=`Duplicate ${Object.keys(err.keyValue)} entered`
      err= new ErrorHandler(message,400)
    }
    // wrong jwt error
  if (err.name === "jsonWebTokenError") {
    const message = `json web token is invalid,try again`;
    err = new ErrorHandler(message, 404);
  }
   // jwt expire error
   if (err.name === "TokenExpiredError") {
    const message = `json web token is expired,try again`;
    err = new ErrorHandler(message, 404);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
