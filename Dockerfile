FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

RUN ["chmod", "777", "node_modules"]

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev:server"]