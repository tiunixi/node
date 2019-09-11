// 提供接口，让前端获取数据
//  数据是通过mysql数据库提供的

const express = require('express');

const app = express();
// 2.引入body-parser包，用来获取post的传参
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/getstudents', (req, res) => {
  // 连接数据库，获取全部的学生信息

  // 1. 引入包
  var mysql = require('mysql');
  // 2. 设置连接参数
  var connection = mysql.createConnection({
    // mysql服务器的地址，我们在安装phpstudy已经装了，就在本地
    host: 'localhost',
    // 连接数据库服务器需要的用户名
    user: 'root',
    // 连接数据库服务器需要的密码
    password: 'root',
    // 本次要操作的数据名
    database: 'school'
  });

  // 3.连接数据库
  connection.connect();

  // 4. 执行sql语句
  // 把所有的student表中的数据都查询出来
  // select * from student
  // connection.query("要执行的sql语句",回调函数(错误，本次执行结果，涉及到字段))
  connection.query('select sname,sgender from student', function (error, results, fields) {
    //
    if (error) throw error;
    console.log('查询结果是: ', results);

    //返回查询结果
    res.json(results);
  });

  // 5. 结束本次连接
  connection.end();
});

/**
 * 接口的地址：/addstudent
 * 类型：post
 * 参数：
 *  -sname : 姓名
 *  -sgender：性别
 *  -sno：学号
 *  -sage：年龄
 * 返回值：
//  *  - 成功： {code:198,msg:'成功'}
//  *  - 失败： {code:199,msg:'失败原因'}
 *  */
app.post('/addstudent', (req, res) => {
  //1.获取post的传参
  console.log(req.body);
  let { sname, sgender, sno, sage } = req.body;

  // 1. 引入包
  var mysql = require('mysql');
  // 2. 设置连接参数
  var connection = mysql.createConnection({
    // mysql服务器的地址，我们在安装phpstudy已经装了，就在本地
    host: 'localhost',
    // 连接数据库服务器需要的用户名
    user: 'root',
    // 连接数据库服务器需要的密码
    password: 'root',
    // 本次要操作的数据名
    database: 'school'
  });

  // 3.连接数据库
  connection.connect();

  // 4. 执行sql语句
  // 把所有的student表中的数据都查询出来
  // select * from student
  // connection.query("要执行的sql语句",回调函数(错误，本次执行结果，涉及到字段))
  // ---向数据库中添加-----
  // 写一个sql语句
  let sql = `insert into student(sname,sgender,sno,sage) values('${sname}','${sgender}',${sno},${sage})`;

  connection.query(sql, function (error, results, fields) {
    //
    if (error) {
      // 后端同学去跟这个错误
      console.log(error);
      res.json({ code: 199, msg: '操作失败' });
    } else {
      res.json({ code: 198, msg: '成功' });
    }
  });

  // 5. 结束本次连接
  connection.end();
});

app.listen(8080, () => {
  console.log(8080);
});
