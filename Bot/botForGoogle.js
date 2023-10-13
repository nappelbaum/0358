// ==UserScript==
// @name         Bot for google
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let input = document.getElementsByName("q")[0];
let checkEl = document.querySelector("input[name='btnK']");
let links = document.links;
let keywords = ["каталог автомобилей", "продажа автомобилей", "купить автомобиль"];
let keyword = keywords[getRand(0, keywords.length)];

if (checkEl != null) {
    input.value = keyword;

    let ev = new KeyboardEvent('keydown', {
        keyCode: 13,
        bubbles: true
    });
    input.dispatchEvent(ev);
}

for (let i = 0; i < links.length; i++) {
    let link = links[i];
    if (link.href.includes("auto.ru")) {
        link.click();
        break;
    }
}

function getRand (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
