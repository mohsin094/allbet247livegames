#!/bin/bash

sudo systemctl start redis-server;
sudo redis-server /etc/redis/redis-slave.conf &
sudo redis-server /etc/redis/sentinel1.conf --sentinel > /dev/null &
sudo redis-server /etc/redis/sentinel2.conf --sentinel > /dev/null &
xfce4-terminal --default-working-directory '/var/www/html/tamland-chat/test'