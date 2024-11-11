FROM node:latest

WORKDIR /srv/app

COPY . .

RUN yarn install

# USER node

CMD [ "yarn", "start" ]