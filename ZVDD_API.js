//  OFFICIAL ZVDD API
//  HTTPS://WWW.ZEEHONDVANDEDAG.NL
//  VOOR MEER VRAGEN MAIL FENDER@ZEEHONDVANDEDAG.NL
//  LICENSE CC BY-NC-ND https://creativecommons.org/licenses/by-nc-nd/4.0/
const https = require('https');
const fs = require('fs');

function getSealNumber() {
    var totalSeals = 93; // KIJK NAAR REGEL 11 OP HTTPS://WWW.ZEEHONDVANDEDAG.NL/SCRIPT.JS EN VERANDER HET
// 29-12-2023 var totalSeals = 93
    var date = new Date().toLocaleString("en-US", {timeZone: "Europe/Amsterdam"});
    date = new Date(date);

    var seed = date.getFullYear() * 365 + date.getMonth() * 30 + date.getDate();

    function pseudoRandom(seed, max) {
        seed = (seed * 9301 + 49297) % 233280;
        var rnd = seed / 233280;
        return Math.floor(rnd * max);
    }

    var randomSealNumber = pseudoRandom(seed, totalSeals) + 1;

    return randomSealNumber;
}

function downloadToday() {
    var sealNumber = getSealNumber();
    var url = 'https://zeehondvandedag.nl/photos/seal' + sealNumber + '.png';

    https.get(url, function(response) {
        var file = fs.createWriteStream("seal" + sealNumber + ".png");
        response.pipe(file);
    });
}

// DOWNLOAD DE ZEEHOND VAN VANDAAG

downloadToday()
