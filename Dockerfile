FROM node:20-alpine

WORKDIR /srv/app

COPY . .

RUN yarn install

USER node

CMD [ "yarn", "start" ]	