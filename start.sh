ps -aux |grep ./bin/www |grep -v grep |awk '{print $2}'|xargs kill
npm start 1>log.xml 2>&1 &  disown

