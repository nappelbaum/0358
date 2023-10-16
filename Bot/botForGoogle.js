// ==UserScript==
// @name         Bot for google
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       AgafonovAS
// @match        https://www.google.com/*
// @match        https://www.kia.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let input = document.getElementsByName("q")[0];
let checkEl = document.querySelector("input[name='btnK']");
let links = document.links;
let keywords = ["каталог автомобилей", "продажа автомобилей", "купить автомобиль"];
let keyword = keywords[getRandom(0, keywords.length)];

//Работаем на главной странице
if (checkEl != null) {
  let i = 0;
  let timerId = setInterval(() => {
    input.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      let ev = new KeyboardEvent('keydown', {
        keyCode: 13,
        bubbles: true
    });
    input.dispatchEvent(ev);
    }
  }, 200)

} else if (location.hostname == "www.kia.ru") {
    //Работаем на целевом сайте
    console.log("Мы на целевом сайте!");
    setInterval(() => {
      let index = getRandom(0, links.length);

      if (getRandom(0, 101) >= 80) {
        location.href = "https://www.google.com/";
      }
     if (links[index].href.includes("kia.ru")) {
       links[index].click();
      }
    }, getRandom(2000, 5000))

  } else {
    //Работаем на странице поисковой выдачи
    let i = 0;
    function interval() {
        for (let i = 0; i < links.length; i++) {
            let link = links[i];
            if (link.href.includes("kia.ru")) {
                link.click();
                break;
            }
        }

        i++;
        if (i <= 6) {
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(interval, getRandom(2500, 5000));
        }
        else location.href = "https://www.google.com/";
    }
    setTimeout(interval, getRandom(2500, 5000));
  }


function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
