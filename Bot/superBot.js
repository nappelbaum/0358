// ==UserScript==
// @name         SuperBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       AgafonovAS
// @match        https://ya.ru/*
// @match        https://www.bing.com/*
// @match        https://napli.ru/*
// @match        https://motoreforma.com/*
// @match        https://kiteuniverse.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let links = document.links;
let sites = {"napli.ru": ["10 самых популярных шрифтов Google",
                          "Отключение редакций и ревизий",
                          "Вывод произвольных типов записей и полей", "Git для всех платформ"],
             "motoreforma.com": ["тюнинг Can-Am Maverick X3", "Прошивки BRP", "вариатор CV-Tech"],
             "kiteuniverse.ru": ["Kite Universe Россия", "Красота. Грация. Интеллект", "Мастер классы Kite"]
            }
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
let systems = [{hostname: "ya.ru",
               input: document.getElementsByName("text")[0],
               checkEl: document.querySelector(".image-search"),
               searchBtn: document.querySelector(".search3__button"),
               currentPage: document.querySelector(".Pager-Item_current"),
               nextBtn: document.querySelector(".Pager-Item_type_next")},
              {hostname: "www.bing.com",
               input: document.getElementsByName("q")[0],
               checkEl: document.getElementById("search_icon"),
               searchBtn: document.getElementById("search_icon"),
               currentPage: document.querySelector(".sb_pagS"),
               nextBtn: document.querySelector(".sb_pagN")}];

let system = systems[0];
if (systems.some((sys) => sys.hostname == location.hostname)) {
    system = systems.find((sys) => sys.hostname == location.hostname);
}

if (system.checkEl) {
  document.cookie = `site=${site}`;
} else if (location.hostname.includes(system.hostname)){
  site = getCookie("site");
} else {
  site = location.hostname;
}

//Работаем на главной странице
if (system.checkEl) {
  console.log("Работаем на главной странице");
  if (system.hostname === "www.bing.com") {
      system.input.value = keyword;
      system.searchBtn.click();
  } else {
      let i = 0;
      let timerId = setInterval(() => {
          system.input.value += keyword[i];
          i++;
          if (i == keyword.length) {
              clearInterval(timerId);
              system.searchBtn.click();
          }
      }, 200)
  }

} else if (location.hostname.includes(site)) {
    //Работаем на целевом сайте
    console.log("Мы на целевом сайте!");
    setInterval(() => {
      let index = getRandom(0, links.length);
      let check = getRandom(0, 101);
      if (check >= 80) {
        system = systems[getRandom(0, systems.length)];
        location.href = `https://${system.hostname}/`;
      } else {
          if (links[index].href.includes(site)) {
                  links[index].click();
          }
      }
    }, getRandom(2500, 5000))

  } else if (system.currentPage) {
    //Работаем на странице поисковой выдачи
    console.log("Работаем на странице поисковой выдачи");
    let nextPage = true;
    for (let i = 0; i < links.length; i++) {
      if (links[i].href.includes(site)) {
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
      let element = system.currentPage;
      if (element != null) {
        if (element.textContent == "4") {
          nextPage = false;
          system = systems[getRandom(0, systems.length)];
          location.href = `https://${system.hostname}/`;
        }
        clearInterval(elemExist);
      }
    }, 100)

    if (nextPage) {
      setTimeout(() => {
        system.nextBtn.click();
      }, getRandom(3000, 5000))
    }
  }


function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
