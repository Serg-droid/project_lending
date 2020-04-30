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
        const   menu = document.querySelector('menu'),
                body = document.querySelector('body');

        let menuShowed = false;

        const menuHandler = () => {
            if(!menuShowed) {
                menu.style.transform = 'translateX(0)';
                menuShowed = !menuShowed;
            }else{
                menu.style.transform = 'translateX(-100%)';
                menuShowed = !menuShowed;
            }
        };
        
        body.addEventListener('click', (e) => {
            const target = e.target.closest('.menu') || e.target.closest('menu');
            if(!target && menuShowed) {
                menuHandler();
                return;
            }else if(!target) {
                return;
            }
            
            if(target.matches('.menu')) {
                menuHandler();
                return;
            }
            if(Array.from(menu.querySelectorAll('a')).includes(e.target)) {
                menuHandler();
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
                allDots = portfolio.querySelectorAll('.dot'),
                portfolioItems = portfolio.querySelectorAll('.portfolio-item'),
                [...arrOfDots] = allDots;

        let currentIndex = 0,
            autoChangingID;

        function changeImages(index) {  
            portfolioItems.forEach((elem) => {
                elem.classList.remove('portfolio-item-active');
            });
            allDots.forEach((elem) => {
                elem.classList.remove('dot-active');
            });

            allDots[index].classList.add('dot-active');
            portfolioItems[index].classList.add('portfolio-item-active');
        }

        function changeHandler(target) {
            if(target.matches('.dot')) {
                currentIndex = arrOfDots.indexOf(target);
                changeImages(currentIndex);
            }else if(target.matches('#arrow-left')) {
                // Проверка на выход за границы массива точек
                currentIndex = currentIndex - 1 < 0 ? arrOfDots.length - 1 : currentIndex - 1;
                changeImages(currentIndex);
            }else if(target.matches('#arrow-right')) {
                // -\\-
                currentIndex = currentIndex + 1 === arrOfDots.length ? 0 : currentIndex + 1;
                changeImages(currentIndex);
            }
        }

        const autoChanging = () => {
            currentIndex = currentIndex + 1 === arrOfDots.length ? 0 : currentIndex + 1;
            changeImages(currentIndex);
        };

        const autoChangingStart = (time = 3000) => {
            autoChangingID = setInterval(autoChanging, time);
        };

        const autoChangingStop = () => {
            clearInterval(autoChangingID);
        }
        
        portfolio.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            if(!e.target.matches('.portfolio-btn, .dot')) {
                return;
            }
            changeHandler(target);
        });

        portfolio.addEventListener('mouseover', (e) => {
            if(e.target.matches('.portfolio-btn')) {
                autoChangingStop();
            }
        });

        portfolio.addEventListener('mouseout', (e) => {
            if(e.target.matches('.portfolio-btn')) {
                autoChangingStart(2000);
            }
        });

        autoChangingStart(2000);
    }
    slider();

    //валидация инпутов калькулятора
    function validateCalcInputs() {
        const   calcBlock = document.querySelector('.calc-block');

        const inputCalcHandler = (elem) => {
            elem.value = elem.value.replace(/[^\d]/g, '');
        };

        calcBlock.addEventListener('keyup', (e) => {
            const target = e.target;
            if(!target.matches('.calc-square, .calc-count, .calc-day')) {
                return;
            }
            inputCalcHandler(target);
        });
    }
    validateCalcInputs();

    //при клике на фото команды меняет картинку
    function showOurCommandImg() {
        const   command = document.getElementById('command');

        command.addEventListener('click', (e) => {
            const target = e.target;
            if(target.tagName !== "IMG") {
                return;
            }
            const previousPhotoSrc = target.getAttribute('src');
            target.setAttribute('src', target.dataset.img);

            target.addEventListener('mouseout', () => {
                target.setAttribute('src', previousPhotoSrc);
            });
        });
    }
    showOurCommandImg();

    //калькулятор
    function calc(price = 100){
        const   calcBlock = document.querySelector('.calc-block'),
                calcType = document.querySelector('.calc-type'),
                calcSquare = document.querySelector('.calc-square'),
                calcDay = document.querySelector('.calc-day'),
                calcCount = document.querySelector('.calc-count'),
                totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1,
                typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value,
                timeoutCounter = 25;

            if(calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if(calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            }else if(calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if(typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            const timeoutID = setInterval(function() {
                if(timeoutCounter === 0) {
                    totalValue.textContent = total;
                    clearInterval(timeoutID);
                }else{
                    totalValue.textContent = Math.floor(Math.random() * total);
                    timeoutCounter -= 1;
                }
            }, 30)
        };

        calcBlock.addEventListener('change', (e) => {
            const target = e.target;
            if(target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    }
    calc(100);
});