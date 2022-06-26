FROM node:14.15.0-alpine3.10
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
CMD [ "yarn", "start" ]
