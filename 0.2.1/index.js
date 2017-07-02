#!/usr/bin/env node

/**
 * Writing-Service Front-End Server
 * ver: 0.2.1
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
    };
    let userfile = JSON.parse(
        fs.readFileSync(`data/usr/${data.user.id}.json`)
    );
    
    data.user.name = userfile.name;

    switch (req.item) {
        case 'writing':
            data.articles = [
                {
                    id : 'anewid',
                    author: 'Hepheir',
                    datetime: '2017-07-02T15:30:45.687',
                    date: '어제 오후',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    tempsave: '임시저장'
                },
                {
                    id : 'adeeva',
                    author: 'Server-Side',
                    datetime: '2017-06-29 20:43:40',
                    date: '어제 오후',
                    desc: "힝ㄱIn this Supercharged Live Code Session, Paul & Surma implement `Super Charged`, codling in real time, bugs and all! Whether you are watching live or not, please send in your questions and comments to the guys as they will read them and if they can, answer them for you.",
                    tempsave: '임시저장'
                },
                {
                    id : 'avvsefa',
                    author: '다스베이더',
                    datetime: '2020-01-01T00:00:00',
                    date: '먼 미래에',
                    desc: "I am your father!",
                    tempsave: '나의 광선검을 받아랏! 뾰복 뿅 스-윙 스엉 즈으으으이이이잉!!~'
                }
            ];
            data.written = data.articles.length;
            break;
    
        case 'library':
            data.articles = [
                {
                    id: 'hello',
                    author: 'Author',
                    date: '어제',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    vote: {
                        up: '',
                        down: 'checked',
                        score: 12345
                    },
                    star: [
                        {
                            act: 1,
                            rate: true
                        },
                        {
                            act: 2,
                            rate: false
                        },
                        {
                            act: 3,
                            rate: false
                        },
                        {
                            act: 4,
                            rate: true
                        },
                        {
                            act: 5,
                            rate: false
                        },
                        {
                            act: 6,
                            rate: true
                        },
                        {
                            act: 7,
                            rate: false
                        }
                    ]
                },
                {
                    id: 'hey',
                    author: 'Athor',
                    date: '그제',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    vote: {
                        up: 'checked',
                        down: undefined,
                        score: 54321
                    },
                    star: [
                        {
                            act: 1,
                            rate: false
                        },
                        {
                            act: 2,
                            rate: false
                        },
                        {
                            act: 3,
                            rate: false
                        },
                        {
                            act: 4,
                            rate: false
                        },
                        {
                            act: 5,
                            rate: true
                        },
                        {
                            act: 6,
                            rate: false
                        },
                        {
                            act: 7,
                            rate: false
                        }
                    ]
                },
                {
                    id: 'aye',
                    author: 'Other',
                    date: '글피',
                    desc: '로렘 입솜 도롤 싵 아멭, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    vote: {
                        up: '',
                        down: undefined,
                        score: 0
                    },
                    star: [
                        {
                            act: 1,
                            rate: true
                        },
                        {
                            act: 2,
                            rate: true
                        },
                        {
                            act: 3,
                            rate: true
                        },
                        {
                            act: 4,
                            rate: true
                        },
                        {
                            act: 5,
                            rate: true
                        },
                        {
                            act: 6,
                            rate: false
                        },
                        {
                            act: 7,
                            rate: true
                        }
                    ]
                }
            ];
            break;


        case 'newsfeed':
            data.articles = [
                {
                    id: 'hello',
                    author: 'Author',
                    date: '어제',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    vote: {
                        up: '',
                        down: 'checked',
                        score: 12345
                    },
                    star: [
                        {
                            act: 1,
                            rate: true
                        },
                        {
                            act: 2,
                            rate: false
                        },
                        {
                            act: 3,
                            rate: false
                        },
                        {
                            act: 4,
                            rate: true
                        },
                        {
                            act: 5,
                            rate: false
                        },
                        {
                            act: 6,
                            rate: true
                        },
                        {
                            act: 7,
                            rate: false
                        }
                    ]
                },
                {
                    id: 'hey',
                    author: 'Athor',
                    date: '그제',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    vote: {
                        up: 'checked',
                        down: undefined,
                        score: 54321
                    },
                    star: [
                        {
                            act: 1,
                            rate: false
                        },
                        {
                            act: 2,
                            rate: false
                        },
                        {
                            act: 3,
                            rate: false
                        },
                        {
                            act: 4,
                            rate: false
                        },
                        {
                            act: 5,
                            rate: true
                        },
                        {
                            act: 6,
                            rate: false
                        },
                        {
                            act: 7,
                            rate: false
                        }
                    ]
                },
                {
                    id: 'aye',
                    author: 'Other',
                    date: '글피',
                    desc: '로렘 입솜 도롤 싵 아멭, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    vote: {
                        up: '',
                        down: undefined,
                        score: 0
                    },
                    star: [
                        {
                            act: 1,
                            rate: true
                        },
                        {
                            act: 2,
                            rate: true
                        },
                        {
                            act: 3,
                            rate: true
                        },
                        {
                            act: 4,
                            rate: true
                        },
                        {
                            act: 5,
                            rate: true
                        },
                        {
                            act: 6,
                            rate: false
                        },
                        {
                            act: 7,
                            rate: true
                        }
                    ]
                }
            ];
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