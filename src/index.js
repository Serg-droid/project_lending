import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'fetch-polyfill';
import 'es6-promise/auto';
import 'formdata-polyfill';
import './modules/append-polyfill';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

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

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    //таймер на сайте
    makeTimer('5 may 2020');
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