const express = require('express')
const boom = require('boom')
const userRouter = require('./user')
const bookRouter = require('./book')
const { CODE_ERROR } = require('../utils/constant')
const jwtAuth = require('./jwt')
const e = require('express')
const Result = require('../models/Result')

const router = express.Router()

router.use(jwtAuth)

router.get('/', function (req, res) {
  res.send('欢迎')
})

router.use('/user', userRouter)

router.use('/book', bookRouter)

router.use((req, res, next) => {
  next(boom.notFound('接口不存在'))
})

router.use((err, req, res, next) => {
  console.log(err)
  if (err.name && err.name === 'UnauthorizedError') {
    const { status = 401, message } = err
    new Result(null, 'Token验证失效', {
      error: status,
      errMsg: message
    }).jwtError(res.status(status))
  } else {
    const msg = (err && err.message) || '系统错误'
    const statusCode = (err.output && err.output.statusCode) || 500
    const errorMsg =
      (err.output && err.output.payload && err.output.payload.error) ||
      err.message
    new Result(null, msg, {error: statusCode,
      errorMsg}).fail(res.status(statusCode))
  }
})

module.exports = router
