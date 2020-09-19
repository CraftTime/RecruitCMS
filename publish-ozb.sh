#! /bin/bash
npm run build

scp -r ./dist/* root@www.onezerobeat.com://opt/crafttime/recruit/RecruitCMS
