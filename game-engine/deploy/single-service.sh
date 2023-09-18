#!/bin/bash

sudo systemctl start redis-server;
xfce4-terminal --default-working-directory '/var/www/html/tamland-chat/test';
npm run start;