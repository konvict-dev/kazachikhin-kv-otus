"use strict";

let sum = (() => {
    let s = 0;
    let f = (y) => {
        if (typeof y !== "number" || Number.isNaN(y)) return s;
        s += y;
        return f;
    };
    return f;
})();