#!/usr/bin/env node

/**
 * Writing-Service Server
 * ver: 0.2.2
 * Hepheir@gmail.com
 */

'use strict';

const port = 3000;

const express = require('express')
    , fs = require('mz/fs')
    , handlebars = require('handlebars')
    , cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());


const topLevelSection = /([^/]*)(\/|\/index.html)$/;

app.get(topLevelSection, (req, res) => {

    if ('login' == req.params[0] || 'logout' == req.params[0] || 'loginasadmin' == req.params[0]) {
        req.isLogin = false;
        req.item = req.params[0];
    } else {
        req.isLogin = userLogin(req);
        req.item = req.isLogin ? req.params[0] : 'login';
    }

    // show newsfeed as default (on home '/')
    req.item = req.item == '' ? 'writing' : req.item;

    // capitalize first letter
    req.item = req.item.charAt(0).toUpperCase() + req.item.slice(1);

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
    .then(files => files.map(f => handlebars.compile(f)(handlebarsContext(req, res))))
    .then(files => {
        const content = files.join('');

        res.send(content);
    })
});


app.post('/newthread/', (req, res) => {
    const content = {
        thread_id: 'thisisthreadid',
        author: {
            name: 'Authooooor'
        },
        datetime: new Date(),
        date: '방금 전',
        content: '이건 내용이닷 이거나 먹어랏! 빠샤',
        save: '유저의 임시저장 내용'
    };

    res.send(JSON.stringify(content));
});

// Login Validation
function userLogin(req){
    if (!req.cookies.user_id || !req.cookies.user_token) {
        return false;
    }

    // see if user data exists in database
    let user = getUserJSON(req.cookies.user_id);

    if(!user){
        return false;
    }

    // compare login tokens in cookie and database
    if (user.token === req.cookies.user_token){

        user.token_expires = user.token_expires ? user.token_expires : 0;

        // Update token expire (1 Day)
        if (new Date(user.token_expires).getTime() - Date.now() <= 0){
            user.token_expires = new Date(Date.now() + 86400000);
        }
        return true;
    }
    
    return false;
}


// Create object for compiling handlebars

function handlebarsContext(req, res){
    let context = {
        page_title: req.item,
        header_title: 'Writing-Service'
    };

    if (!req.isLogin){
        return context;
    }

    const user = getUserJSON(req.cookies.user_id);
    
    context.user = {
        name: user.name,
        recent_contributes: user.recent_contributes
    };



    return context;
}

// JSON Handlers

function overwriteJSON(file, change){
    try {
        fs.writeFileSync(file, JSON.stringify(
            change(JSON.parse(fs.readFileSync(file)))
        ));
    } catch (err) {
        return err;
    }
    return true;
}

function getUserJSON(user_id){
    if (!user_id) {
        return false;
    } return JSON.parse(fs.readFileSync(`data/user/${user_id}.json`));
}

function getThreadJSON(thread_id){
    if (!thread_id) {
        return false;
    } return JSON.parse(fs.readFileSync(`data/thread/${thread_id}.json`));
}

function getSeriesJSON(series_id){
    if (!series_id) {
        return false;
    } return JSON.parse(fs.readFileSync(`data/series/${series_id}.json`));
}

// ID Generator
function createID() {
    let a = Date.now(),
        b,
        c = '',
        d = '0123456789abcdefghijklmnopqrstuvwxyz',
        i;

    for (i = 1; i*d.length < a; i *= d.length) {};

    while (!(i < 1)) {
        b = a%i;
        c += d[(a - b)/i];
        a = b;
        i /= d.length;
    }
    return c;
}

app.use(express.static('app'));
app.listen(port, () => {
    console.log(`0.2.2 server listening to port ${port}`);
}); 