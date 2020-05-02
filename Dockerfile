FROM node:12.16.3-alpine

EXPOSE 3000

WORKDIR /infant-nutrition
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

CMD yarn start
