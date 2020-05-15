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
    /*host: "smtp.gmail.com",
    port: 465,*/
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
    tls: { rejectUnauthorized: false },
});

server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

server.get("/about", (req, res) => {
    res.sendFile(__dirname + "/views/about.html");
});

server.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/views/contact.html");
});

server.post("/contact", (req, res) => {
    const { email, subject, message, name } = req.body;
    const messageToSend = {
        from: `'${name} ${email}' <${email}>`, // Sender address
        to: "mariaescribemails@gmail.com", // List of recipients
        subject: subject, // Subject line
        text: message, // Plain text body
        replyTo: email,
    };
    transport.sendMail(messageToSend, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
    res.sendStatus(200);
});

server.get("/portafolio", (req, res) => {
    res.sendFile(__dirname + "/views/portafolio.html");
});

server.get("*", (req, res) => {
    res.status(404).sendFile(__dirname + "/views/not-found.html");
});

server.listen(PORT, () => {
    console.log("Server running");
});
