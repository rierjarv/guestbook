var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = [];

app.locals.entries = entries;

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

// ROUTES 

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/new-entry", (req, res) => {
    res.render("new-entry");
})

app.post("/new-entry", (req, res) => {
    if (!req.body.title || !req.body.body) {
        res.status(400).send("Otsikko ja teksti vaaditaan!");
        return;
    }
    entries.push({
        title: req.body.title,
        content: req.body.body,
        omanimi: req.body.omanimi,
        omakuva: req.body.omakuva,
        published: new Date().toLocaleString()
        // arvaus: req.body.arvaus,
    });
    res.redirect("/");
});

app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(3000, () => {
    console.log("Vieraskirja käynnissä portissa 3000");
})
