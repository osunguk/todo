# Todo App
이곳저곳에서 배운 js, node, express 지식으로 만들어보는 todo app

## 기술 스펙
현재 스팩
- Node
- Express
- JavaScript
- SPA
- API

추가할 스팩
- DateBase
- Backend Server
- etc



**## 개발환경구축**



```shell
git clone https://github.com/osunguk/todo
mkdir config
cd config
vi dbConfig.js
```



**dbConfig.js**

```javascript
const dbConfig = {
  host : 'host name',
  user : 'username',
  password : 'password',
  port : portnumber,
  database : 'databasename',
}

module.exports = dbConfig
```



```shell
vi hashConfig.js
```



**hashConfig.js**

```javascript
const hashConfig = {
  hashFunc : 'hashFunc',
  counter : counter,
}

module.exports = hashConfig
```





