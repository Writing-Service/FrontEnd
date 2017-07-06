#!/usr/bin/env node

/**
 * Writing-Service Server
 * ver: 0.2.2
 * Hepheir@gmail.com
 */

'use strict';

const port = 3000;

const express = require('express');
const fs = require('mz/fs');
const handlebars = require('handlebars')

const app = express();

/** handlebars object */
function dataProcessing(req){
    return req;
}


const topLevelSection = /([^/]*)(\/|\/index.html)$/;

app.get(topLevelSection, (req, res) => {
    req.item = req.params[0];
    res.send(toString(console.log(req)));
    return;

    let files;

    if ('partial' in req.query) {
        files = [fs.readFileSync(`app/${req.item}/index.html`)];
    } else {
        files = [
            fs.readFileSync('app/header.partial.html'),
            fs.readFileSync(`app/${req.item}/index.html`),
            fs.readFileSync('app/footer.partial.html')
        ];
    }

    Promise.all(files)
    .then(files => files.map(f => f.toString('utf-8')))
    .then(files => files.map(f => handlebars.compile(f)(dataProcessing(req))))
    .then(files => {
        const content = files.join('');

        res.send(content);
    })
});

app.use(express.static('app'));
app.listen(port, () => {
    console.log(`server listening to port ${port}`);
}); 