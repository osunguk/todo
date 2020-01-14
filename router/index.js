const crypto = require('crypto')
const mysql = require('mysql')
const dbConfig = require('../config/dbConfig')
const hashConfig = require('../config/hashConfig')
const session = require('express-session')



const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  port: dbConfig.port,
  database: dbConfig.database,
})

module.exports = function (app) {
  app.use(session({
    secret: '1q2w3e4r',
    resave: false,
    saveUninitialized: true
  }));

  app.get('/', (req, res) => {
    sess = req.session
    sess.username = ""
    sess.uid = null
    res.render('main')
  })

  app.get('/login', (req, res) => {
    if (req.session.username) {
      res.redirect('todo')
    }
    else {
      res.render('login', { msg: "" })
    }

  })

  app.post('/login', (req, res) => {
    const username = req.body.username
    let pw = req.body.pw
    connection.query('select * from user where username=?;', [username], (err, rows, fieds) => {
      if (err) {
        console.log('error : ', err)
      }
      if (rows[0]) {
        crypto.pbkdf2(pw, rows[0].salt, hashConfig.counter, 64, hashConfig.hashFuc, (err, key) => {
          pw = key.toString('base64')

          if (pw === rows[0].password) {
            // console.log('로그인 성공')
            req.session.username = username
            req.session.uid = rows[0].uid
            uid = rows[0].uid
            t = new Date()
            n = t.toISOString().slice(0, 19).replace('T', ' ')
            connection.query(`UPDATE user set date_joined=\'${n}\' WHERE uid=${uid}`)
            res.redirect('todo')
          }
          else {
            res.render('login', { msg: '비밀번호를 확인하세요' })
          }
        })

      }
      else {
        res.render('login', { msg: '존재하지 않는 ID 입니다' })
        // console.log('존재하지 않는 ID 입니다')
      }
    })
  })

  app.get('/signup', (req, res) => {
    res.render('signup', { msg: "" })
  })

  app.post('/signup', (req, res) => {
    const username = req.body.username
    crypto.randomBytes(64, (err, buf) => {
      crypto.pbkdf2(req.body.pw, buf.toString('base64'), hashConfig.counter, 64, hashConfig.hashFuc, (err, key) => {
        const pw = key.toString('base64')
        const salt = buf.toString('base64')

        const email = req.body.email

        const sql = `INSERT INTO user (username, password, salt, email) VALUES ('${username}', '${pw}', '${salt}', '${email}')`;

        connection.query(sql, (err, result) => {
          if (err) {
            res.render('signup', { msg: '이미 존재하는 ID 입니다' })
          }
          else {
            res.render('login', { msg: "" })
          }
        })
      })
    })
    // const pw = crypto.createHash('sha512').update(req.body.pw).digest('base64') 일반적인 암호화
    // 레인보우 테이블 공격에 취약할 수 있다

  })

  app.get('/todo', (req, res) => {
    res.render('todo', { username: req.session.username })
  })

  app.get('/logout', (req, res) => {
    sess = req.session
    if (sess.username) {
      req.session.destroy((err) => {
        if (err) {
          console.log(err)
        } else res.redirect('/')
      })
    } else {
      res.redirect('/')
    }
  })

  app.get('/signout', (req, res) => {
    res.render('signout', { msg: "" })
  })

  app.post('/signout', (req, res) => {
    let pw = req.body.pw

    sql = "SELECT * FROM user WHERE uid=?"

    connection.query(sql, [req.session.uid], (err, rows, result) => {
      if (err) throw err;
      crypto.pbkdf2(pw, rows[0].salt, hashConfig.counter, 64, hashConfig.hashFuc, (err, key) => {
        pw = key.toString('base64')
        if (pw === rows[0].password) {
          sql = "DELETE FROM user WHERE uid=?"
          connection.query(sql, [req.session.uid], (err, result) => {
            if (err) throw err;
          })
          req.session.destroy()
          res.render('main')
        }
        else {
          res.render('signout', { msg: "비밀번호를 확인해주세요" })
        }
      })
    })
  })
}