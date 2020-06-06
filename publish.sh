#! /bin/bash
npm run build
#scpct ./dist/* //opt/crafttime/recruit/RecruitCMS

sudo scp -i //Users/Bingo/Development/OneZeroBeat/Product/CraftTime/Recruit/Dev/centus.pem -r ./dist/* centos@34.229.235.238://opt/crafttime/recruit/RecruitCMS
