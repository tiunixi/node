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
connection.query('select sname,sgender from student', function(error, results, fields) {
  //
  if (error) throw error;
  console.log('查询结果是: ', results);
});

// 5. 结束本次连接
connection.end();
