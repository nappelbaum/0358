// ==UserScript==
// @name         Bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       AgafonovAS
// @match        https://ya.ru/*
// @match        https://www.drive2.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let input = document.getElementsByName("text")[0];
let checkEl = document.querySelector(".image-search");
let searchBtn = document.querySelector(".search3__button");
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
      searchBtn.click();
    }
  }, 200)

} else if (location.hostname == "www.drive2.ru") {
    //Работаем на целевом сайте
    console.log("Мы на целевом сайте!");
    setInterval(() => {
      let index = getRandom(0, links.length);

      if (getRandom(0, 101) >= 80) {
        location.href = "https://ya.ru/";
      } else if (links[index].href.includes("drive2.ru")) {
       links[index].click();
      }
    }, getRandom(2000, 5000))

  } else {
    //Работаем на странице поисковой выдачи
    let nextPage = true;
    for (let i = 0; i < links.length; i++) {
      if (links[i].href.includes("drive2.ru")) {
        let ylink = links[i];
        nextPage = false;
        console.log("Нашел строку!" + ylink);
        ylink.target = "_self";
        setTimeout(() => {
          ylink.click();
        }, getRandom(2500, 5000))
        break;
      }
    }
    let elemExist = setInterval(() => {
      let element = document.querySelector(".Pager-Item_current");
      if (element != null) {
        if (element.innerText == "5") {
          nextPage = false;
          location.href = "https://ya.ru/";
        }
        clearInterval(elemExist);
      }
    }, 100)

    if (nextPage) {
      setTimeout(() => {
        document.querySelector(".Pager-Item_type_next").click();
      }, getRandom(3000, 5000))
    }
  }


function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

