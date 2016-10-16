#!/usr/bin/env bash
cd source/_posts
ls > /tmp/post_list
while read line;do
    time=`echo $line|awk -F - '{print $1$2$3}'`
    echo "set $line to time $time"
    echo "touch -t ${time}1314.00 $line"
    touch -t ${time}1314.00 $line
    echo $?
done < /tmp/post_list
rm /tmp/post_list
cd -
