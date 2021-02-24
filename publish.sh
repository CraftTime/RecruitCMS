#! /bin/bash
npm run build
#scpct ./dist/* //opt/crafttime/recruit/RecruitCMS

sudo scp -i //Users/sleepyfox/Downloads/production/centus.pem -r ./dist/* centos@34.229.235.238://opt/crafttime/recruit/RecruitCMS
