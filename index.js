const express = require("express");
const server = express();
const { PORT } = require("./config");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(express.static("./public"));

let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
    tls: { rejectUnauthorized: false },
});

server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

server.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/views/contact.html");
});

server.post("/contact", (req, res) => {
    const { email, subject, message } = req.body;
    const messageToSend = {
        from: "'Ovidio Perez' <oapm10@gmail.com>", // Sender address
        to: "oapm10@gmail.com", // List of recipients
        subject: subject, // Subject line
        text: message, // Plain text body
    };
    transport.sendMail(messageToSend, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
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

server.listen(PORT, () => {
    console.log("Server running");
});
