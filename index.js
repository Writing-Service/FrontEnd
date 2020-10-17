#!/usr/bin/env node

/**
 * Writing-Service Server
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


app.get(/([^/]*)(\/|\/index.html)$/, (req, res) => {

    if ('login' == req.params[0] || 'logout' == req.params[0] || 'loginasadmin' == req.params[0]) {
        req.isLogin = false;
        req.item = req.params[0];
    } else {
        req.isLogin = loginValidation(req);
        req.item = req.isLogin ? req.params[0] : 'login';
    }
    

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
    .then(files => files = files.join(''))
    .then(files => handlebars.compile(files)(handlebarsContext(req, res)))
    .then(files => {
        const content = files;

        res.send(content);
    })
});


app.post('/reqthread/', (req, res) => {
    const content = {
        thread_id: createID(),
        author: {
            name: '디버그의 신'
        },
        datetime: new Date(Date.now() - 86400000 * 3 + 5000),
        date: '방금 전',
        content: '디데이가 5초 밖에 남지 않은 카드를 만들어 주마!',
        save: '유저의 임시저장 내용'
    };

    res.send(JSON.stringify(content));
});

app.post('/reqseries/', (req, res) => {
    const series = getSeriesJSON('j50384el');

    let content = {
        iaa:1
    };

    res.send(JSON.stringify(content));
});


// Login Validation
function loginValidation(req){
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
        // Capitalize first letter
        page_title: req.item.charAt(0).toUpperCase() + req.item.slice(1),
        header_title: 'Writing-Service'
    };

    if (!req.isLogin){
        return context;
    }

    try {
        const user = getUserJSON(req.cookies.user_id);
        
        context.user = {
            name: user.name,
            recent_contributes: user.recent_contributes
        };

        if (req.item == 'writing' || req.item == ''){
            if (req.item == '') {
                req.query.id = 'adminthread';
            }
            let thread = getThreadJSON(req.query.id),
                article = {
                    id: thread.thread_id,
                    author: user.name,
                    datetime: thread.user_datetime,
                    date: '어제',
                    content: thread.articles[thread.articles.length - 1].content,
                    saved: findObjectInArrayByKeyValue(user.docs.articles, 'thread_id', thread.thread_id).saved
                };
            context.article = article;
        
        } else if (req.item == 'library' || req.item == 'newsfeed'){
            let series = getSeriesJSON('j50384el'),
                articles = [
                    {
                        id: series.series_id,
                        author: series.articles[0].author_id,
                        datetime: series.articles[0].datetime,
                        date: '어제',
                        content:series.articles[0].content,
                        star: [
                            {
                                act: 1,
                                satisfied: series.articles[0].satisfied
                            },
                            {
                                act: 2,
                                satisfied: series.articles[1].satisfied
                            },
                            {
                                act: 3,
                                satisfied: series.articles[2].satisfied
                            },
                            {
                                act: 4,
                                satisfied: series.articles[3].satisfied
                            },
                            {
                                act: 5,
                                satisfied: series.articles[4].satisfied
                            },
                            {
                                act: 6,
                                satisfied: series.articles[5].satisfied
                            },
                            {
                                act: 7,
                                satisfied: series.articles[6].satisfied
                            }
                        ],
                        vote: {
                            score: series.vote.up.length - series.vote.down.length,
                            // admin id
                            up: true,
                            down: false,
                        }
                    },
                    {
                        id: 'asdfar12d',
                        author: series.articles[1].author_id,
                        datetime: series.articles[1].datetime,
                        date: '내일',
                        content: series.articles[1].content,
                        star: [
                            {
                                act: 1,
                                satisfied: false
                            },
                            {
                                act: 2,
                                satisfied: true
                            },
                            {
                                act: 3,
                                satisfied: true
                            },
                            {
                                act: 4,
                                satisfied: true
                            },
                            {
                                act: 5,
                                satisfied: true
                            },
                            {
                                act: 6,
                                satisfied: true
                            },
                            {
                                act: 7,
                                satisfied: false
                            }
                        ],
                        vote: {
                            score: series.vote.up.length - series.vote.down.length,
                            // admin id
                            up: true,
                            down: false,
                        }
                    }
                ];
            context.articles = articles;
        }

        
    } catch (err) {
        throw err;
        return '';
    }

    return context;
}

// JSON Handlers
function findObjectInArrayByKeyValue(array, key, value){
    for (var a in array){
        if (value == array[a][key])
            return array[a];
    }

    return false;
}

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
    console.log(`server listening to port ${port}`);
}); 