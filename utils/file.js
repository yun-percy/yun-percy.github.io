var path = require("path");
var fs = require('fs');
var os = require('os');
var exec = require('child_process').exec;

var osType = os.type(),
	WINDOWS = osType.indexOf('Windows') >= 0;
		MAC = osType.indexOf('Darwin') >= 0,
	LINUX = osType.indexOf('Linux') >= 0;

module.exports = {
	sep: path.sep,
	isWindows: WINDOWS,

	isMac: MAC,

	isLinux: LINUX,

	pwd: function(){
		var url = path.resolve('./');
		return url;
	},
	mkdir: function(dirname, callback){
		fs.mkdir(dirname, function(){
			console.log('mkdir: ' + dirname + ' success');
			if(typeof callback != 'undefined')
				callback();
		});
	},
	exists: function(path){
		try{
			fs.statSync(path);
		} catch(e){
			return false;
		}
		return true;
	},
	isFile: function(path){
		try{
			var stat = fs.statSync(path);
			return stat.isFile();
		} catch(e){
			return false;
		}
	},
	isDir: function(path){
		try{
			var stat = fs.statSync(path);
			return stat.isDirectory();
		} catch(e){
			return false;
		}
	},
	listFiles: function(dirPath){
		if(!this.isDir(dirPath)){
			console.log(dirPath + ' is not a directory path');
			return null;
		}
		try {
			var fList = fs.readdirSync(dirPath);
			return fList;
		} catch(e){
			return null;
		}
	},
	usrPath: function(username){
		return BASEPATH() + this.sep + username;
	},
}