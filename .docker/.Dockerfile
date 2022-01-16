FROM node:17-alpine3.14
WORKDIR /usr/app
RUN sudo apt install -y git
COPY package*.json ./
RUN yarn
COPY . ./
CMD ["npm", "run", "dev"]