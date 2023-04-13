const express = require('express');

const router = express.Router();

let counter = 0;

function generateTable(str, count){
    let html = '<table>\n'
    html+= '<tr>\n'
        html+=`<td style="border: 1px solid;padding: 20px ">${str}</td>\n`
        html+=`<td style="border: 1px solid;padding: 20px">${count}</td>\n`
        html+='</tr>\n'
    html+='</table>\n'
    return html;
}
let comments = [ "Comments1", "Comments2"];

router.get('/', function (req, res){
    res.status(200);
    res.send("<h1>Главная страница</h1>");
});

router.get('/stats', function (req, res){
    counter+=1;
    res.status(200);
    let userAgent = req.headers["user-agent"].toString();
    res.send(generateTable(userAgent,counter));
});

router.post('/stats', function (req, res){
    res.status(400);
    res.send('Error! No POST request');
});

router.get('/comments', function (req, res){
    res.status(200);
    res.json(comments);
});

router.post('/comments',  express.json(),function (req, res){
    res.status(200);
    comments.push(...req.body['comment']);
    res.json(comments);
});


module.exports = router;