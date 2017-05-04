var express = require('express');
var router = express.Router();
var markdown = require('marked');
var db =require('../utils/mysql_helper.js');
var fs = require('fs');
var fm = require('front-matter');
var renderer = new markdown.Renderer();
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(res.rdata);
  sql='select * from blog where id>0 limit '+ res.rdata.perpage;
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
    	res.rdata.blog_list=ret;
      res.rdata.info = fm(ret[0].content);
      res.rdata.content=markdown(res.rdata.info.body,{gfm: true,breaks:true,renderer:renderer});
      console.log(res.rdata.info.attributes.tags);
      console.log(res.rdata.blog_list);
      res.render('article', res.rdata);
    });
});
router.get('/searchblog',function(req,res,next){
    sql='select * from blog where concat(title,brief) like "%'+req.query.keyword+'%"';
    db.exesql("percy",sql,function(ret){
      console.log(ret);
      res.json(ret);
    })
    
});
renderer.code = function(code, language) {
    // ...
    if (!language) {
    	language='sh';
    };
    return '<pre class="brush: ' + language + '">' + code + '</pre>';
};
module.exports = router;
