FROM node:lts-alpine3.15
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN yarn install
COPY . ./
CMD ["yarn", "run", "dev"]
