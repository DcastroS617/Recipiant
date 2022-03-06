const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'algo salió mal, intentalo de nuevo'
  } 
  console.log(err.message)
  if(err.code && err.code === '11000'){
    customError.msg = `Valor duplicado: ${Object.keys(err.keyValue)}, debes ingresar uno nuevo`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  if(err.name === 'ValidationError'){
    customError.msg = Object.keys(err.errors)
    .map(item => item.message)
    .join(', ')
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  if(err.name === 'CastError'){
    customError.msg = `error de identificacion, la presente ${err.value}, no se encuentra en los registros`
    customError.statusCode = StatusCodes.NOT_FOUND
  }
  
  return res.status(customError.statusCode).json({ error: customError.msg })
}

module.exports = errorHandlerMiddleware
