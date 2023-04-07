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
//let comments = [{"name" : "Comments", "value":"1"}, {"name" : "Comments", "value":"2"}];
let comments = [ "Comments1", "Comments2"];

router.get('/', function (req, res){
    
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello');
    res.end();
    
});

router.get('/stats', function (req, res){
    counter+=1;
    res.statusCode  = 200;
    res.setHeader('Content-Type', 'text/html');
    let userAgent = req.headers["user-agent"].toString();
    res.end(generateTable(userAgent,counter));
});

router.post('/stats', function (req, res){
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    })
    req.on('end', () => {
        res.setHeader('Content-Type', 'text/plain');
        res.end('Error! No POST request');
    })
});

router.get('/comments', function (req, res){
    res.statusCode  = 200;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(comments))
});

router.post('/comments', function (req, res){
    let body = "";
    req.on('data', (chunk) =>{
        body +=chunk.toString();
    });
        req.on('end', () =>{
        comments.push(body);
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(comments))
    });
});

module.exports = router;