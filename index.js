const express = require("express");
const server = express();

server.use(express.static("./public"));

server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});
server.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/views/contact.html");
});

server.get("/portafolio", (req, res) => {
    res.sendFile(__dirname + "/views/portafolio.html");
});
server.get("/zines", (req, res) => {
    res.sendFile(__dirname + "/views/zines.html");
});

server.get("*", (req, res) => {
    res.status(404).send("Page Not Found!");
});

server.listen(3000, () => {
    console.log("Server running");
});
