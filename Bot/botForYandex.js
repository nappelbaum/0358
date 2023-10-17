// ==UserScript==
// @name         Bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       AgafonovAS
// @match        https://ya.ru/*
// @match        https://*.avtomir.ru/*
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
  console.log("Работаем на главной странице");
  let i = 0;
  let timerId = setInterval(() => {
    input.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      searchBtn.click();
    }
  }, 200)

} else if (location.href.includes("avtomir.ru")) {
    //Работаем на целевом сайте
    console.log("Мы на целевом сайте!");
    setInterval(() => {
      let index = getRandom(0, links.length);

      if (getRandom(0, 101) >= 70) {
        location.href = "https://ya.ru/";
      }
     if (links[index].href.includes("avtomir.ru")) {
       links[index].click();
      }
    }, getRandom(1000, 1500))

  } else if (document.querySelector(".Pager-ListItem") != null) {
    //Работаем на странице поисковой выдачи
    console.log("Работаем на странице поисковой выдачи");
    let nextPage = true;
    for (let i = 0; i < links.length; i++) {
      if (links[i].href.includes("avtomir.ru")) {
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

