/* --- Http Client --- */

// --- config ---
let n = 10; // количество запросов
let type = 'async';  // 'sync' || 'async' - синхронный/асинхронный режим отправки запросов

// --- variables ---
let timeAll = 0;
let countAsyncN = 0;

// --- script ---
const rp = require('request-promise');
function request(number, type, maxNumber) {
    const n = number;
    const max = maxNumber;
    let options = {
        method: 'GET',
        uri: 'http://127.0.0.1:8081',
        body: {
            id: n
        },
        json: true
    };
    const timeStart = new Date().getTime();
    console.log(type + ' request (' + n + ') sending...');
    return rp(options)
        .then(() => {
            let timeRequest = new Date().getTime() - timeStart;
            if (type === 'sync') timeAll += timeRequest;
            else {
                if (timeRequest > timeAll) timeAll = timeRequest;
            }
            console.log(type + ' request (' + n + ') succeeded - about ' + timeRequest + ' ms');
        })
        .catch(() => {
            console.log(type + ' request (' + n + ') failed');
        })
        .finally(() => {
            countAsyncN++;
            if (type === 'sync') {
                if (n < max) request(n + 1, type, max);
                if (n >= max) console.log('All time - about ' + timeAll + ' ms');
            }
            else {
                if (countAsyncN >= max) console.log('All time - about ' + timeAll + ' ms');
            }
        })
}
if (type === 'sync') request(1, 'sync', n);
else {
    for(let i = 1; i <= n; i++){
        request(i, 'async', n);
    }
}
