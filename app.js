const express = require('express')
const router = require('./router')
const fs = require('fs')
const https = require('https')
const cors = require('cors')
const { env } = require('./env')

const app = express()

// 解决跨域
app.use(cors())

// 用于req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', router)

const keyPath = env === 'dev' ? './https' : '/root/https'
const privateKey =  fs.readFileSync(keyPath + '/chenjunjian.com.key')
const pem = fs.readFileSync(keyPath + '/chenjunjian.com.pem')
const credentials = {
  key: privateKey,
  cert: pem
}
const httpsServer = https.createServer(credentials, app)
const server = app.listen(5000, function() {
  const {address, port} = server.address()
  console.log('HTTP启动成功：http://%s:%s', address, port);
})

httpsServer.listen(18082, function() {
  console.log('HTTPS Server is running on: https//localhost:%s', 18082);
})