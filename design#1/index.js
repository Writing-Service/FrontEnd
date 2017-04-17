'use strict';

const express = require('express'),
      fs = require('mz/fs');
      
const port = 3000;

const app = express();


app.get(/([^/]*)(\/|\/index.html)$/i, (req, res) => {
    req.item = req.params[0];

    // If the request has '?partial', render requested part only.
    let files;
    if ('partial' in req.query) {
        files = [fs.readFile(`app/${req.item}/index.html`)];
    } else {
        files = [
            fs.readFile('app/header.partial.html'),
            fs.readFile(`app/${req.item}/index.html`),
            fs.readFile('app/footer.partial.html')
        ];
    }

    Promise.all(files)
    .then(files => files.map(f => f.toString('utf-8')))
    .then(files => {
        const content = files.join('');
        res.send(content);
    })
    .catch(err => res.status(500).send(err.toString()));
});
app.use(express.static('app'));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})