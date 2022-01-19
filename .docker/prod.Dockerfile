FROM node:16-alpine3.14
WORKDIR /usr/app
COPY package*.json ./
RUN yarn
COPY . ./
CMD yarn start