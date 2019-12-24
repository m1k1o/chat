const express = require('express')
const app = express()
app.use(express.static(__dirname))

const port = process.argv[2] || 8090;
const http = require("http").Server(app)
const io = require("socket.io")(http);

http.listen(port, function () {
  console.log("Starting server on port %s", port);
});

const users = [];
let msg_id = 1;
io.sockets.on("connection", function(socket) {
	console.log("New connection!");

	var nick = null;

	socket.on("login", function(data) {
		// Security checks
		data.nick = data.nick.trim();

		// If is empty
		if(data.nick == ""){
			socket.emit("force-login", "Nick can't be empty.");
			nick = null;
			return ;
		}

		// If is already in
		if(users.indexOf(data.nick) != -1){
			socket.emit("force-login", "This nick is already in chat.");
			nick = null;
			return ;
		}

		// Save nick
		nick = data.nick;
		users.push(data.nick);

		console.log("User %s joined.", nick.replace(/(<([^>]+)>)/ig,""));
		socket.join("main");

		// Tell everyone, that user joined
		io.to("main").emit("ue", {
			"nick": nick
		});

		// Tell this user who is already in
		socket.emit("start", {
			"users": users
		});
	});

	socket.on("send-msg", function(data){
		// Trim string
		data.m = data.m.trim();

		// Ignore empty messages
		if(data.m == ""){
			return ;
		}

		// If is logged in
		if(nick == null){
			socket.emit("force-login", "You need to be logged in to send message.");
			return ;
		}

		// Send everyone message
		io.to("main").emit("new-msg", {
			"f": nick,
			"m": data.m,
			"id": "msg_"+(msg_id++)
		});

		console.log("User %s sent message.", nick.replace(/(<([^>]+)>)/ig,""));
	});

	socket.on("typing", function(typing){
		// Only logged in users
		if(nick != null){
			socket.broadcast.to("main").emit("typing", {
				status: typing,
				nick: nick
			});

			console.log("%s %s typing.", nick.replace(/(<([^>]+)>)/ig,""), typing ? "is" : "is not");
		}
	});

	socket.on("disconnect", function() {
		console.log("Got disconnect!");

		if(nick != null){
			// Remove user from users
			users.splice(users.indexOf(nick), 1);

			// Tell everyone user left
			io.to("main").emit("ul", {
				"nick": nick
			});

			console.log("User %s left.", nick.replace(/(<([^>]+)>)/ig,""));
			socket.leave("main");
			nick = null;
		}
	});
});