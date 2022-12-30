require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const errorHandler = require('errorhandler');

const server = express();
const path = require('path');
const port = 3000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(errorHandler());
server.use(express.static(path.join(__dirname, 'dist')));

server.use(function (req, res, next) {
    res.set('Cache-control', 'public, max-age=31536000');

    next();
});

server.set('views', path.join(__dirname, 'src/views'));
server.set('view engine', 'pug');

//? ----- Pages Routing -----
server.get('/', async (req, res) => {
    res.render('pages/home');

    console.log('Node-Express back-end configuration ready!');
});

//? ----- 404 Routing -----
server.get('*', async (req, res) => {
    res.render('pages/404');
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
