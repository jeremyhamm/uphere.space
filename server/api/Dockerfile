FROM node:13.1.0-alpine

# Create app directory
RUN mkdir -p ../app
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY /server/api/package*.json ./

RUN npm install

# Bundle app source
COPY . /server/api

EXPOSE 3000
CMD ["node", "app.js"]
