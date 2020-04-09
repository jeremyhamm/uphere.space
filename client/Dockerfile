FROM node:13.1.0-alpine

# set working directory
RUN mkdir -p ../app
WORKDIR /app

# install and cache app dependencies
COPY /client/package*.json ./

RUN npm install

COPY . /client

EXPOSE 8080
CMD ["npm", "run", "serve"]