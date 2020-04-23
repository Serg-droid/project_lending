document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //таймер на сайте
    function makeTimer(deadline) {
        const   timerHours = document.querySelector('#timer-hours'),
                timerMinutes = document.querySelector('#timer-minutes'),
                timerSeconds = document.querySelector('#timer-seconds');

        let   endTime = new Date(deadline).getTime();

        function setTimeForTimer() {
            const   startTime = new Date().getTime(),
                    periodTime = endTime - startTime;

            const   seconds = String(Math.floor(periodTime / 1000) % 60),
                    minutes = String(Math.floor(periodTime / 1000 / 60) % 60),
                    hours = String(Math.floor(periodTime / 1000 / 3600));
            
            if (periodTime < 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                endTime = endTime + (24 * 3600 * 1000);
                return;
            }

            timerHours.textContent = hours.length === 2 ? hours : `0${hours}`;
            timerMinutes.textContent = minutes.length === 2 ? minutes : `0${minutes}`;
            timerSeconds.textContent = seconds.length === 2 ? seconds : `0${seconds}`;
        }

        const idInterval = setInterval(setTimeForTimer, 1000);
    }
    makeTimer('22 april 2020');

    //меню
    function showMenu() {
        const   btnMenu = document.querySelector('.menu'),
                menu = document.querySelector('menu'),
                closeBtn = document.querySelector('.close-btn'),
                menuItems = menu.querySelectorAll('ul>li>a'),
                body = document.querySelector('body');

        const menuHandler = () => {
            if(!menu.style.transform || menu.style.transform === 'translateX(-100%)') {
                menu.style.transform = 'translateX(0)';
            }else{
                menu.style.transform = 'translateX(-100%)';
            }
        };
        
        body.addEventListener('click', (e) => {
            const target = e.target.closest('.menu') || e.target.closest('menu');
            if(!target) {
                return;
            }
            if (target.classList.value === 'menu' || Array.from(target.querySelectorAll('a')).includes(e.target)) {
                menuHandler();
                return;
            }
        });
    }
    showMenu();

    //popup
    function showPopup() {
        const   popup = document.querySelector('.popup'),
                btnPopupList = document.querySelectorAll('.popup-btn'),
                btnPopupClose = document.querySelector('.popup-close');

        const popupHandler = (e) => {
            if(e.target.classList.value === 'popup') {
                popup.style.display = 'none';
                popup.removeEventListener('click', popupHandler);
            }
        };
        
        btnPopupList.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                popup.addEventListener('click', popupHandler);
                if(screen.width >= 786) {
                    requestAnimationFrame(() => animatePopup(0.5));
                }
            });
        });

        btnPopupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }
    showPopup();

    //animate popup
    function animatePopup(scale) {
        const popupContent = document.querySelector('.popup-content');

        const animationID = requestAnimationFrame(() => animatePopup(scale));
        scale += 0.02;
        popupContent.style.transform = `scale(${scale})`;
        if(scale > 1) {
            cancelAnimationFrame(animationID);
        }
    }

    //прокрутка страниц
    function scrollingPage() {
        const   menuItems = document.querySelectorAll('menu > ul > li > a'),
                serviceBlockHref = document.querySelector('main > a');

        const scrollingHandler = function(e) {
            e.preventDefault();
            const   href = this.href.split('#')[1].split('-')[0],
                    itemToGoTo = document.querySelector(`.${href}`);
            itemToGoTo.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        };

        serviceBlockHref.addEventListener('click', scrollingHandler);

        menuItems.forEach((elem) => {
            elem.addEventListener('click', scrollingHandler);
        });
    }
    scrollingPage();

    //tabs 
    function tabs() {
        const   serviceHeader = document.querySelector('.service-header'),
                serviceTabs = document.querySelectorAll('.service-tab'),
                serviceHeaderBtn = document.querySelectorAll('.service-header-tab');

        serviceHeader.addEventListener('click', (e) => {
            let target = e.target.closest('.service-header-tab');
            if(target.classList.contains('active')) {
                return;
            }
            
            const indexServiceTab = Array.from(serviceHeaderBtn).indexOf(target);
            
            serviceHeaderBtn.forEach((elem) => {
                elem.classList.remove('active');
            });
            target.classList.add('active');
            
            serviceTabs[indexServiceTab].classList.remove('d-none');
            serviceTabs.forEach((item, index) => {
                if(index !== indexServiceTab && !item.classList.contains('d-none')) {
                    item.classList.add('d-none');
                }
            });
        });
    }
    tabs();
});