import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

const PORT = 4000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on ws://localhost:${PORT}!!😊`);;

const server = http.createServer(app);

const wss = new WebSocket.Server({server});


const sockets = [];
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "익명";
    console.log("Connected to Browser!💁‍♀️");
    socket.on("message", (message) => {
        const convertMessage = message.toString('utf8');
        const parsedMsg = JSON.parse(convertMessage);
        switch (parsedMsg.type) {
            case "newMsg":
                sockets.forEach(aSocket => aSocket.send(`${socket["nickname"]}: ${parsedMsg.payload}`));
                break;
            case "setNick":
                socket["nickname"] = parsedMsg.payload;
                break;
        }
    });
    socket.on("close", () => {
        console.log("❌disconnected from the browser❌");
    });
});

server.listen(PORT, handleListen);