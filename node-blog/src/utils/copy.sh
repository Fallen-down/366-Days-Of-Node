#!/bin/sh
cd /blog-1/logs
cp access.log $(date + %Y-%m-%d).access.log
echo "" > access.log


# crontab 定时执行
