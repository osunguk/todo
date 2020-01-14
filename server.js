const express = require('express');
const path = require('path')
const app = express();
const session = require('express-session')
const mysql = require('mysql')

// 추가
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// db 연결
// dbConfig.js 는 gitignore 추가 
// db 연결 data 숨김
const dbConfig = require('./config/dbConfig')
const connection = mysql.createConnection({
  host : dbConfig.host,
  user : dbConfig.user,
  password : dbConfig.password,
  port : dbConfig.port,
  database : dbConfig.database,
})

// port 설정
const PORT = process.env.PORT || 3000

// 라우터 설정
const router = require('./router/index')(app)

// 뷰엔진 설정
app.set('views', __dirname + '/view')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.use(express.static('public'))


const server = app.listen(PORT, function () {
  console.log("server start!! port : " + PORT)
})

