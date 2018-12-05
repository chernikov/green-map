FROM node:9.6.1

## Create and select work folder
WORKDIR /app

## Copy packages files list (package.json and package-lock.json)
COPY package*.json /app/

## Install all packages
RUN npm install

## Copy all other files
COPY ./ /app/

## Build angular in /app/dist folder
RUN npm run build:prod

CMD [ "node", "local.js" ]