#!/usr/bin/env node

/**
 * 
 * Writing-Service BackEnd Server
 * ver: 0.02
 * Author: Hepheir
 * 
 * Start: Jun 15th, 2017
 * End:
 * 
 */

'use strict';

const port = 3000;

const express = require('express');
const fs = require('mz/fs');
const handlebars = require('handlebars')

const app = express();

// temporal data reader function for compiling handlebars
function handlebarsData(item) {
    let data;
    switch (item) {
        case 'writing':
            data = {
                page_title: 'Writing',
                header_title: 'Writing',
                user: {
                    id: 'Hepheir',
                    written_motives: 3
                },
                articles: [
                    {
                        id: 'asjk312',
                        author: 'Hepheir',
                        date: '어젯밤',
                        dueto: '17:01:33:59',
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                        tempsave : '나에게 돌아오기가 어렵고 힘든 걸 알아\n이제 더는 상처받기가 두렵고 싫은 걸 알아\n네가 떠나 버린 그날에도 모진 말로 널 울리고\n뒤돌아 서서 후회해 미안해'
                    },
                    {
                        id: 'adeeva',
                        author: 'Server-Side Rendering',
                        date: '2016. 9. 15',
                        dueto: '15:00:00:00',
                        desc: '힝ㄱIn this Supercharged Live Code Session, Paul & Surma implement `Super Charged`, codling in real time, bugs and all! Whether you are watching live or not, please send in your questions and comments to the guys as they will read them and if they can, answer them for you.',
                        tempsave: ''
                    },
                    {
                        id: 'avvsefa',
                        author: '다스베이더',
                        date: '먼 미래에',
                        dueto: '280:23:59:59',
                        desc: 'I am your father!',
                        tempsave : '나의 광선검을 받아랏! 뾰복 뿅 스-윙 스엉 즈으으으이이이잉!!~'
                    }
                ],
            };
            break;
    
        case 'library':
            data = {
                page_title: 'Ho',
                header_title: 'Library',
                user: {
                    id: 'HaDongHo'
                }
            };
            break;
    
        case 'newsfeed':
            data = {
                page_title: 'Pow!!',
                header_title: 'Newsfeed',
                user: {
                    id: '동현이는뭐하고지내니'
                }
            };
            break;
    
        default:
            data = {
                page_title: 'Hey',
                header_title: 'Writing',
                user: {
                    id: 'Hepheir'
                }
            };
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
    .then(files => files.map(f => handlebars.compile(f)(handlebarsData(req.item))))
    .then(files => {
        const content = files.join('');

        res.send(content);
    })
});

app.use(express.static('app'));
app.listen(port, () => {
    console.log(`server listening to port ${port}`);
}); 