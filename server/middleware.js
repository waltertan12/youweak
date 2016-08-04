/* globals module, require */
'use strict';

const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const Config        = require('../Config');

module.exports = (app, config) => {
    app.use(express.static(config.static_path));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(morgan('combined'));

    // Check for a valid Slack token
    app.use('/weak', (req, res, next) => {
        if (req.method === 'POST' && (!req.body || !req.body.token || !Config.tokens.hasOwnProperty(req.body.token))) {
            return res.status(403).json({
                status: 403,
                success: false,
                errors: [ 'Invalid Slack token' ]
            });
        }

        next();
    });
};
