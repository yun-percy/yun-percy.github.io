var mysql = require('mysql');
var dateFormat = require('dateformat');
var file = require('../utils/file');
if(file.isLinux){
	//taf
 	pool = mysql.createPool({
	  connectionLimit	: 10,
	  host				: '123.207.107.50',
	  user				: 'percy',
	  password			: 'percy',
	  port				: '3306',
	  database			: 'percy'
	});
} else if(file.isWindows) {
	pool = mysql.createPool({
	  connectionLimit	: 10,
	  host				: '123.207.107.50',
	  user				: 'percy',
	  password			: 'percy',
	  port				: '3306',
	  database			: 'percy'
	});
} else if(file.isMac) {
	pool = mysql.createPool({
	  connectionLimit	: 10,
	  host				: '123.207.107.50',
	  user				: 'percy',
	  password			: 'percy',
	  port				: '3306',
	  database			: 'percy'
	});
}

function mysqlRemote() {
	//通用数据库操作函数
	this.exesql = function(table,sql,callback){
		pool.getConnection(function(err, connection) {
			if (err) {
				console.log(err);  
			}
			connection.query('use '+table , function(err) {
			  if (err) throw err;
			});
			console.log(sql);
			connection.query(sql,function(err, rows) {
				if(err){
					connection.release();
					console.log(err);
					callback(err);
				}else{
					connection.release();
					callback(rows);
				}
			});
		});
	}
	this.getNowTime = function () {
        var date = new Date();
        var datestr = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ':' + date.getSeconds();
        return datestr;

    }
    this.getTimebase64 = function () {
        var date = new Date();
        console.log(date.getTime());

        var b = new Buffer(date.getTime().toString());
		var datestr = b.toString('base64');
        return datestr;

    }
    this.getNowDayTime = function () {
        var date = new Date();
        var datestr = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        return datestr;
    }
    this.makeInsertSql = function (tbl, obj) {
        var col = [],
            val = [];

        for (key in obj) {
            col.push(key);
            val.push(obj[key]);
        }

        var sql = 'insert into ' + tbl + ' (';

        for (var i = 0; i < col.length; i++) {
            sql += i == 0 ? '' : ',';
            sql += col[i];
        }
        sql += ') values (';
        for (var i = 0; i < val.length; i++) {
            sql += i == 0 ? '' : ',';


            sql += '?';
        }
        sql += ')';

        return mysql.format(sql, val);
    }
    this.makeUpdateSql = function (tbl, obj, whereClause) {
        var col = [],
            val = [];

        for (key in obj) {
            col.push(key);
            val.push(obj[key]);
        }

        var sql = 'update ' + tbl + ' set ';

        for (var i = 0; i < col.length; i++) {

            sql += i == 0 ? '' : ',';

            sql += col[i];
            sql += '=?';
        }

        sql += ' ' + whereClause;

        return mysql.format(sql, val);
    }
}

mysqlRemote = new mysqlRemote();
module.exports = mysqlRemote;