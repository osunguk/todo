const crypto = require('crypto')
const mysql = require('mysql')
const dbConfig = require('../dbConfig')
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  port: dbConfig.port,
  database: dbConfig.database,
})

module.exports = function (app) {
  app.get('/', (req, res) => {
    res.render('main')
  })

  app.get('/login', (req, res) => {
    res.render('login',{msg:""})
  })

  app.post('/login', (req, res) => {
    const username = req.body.username
    const pw = req.body.pw
    connection.query('select * from user where username=?;', [username], (err, rows, fieds) => {
      if (err) {
        console.log('error : ', err)
      }
      if (rows[0]) {
        if (pw === rows[0].password) {
          // console.log('로그인 성공')
          tmp = rows[0].uid
          t = new Date()
          n = t.toISOString().slice(0, 19).replace('T', ' ')
          connection.query(`UPDATE user set date_joined=\'${n}\' WHERE uid=${tmp}`)
          res.redirect('todo')
        }
        else {
          res.render('login', { msg: '비밀번호를 확인하세요' })
        }
      }
      else {
        res.render('login', { msg: '존재하지 않는 ID 입니다' })
        // console.log('존재하지 않는 ID 입니다')
      }
    })
  })

  app.get('/signup', (req, res) => {
    res.render('signup')
  })

  app.post('/signup', (req, res) => {
    const username = req.body.username
    const pw = req.body.pw
    const email = req.body.email

    const sql = `INSERT INTO user (username, password, email) VALUES ('${username}', '${pw}', '${email}')`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
    })
    res.render('login')
  })

  app.get('/todo', (req, res) => {
    res.render('todo')
  })
}