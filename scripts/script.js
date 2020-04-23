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

    //добавляем "точки" переключения слайдов в слайдере
    function addDots() {
        const   portfolioItems = document.querySelectorAll('.portfolio-item'),
                dotList = document.querySelector('.portfolio-dots'),
                portfolioLength = portfolioItems.length,
                fragment = document.createDocumentFragment();
        
        for(let i = 0; i < portfolioLength; i++) {
            const li = document.createElement('li');
            li.classList.add('dot');
            if(i === 0) {
                li.classList.add('dot-active');
            }
            fragment.append(li);
        }  
        
        dotList.append(fragment);
    }
    addDots();

    //slider
    function slider() {
        const   portfolio = document.querySelector('.portfolio'),
                btnPrev = portfolio.querySelector('#arrow-left'),
                btnNext = portfolio.querySelector('#arrow-right'),
                allDots = portfolio.querySelectorAll('.dot'),
                portfolioItems = portfolio.querySelectorAll('.portfolio-item'),
                arrOfDots = Array.from(allDots),
                [...arrOfPortfolioItems] = portfolioItems;

        function changeImages(dot, indexOfDot) {  
            arrOfPortfolioItems.forEach((elem) => {
                elem.classList.remove('portfolio-item-active');
            });
            arrOfDots.forEach((elem) => {
                elem.classList.remove('dot-active');
            });

            dot.classList.add('dot-active');
            arrOfPortfolioItems[indexOfDot].classList.add('portfolio-item-active');
        }
        
        portfolio.addEventListener('click', (e) => {
            if(!(e.target.className === 'dot' || e.target === btnPrev || e.target === btnNext)) {
                return;
            }
            e.preventDefault();
            const  activeDot = portfolio.querySelector('.dot-active');

            if(e.target.className === 'dot') {
                const indexOfDot = arrOfDots.indexOf(e.target);

                changeImages(e.target, indexOfDot);
            }else if(e.target === btnPrev) {
                // Проверка на выход за границы массива точек
                const indexOfPrevDot = arrOfDots.indexOf(activeDot) - 1 < 0 ? arrOfDots.length - 1 : arrOfDots.indexOf(activeDot) - 1;

                changeImages(arrOfDots[indexOfPrevDot], indexOfPrevDot);
            }else{
                // -\\-
                const indexOfNextDot = arrOfDots.indexOf(activeDot) + 1 > arrOfDots.length - 1 ? 0 : arrOfDots.indexOf(activeDot) + 1;

                changeImages(arrOfDots[indexOfNextDot], indexOfNextDot);
            }
        });

    }
    slider();
});