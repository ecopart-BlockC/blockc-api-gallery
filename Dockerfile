FROM node:18

WORKDIR /srv/app

COPY package.json yarn.lock ./

RUN yarn install --quiet --no-optional --no-fund --loglevel=error

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]



