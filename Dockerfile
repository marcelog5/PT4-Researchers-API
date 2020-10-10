FROM node:alpine

WORKDIR /usr/app

COPY . .

RUN yarn

RUN ["chmod", "777", "node_modules"]

EXPOSE 3333

CMD ["yarn", "dev:server"]
