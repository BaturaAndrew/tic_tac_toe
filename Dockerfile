# build environment
MAINTAINER Batura Andrey <batura.andrey@otr.ru>
FROM node:10.15.0 as builder
RUN npm install --silent
RUN npm run build