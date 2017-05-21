'use strict';

const port = 3000;

const express = require('express');
const fs = require('mz/fs');

const app = express();

app.get(/([^/]*)(\/|\/index.html)$/, (req, res) => {
    req.item = req.params[0];

    let files;

    if ('partial' in req.query) {
        files = fs.readFileSync(`app/${req.item}/index.html`);
    } else {
        files = [
            fs.readFileSync('app/header.partial.html'),
            fs.readFileSync(`app/${req.item}/index.html`),
            fs.readFileSync('app/footer.partial.html')
        ];
    }

    files.map(f => f.toString('utf-8'));

    const content = files.join('');

    res.send(content);
});

app.use(express.static('app'));
app.listen(port, () => {
    console.log(`server listening to port ${port}`);
}); 