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

//РАБОТАЕТ ТОЛЬКО С ОТКРЫТОЙ ВКЛАДКОЙ (( Есть бот для яндекса

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
      let check = getRandom(0, 101);

      if (check >= 80) {
        location.href = "https://www.google.com/";
      } else {
          if (links[index].href.includes("kia.ru")) {
                  links[index].click();
          }
      }
    }, getRandom(2500, 5000))

  } else {
    //Работаем на странице поисковой выдачи
    let page = 0;
    function interval() {
        for (let i = 0; i < links.length; i++) {
            let link = links[i];
            if (link.href.includes("kia.ru")) {
                setTimeout(() => {
                    link.click();
                }, getRandom(1500, 2500))
                break;
            }
        }

        page++;
        if (page <= 7) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
            });
            setTimeout(interval, getRandom(2500, 5000));
        }
        else location.href = "https://www.google.com/";
    }
    setTimeout(interval, getRandom(2500, 5000));
  }


function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
