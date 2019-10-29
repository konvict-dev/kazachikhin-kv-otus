/* --- Http Server --- */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function work(dataReq, res) {
    let timePeriod = 100;
    let id = (dataReq.id ? '(' + dataReq.id + ')' : '');
    console.log('got request ' + id);
    await sleep(timePeriod);
    res.end('Ok');
    console.log('sent answer ' + id + ' after ' + timePeriod + ' ms');
}

require('http').createServer((req, res) => {
    let dataReq = '';
    req.on('data', function (chunk) {
        dataReq = JSON.parse(chunk);
    });
    req.on('end', function () {
        work(dataReq, res);
    });

}).listen(8081);
