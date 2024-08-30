# chat
Simple plug & play real-time JavaScript chat implemented using Socket.io.

Where simplicity meets usability:

* No user accounts - just enter nickname and join.
* No history saved by default - only logged-in users can see recent history.
* No configuration.
* Only one room - you can't create any other rooms or write PM to others.
* Files sharing is possible - without storing any data on server.
* Emojis - just a few of them.

![screenshot](https://raw.githubusercontent.com/m1k1o/chat/master/screenshot.png)

## docker

```sh
docker run -d \
	--name chat \
	-p 80:80 \
	m1k1o/chat:latest
```

## docker-compose

```yml
version: "3"
services:
  chat:
    image: m1k1o/chat:latest
    restart: unless-stopped
    ports:
      - 80:80
    environment:
      CACHE_SIZE: 50 # optional: message count stored. Defaults to zero.
 ```

## Cache
`CACHE_SIZE` is optional and determines the number of messages stored on the server. When new users join (or reconnect), that cache is sent to give a brief history. This defaults to zero, but can be set as an environment variable.

If you're not running in a docker container, you can make a `.env` file in the project root with `CACHE_SIZE=50` in.

Note: This cache will be text or images so be mindful not to set it too high as it could be n images sent to every new user.

## How to install

Requirements: `nodejs`, `npm`

1. Clone this repository.
	- `git clone https://github.com/m1k1o/chat .`
2. Install server dependencies.
	- `npm install`
3. Run server (default port is `80`).
	- `npm start [custom_port]`
4. Done, visit your chat in browser.
