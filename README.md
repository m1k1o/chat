# chat
Simple plug & play real-time JavaScript chat implemented using Socket.io.

Where simplicity meets usability:

* No user accounts - just enter nickname and join.
* No history saved - only logged-in users can see recent history.
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
 ```

## How to install

Requirements: `nodejs`, `npm`

1. Clone this repository.
	- `git clone https://github.com/m1k1o/chat .`
2. Install server dependencies.
	- `npm install`
3. Run server (default port is `80`).
	- `npm start [custom_port]`
4. Done, visit your chat in browser.
