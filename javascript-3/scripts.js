"use strict";

function getPath(el) {
    let element = el;
    let selector = '';
    do {
        let parent_selector = '';
        let classes = element.classList;
        let id = element.id;
        let tag = element.tagName;
        if (id){
            parent_selector = '#' + id;
        }
        else if (classes.length) {
            parent_selector = '.' + classes[0];
        }
        else {
            parent_selector = tag;
        }
        if (document.querySelectorAll(parent_selector + ' ' + selector).length > 1) {
            let list = document.querySelectorAll(parent_selector);
            if (list.length > 1){
                let parent = element.parentElement;
                let count = 0;
                let position = 0;
                for (let item of list) {
                    if (item.parentElement === element.parentElement) {
                        count++;
                        if (item === element) position = count;
                    }
                }
                if (count > 1) parent_selector += ':nth-child(' + position + ')';
            }
        }
        selector = parent_selector.toLowerCase() + (selector !== '' ? ' > ' : '') + selector;
        if (document.querySelectorAll(selector).length === 1) return selector;
        element = element.parentElement;
    } while(element !== null && element.tagName !== "HTML");
    return selector;
}
