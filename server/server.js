/* globals module, require, __dirname, static_path, process, console */
'use strict';

// =============================================
// imports...
// =============================================
const express       = require('express');
const path          = require('path');
const Utils         = require('./helpers/Utils');
const http          = require('http'); // For YouTube API
const Commands      = require('./constants/Commands');

// =============================================
// create the app
// =============================================
var app = express();

// =============================================
// configuration
// =============================================
const config = {
    static_path: path.normalize(__dirname + '/../public'),
    port: 8000,
    env: process.env.NODE_ENV || 'development'
};

// =============================================
// connect to the db
// =============================================
// TODO: use sqlite

// =============================================
// middleware
// =============================================
require('./middleware.js')(app, config);

// =============================================
// routing
// =============================================
app.get('/', (req,res) => {
    res.sendFile(path.normalize(static_path + '/index.html'));
});

app.post('/weak', (req, res) => {
    console.log(req.body);
    var type = Utils.getCallType(req.body.text),
        username;

    switch (type) {
        case Commands.dyel:
            return res.json({
                response_type: 'in_channel',
                text: '@' + req.body.user_name + ' :weary: http://i.imgur.com/TZp0r0v.jpg'
            });

        case Commands.mattie:
            return res.json({
                response_type: 'in_channel',
                text: '@' + req.body.user_name  + 
                    ' You\'re weak, bro :disappointed: Instead, be strong like Mattie ' + 
                    Utils.getRandomPreselectedMattieRogersVideoURL()
            });

        case Commands.inspire:
            return res.json({
                response_type: 'in_channel',
                text: 'Wow, an inspiring video https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            });

        case Commands.addMattie:
            return res.json('Adding Mattie video');

        case Commands.addPepe:
            return res.json('Adding new pepe meme');

        default:
            username = req.body.text || req.body.user_name || '';

            return res.json({
                response_type: 'in_channel',
                text: '@' + username + ' You\'re weak, bro :rip:'
            });
    }
});

// =============================================
// run the app
// =============================================
app.listen(config.port);

module.exports = app;
