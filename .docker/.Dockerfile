FROM node:16-alpine3.14
RUN apk update && apk add git
WORKDIR /usr/app
COPY package*.json ./
RUN yarn
COPY . ./
CMD yarn dev token=${token}