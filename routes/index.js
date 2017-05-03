var express = require('express');
var router = express.Router();
var markdown = require('marked');
var db =require('../utils/mysql_helper.js');
var fs = require('fs');
var fm = require('front-matter');
var renderer = new markdown.Renderer();
/* GET home page. */
router.get('/', function(req, res, next) {
  sql='select * from blog where id>0';
  var article_list=[];
  db.exesql("percy",sql,function(ret){
  	console.log(ret);
    res.rdata.blog_list=ret;
    res.render('index', res.rdata);
  });
});
router.get('/login', function(req, res, next) {
  res.render('login',res.rdata);
});
router.get('/about', function(req, res, next) {
  res.render('login', res.rdata);
});
router.get('/article', function(req, res, next) {
	var test=markdown('```javascript\nconsole.log("hello");\n```', {renderer:renderer});
	console.log(test);
    sql='select * from blog where id='+req.query.id;
    db.exesql("percy",sql,function(ret){
    	console.log(ret);
    	res.rdata.blog_list=ret;
        fs.readFile(ret[0].file_path, 'utf8', function(err, data){
            if (err) throw err 
            res.rdata.info = fm(data);
        	res.rdata.content=markdown(res.rdata.info.body,{renderer:renderer});
        	console.log(res.rdata.blog_list[0]);
            res.render('article', res.rdata);
        });
    });
});

renderer.code = function(code, language) {
    // ...
    if (!language) {
    	language='sh';
    };
    // str='<figure class="highlight ' + language + '"><table><tbody><tr><td class="gutter"><pre><div class="line">1</div><div class="line">2</div></pre></td><td class="code"><pre><div class="line">net stop mysql</div><div class="line">net start mysql</div></pre></td></tr></tbody></table></figure>
    return '<pre class="brush: ' + language + '">' + code + '</pre>';
};
module.exports = router;
