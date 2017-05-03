var marked = require('marked');


var test=marked('```javascript\nconsole.log("hello");\n```', {renderer:renderer});
console.log(test);
console.log('===================');