const fs = require('mz/fs');

var format = {
    user : {
        id : "",
        pw : "",
        token : "",
        token_expire : "",

        name : "",
        docs : {
            articles : [
                {thread_id : "", saved : ""}
            ]
        },
        recent_contributes: 0,
        contributes : [
            {series_id : "", act : ""}
        ]
    },
    thread: {
        id: "",
        user_id : "",
        user_datetime : "",
        articles : [
            {
                author_id: "",
                datetime: "",
                content: ""
            }
        ]
    },
    series: {
        id: "",
        vote : {
            up : ['user_id'],
            down : ['user_id']
        },
        articles : [
            {
                author_id: "",
                datetime: "",
                content: "",
                satisfied : ""
            }
        ]
    }
};

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


console.log(createID());

// 1499790791331
// 2821109907456 36^8

let content = {
        id: createID(),
        user_id : "admin",
        user_datetime : "",
        articles : [
            {
                author_id: "",
                datetime: "",
                content: ""
            }
        ]
    };