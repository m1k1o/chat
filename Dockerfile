FROM node:14-slim

#
# create app directory
WORKDIR /usr/src/app

#
# install app dependencies
COPY package*.json ./
RUN npm install

#
# copy app
COPY . .

ENTRYPOINT [ "node", "server.js" ]

EXPOSE 80
CMD [ "80" ]
