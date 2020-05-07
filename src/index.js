import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'fetch-polyfill';
import 'es6-promise/auto';
import 'formdata-polyfill';

import makeTimer from './modules/makeTimer';
import showMenu from './modules/showMenu';
import showPopup from './modules/showPopup';
import scrollingPage from './modules/scrollingPage';
import tabs from './modules/tabs';
import slider from './modules/slider';
import addDots from './modules/addDots';
import validateCalcInputs from './modules/validateCalcInputs';
import showOurCommandImg from './modules/showOurCommandImg';
import calc from './modules/calc';
import setFormRequests from './modules/setFormRequests';
import validateFormInputs from './modules/validateFormInputs';

//полифил для append
(function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('append')) {
        return;
      }
      Object.defineProperty(item, 'append', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function append() {
          var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();
          
          argArr.forEach(function (argItem) {
            var isNode = argItem instanceof Node;
            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
          });
          
          this.appendChild(docFrag);
        }
      });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    //таймер на сайте
    makeTimer('22 april 2020');
    //меню
    showMenu();
    //popup
    showPopup();
    //прокрутка страниц
    scrollingPage();
    //tabs 
    tabs();
    //добавляем "точки" переключения слайдов в слайдере
    addDots();
    //slider
    slider();
    //валидация инпутов калькулятора
    validateCalcInputs();
    //при клике на фото команды меняет картинку
    showOurCommandImg();
    //калькулятор
    calc(100);
    //вешает запросы на формы
    setFormRequests();
    //валидация инпутов форм
    validateFormInputs();
});