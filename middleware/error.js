const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err,req,res,next) => {
  console.log(err.stack.red);
  let error = {...err}
  error.message = err.message;

  if(err.name == 'CastError'){
    const message = `Bootcamps not found with id of ${err.value}`;
    error = new ErrorResponse(message,404);
  }
  else if(err.code == 11000){
    const message = "Duplicate field entered";
    error = new ErrorResponse(message,400);
  }
  else if(err.name === 'ValidationError'){
    const message = Object.values(err.errors.map(val => val.message));
    error = new ErrorResponse(message,400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error:err.message || "Server Error"
  });
}


module.exports = errorHandler;
