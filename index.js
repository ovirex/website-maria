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
    const { name, email, subject, message } = req.body;

    const messageToSend = {
        from: `'${name} ${email}' <${email}>`, // Sender address
        to: "mariaescribemails@gmail.com", // List of recipients
        subject: subject, // Subject line
        text: message, // Plain text body
        replyTo: email,
    };

    if (validateForm(name, email, subject, message)) {
        transport.sendMail(messageToSend, function (err, info) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log(info);
                console.log("Email Sent!");
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(422);
    }
});

server.get("/portafolio", (req, res) => {
    res.sendFile(__dirname + "/views/portafolio.html");
});

server.get("/graphic-design", (req, res) => {
    res.sendFile(__dirname + "/views/graphic-design.html");
});
server.get("/graphic-design/social-media", (req, res) => {
    res.sendFile(__dirname + "/views/social-media.html");
});
server.get("/graphic-design/publicidad", (req, res) => {
    res.sendFile(__dirname + "/views/publicidad.html");
});

server.get("/ilustracion", (req, res) => {
    res.sendFile(__dirname + "/views/ilustracion.html");
});

server.get("*", (req, res) => {
    res.status(404).sendFile(__dirname + "/views/not-found.html");
});

server.listen(PORT, () => {
    console.log("Server running");
});

function validateForm(name, email, subject, message) {
    /** Alternative and simpler regex 
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
    **/
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let emailValidator = emailRegex.test(email);

    const fieldsArr = [name, subject, message];

    let fieldsValidator = fieldsArr.every((item) => {
        return item !== "";
    });

    if (fieldsValidator && emailValidator) {
        return true;
    } else {
        return false;
    }
}
