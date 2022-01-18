FROM node:16-alpine3.14
RUN apk update && apk add --no-cache git openssh-client
WORKDIR /usr/app
COPY package*.json ./
RUN yarn
COPY . ./
CMD yarn dev token=${token}