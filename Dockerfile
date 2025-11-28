FROM node:trixie-slim

#
# install packages
RUN apt-get update \
    && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*

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

ENV MAX_HTTP_BUFFER_SIZE_MB=1

ENTRYPOINT [ "node", "server.js" ]

EXPOSE 80
CMD [ "80" ]
