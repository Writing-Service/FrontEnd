#!/usr/bin/env node

/**
 * Writing-Service Front-End Server
 * ver: 0.02
 * Hepheir@gmail.com
 */

'use strict';

const port = 3000;

const express = require('express');
const fs = require('mz/fs');
const handlebars = require('handlebars')

const app = express();


// temporal data reader function for compiling handlebars
function handlebarsData(req) {
    req.item = req.item || 'Writing-Service';
    let data = {
            page_title: req.item,
            header_title: req.item.charAt(0).toUpperCase() + req.item.slice(1),
            user: {
                id: 'hepheir'
            }
        },
        userfile = JSON.parse(
            fs.readFileSync(`data/usr/${data.user.id}.json`)
        );
    
    data.user.name = userfile.name;

    switch (req.item) {
        case 'writing':
            data.articles = userfile.articles;
            data.user.written_motives = userfile.written_motives;
            break;
    
        case 'library':
            let threadlist = JSON.parse(
                    fs.readFileSync('data/new-thread.json')
                ),
                thread = new Array();
            
            for (let i = 0; i < threadlist.length; i++) {
                thread[i] = JSON.parse(
                    fs.readFileSync(`data/thread/${threadlist[i].id}.json`)
                );
            }
            thread.map(t => t.articles = t.articles[0]);

            data.threads = thread;
            break;
    
        case 'newsfeed':
            break;
    
        default:
            break;
    }
    return data;
}



app.get(/([^/]*)(\/|\/index.html)$/, (req, res) => {
    req.item = req.params[0];

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
    .then(files => files.map(f => handlebars.compile(f)(handlebarsData(req))))
    .then(files => {
        const content = files.join('');

        res.send(content);
    })
});

app.use(express.static('app'));
app.listen(port, () => {
    console.log(`server listening to port ${port}`);
}); 