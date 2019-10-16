"use strict";

async function promiseReduce(asyncFunctions, reduce, initialValue) {
    let result = initialValue;
    for(let f of asyncFunctions){
        await (f().then((value) => (result = reduce(result, value))));
    }
    return result;
}

/* --- Example ---
    var fn1 = () => {
        console.log('fn1');
        return Promise.resolve(1);
    }

    var fn2 = () => new Promise(resolve => {
        console.log('fn2');
        setTimeout(() => resolve(2), 1000);
    })

    function reduce(memo, value) {
        console.log('reduce');
        return memo * value;
    }

    var initialValue = 1;

    promiseReduce(
        [fn1, fn2],
        reduce,
        initialValue
    ).then(console.log)
*/
