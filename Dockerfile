FROM node:16.19.0-buster as builder
ARG ENV_VAR
WORKDIR /app
# RUN apt update && apt install -y yarn
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn global add pm2
COPY . .
RUN yarn build:${ENV_VAR:-dev}:local

CMD ["yarn", "pm2:docker"]
