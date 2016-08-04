/* globals require, module */
'use strict';

const Commands = require('../constants/Commands');

var Utils = {
    getCallType: (text) => {
        if (text.trim() === '') {
            return Commands.youWeak;
        }

        var textFragments   = text.split(' '),
            key             = textFragments[0];

        if (Commands.hasOwnProperty(key)) {
            return key;
        }

        return Commands.youWeak;
    },

    getNumberBetween: (numOne, numTwo) => {
        if (numOne - numTwo >= 0) throw 'Noooo :(';

        return Math.floor(Math.random() * numTwo) + numOne;
    },

    getMattieRogersVideoURLs: () => {
        // TODO: Return these in SQLite database
        return [
            'https://www.youtube.com/watch?v=J3MiGb1SQMQ',
            'https://www.youtube.com/watch?v=BG2-XRDIpqo',
            'https://www.youtube.com/watch?v=T6M-8Zg_8c8',
            'https://www.youtube.com/watch?v=oPLsZACFijU',
            'https://www.youtube.com/watch?v=_FQELO-ZeOQ',
            'https://www.youtube.com/watch?v=plmgyeJvOhM',
            'https://www.youtube.com/watch?v=G1_KVmsnr7Y'
        ];
    },

    getRandomPreselectedMattieRogersVideoURL: () => {
        var mattieRogersVideoURLs   = Utils.getMattieRogersVideoURLs(),
            start                   = 0,
            end                     = mattieRogersVideoURLs.length - 1,
            randomIndex             = Utils.getNumberBetween(start, end);

        return mattieRogersVideoURLs[randomIndex];
    }
};

module.exports = Utils;